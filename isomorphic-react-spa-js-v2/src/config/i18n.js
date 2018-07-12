import i18n from 'i18next';
import resources from '../locales';
import LanguageDetector from 'i18next-browser-languagedetector';
import Fetch from 'i18next-fetch-backend';

i18n
  .use(Fetch)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      crossDomain: false
    },
    resources,
    // lng: 'ru',
    // ns: 'authorization',
    fallbackLng: 'ru',
    // fallbackLng: {
    //   'ru-RU': ['ru'],
    //   'en-US': ['en'],
    //   'fr-FR': ['fr'],
    //   default: ['ru'],
    // },
    debug: true,
    preload: true,
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed'
    }
  }, () => console.log('18next is inited'))

export default i18n;
