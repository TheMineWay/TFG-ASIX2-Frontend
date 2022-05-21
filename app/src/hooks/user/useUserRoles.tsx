import React, { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

export default function useUserRoles() {

    const [userRoles, setUserRoles] = useState<{ [user: string]: { id: string, role: string }[] }>({});
    const [loading, setLoading] = useState<boolean>(false);

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setLoading(true);
        try {
            const result = await request<{ assign: { id: string, user: string, role: string }[] }>('post', '/actions/admin/users/getUserRoles', {}, { authCredentials: authState });
            const users: { [user: string]: { id: string, role: string }[] } = {};

            for (const assign of result.assign) {
                const user = assign.user;
                users[user] = users[user] ?? [];
                users[user].push({
                    id: assign.id,
                    role: assign.role,
                });
            }

            setUserRoles(users);
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        loading,
        userRoles,
    }
}