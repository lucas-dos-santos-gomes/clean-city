import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
  getDatabase,
  set,
  get,
  ref,
  child,
  push,
  onChildAdded,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBr3I2nh6goOryVI_I-5sE6AzRDBqU9Mh8",
  authDomain: "cleancity-f1ff3.firebaseapp.com",
  projectId: "cleancity-f1ff3",
  storageBucket: "cleancity-f1ff3.appspot.com",
  messagingSenderId: "353831965252",
  appId: "1:353831965252:web:1dcb6771c22eb95e836211"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

export {
  db,
  set,
  get,
  ref,
  child,
  push,
  onChildAdded,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  auth,
  dbref,
  signOut,
};