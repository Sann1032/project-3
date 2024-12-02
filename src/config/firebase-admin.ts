import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyATQ5BgFC5WKmn2mIlFtOCnlQoUdvS5dLY",
  authDomain: "tax-planning-app.firebaseapp.com",
  projectId: "tax-planning-app",
  storageBucket: "tax-planning-app.firebasestorage.app",
  messagingSenderId: "988177089613",
  appId: "1:988177089613:web:8e6a1958ab831a675d4804",
  measurementId: "G-1EFME9M73K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);