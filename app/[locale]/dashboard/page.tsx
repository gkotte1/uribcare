import Link from 'next/link';
import { getProfile } from '@/lib/auth';
import {
  getMyAppointments,
  getPatientProfile,
  getSavedProviders,
  getUnreadCount,
} from '@/lib/dashboard';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';
import type { PatientProfileRow } from '@/lib/database.types';
import { Arrow, Clock, Heart, Mail, Record } from '@/components/Icons';

type Params = { params: { locale: string } };

/** Fields that make a profile feel complete, for the overview hint. */
const COMPLETENESS_FIELDS: (keyof PatientProfileRow)[] = [
  'patient_name',
  'date_of_birth',
  'age_group',
  'gender',
  'phone',
  'city',
  'state',
  'patient_type',
  'care_needs',
  'service_preferences',
];

function completeness(profile: PatientProfileRow | null): number {
  if (!profile) return 0;
  let filled = 0;
  for (const key of COMPLETENESS_FIELDS) {
    const value = profile[key];
    if (Array.isArray(value) ? value.length > 0 : Boolean(value)) filled += 1;
  }
  return Math.round((filled / COMPLETENESS_FIELDS.length) * 100);
}

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default async function DashboardOverview({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  const [profile, patientProfile, { upcoming }, saved, unread] = await Promise.all([
    getProfile(),
    getPatientProfile(),
    getMyAppointments(),
    getSavedProviders(),
    getUnreadCount(),
  ]);

  const firstName = (profile?.full_name ?? '').trim().split(/\s+/)[0] || 'there';
  const next = upcoming[0] ?? null;
  const percent = completeness(patientProfile);

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Your dashboard</span>
        <h1>
          Welcome back, <span className="accent">{firstName}</span>
        </h1>
        <p className="lead">A quick look at your care, saved providers and anything that needs attention.</p>
      </div>

      <div className="dash-summary">
        <div className="sum-card">
          <span className="sum-ico"><Clock size={20} /></span>
          <span className="sum-label">Next appointment</span>
          {next ? (
            <>
              <span className="sum-value" style={{ fontSize: '1.1rem' }}>{formatWhen(next.starts_at)}</span>
              <span className="sum-sub">{next.provider?.name ?? 'Provider'}</span>
            </>
          ) : (
            <span className="sum-sub">Nothing booked yet.</span>
          )}
          <Link className="arrow-link" href={localeHref(locale, '/dashboard/appointments')}>
            View appointments <Arrow />
          </Link>
        </div>

        <div className="sum-card">
          <span className="sum-ico"><Heart size={20} /></span>
          <span className="sum-label">Saved providers</span>
          <span className="sum-value">{saved.length}</span>
          <Link className="arrow-link" href={localeHref(locale, '/dashboard/saved')}>
            View saved <Arrow />
          </Link>
        </div>

        <div className="sum-card">
          <span className="sum-ico"><Mail size={20} /></span>
          <span className="sum-label">Unread notifications</span>
          <span className="sum-value">{unread}</span>
          <Link className="arrow-link" href={localeHref(locale, '/dashboard/notifications')}>
            Open inbox <Arrow />
          </Link>
        </div>

        <div className="sum-card">
          <span className="sum-ico"><Record size={20} /></span>
          <span className="sum-label">Profile complete</span>
          <span className="sum-value">{percent}%</span>
          <div className="meter" aria-hidden="true">
            <span style={{ width: `${percent}%` }} />
          </div>
          <Link className="arrow-link" href={localeHref(locale, '/dashboard/profile')}>
            {percent < 100 ? 'Complete profile' : 'Review profile'} <Arrow />
          </Link>
        </div>
      </div>

      <div className="dash-quick">
        <Link className="btn btn-primary" href={localeHref(locale, '/search')}>
          Find care
        </Link>
        <Link className="btn btn-ghost" href={localeHref(locale, '/dashboard/profile')}>
          {percent < 100 ? 'Complete your profile' : 'Update your profile'}
        </Link>
      </div>
    </>
  );
}
