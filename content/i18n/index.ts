import { en, type Dict } from './en';
import { es } from './es';
import { ECOSYSTEM_NAV, SERVICE_NAV, type NavItem } from '@/content/nav';

export type { Dict };

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Absolute origin used for canonical, hreflang, sitemap, robots and llms.txt.
 *
 * This is the official brand domain, not the host the app happens to be deployed
 * to (uribcare.fh.bio is a hosting URL). Canonical URLs must name the domain the
 * site should be indexed under, so this is the single place that defines it.
 */
export const SITE_URL = 'https://uribcare.com';

/** localStorage key holding the visitor's last explicit language choice. */
export const LANG_STORAGE_KEY = 'uribcare.lang';

const DICTS: Record<Locale, Dict> = { en, es };

export function getDictionary(locale: Locale): Dict {
  return DICTS[locale];
}

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'es';
}

/**
 * Home route for a locale. English keeps the existing root path; Spanish lives
 * at a real `/es` path (no query string, no subdomain).
 */
export function homePath(locale: Locale): string {
  return locale === 'en' ? '/' : '/es';
}

/**
 * Prefix for in-page anchors. On the Spanish home page the anchors must carry
 * `/es` so they resolve from any other route, and so switching language keeps
 * the visitor inside their language.
 */
export function anchorBase(locale: Locale): string {
  return locale === 'en' ? '' : '/es';
}

/**
 * Absolute URL for a locale's home page, used for canonical + hreflang.
 * No trailing slash on the English root — that is the form Next emits after
 * normalising against `metadataBase`, and canonical/hreflang must agree exactly.
 */
export function homeUrl(locale: Locale): string {
  return locale === 'en' ? `${SITE_URL}/` : `${SITE_URL}/es`;
}

/**
 * hreflang set for the home pages. `x-default` points at English, which is the
 * page served at the bare origin.
 */
export const HOME_LANGUAGES = {
  en: homeUrl('en'),
  es: homeUrl('es'),
  'x-default': homeUrl('en'),
};

/**
 * Merges a locale's names/descriptions onto the canonical nav catalog, so slugs,
 * hrefs and icons stay defined once in content/nav.ts.
 */
function localizeNav(
  list: NavItem[],
  strings: Record<string, { name: string; shortDescription: string }>
): NavItem[] {
  return list.map((item) => {
    const t = strings[item.slug];
    return t ? { ...item, name: t.name, shortDescription: t.shortDescription } : item;
  });
}

export function serviceNav(locale: Locale): NavItem[] {
  return localizeNav(SERVICE_NAV, getDictionary(locale).serviceNav);
}

export function ecosystemNav(locale: Locale): NavItem[] {
  return localizeNav(ECOSYSTEM_NAV, getDictionary(locale).ecosystemNav);
}
