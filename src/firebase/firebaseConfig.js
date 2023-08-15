import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);
export const firestore = getFirestore(app);


