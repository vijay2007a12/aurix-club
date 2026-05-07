import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredConfigKeys: Array<keyof FirebaseOptions> = [
  'apiKey',
  'authDomain',
  'projectId',
  'appId',
];

const missingConfigKeys = requiredConfigKeys.filter((key) => {
  const value = firebaseConfig[key];

  return !value;
});

if (missingConfigKeys.length > 0) {
  console.warn(
    '[Firebase] Missing Firebase config values:',
    missingConfigKeys.join(', '),
    'Add them to your Vite environment variables.'
  );
}

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const isFirebaseConfigured = missingConfigKeys.length === 0;
