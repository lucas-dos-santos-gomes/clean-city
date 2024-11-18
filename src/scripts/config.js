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
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
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

function signout() {
  sessionStorage.removeItem('user-info');
  sessionStorage.removeItem('user-creds');
  signOut(auth);
}

function verifyUser(exit) {
  onAuthStateChanged(auth, user => {
    if(user) {
      console.log('Usuário autenticado:', user);
    } else {
      signout();
      if(exit) location.pathname = '/src/pages/login.html';
    }
  });
}

const authError = (messageError, isLogin) => {
  console.error(messageError);
  if(messageError.includes('(auth/invalid-credential)')) {
    return 'A credencial de autenticação fornecida está incorreta, malformada ou expirou.';
  } else if(messageError.includes('(auth/too-many-requests)')) {
    return 'O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou tentar novamente mais tarde.';
  } else if(messageError.includes('(auth/invalid-email')) {
    return 'O endereço de e-mail está mal formatado.';
  } else if(messageError.includes('(auth/email-already-in-use)')) {
    return 'Esse endereço de E-mail já está cadastrado.';
  } else if(messageError.includes('(auth/popup-closed-by-user)')) {
    return 'Você fechou o pop-up antes de finalizar a operação.';
  } else if(messageError.includes('(auth/weak-password)')) {
    return 'A senha precisa ter, no mínimo, 6 caracteres.';
  } else if(isLogin) {
    return 'Houve um erro na autenticação.';
  } else {
    return 'Houve um problema na criação da conta. Tente novamente.';
  };
}

export {
  // Database
  db,
  dbref,
  set,
  get,
  ref,
  child,
  push,
  onChildAdded,

  // Auth
  auth,
  signout,
  verifyUser,
  authError,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
};