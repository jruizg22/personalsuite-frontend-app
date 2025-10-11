import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEnUS from "./locales/en-US.json";
import commonEsES from "./locales/es-ES.json";
import mediaTrackerEnUS from "@media-tracker/i18n/locales/en_US.json";
import mediaTrackerEsES from "@media-tracker/i18n/locales/es_ES.json";
import {commonKeys} from "@i18n/i18nKeys";
import {mediaTrackerKeys} from "@media-tracker/i18n/i18nKeys";

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
        lng: 'en-US',
        fallbackLng: 'en-US',
        ns: [commonKeys.ns, mediaTrackerKeys.ns],
        defaultNS: commonKeys.ns,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;