import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAqy-sibNb-0oyKfHBy6TCENYprdiRyv_k",
  authDomain: "bdappbacarin.firebaseapp.com",
  databaseURL: "https://bdappbacarin-default-rtdb.firebaseio.com",
  projectId: "bdappbacarin",
};

// Registrando o APP e iniciando a conexão
  if (!firebase.apps.lenght) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;