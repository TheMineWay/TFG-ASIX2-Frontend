import React, { useEffect, useState } from 'react';
import initI18n, { Languages } from '../i18n/configureI18n';

type Props = {
    children: JSX.Element;
}

export const LanguageDataContext = React.createContext<[Languages, (context: Languages) => void] | null>(null);

export default function LanguageContext(props: Props) {

    const [ language, setLanguage ] = useState<Languages>(Languages.ca);

    useEffect(() => {
        initI18n(language);
    }, [language]);

    return (
        <LanguageDataContext.Provider value={[language, (l) => setLanguage(l)]}>
            {props.children}
        </LanguageDataContext.Provider>
    )
}