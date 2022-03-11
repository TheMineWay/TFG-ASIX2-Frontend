import React, { useContext, useState } from 'react';
import { UserModel } from '../services/auth/User.model';

type Props = {
    children: JSX.Element;
}

export type AuthCredentials = {
    session: string;
    expiresAt: Date;
}

export type AuthData = {
    credentials: AuthCredentials;
    user: UserModel;
}

export const AuthCredentialsContext = React.createContext<[AuthData | undefined, (context: AuthData) => void] | null>(null);

export default function AuthContext(props: Props) {
    const [ authState, setAuthState ] = useState<AuthData>();

    return (
        <AuthCredentialsContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthCredentialsContext.Provider>
    )
}