import {AuthContext} from "@/context/firebaseAuth.context";
import {useContext} from "react";

export const useFirebaseAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('Auth provider not found');

    return context;
};
