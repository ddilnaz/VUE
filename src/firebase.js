// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbSUS_pV-UWOYAs0fmp4x7UDC71XL0_mg",
    authDomain: "reviews-4cdef.firebaseapp.com",
    projectId: "reviews-4cdef",
    storageBucket: "reviews-4cdef.appspot.com",
    messagingSenderId: "244943566829",
    appId: "1:244943566829:web:190417e7469f1dbbb2d9e4",
    measurementId: "G-E0VC6ED29V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);