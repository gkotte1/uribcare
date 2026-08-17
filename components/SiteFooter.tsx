/* eslint-disable @next/next/no-img-element */
import Year from '@/components/Year';
import { Mail, Phone, Globe, Shield } from '@/components/Icons';
import { anchorBase, getDictionary, homePath, type Locale } from '@/content/i18n';

/**
 * Site footer.
 *
 * `base` prefixes the in-page anchors so pages other than the home page (e.g.
 * /register) link back to the home page sections. `locale` selects the copy and
 * keeps the anchors inside the visitor's language; it defaults to English so the
 * existing English pages keep working untouched.
 */
export default function SiteFooter({
  base,
  locale = 'en',
}: {
  base?: string;
  locale?: Locale;
}) {
  const t = getDictionary(locale).footer;
  // An explicit `base` (used by /register, /404) wins; otherwise derive it from
  // the locale so /es keeps its own anchors.
  const b = base ?? anchorBase(locale);

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brandcol">
            <a className="brand" href={`${b}#top`} aria-label={getDictionary(locale).nav.brandHome}>
              <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={200} height={67} />
            </a>
            <p>{t.tagline}</p>
          </div>

          <nav className="ft-col" aria-label={t.platformTitle}>
            <h5>{t.platformTitle}</h5>
            <div className="ft-links">
              <a href={`${b}#ecosystem`}>{t.platformLinks.ecosystem}</a>
              <a href={`${b}#journey`}>{t.platformLinks.journey}</a>
              <a href={`${b}#audience`}>{t.platformLinks.audience}</a>
              <a href={`${b}#trust`}>{t.platformLinks.trust}</a>
            </div>
          </nav>

          <nav className="ft-col" aria-label={t.careTitle}>
            <h5>{t.careTitle}</h5>
            <div className="ft-links">
              <a href="/autism-care">{t.careLinks.autism}</a>
              <a href={`${b}#ecosystem`}>{t.careLinks.therapy}</a>
              <a href={`${b}#ecosystem`}>{t.careLinks.diagnostics}</a>
              <a href={`${b}#faq`}>{t.careLinks.faq}</a>
            </div>
          </nav>

          <div className="ft-col ft-contact">
            <h5>{t.contactTitle}</h5>
            <div className="ft-links">
              <a href="mailto:contact@uribcare.com"><Mail size={16} /> contact@uribcare.com</a>
              <a href="tel:+17709105581"><Phone size={16} /> +1 (770) 910-5581</a>
              <a href="tel:+12016863935"><Phone size={16} /> +1 (201) 686-3935</a>
              <a href={homePath(locale) === '/' ? 'https://uribcare.com' : 'https://uribcare.com/es'} target="_blank" rel="noopener">
                <Globe size={16} /> uribcare.com
              </a>
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
