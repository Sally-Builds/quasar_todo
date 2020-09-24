import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/database"

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAV2E-piptzuvvwAZVBG3qFHzz9mWA1eeE",
    authDomain: "awesome-todo-836c7.firebaseapp.com",
    databaseURL: "https://awesome-todo-836c7.firebaseio.com",
    projectId: "awesome-todo-836c7",
    storageBucket: "awesome-todo-836c7.appspot.com",
    messagingSenderId: "1066627749760",
    appId: "1:1066627749760:web:666ea850185b553edb9365",
    measurementId: "G-G6759PYZXS"
  };
  // Initialize Firebase
  let firebaseApp = firebase.initializeApp(firebaseConfig);
  let firebaseAuth = firebaseApp.auth()
  let firebaseDb = firebaseApp.database()

  export {firebaseAuth, firebaseDb}
  // firebase.analytics();