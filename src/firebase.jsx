import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV7JhSyI2xmiNJBXpEoDj34y_lGA2lKwo",
  authDomain: "react-firebase-45a7e.firebaseapp.com",
  projectId: "react-firebase-45a7e",
  storageBucket: "react-firebase-45a7e.appspot.com",
  messagingSenderId: "305912606386",
  appId: "1:305912606386:web:f9ddae9b936bcff7bfa3ab",
  measurementId: "G-66JES8W3HH",
  databaseURL: "https://react-firebase-45a7e-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Realtime Database
export const database = getDatabase(app);
