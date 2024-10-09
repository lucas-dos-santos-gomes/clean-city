import { setLoading, resetLoading } from "./loading.js";
import {
  db,
  set,
  ref,
  auth,
  authError,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "./config.js";

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const submitButton = document.querySelector("button");

form.onsubmit = signup;

function signup(submit) {
  submit.preventDefault();
  setLoading();
  turnInputs(true);

  createUserWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value).then(async credentials => {
    await set(ref(db, 'users/' + credentials.user.uid), {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
      admin: false,
    });
    await updateProfile(auth.currentUser, { displayName: nameInput.value.trim() });
    signOut(auth);

    turnInputs();
    alert('Cadastro realizado com sucesso!');
    resetLoading();
    window.location.href = '/src/pages/login.html';
  }).catch(error => {
    alert(authError(error.message));
    console.log(error);
    turnInputs();
    resetLoading();
  });
}

function turnInputs(disabled) {
  if(disabled) {
    nameInput.setAttribute('disabled', true);
    emailInput.setAttribute('disabled', true);
    passwordInput.setAttribute('disabled', true);
    confirmPasswordInput.setAttribute('disabled', true);
    submitButton.setAttribute('disabled', true);
    return;
  }

  nameInput.removeAttribute('disabled');
  emailInput.removeAttribute('disabled');
  passwordInput.removeAttribute('disabled');
  confirmPasswordInput.removeAttribute('disabled');
  submitButton.removeAttribute('disabled');
}