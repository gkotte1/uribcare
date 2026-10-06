/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { isSupabaseConfigured, requireUser } from '@/lib/auth';
import { getUnreadCount } from '@/lib/dashboard';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';
import DashboardNav from '@/components/dashboard/DashboardNav';
import SignOutButton from '@/components/dashboard/SignOutButton';
import '@/components/dashboard/dashboard.css';

type Params = { params: { locale: string } };

export default async function DashboardLayout({
  children,
  params,
}: Params & { children: React.ReactNode }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  // Without a configured backend there is no session to guard, so show a
  // setup notice instead of attempting (and failing) the auth redirect.
  if (!isSupabaseConfigured()) {
    return (
      <div className="dash">
        <div className="dash-setup wrap">
          <div className="dcard">
            <h1>Your dashboard is almost ready</h1>
            <p>
              Connect the backend (see <code>SETUP.md</code>) to use your dashboard.
            </p>
          </div>
        </div>
      </div>
    );
  }

  await requireUser(locale, '/dashboard');
  const unread = await getUnreadCount();

  return (
    <div className="dash">
      <header className="dash-header">
        <div className="dash-header-inner">
          <Link href={localeHref(locale, '/')} className="brand" aria-label="Uribcare home">
            <img
              className="brand-logo"
              src="/images/logo.png"
              alt="URIBCARE"
              width={200}
              height={67}
              decoding="sync"
            />
          </Link>
          <SignOutButton locale={locale} />
        </div>
      </header>

      <div className="dash-body">
        <aside className="dash-aside">
          <DashboardNav locale={locale} unread={unread} />
        </aside>
        <main className="dash-main">{children}</main>
      </div>
    </div>
  );
}
