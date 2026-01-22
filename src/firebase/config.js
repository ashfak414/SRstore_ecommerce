// Firebase Configuration
// Replace these values with your Firebase project credentials

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBC0l4YydvwUfprnKSKo2LBEALOzXG3sas",
  authDomain: "react-project-cec17.firebaseapp.com",
  projectId: "react-project-cec17",
  storageBucket: "react-project-cec17.appspot.com",
  messagingSenderId: "361828764360",
  appId: "1:361828764360:web:f4a7d7019c9214ce8533fd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;

