import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARGdapjCLSIVtS9ZNYDPJNURuzZVWz_tk",
  authDomain: "appcriptobd-6399e.firebaseapp.com",
  projectId: "appcriptobd-6399e",
  storageBucket: "appcriptobd-6399e.appspot.com",
  messagingSenderId: "398959365505",
  appId: "1:398959365505:web:f762a55eba48f2ac002c80"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);