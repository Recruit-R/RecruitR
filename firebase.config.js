// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfVh_A1RSb2S4xNxNDozKzHRv0nxjv-_M",
  authDomain: "recruitr-5a2af.firebaseapp.com",
  projectId: "recruitr-5a2af",
  storageBucket: "recruitr-5a2af.appspot.com",
  messagingSenderId: "48151581853",
  appId: "1:48151581853:web:f7d7278fc5bdff76523074",
  measurementId: "G-8T1V6SZFQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;