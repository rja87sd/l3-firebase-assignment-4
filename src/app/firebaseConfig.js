// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoeyzkxNRkEOEMddBACxwJfYXbwrw6Qv4",
  authDomain: "firestore-demo-c4227.firebaseapp.com",
  projectId: "firestore-demo-c4227",
  storageBucket: "firestore-demo-c4227.appspot.com",
  messagingSenderId: "533384942915",
  appId: "1:533384942915:web:e4342677f01cbea1470bf6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };