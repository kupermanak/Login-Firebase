import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAc81xFMBauvdbDhNW8HQRuFA3WW5bTsXg",
  authDomain: "profe-mundial.firebaseapp.com",
  projectId: "profe-mundial",
  storageBucket: "profe-mundial.appspot.com",
  messagingSenderId: "878763819429",
  appId: "1:878763819429:web:745788c7c82cafe833684c",
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
