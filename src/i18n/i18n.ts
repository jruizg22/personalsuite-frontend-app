import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEnUS from "./locales/en-US.json";
import commonEsES from "./locales/es-ES.json";
import mediaTrackerEnUS from "../modules/media-tracker/locales/en_US.json";
import mediaTrackerEsES from "../modules/media-tracker/locales/es_ES.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            'en-US': {
                common: commonEnUS,
                mediaTracker: mediaTrackerEnUS
            },
            'es-ES': {
                common: commonEsES,
                mediaTracker: mediaTrackerEsES
            }
        },
        lng: 'es-ES',
        fallbackLng: 'en-US',
        ns: ['common', 'mediaTracker'],
        defaultNS: 'common',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;