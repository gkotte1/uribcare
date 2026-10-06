import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import AuthShell from '@/components/auth/AuthShell';
import LoginForm from '@/components/auth/LoginForm';
import { getUser, isSupabaseConfigured } from '@/lib/auth';
import { isLocale, localeHref, type Locale } from '@/lib/i18n';

export const metadata: Metadata = {
  title: 'Sign in | Uribcare',
  description: 'Sign in to your Uribcare account.',
};

type Props = {
  params: { locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function LoginPage({ params, searchParams }: Props) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  if (!isSupabaseConfigured()) {
    return (
      <AuthShell locale={locale} title="Sign in">
        <p className="auth-notice">
          The platform backend is not configured yet. See <code>SETUP.md</code> to connect Supabase.
        </p>
      </AuthShell>
    );
  }

  const next = typeof searchParams?.next === 'string' ? searchParams.next : '/dashboard';

  if (await getUser()) {
    redirect(localeHref(locale, '/dashboard'));
  }

  return (
    <AuthShell
      locale={locale}
      title="Welcome back"
      subtitle="Sign in to reach your care team, appointments and records."
      footer={
        <>
          <div className="auth-foot-row">
            <a href={localeHref(locale, '/forgot-password')}>Forgot password?</a>
            <span aria-hidden="true">·</span>
            <a href={localeHref(locale, '/forgot-username')}>Forgot username?</a>
          </div>
          <div>
            New to Uribcare? <a href={localeHref(locale, '/register')}>Create an account</a>
          </div>
        </>
      }
    >
      <LoginForm locale={locale} next={next} />
    </AuthShell>
  );
}
