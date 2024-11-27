interface Config {
  app: {
    title: string;
    apiUrl: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
}

export const config: Config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'DIX Platform',
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAT1phhXz-BgtP35j_0_gjUZz7WVorGDzQ",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "biaa-e6bea.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "biaa-e6bea",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "biaa-e6bea.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "928267449519",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:928267449519:web:bd59b66644b0d8954a105a",
  },
};