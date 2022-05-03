import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";
import { DiskRequestListItem, DiskRequestState, processRawDiskRequestListItem, RawDiskRequestListItem } from "./useDiskRequestList";

export type RawDiskRequestStateObject = {
    state: DiskRequestState;
    comment: string;
    createdAt: string;
    id: string;
}

export type DiskRequestStateObject = {
    state: DiskRequestState;
    comment: string;
    createdAt: Date;
}

export type RawDiskRequestPayment = {
    amount: string;
    card: string;
    createdAt: string;
}

export type DiskRequestPayment = {
    amount: number;
    card: string;
    createdAt: Date;
}

export type RawDiskRequestBuild = {
    build: {
        id: string;
        amount: string;
        disk: string;
    },
    items: string[];
}

export type DiskRequestBuild = {
    build: {
        id: string;
        amount: number;
        disk: string;
    },
    items: string[];
}

export function processRawDiskRequestBuild(raw: RawDiskRequestBuild): DiskRequestBuild {
    return {
        ...raw,
        build: {
            id: raw.build.id,
            amount: parseFloat(raw.build.amount),
            disk: raw.build.disk,
        },
    };
}

export function processRawDiskRequestPayment(raw: RawDiskRequestPayment): DiskRequestPayment {
    return {
        ...raw,
        amount: parseFloat(raw.amount),
        createdAt: new Date(Date.parse(raw.createdAt)),
    };
}

export function processRawDiskRequestStateObj(raw: RawDiskRequestStateObject): DiskRequestStateObject {
    return {
        ...raw,
        createdAt: new Date(Date.parse(raw.createdAt)),
    };
}

export type FullDiskRequestPurchase = {
    purchase: DiskRequestListItem;
    states: DiskRequestStateObject[];
    payment: DiskRequestPayment;
    builds: DiskRequestBuild[];
}

export default function useDetailedDiskRequest(id: string | null) {
    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);
    const [purchase, setPurchase] = useState<FullDiskRequestPurchase>();

    useEffect(() => {
        if(id) fetch();
    }, [id]);

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{ purchase: RawDiskRequestListItem, states: RawDiskRequestStateObject[], payment: RawDiskRequestPayment, builds: RawDiskRequestBuild[]}>('post', '/actions/diskRequests/getDetailedRequest', { id }, { authCredentials: authState });
            setPurchase({
                purchase: processRawDiskRequestListItem(result.purchase),
                states: result.states.map(processRawDiskRequestStateObj),
                payment: processRawDiskRequestPayment(result.payment),
                builds: result.builds.map(processRawDiskRequestBuild),
            });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        purchase,
        loading,
    }
}