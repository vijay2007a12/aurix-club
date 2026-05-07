import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Fallback hardcoded config
const hardcodedConfig: FirebaseOptions = {
  apiKey: "AIzaSyD0Q9NO9Y4_1TlOAFfGfOUtoAdV8CwmmYk",
  authDomain: "aurix-club.firebaseapp.com",
  projectId: "aurix-club",
  storageBucket: "aurix-club.firebasestorage.app",
  messagingSenderId: "752985383055",
  appId: "1:752985383055:web:b8d4f00a87ae94d5c710fa",
};

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || hardcodedConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || hardcodedConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || hardcodedConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || hardcodedConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || hardcodedConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || hardcodedConfig.appId,
};

const requiredKeys: Array<keyof FirebaseOptions> = ['apiKey', 'authDomain', 'projectId', 'appId'];
const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.warn('[Firebase] Missing config values:', missingKeys.join(', '));
}

let app;
let auth;
let db;
let googleProvider;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
} catch (error) {
  console.warn('[Firebase] Initialization error:', error);
  // Fallback values - app will render but Firebase features won't work
}

export { app, auth, db, googleProvider };
export const isFirebaseConfigured = missingKeys.length === 0 && !!app;

const adminEmailsEnv = import.meta.env.VITE_ADMIN_EMAILS as string | undefined;

export const approvedAdminEmails = adminEmailsEnv
  ? adminEmailsEnv.split(',').map((email: string) => email.trim().toLowerCase()).filter(Boolean)
  : [];
