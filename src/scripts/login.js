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
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const btn = document.querySelector("button");

form.onsubmit = e => {
  e.preventDefault();
  btn.setAttribute('disabled', true);
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then(credentials => {
    get(child(dbref, 'users/' + credentials.user.uid)).then(snapshot => {
      if(snapshot.exists) {
        sessionStorage.setItem('user-info', JSON.stringify({
          name: snapshot.val().name,
          email: snapshot.val().email,
          admin: snapshot.val().admin,
        }));
        sessionStorage.setItem('user-creds', JSON.stringify(credentials.user));
      }
    });
    btn.removeAttribute('disabled');
    console.log(credentials);
    alert('Login feito com sucesso!');
    window.location.href = '/src/pages/report.html';
  }).catch(error => {
    btn.removeAttribute('disabled');
    alert("Não foi posssível fazer o login.");
    console.log(error);
    console.log(error.message);
  });
}