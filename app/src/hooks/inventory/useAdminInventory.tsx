import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';
import useInventory from './useInventory';

export default function useAdminInventory() {
    const inventory = useInventory();
    const [authState] = useAuthState();

    async function deleteItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/deleteItem', {itemId: id}, {authCredentials: authState});

            await inventory.fetch();
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function recoverItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/recoverItem', {itemId: id}, {authCredentials: authState});

            await inventory.fetch();
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
    }

    return {
        inventory,
        deleteItem,
        recoverItem,
    }
}
