import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';

/**
 * Two concerns run here on every page request:
 *
 * 1. Locale rewrite. Every route lives under `app/[locale]`, but English is
 *    served on clean, unprefixed URLs. `/services/x` is rewritten to
 *    `/en/services/x` internally while the address bar keeps `/services/x`.
 *    Spanish URLs already carry their `/es` prefix and pass straight through.
 *
 * 2. Supabase session refresh. The SSR client needs a chance to rotate the
 *    auth tokens and write the refreshed cookies onto the outgoing response, so
 *    Server Components see a valid session. This is wired onto whichever
 *    response the locale step produced. It is skipped when the Supabase env
 *    vars are absent, so the site still runs before the backend is configured.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  let response: NextResponse;
  if (hasLocale) {
    response = NextResponse.next({ request });
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
    response = NextResponse.rewrite(url, { request });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && anon) {
    const supabase = createServerClient(url, anon, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });
    // Touch the session so expired access tokens are refreshed into cookies.
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  /**
   * Page routes only. `_next` internals, `api` and `auth` route handlers, the
   * static `images` / `fonts` folders, and any path with a dot (a static file)
   * are excluded so they are neither locale-rewritten nor session-touched.
   */
  matcher: ['/((?!_|api|auth|images|fonts)(?!.*\\.).*)'],
};
