'use client';

import {createContext, useCallback, useEffect, useMemo, useReducer} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut,} from 'firebase/auth';
import {doc, getDoc} from 'firebase/firestore';
import {AUTH, DB} from "@/lib/firebase";

export const AuthContext = createContext({} as FirebaseContextType);
enum Types {
    INITIAL = 'INITIAL',
}

export type ActionMapType<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
        ? {
            type: Key;
        }
        : {
            type: Key;
            payload: M[Key];
        };
};

export type AuthUserType = null | Record<string, any>;

export type AuthStateType = {
    status?: string;
    loading: boolean;
    user: AuthUserType;
};

export type FirebaseContextType =  {
    user: AuthUserType;
    method: string;
    loading: boolean;
    authenticated: boolean;
    unauthenticated: boolean;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
};


type Payload = {
    [Types.INITIAL]: {
        user: AuthUserType;
    };
};

type Action = ActionMapType<Payload>[keyof ActionMapType<Payload>];

const initialState: AuthStateType = {
    user: null,
    loading: true,
};

const reducer = (state: AuthStateType, action: Action) => {
    if (action.type === Types.INITIAL) {
        return {
            loading: false,
            user: action.payload.user,
        };
    }
    return state;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    console.log(state);
    const initialize = useCallback(() => {
        try {
            onAuthStateChanged(AUTH, async (user) => {
                if (user) {
                    if (user) {
                        const userProfile = doc(DB, 'users', user.uid);

                        const docSnap = await getDoc(userProfile);

                        const profile = docSnap.data();

                        dispatch({
                            type: Types.INITIAL,
                            payload: {
                                user: {
                                    ...user,
                                    ...profile,
                                    id: user.uid,
                                    role: 'admin',
                                },
                            },
                        });
                    } else {
                        dispatch({
                            type: Types.INITIAL,
                            payload: {
                                user: null,
                            },
                        });
                    }
                } else {
                    dispatch({
                        type: Types.INITIAL,
                        payload: {
                            user: null,
                        },
                    });
                }
            });
        } catch (error) {
            console.error(error);
            dispatch({
                type: Types.INITIAL,
                payload: {
                    user: null,
                },
            });
        }
    }, []);

    useEffect(() => {
        initialize();
    }, [initialize]);

    const login = useCallback(async (email: string, password: string) => {
        await signInWithEmailAndPassword(AUTH, email, password);
    }, []);

    const logout = useCallback(async () => {
        await signOut(AUTH);
    }, []);

    const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

    const status = state.loading ? 'loading' : checkAuthenticated;

    const memoizedValue = useMemo(
        () => ({
            user: state.user,
            method: 'firebase',
            loading: status === 'loading',
            authenticated: status === 'authenticated',
            unauthenticated: status === 'unauthenticated',
            login,
            logout,
        }),
        [
            status,
            state.user,
            login,
            logout,
        ]
    );

    return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}


