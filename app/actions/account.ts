'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export type ActionResult = { ok: boolean; error?: string; message?: string };

/** Requirement 10: save or unsave a provider. Returns the new saved state. */
export async function toggleSavedProvider(providerId: string): Promise<{ saved: boolean }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { saved: false };

  const { data: existing } = await supabase
    .from('saved_providers')
    .select('provider_id')
    .eq('user_id', user.id)
    .eq('provider_id', providerId)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('saved_providers')
      .delete()
      .eq('user_id', user.id)
      .eq('provider_id', providerId);
    revalidatePath('/dashboard/saved');
    return { saved: false };
  }
  await supabase.from('saved_providers').insert({ user_id: user.id, provider_id: providerId });
  revalidatePath('/dashboard/saved');
  return { saved: true };
}

/** Requirement 3: create or update the patient/family profile. */
export async function savePatientProfile(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Please sign in.' };

  const s = (k: string) => {
    const v = String(formData.get(k) || '').trim();
    return v === '' ? null : v;
  };
  const list = (k: string) => formData.getAll(k).map(String).filter(Boolean);

  const fullName = s('full_name');

  const { error: pErr } = await supabase
    .from('profiles')
    .update({ full_name: fullName, phone: s('phone') })
    .eq('id', user.id);
  if (pErr) return { ok: false, error: pErr.message };

  const { error } = await supabase.from('patient_profiles').upsert({
    user_id: user.id,
    patient_name: s('patient_name') ?? fullName,
    date_of_birth: s('date_of_birth'),
    age_group: s('age_group'),
    gender: s('gender'),
    phone: s('phone'),
    email: s('email'),
    address: s('address'),
    city: s('city'),
    state: s('state'),
    zip: s('zip'),
    patient_type: s('patient_type'),
    relationship: s('relationship'),
    care_needs: list('care_needs'),
    service_preferences: list('service_preferences'),
    notes: s('notes'),
  });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/dashboard/profile');
  revalidatePath('/dashboard');
  return { ok: true, message: 'Profile saved.' };
}

/** Requirement 10: mark one notification read. */
export async function markNotificationRead(id: string): Promise<void> {
  const supabase = createClient();
  await supabase.from('notifications').update({ read: true }).eq('id', id);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/notifications');
}

/** Requirement 10: mark every notification read. */
export async function markAllNotificationsRead(): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', user.id)
    .eq('read', false);
  revalidatePath('/dashboard');
  revalidatePath('/dashboard/notifications');
}
