import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "email-auth-react.firebaseapp.com",
  projectId: "email-auth-react",
  storageBucket: "email-auth-react.appspot.com",
  messagingSenderId: "465163785068",
  appId: "1:465163785068:web:67bfe0ca53705d6784d949"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);

