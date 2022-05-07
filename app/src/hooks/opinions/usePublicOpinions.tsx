import { useEffect, useState } from 'react';
import request from '../../services/api/Request';
import notificationErrorDisplay from '../../view/errors/display/NotificationErrorDisplay';
import { OpinionObj, processRawOpinion, RawOpinion } from './useMyOpinion'

export default function usePublicOpinions() {
    
    const [opinions, setOpinions] = useState<OpinionObj[]>();
    const [loading, setLoading]= useState<boolean>(false);
    
    useEffect(() => {
        fetch();
    }, []);

    async function fetch() {
        setLoading(true);
        try {
            const result = await request<{opinions: RawOpinion[]}>('post', '/actions/rating/publicRates', {});
            setOpinions(result.opinions.map(processRawOpinion));
        } catch(e: any) {
            notificationErrorDisplay(e);
        }
        setLoading(false);
    }

    return {
        opinions,
        loading,
    };
}