import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n';

/**
 * Every route lives under `app/[locale]`, but English is served on clean,
 * unprefixed URLs so the existing links never change. This rewrites
 * `/services/x` to `/en/services/x` internally while the address bar keeps
 * showing `/services/x`. Spanish URLs already carry their `/es` prefix and are
 * passed straight through.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Page routes only. Anything starting with `_` is a Next internal (`_next`,
   * and the `_document` / `_error` probes the build makes), `api` is the route
   * handler surface, and any path containing a dot is a static file. Rewriting
   * those breaks the build, so they are all excluded.
   */
  matcher: ['/((?!_|api|images|fonts)(?!.*\\.).*)'],
};
