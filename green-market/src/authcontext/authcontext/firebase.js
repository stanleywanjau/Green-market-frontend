// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL6hzpPjyR7A_FAU8Y5cS8U_repVrc-tA",
  authDomain: "greenmarket-614b4.firebaseapp.com",
  projectId: "greenmarket-614b4",
  storageBucket: "greenmarket-614b4.appspot.com",
  messagingSenderId: "124959609373",
  appId: "1:124959609373:web:5ed40fa743dd20444cecf4",
  measurementId: "G-ZREH3TFQ3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth, app};