// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCnM6Nn1H-OiCgPh34ZlEe43mfMor6pf7Y",
  authDomain: "disaster-management-syst-77154.firebaseapp.com",
  projectId: "disaster-management-syst-77154",
  storageBucket: "disaster-management-syst-77154.appspot.com",
  messagingSenderId: "560806581465",
  appId: "1:560806581465:web:11b1effaa90b5cf2c0dac8",
  measurementId: "G-MN24ZJ62X1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

export default app;
