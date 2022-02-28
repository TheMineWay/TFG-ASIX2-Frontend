import React, { useContext } from 'react';
import { UserModel } from '../services/auth/User.model';

type Props = {
    children: JSX.Element;
}

export type AuthCredentials = {
    session: string;
    expiresAt: Date;
}

export type AuthContext = {
    credentials: AuthCredentials;
    user: UserModel;
}

export const AuthCredentialsContext = React.createContext<AuthContext | null>(null);

export default function AuthContext(props: Props) {
    return (
        <AuthCredentialsContext.Provider value={{
            credentials: {
                session: "sessid",
                expiresAt: new Date(),
            },
            user: {
                name: "Joel",
                lastname: "Campos",
                login: "jcampos",
            },
        }}>
            {props.children}
        </AuthCredentialsContext.Provider>
    )
}