import { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import { Permissions } from '../../services/security/permissions';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

type RawPermission = {
    id: string;
    name: string;
}

export type Permission = {
    id: string;
    name: string;
}

export function processRawPermission(raw: RawPermission): Permission {
    return raw;
}

export default function usePermissions() {

    const [loading, setLoading] = useState<boolean>(false);
    const [permissions, setPermissions] = useState<Permission[]>();

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    function convertByPermissionId(id: string): Permissions {
        return permissions!.find((p) => p.id === id)!.name as Permissions;
    }

    const fetch = async () => {
        setLoading(true);
        try {
            const result = await request<{permissions: RawPermission[]}>('post', '/actions/admin/permissions/get', {}, { authCredentials: authState });
            setPermissions(result.permissions.map(processRawPermission));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        loading,
        permissions,
        convertByPermissionId,
    };
}