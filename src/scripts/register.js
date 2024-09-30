import {
  db,
  set,
  get,
  ref,
  child,
  push,
  onChildAdded,
  createUserWithEmailAndPassword,
  auth,
  dbref,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "./config.js";

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

form.onsubmit = e => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then(credentials => {
    set(ref(db, 'usuarios/' + credentials.user.uid), {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    });
    console.log(credentials);
    window.location.href = '/src/pages/login.html';
  }).catch(error => {
    alert("Não foi posssível fazer o cadastro.");
    console.log(error.code);
    console.log(error.message);
  });
}