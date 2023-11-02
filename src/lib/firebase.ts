// config
import {FIREBASE_API} from 'src/config-global';
// @ts-ignore
import {getStorage} from "@firebase/storage";
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
