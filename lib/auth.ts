import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { localeHref, type Locale } from '@/lib/i18n';
import type { ProfileRow } from '@/lib/database.types';

/** The signed-in auth user, or null. Safe to call in any server context. */
export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** The current user's profile row (role, name, username), or null. */
export async function getProfile(): Promise<ProfileRow | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  return data ?? null;
}

/**
 * Guard for protected pages. Redirects unauthenticated visitors to the login
 * page for the given locale, preserving where they were headed.
 */
export async function requireUser(locale: Locale, nextPath = '/dashboard') {
  const user = await getUser();
  if (!user) {
    const to = `${localeHref(locale, '/login')}?next=${encodeURIComponent(nextPath)}`;
    redirect(to);
  }
  return user!;
}

/** True when Supabase env vars are present, so pages can show a setup notice. */
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
