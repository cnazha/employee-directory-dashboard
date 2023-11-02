import {LoadingScreen} from "@/components/loading/loadingScreen";
import {AuthContext} from "./firebaseAuth.context";
import React from "react";

type Props = {
    children: React.ReactNode;
};

export const AuthConsumer = ({ children }: Props) => {
    return (
        <AuthContext.Consumer>
            {(auth) => (auth.loading ? <LoadingScreen/> : children)}
        </AuthContext.Consumer>
    );
}
