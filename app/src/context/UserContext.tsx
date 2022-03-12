import React, { useEffect, useState } from 'react';
import useAuthState from '../hooks/auth/useAuthState';
import request from '../services/api/Request';
import { UserModel } from '../services/auth/User.model';

type Props = {
    children: JSX.Element;
}

export const UserDataContext = React.createContext<[UserModel | undefined, (context: UserModel) => void] | null>(null);

export default function UserContext(props: Props) {
    const [authState] = useAuthState();
    const [userState, setUserState] = useState<UserModel>();

    useEffect(() => {
        fetch();
    }, [authState]);

    async function fetch() {
        if(authState) {
            const data = await request<{user: UserModel}>('post', '/actions/me/user', {}, { authCredentials: authState });
            setUserState(data.user);
        }
    }

    return (
        <UserDataContext.Provider value={[userState, setUserState]}>
            {props.children}
        </UserDataContext.Provider>
    )
}