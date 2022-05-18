import { Permissions } from "../../services/security/permissions";
import useAuthState from "../auth/useAuthState";
import usePermissions from "./usePermissions";
import useRoles from "./useRoles";

export default function useAdminRoles() {

    const { permissions, convertByPermissionId } = usePermissions();
    const { roles } = useRoles();

    const [authState] = useAuthState();

    function permissionsByRole(role: string): Permissions[] {
        const r = roles?.find((ro) => ro.id === role);
        if(!r) return [];

        return r.permissions.map(convertByPermissionId);
    }

    return {
        permissionsByRole,
        roles,
        permissions,
    }
}