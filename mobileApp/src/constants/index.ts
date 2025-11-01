// App constants
export const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  LANGUAGE: 'language',
  THEME: 'theme',
  COLOR_SCHEME: 'colorScheme',
  CART: 'cart',
};

export const APP_CONFIG = {
  APP_NAME: 'Village Mart',
  VERSION: '0.0.1',
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'hi'],
};
