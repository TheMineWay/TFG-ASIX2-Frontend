import { useEffect, useState } from 'react'
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import useAuthState from '../auth/useAuthState';
import { InventoryItem, processRawInventoryItem, RawInventoryItem } from './useInventory'

export default function useInventoryResolver(id: string) {

    const [authState] = useAuthState();

    const [item, setItem] = useState<InventoryItem>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{item: RawInventoryItem}>('post', '/actions/inventory/getItem', { id }, { authCredentials: authState });
            setItem(processRawInventoryItem(result.item));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        item,
        fetch,
        loading,
    }
}