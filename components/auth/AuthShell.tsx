/* eslint-disable @next/next/no-img-element */
import SiteFooter from '@/components/SiteFooter';
import { localeHref, type Locale } from '@/lib/i18n';
import './auth.css';

/**
 * Minimal centered chrome shared by every auth page: a top bar with the
 * wordmark linking home, a single card holding the heading and the form, and
 * the site footer. The card surface and status-banner styles live in auth.css.
 */
export default function AuthShell({
  locale,
  title,
  subtitle,
  children,
  footer,
}: {
  locale: Locale;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="auth-page">
      <header className="auth-bar">
        <a className="brand" href={localeHref(locale, '/')} aria-label="URIBCARE">
          <img src="/images/logo.png" alt="URIBCARE" width={160} height={54} />
        </a>
      </header>

      <main id="top" className="auth-main">
        <div className="auth-card">
          <div className="auth-head">
            <span className="eyebrow">Uribcare</span>
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>

          {children}

          {footer ? <div className="auth-foot">{footer}</div> : null}
        </div>
      </main>

      <SiteFooter base="/" locale={locale} />
    </div>
  );
}
