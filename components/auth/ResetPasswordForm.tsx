'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updatePassword } from '@/app/actions/auth';
import type { Locale } from '@/lib/i18n';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={pending} aria-busy={pending}>
      {pending ? 'Updating…' : 'Update password'}
    </button>
  );
}

export default function ResetPasswordForm({ locale }: { locale: Locale }) {
  // updatePassword redirects on success, so state only ever carries an error.
  const [state, formAction] = useFormState(updatePassword, { ok: false });

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

      <input type="hidden" name="locale" value={locale} />

      <div className="field">
        <label htmlFor="password">New password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
      </div>

      <div className="field">
        <label htmlFor="confirm">Confirm new password</label>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} required />
      </div>

      <SubmitButton />
    </form>
  );
}
