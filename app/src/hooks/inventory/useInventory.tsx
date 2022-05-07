import React, { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';

export type RawInventoryItem = {
    id: string;
    name: string;
    description: string;
    discount: string;
    price: string;
    stock: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    isDrive: '1' | '0';
}

export type InventoryItem = {
    id: string;
    name: string;
    description: string;
    discount: number;
    price: number;
    stock: number;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    imageUrl: string;
    isDrive: boolean;
}

export function processRawInventoryItem(raw: RawInventoryItem): InventoryItem {
    return {
        ...raw,
        discount: parseFloat(raw.discount),
        price: parseFloat(raw.price),
        stock: parseInt(raw.stock),
        isDrive: raw.isDrive === '1',
    };
}

export type UseInventory = {
    fetch: () => Promise<void>;
    loading: boolean;
    inventory?: InventoryItem[];
    resolveInventoryItemById: (id: string) => InventoryItem | string;
}

export default function useInventory(): UseInventory {
    const [inventory, setInventory] = useState<InventoryItem[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(): Promise<void> {
        setLoading(true);
        try {
            const result = await request<{inventory: RawInventoryItem[]}>('post', '/actions/inventory/inventoryList', {}, { authCredentials: authState });
            setInventory(result.inventory.map(processRawInventoryItem));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    function resolveInventoryItemById(id: string): InventoryItem | string {
        return inventory?.find((i) => i.id === id) ?? id;
    }

    return {
        loading,
        inventory,
        fetch,
        resolveInventoryItemById,
    };
}