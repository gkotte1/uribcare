import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { isSupabaseConfigured } from '@/lib/auth';
import { isLocale, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Set a new password | Uribcare',
  description: 'Choose a new password for your Uribcare account.',
};

type Props = { params: { locale: string } };

export default function ResetPasswordPage({ params }: Props) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <AuthShell locale={locale} title="Set a new password">
        <p className="auth-notice">
          The platform backend is not configured yet. See <code>SETUP.md</code> to connect Supabase.
        </p>
      </AuthShell>
    );
  }

  // The user arrives here already in a recovery session established by the
  // /auth/callback route, so no token handling is needed on this page.
  return (
    <AuthShell
      locale={locale}
      title="Set a new password"
      subtitle="Choose a new password for your account. You will be signed in afterwards."
    >
      <ResetPasswordForm locale={locale} />
    </AuthShell>
  );
}
