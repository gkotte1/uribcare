import type { Locale } from '@/lib/i18n';
import { DEFAULT_LOCALE } from '@/lib/i18n';
import { coordinatedAutismCareEn } from './coordinated-autism-care.en';
import { coordinatedAutismCareEs } from './coordinated-autism-care.es';
import type { Article } from './types';

/**
 * The article catalog, keyed by slug then locale. Publishing a new article means
 * adding its two data files and one entry here; the route, the static params
 * and the listing link all follow from this map.
 */
const ARTICLES: Record<string, Record<Locale, Article>> = {
  [coordinatedAutismCareEn.slug]: {
    en: coordinatedAutismCareEn,
    es: coordinatedAutismCareEs,
  },
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);

/** The article for a slug, or undefined so the route can render the 404. */
export function getArticle(locale: Locale, slug: string): Article | undefined {
  const byLocale = ARTICLES[slug];
  if (!byLocale) return undefined;
  return byLocale[locale] ?? byLocale[DEFAULT_LOCALE];
}

export const hasArticle = (slug: string) => slug in ARTICLES;

export type { Article } from './types';
