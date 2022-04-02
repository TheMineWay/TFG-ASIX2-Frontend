import { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import { processRawUserModel, RawUserModel, UserModel } from '../../services/auth/User.model'
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

export type UserAdmin = {
    userList: {
        loading: boolean;
        list?: UserModel[];
        fetch: () => Promise<void>;
    }
}

export default function useUserAdmin(): UserAdmin {
    const [ authState ] = useAuthState();

    const [ userList, setUserList ] = useState<UserModel[]>();
    const [ userListLoading, setUserListLoading ] = useState<boolean>(false);

    useEffect(() => {
        fetchUserList();
    }, []);

    async function fetchUserList(): Promise<void> {
        setUserListLoading(true);
        try {
            const result = await request<{users: RawUserModel[]}>('post', '/actions/admin/users/usersList', {}, { authCredentials: authState });
            setUserList(result.users.map(processRawUserModel));
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setUserListLoading(false);
    }

    return {
        userList: {
            loading: userListLoading,
            list: userList,
            fetch: fetchUserList,
        },
    };
}