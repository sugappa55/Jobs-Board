// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY||"AIzaSyDcKFY7cNdLJ1M5Si57SVXGVMAFOHVVdzo",
  authDomain: "ecom-web-app-afacf.firebaseapp.com",
  projectId: "ecom-web-app-afacf",
  storageBucket: "ecom-web-app-afacf.appspot.com",
  messagingSenderId: "397644464233",
  appId: "1:397644464233:web:95a496d3f0adf695fae2f8"
};

export const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)
export const db=getFirestore(app)
