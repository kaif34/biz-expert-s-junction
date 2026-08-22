import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXcwYnd3IFlyARSYRSMBEhHMjH_pSxXj0",
  authDomain: "colombus-ec9f9.firebaseapp.com",
  projectId: "colombus-ec9f9",
  storageBucket: "colombus-ec9f9.firebasestorage.app",
  messagingSenderId: "740135149801",
  appId: "1:740135149801:web:4f0aff46cc96759424d078",
  measurementId: "G-6P5PFTSQTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
