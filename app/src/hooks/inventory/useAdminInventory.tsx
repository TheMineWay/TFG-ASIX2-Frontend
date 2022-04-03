import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';
import useInventory, { InventoryItem } from './useInventory';

export type CreateInventoryItem = {
    name: string;
    description: string;
    discount: number;
    price: number;
    stock: number;
}

export type AdminInventory = {
    inventory: {
        inventory?: InventoryItem[];
        loading: boolean;
        fetch: () => Promise<void>;
    };
    loading: boolean;
    deleteItem: (id: string) => Promise<void>;
    recoverItem: (id: string) => Promise<void>;
    editItem: (id: string, item: InventoryItem) => Promise<void>;
    createItem: (item: CreateInventoryItem) => Promise<void>;
}

export default function useAdminInventory(): AdminInventory {
    const inventory = useInventory();
    const [authState] = useAuthState();

    async function deleteItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/deleteItem', { itemId: id }, { authCredentials: authState });
            await inventory.fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function recoverItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/recoverItem', { itemId: id }, { authCredentials: authState });
            await inventory.fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function createItem(item: CreateInventoryItem) {
        try {
            await request<{}>('post', '/actions/admin/inventory/createItem', { item }, { authCredentials: authState });
            await inventory.fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function editItem(id: string, item: CreateInventoryItem) {
        try {
            await request<{}>('post', '/actions/admin/inventory/editItem', { item, itemId: id }, { authCredentials: authState });
            await inventory.fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    return {
        inventory,
        deleteItem,
        recoverItem,
        editItem,
        createItem,
        loading: inventory.loading,
    }
}
