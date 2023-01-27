// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore, Timestamp } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Cloud Storage and projectFirestore ans also to get a reference to the service
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = Timestamp.now();

export { projectFirestore, projectStorage, timestamp };
