import Firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyCSxVeuyEYbdQD_XJGfqLM24dEO8l1LYHw",
  authDomain: "art-matching-debug.firebaseapp.com",
  databaseURL: "https://art-matching-debug.firebaseio.com",
  projectId: "art-matching-debug",
  storageBucket: "art-matching-debug.appspot.com",
  messagingSenderId: "186203445784",
  appId: "1:186203445784:web:f62430ff38cee39cb8c16d"
};

const firebaseApp = Firebase.initializeApp(config, 'exercise-vue')
const firestore = firebaseApp.firestore()

export default firestore
