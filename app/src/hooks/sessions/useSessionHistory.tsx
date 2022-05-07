import { useEffect, useState } from "react";
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";

export type UseSessionHistory = {
    sessionHistory: {
        loading: boolean;
        sessions?: Session[];
        fetch: () => Promise<void>;
    };

    loading: boolean;
}

type RawSession = {
    id: string;
    createdAt: string;
    ip: string;
}

export type Session = {
    id: string;
    createdAt: Date;
    ip: string;
}

export function processRawSession(raw: RawSession): Session {
    return {
        ...raw,
        createdAt: new Date(Date.parse(raw.createdAt)),
    };
}

export default function useSessionHistory(): UseSessionHistory {

    const [authState] = useAuthState();

    const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
    const [sessions, setSessions] = useState<Session[]>();

    useEffect(() => {
        fetchSessions();
    }, []);

    async function fetchSessions(): Promise<void> {
        setLoadingSessions(true);
        try {
            const result = await request<{ sessions: RawSession[] }>('post', '/actions/me/getSessionHistory', {}, { authCredentials: authState });
            setSessions(result.sessions.map(processRawSession));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
        setLoadingSessions(false);
    }

    return {
        sessionHistory: {
            loading: loadingSessions,
            sessions,
            fetch: fetchSessions,
        },
        loading: loadingSessions,
    }
}