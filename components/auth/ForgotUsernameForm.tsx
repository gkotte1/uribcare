'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { recoverUsername } from '@/app/actions/auth';
import { Check } from '@/components/Icons';
import type { Locale } from '@/lib/i18n';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={pending} aria-busy={pending}>
      {pending ? 'Sending…' : 'Recover username'}
    </button>
  );
}

export default function ForgotUsernameForm({ locale }: { locale: Locale }) {
  const [state, formAction] = useFormState(recoverUsername, { ok: false });

  return (
    <form action={formAction} noValidate>
      {state.error ? (
        <div className="auth-banner err" role="alert">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{state.error}</span>
        </div>
      ) : null}
      {state.message ? (
        <div className="auth-banner ok" role="status">
          <Check size={18} />
          <span>{state.message}</span>
        </div>
      ) : null}

      <input type="hidden" name="locale" value={locale} />

      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required />
      </div>

      <SubmitButton />
    </form>
  );
}
