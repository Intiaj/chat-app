import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaeNpzFzUdqBahLRWml9kIRLesySyZNUY",
  authDomain: "chat-app-f5a24.firebaseapp.com",
  projectId: "chat-app-f5a24",
  storageBucket: "chat-app-f5a24.appspot.com",
  messagingSenderId: "467663585031",
  appId: "1:467663585031:web:a7fa7131f98c8198e8cfa2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


