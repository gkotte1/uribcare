import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import RegistrationTabs from '@/components/register/RegistrationTabs';
import { getDictionary } from '@/content/dictionary';
import { alternatesFor, isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);
  return {
    title: t.register.title,
    description: t.register.description,
    alternates: alternatesFor('/register'),
  };
}

export default function RegisterPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  return (
    <>
      <Nav />

      <main id="top">
        <section className="reg-page">
          <div className="wrap">
            <div className="reg-head">
              <span className="eyebrow">{t.register.eyebrow}</span>
              <h1>{t.register.heading}</h1>
              <p className="lead">{t.register.subheading}</p>
            </div>

            <RegistrationTabs />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
