import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // Start with 1 second delay
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const validateFile = (file: File): { valid: boolean; error?: string } => {
  if (!file || !(file instanceof File)) {
    return { valid: false, error: 'Invalid file object' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only JPG and PNG are allowed' };
  }

  return { valid: true };
};

export const uploadFile = async (
  file: File,
  type: 'temp' | 'gallery' | 'verification',
  userId?: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  const validation = validateFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  let attempt = 0;
  let lastError: Error | null = null;
  
  while (attempt < MAX_RETRIES) {
    try {
      // Generate path based on type
      const timestamp = Date.now();
      const fileId = uuidv4();
      const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      let path: string;

      if (type === 'temp') {
        path = `temp/advertisements/${fileId}-${sanitizedFileName}`;
      } else if (userId) {
        path = `${type}/${userId}/${fileId}-${sanitizedFileName}`;
      } else {
        path = `temp/advertisements/${fileId}-${sanitizedFileName}`;
      }

      const storageRef = ref(storage, path);
      
      // Set metadata
      const metadata = {
        contentType: file.type,
        customMetadata: {
          originalName: file.name,
          uploadTimestamp: timestamp.toString(),
          uploadType: type,
          fileId
        },
      };

      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Return promise that resolves with download URL
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (onProgress) {
              onProgress(progress);
            }
          },
          (error) => {
            console.error('Upload error:', error);
            lastError = error;
            reject(new Error(`Upload failed: ${error.message || 'Unknown error'}`));
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              if (!url) {
                throw new Error('Failed to get download URL');
              }
              resolve(url);
            } catch (error: any) {
              console.error('Download URL error:', error);
              lastError = error;
              reject(new Error(`Failed to get download URL: ${error.message || 'Unknown error'}`));
            }
          }
        );
      });
    } catch (error: any) {
      console.error(`Upload attempt ${attempt + 1} failed:`, error);
      lastError = error;
      
      if (attempt < MAX_RETRIES - 1) {
        const delay = RETRY_DELAY * Math.pow(2, attempt);
        await sleep(delay);
        attempt++;
      } else {
        const errorMessage = lastError?.message || 'Unknown error occurred';
        throw new Error(`Upload failed after ${MAX_RETRIES} attempts: ${errorMessage}`);
      }
    }
  }

  throw new Error('Upload failed after maximum retries');
};

export const deleteFile = async (path: string): Promise<void> => {
  if (!storage) {
    throw new Error('Firebase Storage is not initialized');
  }

  if (!path) {
    throw new Error('No file path provided for deletion');
  }

  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error: any) {
    console.error('Delete error:', error);
    throw new Error(`Failed to delete file: ${error.message || 'Unknown error'}`);
  }
};