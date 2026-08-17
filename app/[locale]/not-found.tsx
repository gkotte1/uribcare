import Link from 'next/link';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import { getDictionary } from '@/content/dictionary';
import { DEFAULT_LOCALE, localeHref } from '@/lib/i18n';

/**
 * Rendered for any unmatched URL. It sits inside the `[locale]` segment so it
 * inherits the locale layout and the correct `<html lang>`; middleware rewrites
 * unprefixed URLs into the default locale before they reach here.
 */
export default function NotFound() {
  const locale = DEFAULT_LOCALE;
  const t = getDictionary(locale).notFound;
  const path = (to: string) => localeHref(locale, to);

  return (
    <>
      <Nav />

      <main id="top">
        <section className="band notfound">
          <div className="wrap">
            <div className="band-head center">
              <span className="eyebrow">{t.eyebrow}</span>
              <h1>{t.heading}</h1>
              <p className="lead">{t.body}</p>
            </div>
            <div className="hero-cta notfound-cta">
              <Link href={path('/')} className="btn btn-primary btn-lg">
                {t.backHome}
              </Link>
              <Link href={path('/register')} className="btn btn-ghost btn-lg">
                {t.registration}
              </Link>
            </div>
            <div className="provider-row notfound-links">
              <Link className="pchip pchip-link" href={path('/#services')}>
                {t.ourServices}
              </Link>
              <Link className="pchip pchip-link" href={path('/#ecosystem')}>
                {t.theEcosystem}
              </Link>
              <Link className="pchip pchip-link" href={path('/#journey')}>
                {t.howItWorks}
              </Link>
              <Link className="pchip pchip-link" href={path('/#contact')}>
                {t.bookDemo}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter base="/" locale={locale} />
    </>
  );
}
