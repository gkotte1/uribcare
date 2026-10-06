import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Auth callback. Supabase sends the user here with a one-time `code` after an
 * email confirmation or a password-reset link. We exchange that code for a
 * session cookie, then forward the user to `next` (the reset-password page, the
 * dashboard, or wherever the link was created for). This route lives outside
 * the [locale] tree because the redirect URLs Supabase is given already carry
 * the locale prefix in `next`.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  // No code means the link was malformed or already used — send them to login.
  if (!code) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const supabase = createClient();
  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(new URL(next, request.url));
}
