// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apikey = process.env.REACT_APP_FIREBASE_API_KEY;

const firebaseConfig = {
  apiKey: apikey,
  authDomain: "fortune-card-collection.firebaseapp.com",
  projectId: "fortune-card-collection",
  storageBucket: "fortune-card-collection.firebasestorage.app",
  messagingSenderId: "5209213786",
  appId: "1:5209213786:web:0c9b0576b8a74fa6750163"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);