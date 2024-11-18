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

const form = document.querySelector('form');
const cep = form.querySelector('input.cep');
const address = form.querySelector('input.address');
const complement = form.querySelector('input.complement');
const description = form.querySelector('input.description');

const uid = JSON.parse(sessionStorage.getItem('user-creds')).uid;

form.onsubmit = e => {
  e.preventDefault();

  const now = new Date();
  // const nowInSaoPaulo = new Date(now.toLocaleString('pt-BR', 'America/Sao_Paulo'));
  const formattedDate = now.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  // const finalFormattedDate = formattedDate.replace(',', '').replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3');

  set(ref(db, `recyclings/${uid}`), {
    cep: cep.value.trim(),
    address: address.value.trim(),
    complement: complement.value.trim(),
    description: description.value.trim(),
    date: formattedDate,
  }).then(() => {
    alert('Pedido de reciclagem feito com sucesso!');
    window.location.reload();
  }).catch(() => alert('Erro ao pedir a reciclagem. Tente novamente!'));
}

window.onload = () => {
  get(child(dbref, 'recyclings/' + uid)).then(snapshot => {
    if(snapshot.hasChildren()) {
      alert("Você já fez um pedido de reciclagem.");
      window.location.href = '/index.html';
    }
  });
}