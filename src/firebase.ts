// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "projectmap-a4df7.firebaseapp.com",
  databaseURL: "https://projectmap-a4df7-default-rtdb.firebaseio.com",
  projectId: "projectmap-a4df7",
  storageBucket: "projectmap-a4df7.appspot.com",
  messagingSenderId: "779342855230",
  appId: "1:779342855230:web:936b7d72baa220d07a256f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
