import { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

type RawRole = {
    id: string;
    name: string;
    permissions: string[];
}

export type Role = {
    id: string;
    name: string;
    permissions: string[];
}

export function processRawRole(raw: RawRole): Role {
    return raw;
}

export default function useRoles() {

    const [loading, setLoading] = useState<boolean>(false);
    const [roles, setRoles] = useState<Role[]>();

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setLoading(true);
        try {
            const result = await request<{roles: RawRole[]}>('post', '/actions/admin/roles/get', {}, { authCredentials: authState });
            setRoles(result.roles.map(processRawRole));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        loading,
        roles,
    };
}