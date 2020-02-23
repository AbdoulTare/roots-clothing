import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBBmVWgCC2rlNfiQ6g92ajpycDWH4Yw79E",
    authDomain: "roots-db.firebaseapp.com",
    databaseURL: "https://roots-db.firebaseio.com",
    projectId: "roots-db",
    storageBucket: "roots-db.appspot.com",
    messagingSenderId: "968014073890",
    appId: "1:968014073890:web:efd8db85cc49b94b86ba7b",
    measurementId: "G-LF1ZKZBFJM"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;