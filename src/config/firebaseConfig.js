// import * as firebase from "firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

import config from "./config";

// replace these values with your own!
export const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  databaseURL: config.databaseURL,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
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
