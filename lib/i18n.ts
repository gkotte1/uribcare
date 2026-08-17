/**
 * Locale plumbing. The URL is the single source of truth for the current
 * language: English is served unprefixed (`/services/x`) and Spanish under an
 * `/es` prefix (`/es/services/x`). The cookie below only remembers a returning
 * visitor's preference so middleware can send them to the right tree; it never
 * competes with the URL for the active locale.
 */

export const LOCALES = ['en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_COOKIE = 'uribcare_locale';

/** The site's canonical origin, used for the hreflang alternates. */
export const SITE_URL = 'https://uribcare.com';

/**
 * Kill-switch for the EN/ES control in the navbar. Spanish currently has
 * translated navigation, footer, forms and validation, but the long-form page
 * copy is still English. Set this to false to hide the switcher (and with it
 * the public entry point to /es) until that translation lands; the routes stay
 * reachable directly either way.
 */
export const SHOW_LANGUAGE_SWITCHER = true;

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/**
 * Builds an href for a locale. English keeps clean, unprefixed paths so the
 * existing URLs never change.
 */
export function localeHref(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return clean || '/';
  return `/${locale}${clean}`;
}

/**
 * Strips a leading locale segment, giving the route shared by both languages.
 *
 * This has to handle the default locale too: middleware rewrites `/services/x`
 * to `/en/services/x`, and `usePathname()` reports that rewritten path, so the
 * `/en` prefix is present on English pages even though the address bar hides it.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname || '/';
}

/** The locale a pathname belongs to, rewritten or not. */
export function localeFromPath(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return DEFAULT_LOCALE;
}

/**
 * `alternates` for a route, so every page advertises both languages plus an
 * x-default pointing at English.
 */
export function alternatesFor(path: string) {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) languages[locale] = `${SITE_URL}${localeHref(locale, path)}`;
  languages['x-default'] = `${SITE_URL}${localeHref(DEFAULT_LOCALE, path)}`;
  return { canonical: languages[DEFAULT_LOCALE], languages };
}
