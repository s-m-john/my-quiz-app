// src/firebase/auth.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDNb9zvAHlD6uGiiIAJvUXJsYZ33MpVAuE",
  authDomain: "geeks-finalproject.firebaseapp.com",
  projectId: "geeks-finalproject",
  storageBucket: "geeks-finalproject.appspot.com",
  messagingSenderId: "325075737827",
  appId: "1:325075737827:web:9129464d57dfae2cb479d6"
};


// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Export Auth instance
export const auth = firebaseApp.auth();

// Export other Firebase services if needed
// Example: export const firestore = firebaseApp.firestore();
