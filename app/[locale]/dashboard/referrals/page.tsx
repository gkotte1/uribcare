import { getReferrals } from '@/lib/dashboard';
import { isLocale, type Locale } from '@/lib/i18n';
import type { ReferralStatus } from '@/lib/database.types';
import { Lines } from '@/components/Icons';

type Params = { params: { locale: string } };

const STATUS_PILL: Record<ReferralStatus, string> = {
  open: 'pill-amber',
  accepted: 'pill-green',
  completed: 'pill-mute',
  declined: 'pill-red',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { dateStyle: 'medium' });
}

export default async function ReferralsPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  // locale is kept for parity with the other dashboard pages.
  void locale;
  const referrals = await getReferrals();

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Referrals</span>
        <h1>Your referrals</h1>
        <p className="lead">Referrals your care team has made to other providers in the network.</p>
      </div>

      {referrals.length === 0 ? (
        <div className="dash-empty">
          <span className="empty-ico"><Lines size={24} /></span>
          <h3>No referrals yet</h3>
          <p>When a provider refers you on to another specialist, the referral will be listed here.</p>
        </div>
      ) : (
        <div className="ref-list">
          {referrals.map((ref) => (
            <article key={ref.id} className="ref">
              <div>
                <span className="ref-name">{ref.provider?.name ?? 'Pending provider match'}</span>
                {ref.note ? <p className="ref-note">{ref.note}</p> : null}
                <time className="ref-time" dateTime={ref.created_at}>{formatDate(ref.created_at)}</time>
              </div>
              <span className={`pill ${STATUS_PILL[ref.status]}`}>{ref.status}</span>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
