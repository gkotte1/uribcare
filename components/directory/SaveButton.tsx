'use client';

import { useState, useTransition } from 'react';
import { toggleSavedProvider } from '@/app/actions/account';

/**
 * Heart toggle that saves / unsaves a provider. Optimistic: the icon flips
 * immediately, then reconciles with the server result from the action. When the
 * visitor is signed out the action returns `{ saved: false }`, so the heart
 * simply stays empty.
 */
export default function SaveButton({
  providerId,
  initialSaved = false,
  inline = false,
}: {
  providerId: string;
  initialSaved?: boolean;
  inline?: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [pending, startTransition] = useTransition();

  const toggle = (e: React.MouseEvent) => {
    // The card wraps the button in a stretched link; keep the click local.
    e.preventDefault();
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    startTransition(async () => {
      const res = await toggleSavedProvider(providerId);
      setSaved(res.saved);
    });
  };

  return (
    <button
      type="button"
      className={`save-btn${inline ? ' inline' : ''}${saved ? ' is-saved' : ''}`}
      onClick={toggle}
      disabled={pending}
      data-pending={pending || undefined}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from saved providers' : 'Save this provider'}
      title={saved ? 'Saved' : 'Save provider'}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 21c-4.5-3-8-6.2-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.8-3.5 8-8 11z" />
      </svg>
      {inline ? <span>{saved ? 'Saved' : 'Save provider'}</span> : null}
    </button>
  );
}
