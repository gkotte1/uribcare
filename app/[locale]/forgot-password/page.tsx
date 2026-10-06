import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { isSupabaseConfigured } from '@/lib/auth';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Forgot password | Uribcare',
  description: 'Reset your Uribcare password.',
};

type Props = { params: { locale: string } };

export default function ForgotPasswordPage({ params }: Props) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <AuthShell locale={locale} title="Forgot password">
        <p className="auth-notice">
          The platform backend is not configured yet. See <code>SETUP.md</code> to connect Supabase.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      locale={locale}
      title="Reset your password"
      subtitle="Enter the email on your account and we will send a link to set a new password."
      footer={
        <div>
          Remembered it? <a href={localeHref(locale, '/login')}>Back to sign in</a>
        </div>
      }
    >
      <ForgotPasswordForm locale={locale} />
    </AuthShell>
  );
}
