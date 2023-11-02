import {FIREBASE_API} from "@/config-global";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "@firebase/storage";
import {initializeApp} from "firebase/app";

export const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
