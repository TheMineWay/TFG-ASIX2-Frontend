import { useState } from 'react';
import request from '../../services/api/Request';
import { processRawUserModel, RawUserModel } from '../../services/auth/User.model';
import { UserEditFormValues } from '../../view/profile/editor/ProfileEditorForm';
import useAuthState from '../auth/useAuthState';
import useUserState from './useUserState'

export default function useUserProfile() {
    const [ userState, setUserState ] = useUserState();
    const [ authState ] = useAuthState();

    const [ loading, setLoading ] = useState<boolean>(false);

    async function update(user: UserEditFormValues) {
        setLoading(true);
        try {
            const result = await request<{
                user: RawUserModel
            }>('post', '/actions/me/updateUser', user, { authCredentials: authState });
            setUserState(processRawUserModel(result.user));
            setLoading(false);
        } catch(e: any) {
            setLoading(false);
            throw e;
        }
    }

    return {
        loading,
        userState,
        update,
    };
}