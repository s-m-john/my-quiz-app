// src/firebase/firestore.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export Firestore instance
export const firestore = firebaseApp.firestore();

// Export other Firebase services if needed
// Example: export const auth = firebaseApp.auth();
