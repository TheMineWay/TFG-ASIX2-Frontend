import React, { useEffect, useState } from 'react';
import request from '../../services/api/Request';
import { UserModel } from '../../services/auth/User.model';
import useAuthState from '../auth/useAuthState';

export default function useUserState() {
    const [state, setState] = useState<UserModel>();
    const [auth] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(): Promise<void> {
        const result = await request<UserModel>('post', '/me/user', {}, { authCredentials: auth });

        setState(result);
    }

    return {
        data: state,
        fetch,
    };
}