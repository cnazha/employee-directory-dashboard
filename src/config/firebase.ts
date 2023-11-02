import {FIREBASE_API} from "@/config-global";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "@firebase/storage";
import {getApps, initializeApp} from "firebase/app";


export let firebaseApp = getApps().length <= 0 ? initializeApp(FIREBASE_API) : getApps()[0];



export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const storage = getStorage(firebaseApp);
