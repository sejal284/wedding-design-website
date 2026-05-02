import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0IP2_XZwnRdwAZH80C7DkY-jDnKYP2TU",
  authDomain: "lil-details-auth.firebaseapp.com",
  projectId: "lil-details-auth",
  storageBucket: "lil-details-auth.firebasestorage.app",
  messagingSenderId: "369044770515",
  appId: "1:369044770515:web:52d856f80fcd2c56834e26"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
