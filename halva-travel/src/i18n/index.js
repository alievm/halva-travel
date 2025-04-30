// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ru from './ru.json';
import en from './en.json';
import uz from './uz.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
      uz: { translation: uz },
    },
    fallbackLng: 'ru',
    supportedLngs: ['ru', 'en', 'uz'], // ✅ только эти языки
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    nonExplicitSupportedLngs: true, // ✅ автоматически урезает ru-RU → ru
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;