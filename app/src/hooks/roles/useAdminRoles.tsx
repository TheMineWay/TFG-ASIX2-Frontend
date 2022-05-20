import { useState } from "react";
import request from "../../services/api/Request";
import { Permissions } from "../../services/security/permissions";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";
import usePermissions, { Permission } from "./usePermissions";
import useRoles from "./useRoles";

export default function useAdminRoles() {

    const { permissions, convertByPermissionId } = usePermissions();
    const { roles } = useRoles();
    const [loadingState, setLoadingState] = useState<{ [role: string]: boolean }>({});

    function isLoading(id: string): boolean {
        return Object.keys(loadingState).includes(id) ? loadingState[id] : false;
    }

    function setLoading(id: string, loading: boolean = true) {
        const state = loadingState;

        state[id] = loading;

        setLoadingState({
            ...state,
        });
    }

    const [authState] = useAuthState();

    function permissionsByRole(role: string): Permissions[] {
        const r = roles?.find((ro) => ro.id === role);
        if (!r) return [];

        return r.permissions.map(convertByPermissionId);
    }

    async function setRolePermissions(role: string, permissions: Permission[]) {
        setLoading(role);
        try {
            await request<{}>('post', '/actions/admin/roles/setPermissions', { role, permissions: permissions.map((p) => p.id) }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(role, false);
    }

    return {
        permissionsByRole,
        roles,
        permissions,
        setRolePermissions,
    }
}