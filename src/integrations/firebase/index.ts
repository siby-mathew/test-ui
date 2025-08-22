import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYITakAirGzZIsQtrva0ZJdAYfhQFwn_M",
  authDomain: "solmail-280c6.firebaseapp.com",
  projectId: "solmail-280c6",
  storageBucket: "solmail-280c6.firebasestorage.app",
  messagingSenderId: "293819852954",
  appId: "1:293819852954:web:5bd60925509765e7391723",
  measurementId: "G-D0CKNMWCBG",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
