// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLu1FLlxN0PgdWRmCmFNTxcakVs4LBPFs",
  authDomain: "eazytrain-b2a5d.firebaseapp.com",
  projectId: "eazytrain-b2a5d",
  storageBucket: "eazytrain-b2a5d.firebasestorage.app",
  messagingSenderId: "1095588108035",
  appId: "1:1095588108035:web:8aee7550caa7ddadc1fb36",
  measurementId: "G-X6PYE441M2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };