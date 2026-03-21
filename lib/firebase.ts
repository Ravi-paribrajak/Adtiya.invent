// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API_KEY", 
  authDomain: "reels-code-hub.firebaseapp.com",
  projectId: "reels-code-hub",
  storageBucket: "reels-code-hub.firebasestorage.app",
  messagingSenderId: "700701030204",
  appId: "1:700701030204:web:bfe74d1dcff7444e345039",
  measurementId: "G-QNB1REB6WE"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore (Database) and Storage, then export them
export const db = getFirestore(app);
export const storage = getStorage(app);