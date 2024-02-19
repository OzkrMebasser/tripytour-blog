
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "tripytour-blog.firebaseapp.com",
  projectId: "tripytour-blog",
  storageBucket: "tripytour-blog.appspot.com",
  messagingSenderId: "701293759111",
  appId: "1:701293759111:web:6f77164ffc62f377630622",
  measurementId: "G-6YMX5Z00BD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
