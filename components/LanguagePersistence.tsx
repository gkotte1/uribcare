'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LANG_STORAGE_KEY, homePath, isLocale, type Locale } from '@/content/i18n';

/**
 * Remembers the visitor's language and honours it on the English home page.
 *
 * Rules, in this order:
 *  1. Landing on a language records it — so someone who arrives on /es from a
 *     Spanish search result stays in Spanish on later visits.
 *  2. `/es` NEVER redirects. A direct visit always renders Spanish, whatever is
 *     stored, as required.
 *  3. `/` redirects to `/es` only when Spanish is the stored preference. Choosing
 *     EN in the toggle writes `en`, so that choice sticks and cannot loop.
 *
 * Renders nothing. SSR is untouched: the served HTML for each route is always
 * that route's own language, so crawlers, canonical and hreflang stay correct.
 */
export default function LanguagePersistence({ locale }: { locale: Locale }) {
  const router = useRouter();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch {
      return; // storage unavailable — behave as if no preference exists
    }

    // Rule 3: only the English home page defers to a stored Spanish preference.
    if (locale === 'en' && isLocale(stored) && stored !== 'en') {
      router.replace(homePath(stored) + window.location.hash);
      return;
    }

    // Rule 1: record the language actually being viewed.
    if (stored !== locale) {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, locale);
      } catch {
        // ignore — nothing else depends on the write succeeding
      }
    }
  }, [locale, router]);

  return null;
}
