import React, { useEffect, useState } from 'react';
import useAuthState from '../hooks/auth/useAuthState';
import request from '../services/api/Request';
import { UserModel } from '../services/auth/User.model';
import { Permissions } from '../services/security/permissions';

type Props = {
    children: JSX.Element;
}

type SecurityContextModel = {
    permissions: Permissions[];
    roles: string[];
}

export const SecurityDataContext = React.createContext<[SecurityContextModel | null, (context: SecurityContextModel) => void] | null>(null);
export const UserDataContext = React.createContext<[UserModel | undefined, (context: UserModel) => void] | null>(null);

export default function UserContext(props: Props) {
    const [authState] = useAuthState();
    const [userState, setUserState] = useState<UserModel>();
    const [securityState, setSecurityState] = useState<SecurityContextModel | null>(null);

    useEffect(() => {
        if (authState) fetch();
    }, [authState]);

    async function fetch() {
        if (authState) {
            const data = await request<{ user: UserModel, permissions: Permissions[], roles: string[] }>('post', '/actions/me/user', {}, { authCredentials: authState });
            setUserState(data.user);
            setSecurityState({
                permissions: data.permissions,
                roles: data.roles,
            });
        }
    }

    return (
        <UserDataContext.Provider value={[userState, setUserState]}>
            <SecurityDataContext.Provider value={[securityState, setSecurityState]}>
                {props.children}
            </SecurityDataContext.Provider>
        </UserDataContext.Provider>
    )
}