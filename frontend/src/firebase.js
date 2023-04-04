// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvoOjGPlG0i6HdTUyqpHs-Vuqvdc7yya4",
  authDomain: "skill-place-market-swap.firebaseapp.com",
  projectId: "skill-place-market-swap",
  storageBucket: "skill-place-market-swap.appspot.com",
  messagingSenderId: "750847920228",
  appId: "1:750847920228:web:ac532f939cbd0d52af7771",
  measurementId: "G-KFZPD79HH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
