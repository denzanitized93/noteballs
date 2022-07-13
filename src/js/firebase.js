// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDv3zR3J2c1Gp_ZMQ3n2c0heNwKl3HL7Vs",
  authDomain: "noteballs-31cec.firebaseapp.com",
  projectId: "noteballs-31cec",
  storageBucket: "noteballs-31cec.appspot.com",
  messagingSenderId: "316704903509",
  appId: "1:316704903509:web:226aa196bff6856d7d5fdc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export {
  db,
  auth
}