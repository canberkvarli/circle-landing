import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5A4_AWy8TJlrVCMGaFDXv8LglGt4VG_U",
  authDomain: "fullcircle-dev-1aafd.firebaseapp.com",
  projectId: "fullcircle-dev-1aafd",
  storageBucket: "fullcircle-dev-1aafd.firebasestorage.app",
  messagingSenderId: "831545660855",
  appId: "1:831545660855:web:85e4f92089616547e14432",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Analytics removed to avoid permission issues
// Focus on core Firestore functionality for the waitlist

export default app;
