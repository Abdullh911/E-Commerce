import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Make sure to pass `app`
export const db = getFirestore(app);
export default app;
