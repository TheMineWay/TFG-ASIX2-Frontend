import { useState } from 'react';
import AuthContext, { AuthData } from './AuthContext';
import UserContext from './UserContext';

type Props = {
    children: JSX.Element;
}

export default function GlobalContext(props: Props) {
    return (
        <AuthContext>
            <UserContext>
                {props.children}
            </UserContext>
        </AuthContext>
    )
}