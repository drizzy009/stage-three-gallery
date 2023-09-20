import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg_7U7-RZg0CWceRakSHX8D40LPlkySIM",
  authDomain: "hng-gallery-9e210.firebaseapp.com",
  projectId: "hng-gallery-9e210",
  storageBucket: "hng-gallery-9e210.appspot.com",
  messagingSenderId: "731292470029",
  appId: "1:731292470029:web:c09dee1a6ebde7e5927e44",
  measurementId: "G-TYYY1V32M6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);