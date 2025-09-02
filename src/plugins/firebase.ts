import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhqNaMp07A_3Gz_b_vPEcZJESDSWF3l-I", // Make sure this is correct
  authDomain: "real-estate-agency-829b3.firebaseapp.com",
  projectId: "real-estate-agency-829b3",
  storageBucket: "real-estate-agency-829b3.appspot.com", // <-- corrected
  messagingSenderId: "263347565847",
  appId: "1:263347565847:web:e7d949a681b2d7b1373352",
  measurementId: "G-T12RSGSLR6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Exports
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
