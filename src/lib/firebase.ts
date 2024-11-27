import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { config } from './config';

const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally
const initializeAnalytics = async () => {
  try {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      return getAnalytics(app);
    }
    return null;
  } catch (error) {
    console.warn('Analytics not supported:', error);
    return null;
  }
};

// Connect to storage emulator in development
if (import.meta.env.DEV) {
  try {
    connectStorageEmulator(storage, 'localhost', 9199);
  } catch (error) {
    console.warn('Failed to connect to storage emulator:', error);
  }
}

// Verify storage initialization
if (!storage) {
  throw new Error('Firebase Storage failed to initialize');
}

// Initialize analytics
initializeAnalytics();

// Export initialized app
export { app };