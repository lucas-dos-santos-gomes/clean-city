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

const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const locationInput = document.querySelector('.location-input');
const descriptionInput = document.querySelector('.description-input');

window.onload = () => {
  nameInput.value = JSON.parse(sessionStorage.getItem('user-info')).name;
  emailInput.value = JSON.parse(sessionStorage.getItem('user-info')).email;
  nameInput.setAttribute('disabled', true);
  emailInput.setAttribute('disabled', true);
}

const form = document.querySelector('form');

form.onsubmit = e => {
  e.preventDefault();
  const uid = JSON.parse(sessionStorage.getItem('user-creds')).uid;

  const now = new Date();
  const nowInSaoPaulo = new Date(now.toLocaleString('pt-BR', 'America/Sao_Paulo'));
  const formattedDate = nowInSaoPaulo.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  set(ref(db, `users/${uid}/reports/${gerarIdAleatorio()}`), {
    location: locationInput.value.trim(),
    description: descriptionInput.value.trim(),
    date: formattedDate,
  }).then(() => {
    alert('Denuncia feita com sucesso!'); 
    window.location.href = '/src/pages/report.html';
  }).catch(() => alert('Erro ao fazer a denúncia. Tente novamente!'));
}

function gerarIdAleatorio() {
  var caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var idAleatorio = "";
  for (var i = 0; i < 20; i++) {
    idAleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return idAleatorio;
}