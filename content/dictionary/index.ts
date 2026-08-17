import type { Locale } from '@/lib/i18n';
import { en } from './en';
import { es } from './es';
import type { Dictionary } from './en';

const DICTIONARIES: Record<Locale, Dictionary> = { en, es };

/** The dictionary for a locale. Server and client components both use this. */
export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale] ?? en;

export type { Dictionary };
