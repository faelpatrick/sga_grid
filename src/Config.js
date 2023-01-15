import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCJwcaNovu06Gufs5ax7BFsr23uCtzniaw",
    authDomain: "unicrud-8eb7a.firebaseapp.com",
    projectId: "unicrud-8eb7a",
    storageBucket: "unicrud-8eb7a.appspot.com",
    messagingSenderId: "818266625646",
    appId: "1:818266625646:web:370b5f7b6bdb5f8152b87f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);