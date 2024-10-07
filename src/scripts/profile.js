import {
  get,
  child,
  dbref,
} from "./config.js";

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const uid = JSON.parse(sessionStorage.getItem('user-creds')).uid;

nameInput.value = JSON.parse(sessionStorage.getItem('user-info')).name;
emailInput.value = JSON.parse(sessionStorage.getItem('user-info')).email;

get(child(dbref, 'users/' + uid + '/reports')).then(snapshot => {
  if(snapshot.exists && snapshot.hasChildren()) {
    console.log(snapshot.val());
  } else if(snapshot.exists) {
    console.log('Você ainda não fez nenhuma denúncia.');
  }
});

const logoutButton = document.querySelector('.logout');

function logout() {
  sessionStorage.removeItem('user-info');
  sessionStorage.removeItem('user-creds');
  window.location.href = '/src/pages/login.html';
}

logoutButton.onclick = logout;