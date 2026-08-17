import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import type { Detail } from './types';
import { ECOSYSTEM_EN } from './ecosystem.en';
import { ECOSYSTEM_ES } from './ecosystem.es';

/** The ecosystem catalog in every language. Slugs are shared, so URLs never change. */
export const ECOSYSTEM: Record<Locale, Detail[]> = {
  en: ECOSYSTEM_EN,
  es: ECOSYSTEM_ES,
};

/** Slugs are locale-independent; the English list defines them. */
export const ECOSYSTEM_SLUGS = ECOSYSTEM_EN.map((entry) => entry.slug);

export const getEcosystem = (locale: Locale, slug: string): Detail | undefined =>
  (ECOSYSTEM[locale] ?? ECOSYSTEM[DEFAULT_LOCALE]).find((entry) => entry.slug === slug);
