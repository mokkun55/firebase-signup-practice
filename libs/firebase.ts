import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBN3JjpA05vvi5wNwmkuX5ogdez89FlL3w",
  authDomain: "yurigaoka-9fe69.firebaseapp.com",
  projectId: "yurigaoka-9fe69",
  storageBucket: "yurigaoka-9fe69.appspot.com",
  messagingSenderId: "121377372548",
  appId: "1:121377372548:web:20a0100a17a19b294905d1",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
