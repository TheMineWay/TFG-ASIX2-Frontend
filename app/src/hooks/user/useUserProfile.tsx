import React, { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import { UserModel } from '../../services/auth/User.model';
import { UserEditFormValues } from '../../view/profile/editor/ProfileEditorForm';
import useAuthState from '../auth/useAuthState';
import useUserState from './useUserState'

export default function useUserProfile() {
    const [ userState, setUserState ] = useUserState();
    const [ authState ] = useAuthState();

    const [ loading, setLoading ] = useState<boolean>(false);

    async function update(user: UserEditFormValues) {
        setLoading(true);
        const result = await request<{
            user: UserModel
        }>('post', '/actions/me/updateUser', user, { authCredentials: authState });
        setUserState(result.user);
        setLoading(false);
    }

    return {
        loading,
        userState,
        update,
    };
}