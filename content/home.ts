import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { homeEn } from './home.en';
import { homeEs } from './home.es';
import type { HomeContent } from './home.en';

const HOME: Record<Locale, HomeContent> = { en: homeEn, es: homeEs };

export const getHome = (locale: Locale): HomeContent => HOME[locale] ?? HOME[DEFAULT_LOCALE];
export type { HomeContent };
