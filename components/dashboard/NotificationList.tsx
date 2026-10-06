'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { markAllNotificationsRead, markNotificationRead } from '@/app/actions/account';
import { localeHref, type Locale } from '@/lib/i18n';
import type { NotificationRow } from '@/lib/database.types';
import { Check } from '@/components/Icons';

function formatWhen(iso: string): string {
  return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

function MarkAllButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-ghost btn-sm" disabled={disabled || pending} aria-busy={pending}>
      {pending ? 'Working...' : 'Mark all read'}
    </button>
  );
}

function MarkReadButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-quiet btn-sm" disabled={pending} aria-busy={pending}>
      {pending ? '...' : 'Mark read'}
    </button>
  );
}

export default function NotificationList({ items, locale }: { items: NotificationRow[]; locale: Locale }) {
  const hasUnread = items.some((n) => !n.read);

  return (
    <>
      <div className="notif-toolbar">
        <form action={() => markAllNotificationsRead()}>
          <MarkAllButton disabled={!hasUnread} />
        </form>
      </div>

      <ul className="notif-list">
        {items.map((n) => (
          <li key={n.id} className={`notif${n.read ? '' : ' is-unread'}`}>
            <div className="notif-main">
              <div className="notif-head">
                <span className="notif-type">{n.type}</span>
                {!n.read ? <span className="notif-dot" aria-label="Unread" /> : null}
              </div>
              <h3 className="notif-title">
                {n.href ? <Link href={localeHref(locale, n.href)}>{n.title}</Link> : n.title}
              </h3>
              {n.body ? <p className="notif-body">{n.body}</p> : null}
              <time className="notif-time" dateTime={n.created_at}>{formatWhen(n.created_at)}</time>
            </div>
            <div className="notif-side">
              {!n.read ? (
                <form action={() => markNotificationRead(n.id)}>
                  <MarkReadButton />
                </form>
              ) : (
                <span className="pill pill-mute"><Check size={13} /> Read</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
