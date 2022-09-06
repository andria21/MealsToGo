import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB2NCzvzpgLencMgTauZ895T1n26IBTqco",
  authDomain: "mealstogofast.firebaseapp.com",
  projectId: "mealstogofast",
  storageBucket: "mealstogofast.appspot.com",
  messagingSenderId: "209995383185",
  appId: "1:209995383185:web:144faa19bb2cf0e4ecda30"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };