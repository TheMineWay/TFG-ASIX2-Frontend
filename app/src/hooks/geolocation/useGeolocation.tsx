import axios, { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export type GeoLocation = {
    city: string;
    region: string;
    province: string;
    country: string;
    continent: string;
    timezone: string;
    ip: string;

    longitude: number;
    latitude: number;
}

type RawGeoLocation = {
    geoplugin_city: string;
    geoplugin_countryName: string;
    geoplugin_regionName: string; // Província
    geoplugin_region: string; // Comarca
    geoplugin_continentName: string;
    geoplugin_timezone: string;

    geoplugin_latitude: string;
    geoplugin_longitude: string;

    geoplugin_request: string;
}

export function processRawGeoLocation(raw: RawGeoLocation): GeoLocation {
    return {
        city: raw.geoplugin_city,
        region: raw.geoplugin_region,
        province: raw.geoplugin_regionName,
        country: raw.geoplugin_countryName,
        continent: raw.geoplugin_continentName,
        timezone: raw.geoplugin_timezone,
        latitude: parseFloat(raw.geoplugin_latitude),
        longitude: parseFloat(raw.geoplugin_longitude),
        ip: raw.geoplugin_request,
    };
}

export default function useGeolocation() {
    const [locations, setLocation] = useState<{[ip: string]: GeoLocation}>({});
    const [loading, setLoading] = useState<boolean>(false);

    async function fetch(ip: string) {
        setLoading(true);
        try {
            const config: AxiosRequestConfig = {
                method: 'get',
                url: `http://www.geoplugin.net/json.gp?ip=${ip}`,
                headers: {},
            };
            const result: RawGeoLocation = (await axios(config)).data;
            let currentLoc = locations ?? {};
            currentLoc[ip] = processRawGeoLocation(result);
            setLocation(currentLoc);
        } catch (e: any) {

        }
        setLoading(false);
    }

    function getByIp(ip: string): GeoLocation | undefined {
        if(Object.keys(locations).includes(ip)) return locations[ip]!;
        fetch(ip);
    }

    return {
        locations,
        loading,
        fetch,
        getByIp,
    }
}