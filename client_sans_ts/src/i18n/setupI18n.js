import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import { DEFAULT_LANGUAGES, LANGUAGES, KEY_CACHE_LNG } from '../const';

const localeLoader = (url, options, callback) => {
    try {
        const locale = require(`./locales/${url}`);
        callback(locale, { status : '200' });
    } catch (e) {
        callback(null, { status : '404' });
    }
};

i18n
    // load translation using xhr -> see /public/locales
    // learn more: https://github.com/i18next/i18next-xhr-backend
    .use(initReactI18next)
    .use(Backend)
    .init({
        backend : {
            loadPath : '{{lng}}/{{ns}}.json',
            parse    : data => data,
            ajax     : localeLoader,
        },
        defaultNS     : ['index'],
        ns            : ['generator'],
        lng           : localStorage.getItem(KEY_CACHE_LNG) || DEFAULT_LANGUAGES,
        fallbackLng   : LANGUAGES,
        interpolation : {
            escapeValue : false, // not needed for react as it escapes by default
        },
        react : {
            useSuspense : true,
        },
    });


export default i18n;
