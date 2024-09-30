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

form.onsubmit = e => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value).then(credentials => {
    get(child(dbref, 'usuarios/' + credentials.user.uid)).then(snapshot => {
      if(snapshot.exists) {
        sessionStorage.setItem('user-info', JSON.stringify({
          name: snapshot.val().name,
        }));
        sessionStorage.setItem('user-creds', JSON.stringify(credentials.user));
        window.location.href = '/src/pages/report.html';
      }
    });
    console.log(credentials);
  }).catch(error => {
    alert("Não foi posssível fazer o login.");
    console.log(error.code);
    console.log(error.message);
  });
}