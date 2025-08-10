// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJNuWdjSK1rK5Tue3rcBxQB0JMtpzs_Ac",
  authDomain: "blogproject-1d434.firebaseapp.com",
  projectId: "blogproject-1d434",
  storageBucket: "blogproject-1d434.firebasestorage.app",
  messagingSenderId: "450530144419",
  appId: "1:450530144419:web:e3f218b614e63869cd8f16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);


