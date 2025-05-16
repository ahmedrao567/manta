import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";  // Import Firestore


const firebaseConfig = {
  apiKey: "AIzaSyC9Mep3k4hvIUBKI1tMwVGqb-jSy8VQGaY",
  authDomain: "taskon-12a42.firebaseapp.com",
  projectId: "taskon-12a42",
  storageBucket: "taskon-12a42.appspot.com", // FIXED: .app -> .com
  messagingSenderId: "1062641202584",
  appId: "1:1062641202584:web:62553507aba355e7f667ed",
  measurementId: "G-YY38RRLS60"
};

const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);  // Initialize Firestore

export { auth, analytics, storage, db };  // Export Firestore as well
