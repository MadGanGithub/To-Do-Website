// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVEALXdJa0spoxgNHUhHYYY7O0F-Sz07Q",
  authDomain: "todo-44283.firebaseapp.com",
  databaseURL: "https://todo-44283-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "todo-44283",
  storageBucket: "todo-44283.appspot.com",
  messagingSenderId: "63159936378",
  appId: "1:63159936378:web:964d8dca0b3d337b51e2c3",
  measurementId: "G-1DJM9ZTBJY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
