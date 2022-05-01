import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LngDetector from 'i18next-browser-languagedetector';

import ca from './locales/ca.json';
import es from './locales/es.json';

export enum Languages {
    ca = 'ca',
    es = 'es'
};

export default async function initI18n(language: Languages) {
    const resources = {
        ca: {
            translation: ca,
        },
        es: {
            translation: es,
        },
    };

    await i18n
        .use(LngDetector)
        .use(initReactI18next)
        .init({
            resources: resources,
            fallbackLng: 'ca',
            lng: language,
        });
}