import type { ProviderRow } from '@/lib/database.types';

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);
const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
  </svg>
);
const VideoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="6" width="13" height="12" rx="2" />
    <path d="M16 10l5-3v10l-5-3z" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
  </svg>
);
const ExtIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);

/**
 * Connect affordances built from the provider's `connection` object. Only the
 * options that exist are shown; if none do, nothing renders.
 */
export default function ConnectOptions({ provider }: { provider: ProviderRow }) {
  const c = provider.connection ?? {};
  const phone = c.phone ?? provider.phone ?? undefined;
  const hasAny = Boolean(phone || c.message || c.video || c.appointment_url);
  if (!hasAny) return null;

  return (
    <div className="connect">
      {phone ? (
        <a className="connect-btn" href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
          <span className="ic">
            <PhoneIcon />
          </span>
          <span className="connect-txt">
            Call
            <span>{phone}</span>
          </span>
        </a>
      ) : null}

      {c.message ? (
        <a className="connect-btn" href={provider.email ? `mailto:${provider.email}` : '#book'}>
          <span className="ic">
            <ChatIcon />
          </span>
          <span className="connect-txt">
            Message
            {provider.email ? <span>{provider.email}</span> : <span>Send a secure note</span>}
          </span>
        </a>
      ) : null}

      {c.video ? (
        <a className="connect-btn" href="#book">
          <span className="ic">
            <VideoIcon />
          </span>
          <span className="connect-txt">
            Video visit
            <span>Request a telehealth appointment</span>
          </span>
        </a>
      ) : null}

      {c.appointment_url ? (
        <a className="connect-btn" href={c.appointment_url} target="_blank" rel="noopener noreferrer">
          <span className="ic">
            <GlobeIcon />
          </span>
          <span className="connect-txt">
            Book online
            <span>Opens the provider&rsquo;s scheduler</span>
          </span>
          <span className="ext">
            <ExtIcon />
          </span>
        </a>
      ) : null}
    </div>
  );
}
