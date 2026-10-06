import { createClient } from '@/lib/supabase/server';
import type {
  AppointmentRow,
  NotificationRow,
  PatientProfileRow,
  ProviderRow,
  ReferralRow,
} from '@/lib/database.types';

/** Upcoming + past appointments for the signed-in user (as patient). */
export async function getMyAppointments(): Promise<{
  upcoming: (AppointmentRow & { provider: ProviderRow | null })[];
  past: (AppointmentRow & { provider: ProviderRow | null })[];
}> {
  const supabase = createClient();
  const { data } = await supabase
    .from('appointments')
    .select('*, provider:providers(*)')
    .order('starts_at', { ascending: true });
  const rows = (data ?? []) as unknown as (AppointmentRow & { provider: ProviderRow | null })[];
  const now = Date.now();
  const active = rows.filter((r) => r.status !== 'cancelled');
  return {
    upcoming: active.filter((r) => new Date(r.starts_at).getTime() >= now),
    past: rows
      .filter((r) => new Date(r.starts_at).getTime() < now || r.status === 'cancelled')
      .reverse(),
  };
}

/** Providers the user has saved. */
export async function getSavedProviders(): Promise<ProviderRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('saved_providers')
    .select('provider:providers(*)')
    .order('created_at', { ascending: false });
  return ((data ?? []) as unknown as { provider: ProviderRow | null }[])
    .map((r) => r.provider)
    .filter((p): p is ProviderRow => Boolean(p));
}

/** Provider ids the user has saved, for toggling save buttons. */
export async function getSavedProviderIds(): Promise<Set<string>> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();
  const { data } = await supabase
    .from('saved_providers')
    .select('provider_id')
    .eq('user_id', user.id);
  return new Set((data ?? []).map((r) => r.provider_id));
}

export async function getNotifications(): Promise<NotificationRow[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
  return (data ?? []) as NotificationRow[];
}

export async function getUnreadCount(): Promise<number> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;
  const { count } = await supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false);
  return count ?? 0;
}

export async function getReferrals(): Promise<(ReferralRow & { provider: ProviderRow | null })[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('referrals')
    .select('*, provider:providers(*)')
    .order('created_at', { ascending: false });
  return (data ?? []) as unknown as (ReferralRow & { provider: ProviderRow | null })[];
}

export async function getPatientProfile(): Promise<PatientProfileRow | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from('patient_profiles')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  return data ?? null;
}
