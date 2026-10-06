import { createClient } from '@/lib/supabase/server';
import type { ProviderKind, ProviderRow } from '@/lib/database.types';
import type { ProviderFilters } from '@/lib/providers-meta';

// Re-export the client-safe metadata so existing server-side callers can keep
// importing it from '@/lib/providers'. Client components import it directly
// from '@/lib/providers-meta' to avoid bundling this server-only module.
export type { ProviderFilters } from '@/lib/providers-meta';
export { PROVIDER_KINDS, kindForSlug, slugForKind } from '@/lib/providers-meta';

/**
 * Search the published provider directory. Only `status = 'published'` rows are
 * returned (RLS also enforces this); filters narrow the set server-side.
 */
export async function searchProviders(filters: ProviderFilters = {}): Promise<ProviderRow[]> {
  const supabase = createClient();
  let query = supabase
    .from('providers')
    .select('*')
    .eq('status', 'published')
    .order('verified', { ascending: false })
    .order('rating', { ascending: false, nullsFirst: false })
    .order('name', { ascending: true })
    .limit(filters.limit ?? 60);

  if (filters.kind) query = query.eq('kind', filters.kind);
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.city) query = query.ilike('city', `%${filters.city}%`);
  if (filters.acceptingNew) query = query.eq('accepting_new', true);
  if (filters.service) query = query.contains('services', [filters.service]);
  if (filters.insurance) query = query.contains('insurance', [filters.insurance]);
  if (filters.q) {
    const term = `%${filters.q}%`;
    query = query.or(`name.ilike.${term},specialty.ilike.${term},city.ilike.${term}`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

/** A single provider by id. Returns null if not found or not viewable. */
export async function getProvider(id: string): Promise<ProviderRow | null> {
  const supabase = createClient();
  const { data } = await supabase.from('providers').select('*').eq('id', id).maybeSingle();
  return data ?? null;
}

/** Distinct states present in the directory, for the filter dropdown. */
export async function listProviderStates(): Promise<string[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('providers')
    .select('state')
    .eq('status', 'published')
    .not('state', 'is', null);
  const set = new Set((data ?? []).map((r) => r.state as string).filter(Boolean));
  return Array.from(set).sort();
}

/** Count of published providers per kind, for the directory landing cards. */
export async function countByKind(): Promise<Record<ProviderKind, number>> {
  const supabase = createClient();
  const { data } = await supabase.from('providers').select('kind').eq('status', 'published');
  const counts = {
    therapist: 0, doctor: 0, counselor: 0, pharmacy: 0, laboratory: 0, nutritionist: 0,
  } as Record<ProviderKind, number>;
  (data ?? []).forEach((r) => {
    counts[r.kind as ProviderKind] += 1;
  });
  return counts;
}
