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
const btn = document.querySelector("button");

form.onsubmit = e => {
  e.preventDefault();
  btn.setAttribute('disabled', true);
  createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then(credentials => {
    set(ref(db, 'usuarios/' + credentials.user.uid), {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    });
    console.log(credentials);
    btn.removeAttribute('disabled');
    alert('Cadastro realizado com sucesso!');
    window.location.href = '/src/pages/login.html';
  }).catch(error => {
    alert("Não foi posssível fazer o cadastro.");
    console.log(error.code);
    console.log(error.message);
    btn.removeAttribute('disabled');
});
}