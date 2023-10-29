// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALYMRVyVyVbDjkrXu8zX6N48FBzsL7-Ss",
  authDomain: "questionapp-64f16.firebaseapp.com",
  projectId: "questionapp-64f16",
  storageBucket: "questionapp-64f16.appspot.com",
  messagingSenderId: "57858564725",
  appId: "1:57858564725:web:93f455488fa5284c6bce3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
