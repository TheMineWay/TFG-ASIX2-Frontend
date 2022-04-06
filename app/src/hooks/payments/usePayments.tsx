import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";

export type RawAdminPayments = {
    id: string;
    amount: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

export type AdminPayments = {
    id: string;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

function processRawAdminPayments(raw: RawAdminPayments): AdminPayments {
    return {
        ...raw,
        amount: parseFloat(raw.amount),
        deletedAt: raw.deletedAt ? new Date(Date.parse(raw.deletedAt)) : undefined,
        updatedAt: new Date(Date.parse(raw.updatedAt)),
        createdAt: new Date(Date.parse(raw.createdAt)),
    };
}

export default function usePayments() {
    
    const [authState] = useAuthState();

    const [loading, setLoading] = useState<boolean>(false);
    const [payments, setPayments] = useState<AdminPayments[]>();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{payments: RawAdminPayments[]}>('post', '/actions/admin/payments/paymentsList', {}, {authCredentials: authState});
            setPayments(result.payments.map(processRawAdminPayments));
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        loading,
        payments,
    };
}
