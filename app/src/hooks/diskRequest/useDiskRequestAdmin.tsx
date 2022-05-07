import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";
import { FullDiskRequestPurchase, processRawDiskRequestBuild, processRawDiskRequestStateObj, processRawDiskRequestPayment, RawDiskRequestBuild, RawDiskRequestPayment, RawDiskRequestStateObject } from "./useDetailedDiskRequest";
import { DiskRequestState, processRawDiskRequestListItem, RawDiskRequestListItem } from "./useDiskRequestList";

export type UseDiskRequestAdmin = {
    loading: boolean;
    requests: FullDiskRequestPurchase[];
    setPurchaseState: (id: string, state: DiskRequestState) => Promise<void>;
    isLoading: (id: string) => boolean;
}

export default function useDiskRequestAdmin(): UseDiskRequestAdmin {

    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);
    const [singleLoading, setSingleLoadingState] = useState<{[id: string]: boolean}>({});
    const [requests, setRequests] = useState<FullDiskRequestPurchase[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch(nonBlocking: boolean = false) {
        if(!nonBlocking) setLoading(true);
        try {
            const result = await request<{
                purchases: {
                    purchase: RawDiskRequestListItem, states: RawDiskRequestStateObject[], payment: RawDiskRequestPayment, builds: RawDiskRequestBuild[]
                }[]
            }>('post', '/actions/admin/requests/getAllRequests', {}, { authCredentials: authState });

            setRequests(result.purchases.map((purchase) => ({
                purchase: processRawDiskRequestListItem(purchase.purchase),
                payment: processRawDiskRequestPayment(purchase.payment),
                builds: purchase.builds.map(processRawDiskRequestBuild),
                states: purchase.states.map(processRawDiskRequestStateObj),
            })));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    async function setPurchaseState(id: string, state: DiskRequestState) {
        setSingleLoading(id, true);
        try {
            await request<{}>('post', '/actions/admin/requests/setPurchaseState', { id, state }, { authCredentials: authState });
            await fetch(true);
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setSingleLoading(id, false);
    }

    const isLoading = (id: string): boolean => {
        return singleLoading[id] ?? false;
    }

    const setSingleLoading = (id: string, v: boolean) => {
        const state = singleLoading;
        state[id] = v;

        setSingleLoadingState({
            ...state,
        });
    }

    return {
        loading,
        requests,
        setPurchaseState,
        isLoading,
    }
}
