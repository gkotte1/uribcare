/* eslint-disable @next/next/no-img-element */
import Year from '@/components/Year';
import { Mail, Phone, Globe, Shield } from '@/components/Icons';
import { getDictionary } from '@/content/dictionary';
import { DEFAULT_LOCALE, localeHref } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

/**
 * Site footer. `base` prefixes the in-page anchors so pages other than the home
 * page (e.g. /register) link back to the home page sections, in the current
 * language.
 */
export default function SiteFooter({
  base = '',
  locale = DEFAULT_LOCALE,
}: {
  base?: string;
  locale?: Locale;
}) {
  const t = getDictionary(locale).footer;
  const home = base ? localeHref(locale, '/') : '';
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brandcol">
            <a className="brand" href={`${home}#top`} aria-label={getDictionary(locale).nav.home}>
              <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={200} height={67} />
            </a>
            <p>{t.blurb}</p>
          </div>

          <nav className="ft-col" aria-label={t.platform}>
            <h5>{t.platform}</h5>
            <div className="ft-links">
              <a href={`${home}#ecosystem`}>{t.ecosystem}</a>
              <a href={`${home}#journey`}>{t.howItWorks}</a>
              <a href={`${home}#audience`}>{t.forProviders}</a>
              <a href={`${home}#trust`}>{t.security}</a>
            </div>
          </nav>

          <nav className="ft-col" aria-label={t.care}>
            <h5>{t.care}</h5>
            <div className="ft-links">
              <a href={localeHref(locale, '/autism-care')}>{t.autismCare}</a>
              <a href={`${home}#ecosystem`}>{t.therapyCounseling}</a>
              <a href={`${home}#ecosystem`}>{t.diagnostics}</a>
              <a href={`${home}#faq`}>{t.faq}</a>
            </div>
          </nav>

          <div className="ft-col ft-contact">
            <h5>{t.getInTouch}</h5>
            <div className="ft-links">
              <a href="mailto:contact@uribcare.com"><Mail size={16} /> contact@uribcare.com</a>
              <a href="tel:+17709105581"><Phone size={16} /> +1 (770) 910-5581</a>
              <a href="tel:+12016863935"><Phone size={16} /> +1 (201) 686-3935</a>
              <a href="https://uribcare.com" target="_blank" rel="noopener"><Globe size={16} /> uribcare.com</a>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <span>
            © <Year /> {t.rights}
          </span>
          <span className="ft-badge">
            <Shield size={15} /> {t.badge}
          </span>
        </div>
      </div>
    </footer>
  );
}
