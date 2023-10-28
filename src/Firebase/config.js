import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, query, where } from 'firebase/firestore';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyBlIGBIHCB3LTvgfTjBs4czyTKhdmY0TXI",
  authDomain: "shaped-manifest-368607.firebaseapp.com",
  projectId: "shaped-manifest-368607",
  storageBucket: "shaped-manifest-368607.appspot.com",
  messagingSenderId: "819866110218",
  appId: "1:819866110218:web:dda76bba2b3924b0fdd2f3",
  measurementId: "G-L09EJG18W4"
};
const FirebaseConfig = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseConfig)
export const firebase = {getAuth,query,getDocs, where, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, FirebaseConfig, collection, addDoc, db} 



