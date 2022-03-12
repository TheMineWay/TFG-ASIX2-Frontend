import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
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

export const AuthCredentialsContext = React.createContext<[AuthCredentials | undefined, (context: AuthCredentials) => void] | null>(null);

export default function AuthContext(props: Props) {
    const [cookies] = useCookies();

    const [ authState, setAuthState ] = useState<AuthCredentials | undefined>(cookies.authCredentials ?? undefined);

    return (
        <AuthCredentialsContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthCredentialsContext.Provider>
    )
}