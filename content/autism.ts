import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import type { Detail } from './types';
import { AUTISM_CARE_EN } from './autism.en';
import { AUTISM_CARE_ES } from './autism.es';

/** The autism care page in every language. */
export const AUTISM_CARE: Record<Locale, Detail> = {
  en: AUTISM_CARE_EN,
  es: AUTISM_CARE_ES,
};

export const getAutismCare = (locale: Locale): Detail =>
  AUTISM_CARE[locale] ?? AUTISM_CARE[DEFAULT_LOCALE];
