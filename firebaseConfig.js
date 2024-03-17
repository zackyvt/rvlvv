import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAz7nq4W68GA9NxYzie95wGVu408dLAXhA",
  authDomain: "rvlvv-ia.firebaseapp.com",
  databaseURL: "https://rvlvv-ia-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rvlvv-ia",
  storageBucket: "rvlvv-ia.appspot.com",
  messagingSenderId: "516717655656",
  appId: "1:516717655656:web:eb52345664cb6a025b6ddd"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
