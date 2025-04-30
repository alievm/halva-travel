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
    detection: {
      order: ['localStorage', 'querystring', 'cookie', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'cookie'],
      lookupLocalStorage: 'i18nextLng',
      lookupCookie: 'i18next',
      cookieMinutes: 10080, // 7 дней
    },
    react: {
      useSuspense: false, // ✅ особенно важно, если используешь SSR или хочешь избежать "зависания"
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
