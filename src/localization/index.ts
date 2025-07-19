import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import fr from './fr';
import en from './en';

export type I18nLocale = keyof typeof resources;
export type I18nNamespace = keyof (typeof resources)['en'];

export const resources = {
  fr,
  en,
} as const;

export const namespaces: I18nNamespace[] = Object.keys(
  resources.en,
) as I18nNamespace[];

export const defaultNS: I18nNamespace = 'global';

export const defaultLocale: I18nLocale = 'en';

void i18n.use(initReactI18next).init({
  lng: defaultLocale,
  ns: namespaces,
  defaultNS,
  resources,
});

export default i18n;
