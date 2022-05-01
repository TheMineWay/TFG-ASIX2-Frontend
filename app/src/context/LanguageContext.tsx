import React, { useEffect, useState } from 'react';
import initI18n, { Languages } from '../i18n/configureI18n';

type Props = {
    children: JSX.Element;
}

export const LanguageDataContext = React.createContext<[Languages, (context: Languages) => void] | null>(null);

export default function LanguageContext(props: Props) {

    const [ language, setLanguage ] = useState<Languages>(Languages.ca);

    useEffect(() => {
        updateLang(Languages.ca);
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