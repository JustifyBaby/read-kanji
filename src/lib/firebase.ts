import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: String(process.env.NEXT_PUBLIC_API_KEY),
  authDomain: String(process.env.NEXT_PUBLIC_AUTH_DOMAIN),
  projectId: String(process.env.NEXT_PUBLIC_PROJECT_URL),
  storageBucket: String(process.env.NEXT_PUBLIC_STORAGE),
  messagingSenderId: String(process.env.NEXT_PUBLIC_MSG_SENDER_ID),
  appId: String(process.env.NEXT_PUBLIC_APP_ID),
  measurementId: String(process.env.NEXT_PUBLIC_MEASURE_ID),
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
