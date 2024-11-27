import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, AlertCircle, ImagePlus, Loader2 } from 'lucide-react';
import { AdImage } from '../../types/ad';

interface MediaUploadProps {
  images: AdImage[];
  onUpload: (newImages: AdImage[]) => void;
  onRemove: (imageId: string) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  images,
  onUpload,
  onRemove,
  maxFiles = 10,
  acceptedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  maxFileSize = 5242880, // 5MB
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFiles, setProcessingFiles] = useState<string[]>([]);

  const handleUpload = async (files: File[]) => {
    if (!files.length) {
      setError('No files selected');
      return;
    }

    if (images.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setProcessingFiles(files.map(f => f.name));

    try {
      // Validate files
      const validFiles = files.filter(file => {
        if (file.size > maxFileSize) {
          setError(`File ${file.name} exceeds 5MB limit`);
          return false;
        }
        if (!acceptedFileTypes.includes(file.type)) {
          setError(`File ${file.name} is not a supported image type`);
          return false;
        }
        return true;
      });

      if (validFiles.length === 0) {
        setIsProcessing(false);
        setProcessingFiles([]);
        return;
      }

      // Process files sequentially
      const newImages: AdImage[] = [];
      for (const file of validFiles) {
        // Create a promise that resolves with the file data
        const fileDataPromise = new Promise<AdImage>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const url = URL.createObjectURL(file);
            resolve({
              id: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url,
              isPrimary: images.length === 0 && newImages.length === 0,
              type: 'GALLERY',
              status: 'PENDING'
            });
          };
          reader.readAsDataURL(file);
        });

        const image = await fileDataPromise;
        newImages.push(image);
        
        // Remove from processing list
        setProcessingFiles(prev => prev.filter(name => name !== file.name));
      }

      onUpload(newImages);
      setError(null);
    } catch (err: any) {
      console.error('Error handling files:', err);
      setError(err.message || 'Failed to process images. Please try again.');
    } finally {
      setIsProcessing(false);
      setProcessingFiles([]);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!isProcessing) {
      handleUpload(acceptedFiles);
    }
  }, [images.length, maxFiles, maxFileSize, isProcessing]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes,
    },
    maxSize: maxFileSize,
    multiple: true,
    disabled: isProcessing
  });

  const handleMakePrimary = (imageId: string) => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === imageId
    }));
    onUpload(updatedImages);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
          ${isProcessing ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
          ${isDragActive
            ? 'border-primary-lighter bg-primary-lighter/10 scale-105'
            : 'border-white/20 hover:border-primary-lighter/50 hover:bg-white/5'}`}
      >
        <input {...getInputProps()} disabled={isProcessing} />
        <div className="relative z-10">
          {isProcessing ? (
            <>
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary-lighter animate-spin" />
              <p className="text-lg text-primary-lighter">Processing images...</p>
              {processingFiles.length > 0 && (
                <div className="mt-4 text-sm text-white/60">
                  {processingFiles.map(fileName => (
                    <div key={fileName} className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {fileName}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <Upload className={`w-12 h-12 mx-auto mb-4 text-white/60
                ${isDragActive ? 'scale-110 text-primary-lighter' : ''}`} 
              />
              <p className={`text-lg ${isDragActive ? 'text-primary-lighter' : 'text-white/60'}`}>
                {isDragActive ? 'Drop your images here' : 'Drag & drop images here, or click to select'}
              </p>
              <p className="text-sm text-white/40 mt-2">
                Maximum {maxFiles} images, up to 5MB each
              </p>
            </>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square rounded-lg overflow-hidden group transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={image.url}
                alt="Upload preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute top-2 right-2 flex gap-2">
                  {!image.isPrimary && (
                    <button
                      onClick={() => handleMakePrimary(image.id)}
                      className="p-1.5 rounded-full bg-primary-lighter/80 text-white hover:bg-primary-lighter transition-colors"
                      title="Make primary image"
                    >
                      <ImagePlus className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (image.url.startsWith('blob:')) {
                        URL.revokeObjectURL(image.url);
                      }
                      onRemove(image.id);
                    }}
                    className="p-1.5 rounded-full bg-red-500/80 text-white hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {image.isPrimary && (
                <div className="absolute top-0 left-0 right-0 bg-primary-lighter/80 text-white text-xs py-1 px-2 text-center">
                  Primary Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};