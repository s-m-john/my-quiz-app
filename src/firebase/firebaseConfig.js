// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'; // Import specific Firestore function
import { getAuth } from 'firebase/auth'; // Import specific Auth function


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNb9zvAHlD6uGiiIAJvUXJsYZ33MpVAuE",
  authDomain: "geeks-finalproject.firebaseapp.com",
  projectId: "geeks-finalproject",
  storageBucket: "geeks-finalproject.appspot.com",
  messagingSenderId: "325075737827",
  appId: "1:325075737827:web:9129464d57dfae2cb479d6"
};


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create and export Firestore and Auth instances
export const firestore = getFirestore(app);
export const auth = getAuth(app);