import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import ProviderCard from '@/components/directory/ProviderCard';
import SearchFilters from '@/components/directory/SearchFilters';
import '@/components/directory/directory.css';
import { searchProviders, listProviderStates, kindForSlug, PROVIDER_KINDS } from '@/lib/providers';
import { getSavedProviderIds } from '@/lib/dashboard';
import { isSupabaseConfigured } from '@/lib/auth';
import { alternatesFor, isLocale, localeHref, type Locale } from '@/lib/i18n';
import type { ProviderKind } from '@/lib/database.types';

const CATEGORY_LABEL: Record<ProviderKind, string> = {
  counselor: 'Counseling',
  doctor: 'Doctors',
  therapist: 'Therapy',
  nutritionist: 'Nutrition',
  pharmacy: 'Pharmacies',
  laboratory: 'Laboratories',
};

export function generateStaticParams() {
  return PROVIDER_KINDS.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const kind = kindForSlug(params.slug);
  if (!kind) return { title: 'Directory | Uribcare' };
  const label = CATEGORY_LABEL[kind];
  return {
    title: `${label} | Uribcare directory`,
    description: `Browse ${label.toLowerCase()} in the Uribcare provider directory.`,
    alternates: alternatesFor(`/directory/${params.slug}`),
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const kind = kindForSlug(params.slug);
  if (!kind) notFound();

  const label = CATEGORY_LABEL[kind];

  if (!isSupabaseConfigured()) {
    return (
      <>
        <Nav />
        <main id="top" className="dir-main">
          <section className="wrap dir-notice">
            <span className="eyebrow">{label}</span>
            <h1>Not available yet</h1>
            <p>
              The directory is not available until the backend is configured. See{' '}
              <code>SETUP.md</code>.
            </p>
          </section>
        </main>
        <SiteFooter locale={locale} />
      </>
    );
  }

  const [providers, states, savedIds] = await Promise.all([
    searchProviders({ kind }),
    listProviderStates(),
    getSavedProviderIds(),
  ]);
  const count = providers.length;

  return (
    <>
      <Nav />
      <main id="top" className="dir-main">
        <section className="wrap dir-head">
          <Link className="dir-back" href={localeHref(locale, '/directory')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            All categories
          </Link>
          <span className="eyebrow">Care directory</span>
          <h1>{label}</h1>
          <p className="lead">
            {count} {count === 1 ? 'provider' : 'providers'} in this category. Use the filters to
            narrow by location, insurance or availability.
          </p>
        </section>

        <section className="wrap dir-toolbar">
          <SearchFilters
            locale={locale}
            states={states}
            basePath={`${locale === 'en' ? '' : `/${locale}`}/directory/${params.slug}`}
            lockKind={kind}
            variant="row"
          />

          <div>
            {count > 0 ? (
              <div className="prov-grid">
                {providers.map((p) => (
                  <ProviderCard
                    key={p.id}
                    provider={p}
                    locale={locale}
                    saved={savedIds.has(p.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="dir-empty">
                <span className="dir-empty-ico" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                </span>
                <h3>No {label.toLowerCase()} listed yet</h3>
                <p>Check back soon, or search across every category in the directory.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
