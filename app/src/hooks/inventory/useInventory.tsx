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
}

export type InventoryItem = {
    id: string;
    name: string;
    description: string;
    discount: number;
    price: number;
    stock: number;
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
    const [inventory, setInventory] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(): Promise<void> {
        setLoading(true);
        try {
            const result = await request<{inventory: RawInventoryItem}>('post', '/actions/inventory/inventoryList', {}, { authCredentials: authState });
            setInventory(processRawInventoryItem(result.inventory));
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