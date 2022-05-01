import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";

export type DiskRequestState = 'pending';

export type DiskRequestListItem = {
    id: string;
    user: string;
    createdAt: Date;
    address: string;
    state: DiskRequestState;
    amount: number;
}

type RawDiskRequestListItem = {
    id: string;
    user: string;
    createdAt: string;
    address: string;
    state: DiskRequestState;
    amount: string;
}

export function processRawDiskRequestListItem(raw: RawDiskRequestListItem): DiskRequestListItem {
    return {
        ...raw,
        createdAt: new Date(Date.parse(raw.createdAt)),
        amount: parseFloat(raw.amount),
    };
}

export default function useDiskRequestList() {
    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<DiskRequestListItem[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{ requests: RawDiskRequestListItem[] }>('post', '/actions/diskRequests/requestsList', {}, { authCredentials: authState });
            setList(result.requests.map(processRawDiskRequestListItem));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        list,
        loading,
    }
}