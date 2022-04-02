import React, { useContext } from 'react'
import { LanguageDataContext } from '../../context/LanguageContext'

export default function useLanguage() {
    const [ language, setLanguage ] = useContext(LanguageDataContext)!;

    return {
        language,
        setLanguage
    };
}