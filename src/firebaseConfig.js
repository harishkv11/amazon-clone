import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcz26NcIS1uhluSEMeHth7mJXU-RA34rI",
  authDomain: "clone-v1-78728.firebaseapp.com",
  projectId: "clone-v1-78728",
  storageBucket: "clone-v1-78728.appspot.com",
  messagingSenderId: "245959121625",
  appId: "1:245959121625:web:441570ce2caaecc3267cc8",
  measurementId: "G-39Y7QG1FQ4"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };