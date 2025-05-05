import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Make sure to import getStorage

const firebaseConfig = {
  apiKey: "AIzaSyC9Mep3k4hvIUBKI1tMwVGqb-jSy8VQGaY",
  authDomain: "taskon-12a42.firebaseapp.com",
  projectId: "taskon-12a42",
  storageBucket: "taskon-12a42.firebasestorage.app",
  messagingSenderId: "1062641202584",
  appId: "1:1062641202584:web:62553507aba355e7f667ed",
  measurementId: "G-YY38RRLS60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
export const storage = getStorage(app); // Ensure storage is correctly initialized and exported
const db = getFirestore(app);

export { auth, analytics, db };
