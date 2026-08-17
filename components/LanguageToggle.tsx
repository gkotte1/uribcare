'use client';

import { LANG_STORAGE_KEY, LOCALES, getDictionary, homePath, type Locale } from '@/content/i18n';

/**
 * EN / ES segmented control.
 *
 * Rendered as real anchors, so it is keyboard reachable and operable with Enter
 * by default, works without JavaScript, and is announced as a list of links with
 * the active one marked `aria-current="true"`.
 *
 * Deliberately a plain `<a>` rather than next/link: switching language crosses
 * from the `(en)` root layout to the `(es)` one, which needs a full document load
 * for the `<html lang>` attribute to change. A soft client transition could not
 * update it.
 */
export default function LanguageToggle({
  locale,
  className = '',
}: {
  locale: Locale;
  className?: string;
}) {
  const t = getDictionary(locale).nav.language;

  const remember = (next: Locale) => {
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Private mode or storage disabled — the navigation still works, only the
      // preference is not remembered.
    }
  };

  return (
    <div className={`lang-switch ${className}`.trim()} role="group" aria-label={t.label}>
      {LOCALES.map((code) => {
        const current = code === locale;
        return (
          <a
            key={code}
            className="lang-opt"
            href={homePath(code)}
            hrefLang={code}
            lang={code}
            aria-current={current ? 'true' : undefined}
            aria-label={code === 'en' ? t.en : t.es}
            onClick={() => remember(code)}
          >
            {code.toUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
