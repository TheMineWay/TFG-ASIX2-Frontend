import { useState } from 'react';
import r from '../../services/api/Request';
import { DiskBuilderFormValues } from '../../view/diskRequest/DiskBuilder/DiskBuilderTool';
import useAuthState from '../auth/useAuthState';
export type DiskRequestObj = {
    disks: DiskBuilderFormValues[];
}

type Props = {
    disks: {[id: string]: DiskBuilderFormValues};
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