'use client';

import { signOut } from '@/app/actions/auth';
import type { Locale } from '@/lib/i18n';

/**
 * A client component cannot define an inline server action, so it binds the
 * locale onto the imported `signOut` server action and hands that to the form's
 * `action` prop. Next 14 runs the server action on submit and performs the
 * redirect to the login page.
 */
export default function SignOutButton({ locale }: { locale: Locale }) {
  return (
    <form action={() => signOut(locale)}>
      <button type="submit" className="btn btn-ghost btn-sm">
        Sign out
      </button>
    </form>
  );
}
