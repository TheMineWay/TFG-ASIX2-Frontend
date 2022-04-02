import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getBaseUrl } from "../../conf/conf";
import { AuthCredentials } from "../../context/AuthContext";

type Section = 'auth' | 'http' | 'sess' | 'frontend';

type RequestResponse<T> = {
    code: string;
    section: Section;
    data?: T;
}

export type ErrorResponse = {
    code: string;
    section: Section;
}

type RequestOpts = {
    authCredentials?: AuthCredentials;
};

export default async function request<T>(method: 'get' | 'post', route: string, data?: {[id: string]: any}, opts?: RequestOpts): Promise<T> {
    
    const auth = opts?.authCredentials;

    const config: AxiosRequestConfig = {
        method,
        url: getBaseUrl() + route + ".php",
        data: {
            auth,
            data,
        },
        headers: {
            'Content-Type': 'text/plain',
            'Accept': '*/*'
        },
    };

    const result: AxiosResponse<RequestResponse<T>> = await axios(config);

    if(!result.data || !result.data.data || result.data.code !== "200") {
        const error: ErrorResponse = result.data ?? {
            section: 'http',
            code: '500',
        };

        if(error.section === 'sess') {
            document.cookie = "authCredentials=";
            window.location.reload();
        }

        throw error;
    }

    return result.data!.data!;
}