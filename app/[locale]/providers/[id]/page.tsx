/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import { KIND_LABEL, RatingBadge } from '@/components/directory/ProviderCard';
import SaveButton from '@/components/directory/SaveButton';
import ConnectOptions from '@/components/directory/ConnectOptions';
import BookingForm from '@/components/directory/BookingForm';
import '@/components/directory/directory.css';
import { getProvider } from '@/lib/providers';
import { getSavedProviderIds } from '@/lib/dashboard';
import { getUser, isSupabaseConfigured } from '@/lib/auth';
import { alternatesFor, isLocale, localeHref, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  if (!isSupabaseConfigured()) return { title: 'Provider | Uribcare' };
  const provider = await getProvider(params.id);
  if (!provider) return { title: 'Provider not found | Uribcare' };
  const bits = [provider.title, provider.specialty, [provider.city, provider.state].filter(Boolean).join(', ')]
    .filter(Boolean)
    .join(' - ');
  return {
    title: `${provider.name} | Uribcare`,
    description: provider.bio ?? (bits || `${provider.name} on Uribcare.`),
    alternates: alternatesFor(`/providers/${params.id}`),
  };
}

export default async function ProviderProfilePage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <>
        <Nav />
        <main id="top" className="dir-main">
          <section className="wrap dir-notice">
            <span className="eyebrow">Provider profile</span>
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

  const [provider, savedIds, user] = await Promise.all([
    getProvider(params.id),
    getSavedProviderIds(),
    getUser(),
  ]);
  if (!provider) notFound();

  const location = [provider.city, provider.state].filter(Boolean).join(', ');
  const fullAddress = [provider.address, provider.city, provider.state, provider.zip]
    .filter(Boolean)
    .join(', ');
  const services = provider.services ?? [];
  const insurance = provider.insurance ?? [];
  const initial = provider.name.trim().charAt(0).toUpperCase() || '?';
  const loginHref = localeHref(locale, `/login?next=${encodeURIComponent(`/providers/${provider.id}`)}`);

  return (
    <>
      <Nav />
      <main id="top" className="dir-main profile-main">
        <div className="wrap">
          <Link className="dir-back" href={localeHref(locale, '/search')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
            Back to search
          </Link>

          <div className="profile-layout">
            {/* ---------------------------------- main column --------------- */}
            <div>
              <header className="profile-hero">
                {provider.image_url ? (
                  <img className="profile-avatar" src={provider.image_url} alt="" width={84} height={84} />
                ) : (
                  <span className="profile-avatar" aria-hidden="true">
                    {initial}
                  </span>
                )}
                <div className="profile-hero-body">
                  <div className="profile-badges">
                    <span className="prov-kind">{KIND_LABEL[provider.kind]}</span>
                    {provider.verified ? (
                      <span className="prov-verified">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                        Verified
                      </span>
                    ) : null}
                  </div>
                  <h1>{provider.name}</h1>
                  {provider.title ? <p className="profile-title">{provider.title}</p> : null}
                  <div className="profile-hero-meta">
                    {provider.specialty ? <span>{provider.specialty}</span> : null}
                    {location ? (
                      <span className="prov-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 21c-4.5-3.8-7-6.9-7-10.4A7 7 0 0 1 19 10.6c0 3.5-2.5 6.6-7 10.4z" />
                          <circle cx="12" cy="10.5" r="2.4" />
                        </svg>
                        {location}
                      </span>
                    ) : null}
                    <RatingBadge rating={provider.rating} reviewCount={provider.review_count} />
                  </div>
                  <div className="profile-badges" style={{ marginTop: '.85rem' }}>
                    <span className={`prov-status ${provider.accepting_new ? 'open' : 'closed'}`}>
                      <span className="dot" aria-hidden="true" />
                      {provider.accepting_new ? 'Accepting new patients' : 'Not accepting new patients'}
                    </span>
                  </div>
                </div>
              </header>

              {provider.bio ? (
                <section className="profile-section">
                  <h2>About</h2>
                  <p>{provider.bio}</p>
                </section>
              ) : null}

              {services.length ? (
                <section className="profile-section">
                  <h2>Services</h2>
                  <div className="prov-chips">
                    {services.map((s) => (
                      <span className="prov-chip" key={s}>
                        {s}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {(provider.qualifications || provider.years_experience != null || provider.npi || fullAddress) ? (
                <section className="profile-section">
                  <h2>Credentials &amp; details</h2>
                  <dl className="profile-facts">
                    {provider.qualifications ? (
                      <div className="profile-fact">
                        <dt>Qualifications</dt>
                        <dd>{provider.qualifications}</dd>
                      </div>
                    ) : null}
                    {provider.years_experience != null ? (
                      <div className="profile-fact">
                        <dt>Experience</dt>
                        <dd>
                          {provider.years_experience} {provider.years_experience === 1 ? 'year' : 'years'}
                        </dd>
                      </div>
                    ) : null}
                    {provider.npi ? (
                      <div className="profile-fact">
                        <dt>NPI</dt>
                        <dd>{provider.npi}</dd>
                      </div>
                    ) : null}
                    {fullAddress ? (
                      <div className="profile-fact">
                        <dt>Location</dt>
                        <dd>{fullAddress}</dd>
                      </div>
                    ) : null}
                    {provider.website ? (
                      <div className="profile-fact">
                        <dt>Website</dt>
                        <dd>
                          <a href={provider.website} target="_blank" rel="noopener noreferrer">
                            {provider.website.replace(/^https?:\/\//, '')}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </section>
              ) : null}

              {insurance.length ? (
                <section className="profile-section">
                  <h2>Insurance accepted</h2>
                  <div className="prov-chips">
                    {insurance.map((i) => (
                      <span className="prov-chip" key={i}>
                        {i}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            {/* ---------------------------------- right rail ---------------- */}
            <aside className="profile-aside">
              <div className="aside-card">
                <div className="aside-actions">
                  <SaveButton providerId={provider.id} initialSaved={savedIds.has(provider.id)} inline />
                </div>
              </div>

              <div className="aside-card">
                <h2>Connect</h2>
                <ConnectOptions provider={provider} />
              </div>

              <div className="aside-card">
                <h2>Book an appointment</h2>
                {user ? (
                  <BookingForm providerId={provider.id} />
                ) : (
                  <div className="booking-signin">
                    <p>Sign in to request an appointment with {provider.name}.</p>
                    <Link className="btn btn-primary btn-lg" href={loginHref}>
                      Sign in to book
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
