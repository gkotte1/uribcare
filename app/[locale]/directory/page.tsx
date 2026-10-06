import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import { Arrow, Counseling, Stethoscope, Puzzle, HeartCare, Pharmacy, Flask } from '@/components/Icons';
import '@/components/directory/directory.css';
import { PROVIDER_KINDS, countByKind } from '@/lib/providers';
import { isSupabaseConfigured } from '@/lib/auth';
import { alternatesFor, isLocale, localeHref, type Locale } from '@/lib/i18n';
import type { ProviderKind } from '@/lib/database.types';

export const metadata: Metadata = {
  title: 'Care & service directory | Uribcare',
  description:
    'Browse Uribcare providers by category: counseling, doctors, therapy, nutrition, pharmacies and laboratories.',
  alternates: alternatesFor('/directory'),
};

const KIND_META: Record<ProviderKind, { label: string; blurb: string; Icon: typeof Stethoscope }> = {
  counselor: {
    label: 'Counseling',
    blurb: 'Licensed counselors for emotional, behavioral and family support.',
    Icon: Counseling,
  },
  doctor: {
    label: 'Doctors',
    blurb: 'Primary and specialist physicians for in person and virtual visits.',
    Icon: Stethoscope,
  },
  therapist: {
    label: 'Therapy',
    blurb: 'Speech, occupational, physical and behavioral therapists.',
    Icon: Puzzle,
  },
  nutritionist: {
    label: 'Nutrition',
    blurb: 'Dietitians and nutritionists for personalized care plans.',
    Icon: HeartCare,
  },
  pharmacy: {
    label: 'Pharmacies',
    blurb: 'Trusted pharmacies for prescriptions and medication support.',
    Icon: Pharmacy,
  },
  laboratory: {
    label: 'Laboratories',
    blurb: 'Diagnostic labs for testing, screening and results.',
    Icon: Flask,
  },
};

export default async function DirectoryPage({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <>
        <Nav />
        <main id="top" className="dir-main">
          <section className="wrap dir-notice">
            <span className="eyebrow">Care directory</span>
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

  const counts = await countByKind();

  return (
    <>
      <Nav />
      <main id="top" className="dir-main">
        <section className="wrap dir-head">
          <span className="eyebrow">Care &amp; service directory</span>
          <h1>Browse by category</h1>
          <p className="lead">
            Every Uribcare provider, organized into six connected categories. Choose where you want
            to start, or <Link href={localeHref(locale, '/search')}>search across all of them</Link>.
          </p>
        </section>

        <section className="wrap">
          <div className="dir-cats">
            {PROVIDER_KINDS.map(({ kind, slug }) => {
              const meta = KIND_META[kind];
              const n = counts[kind] ?? 0;
              const Icon = meta.Icon;
              return (
                <article className="dir-cat" key={slug}>
                  <span className="dir-cat-ico" aria-hidden="true">
                    <Icon size={26} />
                  </span>
                  <h3>{meta.label}</h3>
                  <p>{meta.blurb}</p>
                  <div className="dir-cat-foot">
                    <span className="dir-cat-count">
                      {n} {n === 1 ? 'provider' : 'providers'}
                    </span>
                    <Link className="dir-cat-link dir-cat-go" href={localeHref(locale, `/directory/${slug}`)}>
                      Browse <Arrow size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
