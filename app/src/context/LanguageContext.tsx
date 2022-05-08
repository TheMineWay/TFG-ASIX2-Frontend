import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import initI18n, { Languages } from '../i18n/configureI18n';

type Props = {
    children: JSX.Element;
}

export const LanguageDataContext = React.createContext<[Languages, (context: Languages) => void] | null>(null);

export default function LanguageContext(props: Props) {

    const [cookies, setCookie, removeCookie] = useCookies();
    
    const [language, setLanguage] = useState<Languages>(cookies['language'] as Languages ?? Languages.ca);

    useEffect(() => {
        // Expires in one year
        setCookie('language', language, {
            expires: moment().add('year', 1).toDate(),
        });
        // TODO: make optional
        if(language !== cookies['language'] as Languages) window.location.reload();
    }, [language]);

    useEffect(() => {
        updateLang(cookies['language'] as Languages ?? Languages.ca);
    }, []);

    const updateLang = async (lang: Languages) => {
        await initI18n(lang);
        setLanguage(lang);
    }

    return (
        <LanguageDataContext.Provider value={[language, updateLang]}>
            {props.children}
        </LanguageDataContext.Provider>
    )
}