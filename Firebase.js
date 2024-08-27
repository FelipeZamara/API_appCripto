import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYjs0fHIwEek1VDdDji7NedgQ8eL00zbA",
  authDomain: "appcrypto-b2959.firebaseapp.com",
  projectId: "appcrypto-b2959",
  storageBucket: "appcrypto-b2959.appspot.com",
  messagingSenderId: "499818813023",
  appId: "1:499818813023:web:5e5dd60017756a233cedea"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);