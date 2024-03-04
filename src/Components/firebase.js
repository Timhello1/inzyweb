// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAmzqT6HHQUg22nRY-5CW-xzixe-g4noM",
    authDomain: "fir-668e8.firebaseapp.com",
    projectId: "fir-668e8",
    storageBucket: "fir-668e8.appspot.com",
    messagingSenderId: "211484201016",
    appId: "1:211484201016:web:2a329716591b54a77dd6cd",
    measurementId: "G-9N0TE1YV9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);

// Initialize Firebase Authentication and get a reference to the service
export { auth, firestore}