// // Import the functions you need from the SDKs you need
import "@react-native-firebase/database"; // Realtime Database用
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcgDZVb0JYiC53sUDrUwXqWckIyAMbK4Y",
    authDomain: "devproject-8f5ab.firebaseapp.com",
    projectId: "devproject-8f5ab",
    storageBucket: "devproject-8f5ab.appspot.com",
    messagingSenderId: "388533406260",
    appId: "1:388533406260:web:3eb55e415b307e496a1861",
    measurementId: "G-TX12WG271L",
};

import { firebase, FirebaseApp } from "@react-native-firebase/database";
(!firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app()) as FirebaseApp;

// console.log(firebase);
