import { useState } from 'react';
import r from '../../services/api/Request';
import { DiskBuilderFormValues } from '../../view/diskRequest/DiskBuilder/DiskBuilderTool';
import useAuthState from '../auth/useAuthState';
type DiskRequestObj = {
    disks: DiskBuilderFormValues[];
}

export default function useDiskRequest() {

    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);

    const request = async (values: DiskRequestObj): Promise<void> => {
        try {
            setLoading(true);
            await r<{}>('post', '/actions/diskRequests/request', { request: values }, { authCredentials: authState });
            setLoading(false);
        } catch (e: any) {
            setLoading(false);
            throw e;
        }
    }

    return {
        request,
        loading,
    }

}