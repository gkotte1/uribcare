import type { ProviderKind } from '@/lib/database.types';

/**
 * Client-safe provider metadata. This module deliberately imports nothing that
 * reaches the server Supabase client (next/headers), so client components such
 * as the search filters can use these constants without pulling server-only
 * code into the browser bundle. The data-access functions live in
 * `lib/providers.ts`, which re-exports everything here for server callers.
 */

export type ProviderFilters = {
  /** Free-text search over name, specialty and city. */
  q?: string;
  kind?: ProviderKind;
  state?: string;
  city?: string;
  /** Match a single service / specialty tag. */
  service?: string;
  /** Match an accepted insurance / payment option. */
  insurance?: string;
  acceptingNew?: boolean;
  limit?: number;
};

/** The six directory categories, in display order, with their URL slugs. */
export const PROVIDER_KINDS: { kind: ProviderKind; slug: string }[] = [
  { kind: 'counselor', slug: 'counseling' },
  { kind: 'doctor', slug: 'doctors' },
  { kind: 'therapist', slug: 'therapy' },
  { kind: 'nutritionist', slug: 'nutrition' },
  { kind: 'pharmacy', slug: 'pharmacies' },
  { kind: 'laboratory', slug: 'laboratories' },
];

export const kindForSlug = (slug: string): ProviderKind | undefined =>
  PROVIDER_KINDS.find((k) => k.slug === slug)?.kind;

export const slugForKind = (kind: ProviderKind): string =>
  PROVIDER_KINDS.find((k) => k.kind === kind)?.slug ?? kind;
