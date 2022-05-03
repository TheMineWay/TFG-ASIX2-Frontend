import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";
import { FullDiskRequestPurchase, processRawDiskRequestBuild, processRawDiskRequestStateObj, processRawDiskRequestPayment, RawDiskRequestBuild, RawDiskRequestPayment, RawDiskRequestStateObject } from "./useDetailedDiskRequest";
import { processRawDiskRequestListItem, RawDiskRequestListItem } from "./useDiskRequestList";

export type UseDiskRequestAdmin = {
    loading: boolean;
    requests: FullDiskRequestPurchase[];
}

export default function useDiskRequestAdmin(): UseDiskRequestAdmin {

    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);
    const [requests, setRequests] = useState<FullDiskRequestPurchase[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
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

    return {
        loading,
        requests,
    }
}
