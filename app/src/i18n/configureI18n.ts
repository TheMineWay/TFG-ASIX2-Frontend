import i18n from "i18next";

import ca from './locales/ca.json';

export default function initI18n() {
    const resources = {
        ca: {
            translation: ca,
        }
    };

    i18n.init({
        resources: resources,
        fallbackLng: 'ca',
        lng: 'ca'
    });
}