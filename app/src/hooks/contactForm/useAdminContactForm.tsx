import moment from "moment";
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
    deletedAt!: Date | null;
}

export function processRawContactFormItem(raw: RawContactFormItem): ContactFormItem {
    return {
        ...raw,
        opened: raw.opened === '1',
        createdAt: new Date(Date.parse(raw.createdAt)),
        deletedAt: raw.deletedAt === null ? null : new Date(Date.parse(raw.deletedAt)),
    };
}

export default function useAdminContactForm() {

    const [authState] = useAuthState();
    const [loading, setLoading] = useState<boolean>(false);
    const [formItems, setFormItems] = useState<ContactFormItem[]>();
    const [individualLoading, setIndividualLoading] = useState<{[id: string]: boolean}>({});

    useEffect(() => {
        getFormData();
    }, []);

    function isLoading(id?: string): boolean {
        if(!id) return loading;
        return Object.keys(individualLoading).includes(id) ? individualLoading[id] : false;
    }

    function setLoadingState(id: string, loadingState: boolean = true) {
        const state = individualLoading;
        state[id] = loadingState;
        setIndividualLoading({
            ...state,
        });
    }

    async function getFormData(showLoading: boolean = true) {
        if(showLoading) setLoading(true);
        try {
            const result = await request<{contactForm: RawContactFormItem[]}>('post', '/actions/admin/contactForm/get', {}, { authCredentials: authState });
            setFormItems(result.contactForm.map(processRawContactFormItem));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        if(showLoading) setLoading(false);
    }

    async function markAsRead(id: string) {
        setLoadingState(id);
        try {
            await request<{}>('post', '/actions/admin/contactForm/setReadState', { id, state: '1' }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        
        const state = (formItems ?? []).map((i) => {

            if(i.id === id) return {
                ...i,
                opened: true,
            }

            return i;
        });

        setFormItems([
            ...state,
        ]);

        setLoadingState(id, false);
    }

    async function markAsUnread(id: string) {
        setLoadingState(id);
        try {
            await request<{}>('post', '/actions/admin/contactForm/setReadState', { id, state: '0' }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }

        const state = (formItems ?? []).map((i) => {

            if(i.id === id) return {
                ...i,
                opened: false,
            }

            return i;
        });

        setFormItems([
            ...state,
        ]);

        setLoadingState(id, false);
    }

    async function deleteItem(id: string) {
        setLoadingState(id);
        try {
            await request<{}>('post', '/actions/admin/contactForm/delete', { id }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        
        const state = (formItems ?? []).map((i) => {

            if(i.id === id) return {
                ...i,
                deletedAt: moment().toDate(),
            }

            return i;
        });

        setFormItems([
            ...state,
        ]);

        setLoadingState(id, false);
    }

    async function recoverItem(id: string) {
        setLoadingState(id);
        try {
            await request<{}>('post', '/actions/admin/contactForm/recover', { id }, { authCredentials: authState });
        } catch (e: any) {
            notificationErrorDisplay(e);
        }

        const state = (formItems ?? []).map((i) => {

            if(i.id === id) return {
                ...i,
                deletedAt: null,
            }

            return i;
        });

        setFormItems([
            ...state,
        ]);

        setLoadingState(id, false);
    }

    return {
        markAsRead,
        markAsUnread,
        loading,
        getFormData,
        formItems,
        deleteItem,
        isLoading,
        recoverItem,
    };
}