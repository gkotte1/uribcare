/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import SaveButton from '@/components/directory/SaveButton';
import type { ProviderKind, ProviderRow } from '@/lib/database.types';
import { localeHref, type Locale } from '@/lib/i18n';
import './directory.css';

/** Singular, human labels for each provider kind. */
export const KIND_LABEL: Record<ProviderKind, string> = {
  counselor: 'Counselor',
  doctor: 'Doctor',
  therapist: 'Therapist',
  nutritionist: 'Nutritionist',
  pharmacy: 'Pharmacy',
  laboratory: 'Laboratory',
};

const StarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.9 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21c-4.5-3.8-7-6.9-7-10.4A7 7 0 0 1 19 10.6c0 3.5-2.5 6.6-7 10.4z" />
    <circle cx="12" cy="10.5" r="2.4" />
  </svg>
);

const CheckBadge = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12l4 4L19 6" />
  </svg>
);

/** Small star rating + review count, reused on the profile page. */
export function RatingBadge({ rating, reviewCount }: { rating: number | null; reviewCount: number }) {
  if (rating == null) return null;
  return (
    <span className="prov-rating">
      <StarIcon />
      {rating.toFixed(1)}
      {reviewCount > 0 ? <span className="rc">({reviewCount})</span> : null}
    </span>
  );
}

export default function ProviderCard({
  provider: p,
  locale,
  saved = false,
}: {
  provider: ProviderRow;
  locale: Locale;
  saved?: boolean;
}) {
  const services = (p.services ?? []).slice(0, 3);
  const extra = (p.services ?? []).length - services.length;
  const location = [p.city, p.state].filter(Boolean).join(', ');

  return (
    <article className="prov-card">
      <SaveButton providerId={p.id} initialSaved={saved} />

      <Link className="prov-card-link" href={localeHref(locale, `/providers/${p.id}`)}>
        <div className="prov-card-top">
          <span className="prov-kind">{KIND_LABEL[p.kind]}</span>
          {p.verified ? (
            <span className="prov-verified">
              <CheckBadge /> Verified
            </span>
          ) : null}
        </div>

        <h3 className="prov-name">{p.name}</h3>
        {p.specialty ? <p className="prov-specialty">{p.specialty}</p> : null}

        <div className="prov-meta">
          {location ? (
            <span className="prov-meta-item">
              <PinIcon /> {location}
            </span>
          ) : null}
          <RatingBadge rating={p.rating} reviewCount={p.review_count} />
        </div>

        {services.length ? (
          <div className="prov-chips">
            {services.map((s) => (
              <span className="prov-chip" key={s}>
                {s}
              </span>
            ))}
            {extra > 0 ? <span className="prov-chip more">+{extra} more</span> : null}
          </div>
        ) : null}

        <div className="prov-card-foot">
          <span className={`prov-status ${p.accepting_new ? 'open' : 'closed'}`}>
            <span className="dot" aria-hidden="true" />
            {p.accepting_new ? 'Accepting new patients' : 'Not accepting new'}
          </span>
        </div>
      </Link>
    </article>
  );
}
