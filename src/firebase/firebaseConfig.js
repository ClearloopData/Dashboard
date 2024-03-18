// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBsN_R_Jd9lw2ntt0NdV-V8Nb5C6hA6Dg",
  authDomain: "clearloop-watttime.firebaseapp.com",
  databaseURL: "https://clearloop-watttime-default-rtdb.firebaseio.com",
  projectId: "clearloop-watttime",
  storageBucket: "clearloop-watttime.appspot.com",
  messagingSenderId: "609651615423",
  appId: "1:609651615423:web:05e304e30b1fd14923c80a",
  measurementId: "G-W6M8H396EM",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
