import { getNotifications } from '@/lib/dashboard';
import { isLocale, type Locale } from '@/lib/i18n';
import NotificationList from '@/components/dashboard/NotificationList';
import { Mail } from '@/components/Icons';

type Params = { params: { locale: string } };

export default async function NotificationsPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const items = await getNotifications();

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Notifications</span>
        <h1>Notifications</h1>
        <p className="lead">Appointment updates, referrals and account notices in one place.</p>
      </div>

      {items.length === 0 ? (
        <div className="dash-empty">
          <span className="empty-ico"><Mail size={24} /></span>
          <h3>You are all caught up</h3>
          <p>New notifications about your appointments and referrals will show up here.</p>
        </div>
      ) : (
        <NotificationList items={items} locale={locale} />
      )}
    </>
  );
}
