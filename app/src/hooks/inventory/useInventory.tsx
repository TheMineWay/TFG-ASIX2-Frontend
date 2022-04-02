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
}

export function processRawInventoryItem(raw: RawInventoryItem): InventoryItem {
    return {
        ...raw,
        discount: parseFloat(raw.discount),
        price: parseFloat(raw.price),
        stock: parseInt(raw.stock),
    };
}

export default function useInventory() {
    const [inventory, setInventory] = useState<InventoryItem[]>();
    const [loading, setLoading] = useState<boolean>(false);

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(): Promise<void> {
        setLoading(true);
        try {
            const result = await request<{inventory: RawInventoryItem[]}>('post', '/actions/admin/inventory/inventoryList', {}, { authCredentials: authState });
            setInventory(result.inventory.map(processRawInventoryItem));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        loading,
        inventory,
        fetch,
    };
}