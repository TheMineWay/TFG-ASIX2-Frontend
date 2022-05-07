import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export type UseCache<T> = {
    data?: T;
    set: (data: T) => void;
    clear: () => void;
}

type Props = {
    cacheId: string;
}

export default function useCache<T>(props: Props): UseCache<T> {
    
    const [cookies, setCookie, removeCookie] = useCookies();
    const [state, setState] = useState<T>();


    const data = cookies["CACHE_" + props.cacheId] as T ?? undefined;

    useEffect(() => {
        setState(data);
        return () => {
            setCookie("CACHE_" + props.cacheId, state);
        };
    }, []);

    const set = (data: T): void => {
        setState(data);
    }

    const clear = (): void => {
        removeCookie("CACHE_" + props.cacheId);
    }

    return {
        data,
        set,
        clear
    }

}