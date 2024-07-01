// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-594e9.firebaseapp.com",
  projectId: "ecommerce-594e9",
  storageBucket: "ecommerce-594e9.appspot.com",
  messagingSenderId: "179390088011",
  appId: "1:179390088011:web:9a06ab025e92579c441ece",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
