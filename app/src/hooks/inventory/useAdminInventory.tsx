import { useEffect, useState } from 'react';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';
import { InventoryItem, processRawInventoryItem, RawInventoryItem } from './useInventory';

export type CreateInventoryItem = {
    name: string;
    description: string;
    discount: number;
    price: number;
    stock: number;
    isDrive: boolean;
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
    const [authState] = useAuthState();
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch();
    }, []);

    async function deleteItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/deleteItem', { itemId: id }, { authCredentials: authState });
            await fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function recoverItem(id: string) {
        try {
            await request<{}>('post', '/actions/admin/inventory/recoverItem', { itemId: id }, { authCredentials: authState });
            await fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function createItem(item: CreateInventoryItem) {
        try {
            await request<{}>('post', '/actions/admin/inventory/createItem', { item }, { authCredentials: authState });
            await fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function editItem(id: string, item: CreateInventoryItem) {
        try {
            await request<{}>('post', '/actions/admin/inventory/editItem', { item, itemId: id }, { authCredentials: authState });
            await fetch();
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{inventory: RawInventoryItem[]}>('post', '/actions/admin/inventory/inventoryList', {}, { authCredentials: authState });
            setInventory(result.inventory.map(processRawInventoryItem));
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        inventory: {
            inventory,
            loading,
            fetch,
        },
        deleteItem,
        recoverItem,
        editItem,
        createItem,
        loading,
    }
}
