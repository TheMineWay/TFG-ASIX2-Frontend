import React, { useEffect, useState } from 'react';
import useAuthState from '../hooks/auth/useAuthState';
import request from '../services/api/Request';
import { UserModel } from '../services/auth/User.model';
import { Permissions } from '../services/security/permissions';

type Props = {
    children: JSX.Element;
}

export const UserDataContext = React.createContext<[UserModel | undefined, (context: UserModel) => void] | null>(null);

export default function UserContext(props: Props) {
    const [authState] = useAuthState();
    const [userState, setUserState] = useState<UserModel>();

    useEffect(() => {
        if(authState) fetch();
    }, [authState]);

    async function fetch() {
        if(authState) {
            const data = await request<{user: UserModel, permissions: Permissions[], roles: string[]}>('post', '/actions/me/user', {}, { authCredentials: authState });
            setUserState(data.user);
        }
    }

    return (
        <UserDataContext.Provider value={[userState, setUserState]}>
            {props.children}
        </UserDataContext.Provider>
    )
}