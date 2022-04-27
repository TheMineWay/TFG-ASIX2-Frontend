import { useState } from 'react';
import r from '../../services/api/Request';
import { DiskBuilderFormValues } from '../../view/diskRequest/DiskBuilder/DiskBuilderTool';
import { DiskBuilderPayFormValues } from '../../view/diskRequest/DiskPay/DiskBuilderPay';
import { DiskSendOption } from '../../view/diskRequest/DiskSend/DiskBuilderSend';
import useAuthState from '../auth/useAuthState';
import { InventoryItem } from '../inventory/useInventory';
export type DiskRequestObj = {
    disks: DiskBuilderFormValues[];
}

export type UseDiskRequest = {
    request: () => Promise<void>;
    requestObj: DiskRequestObj;
    loading: boolean;
    state: null | 'processing' | 'processed';
}

type Props = {
    disks: {[id: string]: DiskBuilderFormValues};
    send?: DiskSendOption;
    pay?: DiskBuilderPayFormValues;
}

export default function useDiskRequest(props: Props): UseDiskRequest {

    const [authState] = useAuthState();

    const [state, setState] = useState<null | 'processing' | 'processed'>(null);

    const requestObj: DiskRequestObj = {
        disks: Object.entries(props.disks).map((d) => d[1]),
    }

    const request = async (): Promise<void> => {
        try {
            setState('processing');
            await r<{}>('post', '/actions/diskRequests/request', { request: requestObj }, { authCredentials: authState });
            setState('processed')
        } catch (e: any) {
            setState(null);
            throw e;
        }
    }

    return {
        request,
        requestObj,
        loading: state !== null,
        state,
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