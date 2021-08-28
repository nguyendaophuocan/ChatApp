import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAiHAaAqxirkmlNITJqHseRlJLFdI3CcNE",
  authDomain: "slack-v2-701b3.firebaseapp.com",
  projectId: "slack-v2-701b3",
  storageBucket: "slack-v2-701b3.appspot.com",
  messagingSenderId: "700923658638",
  appId: "1:700923658638:web:4988eb271b7e3958afe4df",
  measurementId: "G-H7J695EXMS",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const ggProvider = new firebase.auth.GoogleAuthProvider();
export { auth, ggProvider, db };
