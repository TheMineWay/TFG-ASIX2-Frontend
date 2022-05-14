import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";

class RawContactFormItem {
    id!: string;
    email!: string;
    name!: string;
    message!: string;
    opened!: "1" | "0";
    createdAt!: string;
    deletedAt!: string;
}

export class ContactFormItem {
    id!: string;
    email!: string;
    name!: string;
    message!: string;
    opened!: boolean;
    createdAt!: Date;
    deletedAt!: Date;
}

export function processRawContactFormItem(raw: RawContactFormItem): ContactFormItem {
    return {
        ...raw,
        opened: raw.opened === '1',
        createdAt: new Date(Date.parse(raw.createdAt)),
        deletedAt: new Date(Date.parse(raw.deletedAt)),
    };
}

export default function useAdminContactForm() {

    const [authState] = useAuthState();
    const [loadingSetState, setLoadingSetState] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formItems, setFormItems] = useState<ContactFormItem[]>();

    useEffect(() => {
        getFormData();
    }, []);

    async function getFormData() {
        setLoading(true);
        try {
            const result = await request<{contactForm: RawContactFormItem[]}>('post', '/actions/admin/contactForm/get', {}, { authCredentials: authState });
            setFormItems(result.contactForm.map(processRawContactFormItem));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    async function markAsRead(id: string) {
        setLoadingSetState(true);
        try {
            await request<{}>('post', '/actions/admin/contactForm/setReadState', { id, state: '1' }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoadingSetState(false);
    }

    async function markAsUnread(id: string) {
        setLoadingSetState(true);
        try {
            await request<{}>('post', '/actions/admin/contactForm/setReadState', { id, state: '0' }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoadingSetState(false);
    }

    return {
        markAsRead,
        markAsUnread,
        loadingSetState,
        loading,
        getFormData,
        formItems,
    };
}