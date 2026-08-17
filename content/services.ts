import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import type { Detail } from './types';
import { SERVICES_EN } from './services.en';
import { SERVICES_ES } from './services.es';

/** The service catalog in every language. Slugs are shared, so URLs never change. */
export const SERVICES: Record<Locale, Detail[]> = {
  en: SERVICES_EN,
  es: SERVICES_ES,
};

/** Slugs are locale-independent; the English list defines them. */
export const SERVICE_SLUGS = SERVICES_EN.map((service) => service.slug);

export const getService = (locale: Locale, slug: string): Detail | undefined =>
  (SERVICES[locale] ?? SERVICES[DEFAULT_LOCALE]).find((service) => service.slug === slug);
