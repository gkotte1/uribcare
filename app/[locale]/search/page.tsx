import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import ProviderCard from '@/components/directory/ProviderCard';
import SearchFilters from '@/components/directory/SearchFilters';
import '@/components/directory/directory.css';
import { searchProviders, listProviderStates, PROVIDER_KINDS, type ProviderFilters } from '@/lib/providers';
import { getSavedProviderIds } from '@/lib/dashboard';
import { isSupabaseConfigured } from '@/lib/auth';
import { alternatesFor, isLocale, type Locale } from '@/lib/i18n';
import type { ProviderKind } from '@/lib/database.types';

export const metadata: Metadata = {
  title: 'Find care | Uribcare',
  description:
    'Search the Uribcare directory of doctors, therapists, counselors, nutritionists, pharmacies and labs. Filter by category, state, insurance and availability.',
  alternates: alternatesFor('/search'),
};

type SearchParams = { [key: string]: string | string[] | undefined };

const one = (v: string | string[] | undefined): string =>
  (Array.isArray(v) ? v[0] : v)?.trim() ?? '';

const VALID_KINDS = new Set(PROVIDER_KINDS.map((k) => k.kind));

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: SearchParams;
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return <SetupNotice locale={locale} />;
  }

  const q = one(searchParams.q);
  const kindRaw = one(searchParams.kind);
  const kind = (VALID_KINDS.has(kindRaw as ProviderKind) ? kindRaw : '') as ProviderKind | '';
  const state = one(searchParams.state);
  const insurance = one(searchParams.insurance);
  const service = one(searchParams.service);
  const acceptingNewRaw = one(searchParams.acceptingNew);
  const acceptingNew = acceptingNewRaw === '1' || acceptingNewRaw === 'true';

  const filters: ProviderFilters = {};
  if (q) filters.q = q;
  if (kind) filters.kind = kind;
  if (state) filters.state = state;
  if (insurance) filters.insurance = insurance;
  if (service) filters.service = service;
  if (acceptingNew) filters.acceptingNew = true;

  const [providers, states, savedIds] = await Promise.all([
    searchProviders(filters),
    listProviderStates(),
    getSavedProviderIds(),
  ]);

  const count = providers.length;

  return (
    <>
      <Nav />
      <main id="top" className="dir-main">
        <section className="wrap dir-head">
          <span className="eyebrow">Provider directory</span>
          <h1>Find the right care</h1>
          <p className="lead">
            Search across every Uribcare provider and narrow by category, location, insurance and
            whether they are taking new patients.
          </p>
        </section>

        <section className="wrap dir-toolbar with-aside">
          <aside>
            <SearchFilters
              locale={locale}
              states={states}
              basePath={`${locale === 'en' ? '' : `/${locale}`}/search`}
              initial={{ q, kind, state, insurance, acceptingNew }}
            />
          </aside>

          <div>
            <div className="results-head">
              <h2>Results</h2>
              <span className="results-count">
                {count} {count === 1 ? 'provider' : 'providers'}
              </span>
            </div>

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
                <h3>No providers match those filters</h3>
                <p>Try widening your search by removing a filter or clearing the search term.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}

function SetupNotice({ locale }: { locale: Locale }) {
  return (
    <>
      <Nav />
      <main id="top" className="dir-main">
        <section className="wrap dir-notice">
          <span className="eyebrow">Provider directory</span>
          <h1>Not available yet</h1>
          <p>
            The directory is not available until the backend is configured. See <code>SETUP.md</code>.
          </p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
