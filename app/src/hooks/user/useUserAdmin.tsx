import moment from 'moment';
import { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import { processRawUserModel, RawUserModel, UserModel } from '../../services/auth/User.model'
import { AdminUserEditValues } from '../../view/adminUsers/userEditor/AdminUserProfileEditorForm';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

export type UserAdmin = {
    userList: {
        loading: boolean;
        list?: UserModel[];
        fetch: () => Promise<void>;
    },
    loading: boolean,
    deleteUser: (id: string) => Promise<void>;
    recoverUser: (id: string) => Promise<void>;
    updateUser: (id: string, values: AdminUserEditValues) => Promise<void>;
    banUser: (id: string) => Promise<void>;
    unbanUser: (id: string) => Promise<void>;
}

export default function useUserAdmin(): UserAdmin {
    const [authState] = useAuthState();

    const [userList, setUserList] = useState<UserModel[]>();
    const [userListLoading, setUserListLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchUserList();
    }, []);

    async function fetchUserList(): Promise<void> {
        setUserListLoading(true);
        try {
            const result = await request<{ users: RawUserModel[] }>('post', '/actions/admin/users/usersList', {}, { authCredentials: authState });
            setUserList(result.users.map(processRawUserModel));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setUserListLoading(false);
    }

    async function deleteUser(id: string): Promise<void> {
        await request<{}>('post', '/actions/admin/users/deleteUser', { userId: id }, { authCredentials: authState });

        await fetchUserList();
    }

    async function recoverUser(id: string): Promise<void> {
        await request<{}>('post', '/actions/admin/users/recoverUser', { userId: id }, { authCredentials: authState });

        await fetchUserList();
    }

    async function updateUser(id: string, values: AdminUserEditValues): Promise<void> {
        await request<{}>('post', '/actions/admin/users/editUser', { userId: id, values }, { authCredentials: authState });
        
        await fetchUserList();
    }

    async function banUser(id: string): Promise<void> {
        await request<{}>('post', '/actions/admin/users/banUser', { userId: id }, { authCredentials: authState });

        await fetchUserList();
    }

    async function unbanUser(id: string): Promise<void> {
        await request<{}>('post', '/actions/admin/users/unbanUser', { userId: id }, { authCredentials: authState });

        await fetchUserList();
    }

    return {
        userList: {
            loading: userListLoading,
            list: userList,
            fetch: fetchUserList,
        },
        loading: userListLoading,
        deleteUser,
        recoverUser,
        updateUser,
        banUser,
        unbanUser,
    };
}