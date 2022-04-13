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

    const data = cookies["CACHE_" + props.cacheId] as T ?? undefined;

    const set = (data: T): void => {
        setCookie("CACHE_" + props.cacheId, data);
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