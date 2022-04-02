import { useEffect, useState } from 'react';
import request from '../../services/api/Request';
import useAuthState from '../auth/useAuthState';

export enum LogAction {
    login = 'login',
    register = 'register'
}

type Log = {
    id: string;
    user: string;
    action: LogAction;
    ip: string;
    createdAt: Date;
}

export default function useLogs() {

    const [state, setState] = useState<Log[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [authState] = useAuthState();

    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
        const result = await request<Log[]>('post', '/actions/admin/logs/readLogs', {}, { authCredentials: authState });
        setState(result);
        setLoading(false);
    }

    return {
        data: state,
        isLoading: loading,
        fetch: fetch,
    };
}