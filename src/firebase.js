import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbGySBLCGgdtd1uqSabwi2QSuPkSGJ1vs",
  authDomain: "quick-ai-e6c71.firebaseapp.com",
  projectId: "quick-ai-e6c71",
  storageBucket: "quick-ai-e6c71.firebasestorage.app",
  messagingSenderId: "885491555158",
  appId: "1:885491555158:web:2e3ad78f398a9b20af94f7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export default app;