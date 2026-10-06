'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signIn } from '@/app/actions/auth';
import { Check } from '@/components/Icons';
import type { Locale } from '@/lib/i18n';

/** Full-width submit that reflects the form's pending state. */
function SubmitButton({ label, pendingLabel }: { label: string; pendingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={pending} aria-busy={pending}>
      {pending ? pendingLabel : label}
    </button>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="auth-banner err" role="alert">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

export default function LoginForm({ locale, next }: { locale: Locale; next: string }) {
  // signIn redirects on success, so state only ever carries an error.
  const [state, formAction] = useFormState(signIn, { ok: false });

  return (
    <form action={formAction} noValidate>
      {state.error ? <ErrorBanner message={state.error} /> : null}
      {state.message ? (
        <div className="auth-banner ok" role="status">
          <Check size={18} />
          <span>{state.message}</span>
        </div>
      ) : null}

      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="next" value={next} />

      <div className="field">
        <label htmlFor="identifier">Email, username or phone</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>

      <SubmitButton label="Sign in" pendingLabel="Signing in…" />
    </form>
  );
}
