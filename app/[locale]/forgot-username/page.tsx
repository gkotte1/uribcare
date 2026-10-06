import type { Metadata } from 'next';
import AuthShell from '@/components/auth/AuthShell';
import ForgotUsernameForm from '@/components/auth/ForgotUsernameForm';
import { isSupabaseConfigured } from '@/lib/auth';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Forgot username | Uribcare',
  description: 'Recover your Uribcare username.',
};

type Props = { params: { locale: string } };

export default function ForgotUsernamePage({ params }: Props) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <AuthShell locale={locale} title="Forgot username">
        <p className="auth-notice">
          The platform backend is not configured yet. See <code>SETUP.md</code> to connect Supabase.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      locale={locale}
      title="Recover your username"
      subtitle="Enter the email on your account and we will send your username to it."
      footer={
        <div>
          Remembered it? <a href={localeHref(locale, '/login')}>Back to sign in</a>
        </div>
      }
    >
      <ForgotUsernameForm locale={locale} />
    </AuthShell>
  );
}
