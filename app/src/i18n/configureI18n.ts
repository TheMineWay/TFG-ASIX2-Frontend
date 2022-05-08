import i18n from "i18next";

import ca from './locales/ca.json';
import es from './locales/es.json';
import en from './locales/en.json';

export enum Languages {
    ca = 'ca',
    es = 'es',
    en = 'en',
};

export default async function initI18n(language: Languages) {
    const resources = {
        ca: {
            translation: ca,
        },
        es: {
            translation: es,
        },
        en: {
            translation: en,
        }
    };

    await i18n.init({
        resources: resources,
        fallbackLng: 'ca',
        lng: language
    });
}