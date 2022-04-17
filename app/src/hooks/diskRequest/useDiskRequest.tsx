import { useState } from 'react';
import r from '../../services/api/Request';
import { DiskBuilderFormValues } from '../../view/diskRequest/DiskBuilder/DiskBuilderTool';
import { DiskSendOption } from '../../view/diskRequest/DiskSend/DiskBuilderSend';
import useAuthState from '../auth/useAuthState';
import { InventoryItem } from '../inventory/useInventory';
export type DiskRequestObj = {
    disks: DiskBuilderFormValues[];
}

type Props = {
    disks: {[id: string]: DiskBuilderFormValues};
    send: DiskSendOption | undefined;
}

export default function useDiskRequest(props: Props) {

    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);

    const requestObj: DiskRequestObj = {
        disks: Object.entries(props.disks).map((d) => d[1]),
    }

    const request = async (): Promise<void> => {
        try {
            setLoading(true);
            await r<{}>('post', '/actions/diskRequests/request', { request: requestObj }, { authCredentials: authState });
            setLoading(false);
        } catch (e: any) {
            setLoading(false);
            throw e;
        }
    }

    return {
        request,
        requestObj,
        loading,
    }
}

export function generateDiskRequestBill(requestObj: DiskRequestObj, data: { inventory: InventoryItem[] }) {

    return {
        disks: requestObj.disks.filter((d) => !!d.disk).map((d) => {
            const disk = data.inventory.find((i) => i.id === d.disk)!;
            
            return {
                disk,
                amount: d.amount,
                items: d.items.map((i) => data.inventory.find((inv) => inv.id === i))! ?? [],
            };
        }) ?? [],
    };
}