import { useEffect, useState } from "react"
import request from "../../services/api/Request";
import notificationErrorDisplay from "../../view/errors/display/NotificationErrorDisplay";
import useAuthState from "../auth/useAuthState";

type RawOpinion = {
    rating: string;
    opinion: string;
    createdAt: string;
}

type OpinionObj = {
    score: number;
    opinion: string;
    createdAt: Date;
}

function processRawOpinion(raw: RawOpinion): OpinionObj {
    return {
        ...raw,
        score: parseInt(raw.rating),
        createdAt: new Date(Date.parse(raw.createdAt)),
    };
}

export default function useMyOpinion() {

    const [authState] = useAuthState();
    const [opinion, setOpinion] = useState<OpinionObj | null>();

    useEffect(() => {
        fetch();
    }, [authState]);

    async function fetch() {
        try {
            if(!authState) return;
            const response = await request<{rate: RawOpinion | false}>('post', '/actions/rating/getMyRate', {}, { authCredentials: authState });
            setOpinion(response.rate === false ? null : processRawOpinion(response.rate));
        } catch (e: any) {
            notificationErrorDisplay(e);
        }
    }

    return {
        opinion,
    }
}