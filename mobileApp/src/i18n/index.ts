// i18next setup
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import en from './en/translation.json';
import hi from './hi/translation.json';

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
};

// Load saved language preference
const initLanguage = async () => {
  const savedLanguage = await storage.getItem(STORAGE_KEYS.LANGUAGE);
  return savedLanguage || 'en';
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language, will be updated after loading saved preference
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  compatibilityJSON: 'v3', // For React Native compatibility
});

// Load saved language preference
initLanguage().then((lang) => {
  if (lang && resources[lang as keyof typeof resources]) {
    i18n.changeLanguage(lang);
  }
});

export default i18n;

// Helper function to change language
export const changeLanguage = async (lang: string) => {
  await storage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  await i18n.changeLanguage(lang);
};

