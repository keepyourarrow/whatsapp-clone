// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

import config from "./config";

// replace these values with your own!
export const firebaseConfig = {
  apiKey: config.firebase_API_KEY,
  authDomain: config.firebase_AUTH_DOMAIN,
  databaseURL: config.firebase_DATABASE_URL,
  projectId: config.firebase_PROJECT_ID,
  storageBucket: config.firebase_STORAGE_BUCKET,
  messagingSenderId: config.firebase_MESSAGING_SENDER_ID,
  appId: config.firebase_API_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//database
const db = firebase.firestore();

// enabling google auth

// storage if you want to store files
const storage = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { storage, timestamp, firebase, db };
