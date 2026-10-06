'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localeHref, stripLocale, type Locale } from '@/lib/i18n';
import { Home, Clock, Heart, Lines, Mail, Record } from '@/components/Icons';

type Item = { href: string; label: string; Icon: (p: { size?: number }) => JSX.Element; notif?: boolean };

const ITEMS: Item[] = [
  { href: '/dashboard', label: 'Overview', Icon: Home },
  { href: '/dashboard/appointments', label: 'Appointments', Icon: Clock },
  { href: '/dashboard/saved', label: 'Saved', Icon: Heart },
  { href: '/dashboard/referrals', label: 'Referrals', Icon: Lines },
  { href: '/dashboard/notifications', label: 'Notifications', Icon: Mail, notif: true },
  { href: '/dashboard/profile', label: 'Profile', Icon: Record },
];

export default function DashboardNav({ locale, unread }: { locale: Locale; unread: number }) {
  // usePathname reports the middleware-rewritten path (with the /en or /es
  // prefix), so strip the locale before comparing to the shared routes.
  const current = stripLocale(usePathname() || '/');

  return (
    <nav className="dash-nav" aria-label="Dashboard">
      {ITEMS.map(({ href, label, Icon, notif }) => {
        const active = href === '/dashboard' ? current === href : current === href || current.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={localeHref(locale, href)}
            className={`dash-nav-link${active ? ' is-active' : ''}`}
            aria-current={active ? 'page' : undefined}
          >
            <span className="dash-nav-ico"><Icon size={18} /></span>
            <span>{label}</span>
            {notif && unread > 0 ? (
              <span className="dash-badge" aria-label={`${unread} unread`}>{unread}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
