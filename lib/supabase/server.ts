import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/lib/database.types';

/**
 * Server-side Supabase client for Server Components, Route Handlers and Server
 * Actions. It is bound to the request's cookies so every call runs as the
 * signed-in user and row-level security applies.
 *
 * In a Server Component the cookie store is read-only, so the `set`/`remove`
 * writes are wrapped in try/catch: token refresh is handled by middleware, and
 * the no-op here keeps read-only render paths from throwing.
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component render: ignore. Middleware refreshes.
          }
        },
      },
    }
  );
}

/**
 * Trusted server client keyed by the service-role secret. It bypasses RLS, so
 * it is used only for narrowly scoped trusted operations (for example resolving
 * a username to its email at login). Never import this into client code.
 */
export function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: { getAll: () => [], setAll: () => {} },
      auth: { persistSession: false, autoRefreshToken: false },
    }
  );
}
