import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyAG4WYia-uUUI8rxkRNxCrObvYVDKSmQcI",
    authDomain: "proyecto-prueba-a7207.firebaseapp.com",
    projectId: "proyecto-prueba-a7207",
    storageBucket: "proyecto-prueba-a7207.appspot.com",
    messagingSenderId: "1096866316714",
    appId: "1:1096866316714:web:46edec968bf1686de6abd3"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore()

