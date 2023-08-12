// src/firebase/firestore.js
import firebase from 'firebase/app';
import 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase app
const app = firebase.initializeApp(firebaseConfig);

// Create and export Firestore instance
export const firestore = app.firestore();

// Export other Firebase services if needed
// Example: export const auth = app.auth();
