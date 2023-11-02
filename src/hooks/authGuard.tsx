import {useCallback, useEffect, useState} from "react";
import {useFirebaseAuthContext} from "@/context/useFirebaseAuth.context";
import {useRouter} from "next/navigation";


type Props = {
    children: React.ReactNode;
};

const  AuthGuard = ({ children }: Props) => {
    const router = useRouter();

    const { authenticated, method } = useFirebaseAuthContext();

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (!authenticated) {
            const loginPath = '/';
            router.replace(loginPath);
        } else {
            setChecked(true);
        }
    }, [authenticated, method, router]);

    useEffect(() => {
        check();
    }, []);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}

export default AuthGuard;
