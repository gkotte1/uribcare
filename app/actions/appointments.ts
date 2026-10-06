'use server';

import { revalidatePath } from 'next/cache';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import type { AppointmentMode } from '@/lib/database.types';

export type ActionResult = { ok: boolean; error?: string; message?: string };

const MODES: AppointmentMode[] = ['in_person', 'video', 'phone'];

/** Requirement 7: request/book an appointment with a provider. */
export async function bookAppointment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Please sign in to book an appointment.' };

  const providerId = String(formData.get('provider_id') || '');
  const date = String(formData.get('date') || '');
  const time = String(formData.get('time') || '');
  const modeRaw = String(formData.get('mode') || 'in_person');
  const reason = String(formData.get('reason') || '').trim() || null;
  const mode = (MODES.includes(modeRaw as AppointmentMode) ? modeRaw : 'in_person') as AppointmentMode;

  if (!providerId) return { ok: false, error: 'Missing provider.' };
  if (!date || !time) return { ok: false, error: 'Choose a date and time.' };

  const startsAt = new Date(`${date}T${time}`);
  if (Number.isNaN(startsAt.getTime())) return { ok: false, error: 'Invalid date or time.' };
  if (startsAt.getTime() < Date.now()) return { ok: false, error: 'Pick a future date and time.' };

  // Pull the patient's contact to denormalise onto the appointment.
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, phone')
    .eq('id', user.id)
    .maybeSingle();

  const { data: provider } = await supabase
    .from('providers')
    .select('id, name, user_id')
    .eq('id', providerId)
    .maybeSingle();
  if (!provider) return { ok: false, error: 'That provider is no longer available.' };

  const { error } = await supabase.from('appointments').insert({
    patient_id: user.id,
    provider_id: providerId,
    starts_at: startsAt.toISOString(),
    mode,
    reason,
    status: 'requested',
    patient_name: profile?.full_name ?? null,
    patient_email: profile?.email ?? user.email ?? null,
    patient_phone: profile?.phone ?? null,
  });
  if (error) return { ok: false, error: error.message };

  // Notify both parties. The provider notification targets another user, so it
  // goes through the admin client to bypass the owner-only insert policy.
  const admin = createAdminClient();
  const when = startsAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
  await admin.from('notifications').insert([
    {
      user_id: user.id,
      type: 'appointment',
      title: 'Appointment requested',
      body: `Your request with ${provider.name} for ${when} was sent.`,
      href: '/dashboard/appointments',
    },
    ...(provider.user_id
      ? [
          {
            user_id: provider.user_id,
            type: 'appointment' as const,
            title: 'New appointment request',
            body: `${profile?.full_name ?? 'A patient'} requested ${when}.`,
            href: '/dashboard/appointments',
          },
        ]
      : []),
  ]);

  revalidatePath('/dashboard/appointments');
  return { ok: true, message: 'Appointment requested. You can track it in your dashboard.' };
}

/** Requirement 7: cancel an appointment. */
export async function cancelAppointment(id: string): Promise<ActionResult> {
  const supabase = createClient();
  const { error } = await supabase
    .from('appointments')
    .update({ status: 'cancelled' })
    .eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/dashboard/appointments');
  return { ok: true };
}

/** Requirement 7: reschedule an appointment to a new date/time. */
export async function rescheduleAppointment(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const id = String(formData.get('id') || '');
  const date = String(formData.get('date') || '');
  const time = String(formData.get('time') || '');
  const startsAt = new Date(`${date}T${time}`);
  if (!id || Number.isNaN(startsAt.getTime())) return { ok: false, error: 'Invalid date or time.' };
  if (startsAt.getTime() < Date.now()) return { ok: false, error: 'Pick a future date and time.' };

  const supabase = createClient();
  const { error } = await supabase
    .from('appointments')
    .update({ starts_at: startsAt.toISOString(), status: 'rescheduled' })
    .eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/dashboard/appointments');
  return { ok: true, message: 'Appointment rescheduled.' };
}
