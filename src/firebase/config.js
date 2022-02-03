import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env['REACT_APP_API-KEY'],
  authDomain: process.env['REACT_APP_AUTH-DOMAIN'],
  projectId: process.env['REACT_APP_PROJECT-ID'],
  storageBucket: process.env['REACT_APP_STORAGE-BUCKET'],
  messagingSenderId: process.env['REACT_APP_MESSAGING-SENDER-ID'],
  appId: process.env['REACT_APP_APP-ID'],
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };
