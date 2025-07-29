import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBBVNUAy0jwECUukyM8o2NuTfVldk2sKNU",
  authDomain: "solmail-b0fe6.firebaseapp.com",
  projectId: "solmail-b0fe6",
  storageBucket: "solmail-b0fe6.firebasestorage.app",
  messagingSenderId: "876765604345",
  appId: "1:876765604345:web:8a91d17c04ed995b6af528",
  measurementId: "G-0X49VLGKBP",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
