import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOmOdDQwjJqF60l1CRyS_Oveu11vSaH3o",
    authDomain: "react-firebase-b7ad8.firebaseapp.com",
    projectId: "react-firebase-b7ad8",
    storageBucket: "react-firebase-b7ad8.appspot.com",
    messagingSenderId: "18729156491",
    appId: "1:18729156491:web:bf46f81c1f2442d859b98e"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase};