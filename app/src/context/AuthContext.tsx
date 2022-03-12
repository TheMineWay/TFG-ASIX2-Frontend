import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
    const [cookies, setCookie, removeCookie] = useCookies();

    const [ authState, setAuthState ] = useState<AuthCredentials>();

    useEffect(() => {
        if(cookies.authCredentials) {
            const authCredentials: AuthCredentials = cookies.authCredentials;
            if(moment(authCredentials.expiresAt).isSameOrBefore(new Date())) {
                removeCookie('authCredentials');
            } else {
                setAuthState(authCredentials);
            }
        }
    }, []);

    return (
        <AuthCredentialsContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthCredentialsContext.Provider>
    )
}