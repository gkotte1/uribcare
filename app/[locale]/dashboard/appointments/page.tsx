import Link from 'next/link';
import { getMyAppointments } from '@/lib/dashboard';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';
import type { AppointmentMode, AppointmentRow, AppointmentStatus, ProviderRow } from '@/lib/database.types';
import AppointmentActions from '@/components/dashboard/AppointmentActions';
import { Clock } from '@/components/Icons';

type Params = { params: { locale: string } };
type Appt = AppointmentRow & { provider: ProviderRow | null };

const STATUS_PILL: Record<AppointmentStatus, string> = {
  requested: 'pill-amber',
  confirmed: 'pill-green',
  rescheduled: 'pill-blue',
  cancelled: 'pill-red',
  completed: 'pill-mute',
};

const MODE_LABEL: Record<AppointmentMode, string> = {
  in_person: 'In person',
  video: 'Video visit',
  phone: 'Phone call',
};

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function AppointmentItem({ appt, locale, actionable }: { appt: Appt; locale: Locale; actionable: boolean }) {
  return (
    <article className="appt">
      <div className="appt-info">
        <div className="appt-top">
          <span className="appt-name">{appt.provider?.name ?? 'Provider'}</span>
          <span className={`pill ${STATUS_PILL[appt.status]}`}>{appt.status}</span>
        </div>
        <div className="appt-meta">
          <span className="m"><Clock size={15} /> {formatWhen(appt.starts_at)}</span>
          <span className="m">{MODE_LABEL[appt.mode]}</span>
        </div>
        {appt.reason ? <p className="appt-reason">{appt.reason}</p> : null}
      </div>
      <div className="appt-side">
        {actionable ? (
          <AppointmentActions id={appt.id} mode={appt.mode} starts_at={appt.starts_at} locale={locale} />
        ) : null}
      </div>
    </article>
  );
}

export default async function AppointmentsPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const { upcoming, past } = await getMyAppointments();

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Appointments</span>
        <h1>Your appointments</h1>
        <p className="lead">Track, reschedule or cancel upcoming visits, and review past ones.</p>
      </div>

      <section className="dash-section">
        <div className="dash-section-head">
          <h2>Upcoming</h2>
          <span className="count">{upcoming.length}</span>
        </div>
        {upcoming.length === 0 ? (
          <div className="dash-empty">
            <span className="empty-ico"><Clock size={24} /></span>
            <h3>No upcoming appointments</h3>
            <p>When you book a visit with a provider it will appear here.</p>
            <Link className="btn btn-primary" href={localeHref(locale, '/search')}>Find care</Link>
          </div>
        ) : (
          <div className="appt-list">
            {upcoming.map((appt) => (
              <AppointmentItem
                key={appt.id}
                appt={appt}
                locale={locale}
                actionable={appt.status !== 'cancelled'}
              />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 ? (
        <section className="dash-section">
          <div className="dash-section-head">
            <h2>Past</h2>
            <span className="count">{past.length}</span>
          </div>
          <div className="appt-list">
            {past.map((appt) => (
              <AppointmentItem key={appt.id} appt={appt} locale={locale} actionable={false} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
