import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Default to dev config (for backward compatibility)
const devFirebaseConfig = {
  apiKey: "AIzaSyA5A4_AWy8TJlrVCMGaFDXv8LglGt4VG_U",
  authDomain: "fullcircle-dev-1aafd.firebaseapp.com",
  projectId: "fullcircle-dev-1aafd",
  storageBucket: "fullcircle-dev-1aafd.firebasestorage.app",
  messagingSenderId: "831545660855",
  appId: "1:831545660855:web:85e4f92089616547e14432",
};

// Production config from environment variables
const prodFirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Use production config if all required env vars are set, otherwise use dev
const useProduction = 
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = useProduction ? prodFirebaseConfig : devFirebaseConfig;

if (useProduction) {
  console.log('🔥 Using PRODUCTION Firebase configuration');
} else {
  console.log('🔥 Using DEV Firebase configuration');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Analytics removed to avoid permission issues
// Focus on core Firestore functionality for the waitlist

export default app;
