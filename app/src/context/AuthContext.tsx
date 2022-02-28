import React, { useContext } from 'react';

type Props = {
    children: JSX.Element;
}

export type AuthCredentials = {
    login: string;
    session: string;
    expiresAt: Date;
}

export const AuthCredentialsContext = React.createContext<AuthCredentials | null>(null);

export default function AuthContext(props: Props) {
    return (
        <AuthCredentialsContext.Provider value={{
            login: "joelc",
            session: "sessid",
            expiresAt: new Date(),
        }}>
            {props.children}
        </AuthCredentialsContext.Provider>
    )
}