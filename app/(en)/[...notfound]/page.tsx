import { notFound } from 'next/navigation';

/**
 * Catch-all that renders the styled 404.
 *
 * Splitting the app into `(en)` and `(es)` root layouts removed the top-level
 * `app/layout.tsx`, and a bare `app/not-found.tsx` has no root layout to supply
 * `<html>`/`<body>` — so unmatched URLs fell back to Next's unstyled default
 * 404. Routing an unmatched path through this catch-all puts it inside the `(en)`
 * group, where `not-found.tsx` renders with the English root layout.
 *
 * Concrete routes (including `/es`) are more specific than a catch-all, so they
 * still win; only genuinely unmatched paths land here.
 */
export default function NotFoundCatchAll(): never {
  notFound();
}
