'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { localeHref, isLocale, DEFAULT_LOCALE, type Locale } from '@/lib/i18n';
import type { ProviderKind, UserRole } from '@/lib/database.types';

export type ActionResult = { ok: boolean; error?: string; message?: string };

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const localeOf = (v: FormDataEntryValue | null): Locale =>
  typeof v === 'string' && isLocale(v) ? v : DEFAULT_LOCALE;

/**
 * Resolve a login identifier to an email address. Email is used directly; a
 * username or phone is looked up in profiles with the trusted admin client
 * (this runs before the user has a session, so it cannot use RLS).
 */
async function emailForIdentifier(identifier: string): Promise<string | null> {
  if (isEmail(identifier)) return identifier;
  const admin = createAdminClient();
  const column = /\d/.test(identifier) && !/[a-z]/i.test(identifier) ? 'phone' : 'username';
  const { data } = await admin
    .from('profiles')
    .select('email')
    .eq(column, identifier)
    .maybeSingle();
  return data?.email ?? null;
}

/** Requirement 1: log in with email, username or phone + password. */
export async function signIn(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const identifier = String(formData.get('identifier') || '').trim();
  const password = String(formData.get('password') || '');
  const locale = localeOf(formData.get('locale'));
  const next = String(formData.get('next') || '/dashboard');

  if (!identifier || !password) return { ok: false, error: 'Enter your login and password.' };

  const email = await emailForIdentifier(identifier);
  if (!email) return { ok: false, error: 'No account matches that login.' };

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: 'Incorrect login or password.' };

  revalidatePath('/', 'layout');
  redirect(localeHref(locale, next.startsWith('/') ? next : `/${next}`));
}

/** Requirement 1: create a patient/family account. */
export async function signUpPatient(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const email = String(formData.get('email') || '').trim();
  const password = String(formData.get('password') || '');
  const fullName = String(formData.get('full_name') || '').trim();
  const username = String(formData.get('username') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const locale = localeOf(formData.get('locale'));

  if (!isEmail(email)) return { ok: false, error: 'Enter a valid email address.' };
  if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  if (!fullName) return { ok: false, error: 'Enter your name.' };

  return createAccount({
    email,
    password,
    role: 'patient',
    meta: { full_name: fullName, username, phone, locale },
    afterUserId: async (userId) => {
      const admin = createAdminClient();
      await admin
        .from('patient_profiles')
        .upsert({ user_id: userId, patient_name: fullName, phone, email });
    },
    locale,
    next: '/dashboard',
  });
}

/**
 * Requirement 4: create a provider account (therapist, doctor, counselor,
 * pharmacy, laboratory, nutritionist). The listing starts unpublished and
 * unverified, matching the "Submitted / Under Review" status the intake forms
 * already show.
 */
export async function signUpProvider(
  kind: ProviderKind,
  fields: Record<string, unknown>,
  locale: Locale
): Promise<ActionResult> {
  const email = String(fields.email || '').trim();
  const password = String(fields.password || '');
  const name = String(fields.name || fields.full_name || '').trim();
  const username = String(fields.username || '').trim();
  const phone = String(fields.phone || '').trim();

  if (!isEmail(email)) return { ok: false, error: 'Enter a valid email address.' };
  if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  if (!name) return { ok: false, error: 'Enter the provider name.' };

  return createAccount({
    email,
    password,
    role: kind as UserRole,
    meta: { full_name: name, username, phone, locale },
    afterUserId: async (userId) => {
      const admin = createAdminClient();
      await admin.from('providers').insert({
        user_id: userId,
        kind,
        name,
        title: str(fields.title),
        specialty: str(fields.specialty),
        services: arr(fields.services),
        bio: str(fields.bio),
        qualifications: str(fields.qualifications),
        years_experience: num(fields.years_experience),
        npi: str(fields.npi),
        address: str(fields.address),
        city: str(fields.city),
        state: str(fields.state),
        zip: str(fields.zip),
        phone,
        email,
        website: str(fields.website),
        status: 'pending',
        verified: false,
      });
    },
    locale,
    next: '/dashboard',
  });
}

type CreateArgs = {
  email: string;
  password: string;
  role: UserRole;
  meta: Record<string, string>;
  afterUserId: (userId: string) => Promise<void>;
  locale: Locale;
  next: string;
};

/** Shared signup path: create the auth user, then the role-specific row. */
async function createAccount(args: CreateArgs): Promise<ActionResult> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email: args.email,
    password: args.password,
    options: {
      data: { role: args.role, ...args.meta },
      emailRedirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(
        localeHref(args.locale, args.next)
      )}`,
    },
  });

  if (error) {
    const msg = /registered|exists/i.test(error.message)
      ? 'An account with that email already exists.'
      : error.message;
    return { ok: false, error: msg };
  }
  const userId = data.user?.id;
  if (userId) {
    try {
      await args.afterUserId(userId);
    } catch {
      // Profile row creation is best-effort here; the dashboard lets the user
      // complete it. Never block signup on it.
    }
  }

  // If email confirmation is enabled there is no session yet.
  if (!data.session) {
    return {
      ok: true,
      message: 'Account created. Check your email to confirm, then sign in.',
    };
  }
  revalidatePath('/', 'layout');
  redirect(localeHref(args.locale, args.next));
}

/** Requirement 1: log out. */
export async function signOut(locale: Locale) {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect(localeHref(locale, '/login'));
}

/** Requirement 2: send a password-reset link. */
export async function requestPasswordReset(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get('email') || '').trim();
  const locale = localeOf(formData.get('locale'));
  if (!isEmail(email)) return { ok: false, error: 'Enter a valid email address.' };

  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/callback?next=${encodeURIComponent(
      localeHref(locale, '/reset-password')
    )}`,
  });
  // Always report success so the form never reveals which emails are registered.
  return {
    ok: true,
    message: 'If that email has an account, a password-reset link is on its way.',
  };
}

/** Requirement 2: recover a forgotten username from a registered email. */
export async function recoverUsername(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get('email') || '').trim();
  if (!isEmail(email)) return { ok: false, error: 'Enter a valid email address.' };

  const admin = createAdminClient();
  const { data } = await admin
    .from('profiles')
    .select('id, username')
    .eq('email', email)
    .maybeSingle();
  if (data?.id && data.username) {
    await admin.from('notifications').insert({
      user_id: data.id,
      type: 'account',
      title: 'Your username',
      body: `Your Uribcare username is ${data.username}.`,
    });
  }
  return {
    ok: true,
    message: 'If that email has an account, we have sent the username to it.',
  };
}

/** Requirement 2: set a new password (used on the reset-password page). */
export async function updatePassword(
  _prev: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const password = String(formData.get('password') || '');
  const confirm = String(formData.get('confirm') || '');
  const locale = localeOf(formData.get('locale'));
  if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
  if (password !== confirm) return { ok: false, error: 'Passwords do not match.' };

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { ok: false, error: error.message };
  redirect(localeHref(locale, '/dashboard'));
}

// Small coercion helpers for the loosely-typed intake payload.
function str(v: unknown): string | null {
  const s = typeof v === 'string' ? v.trim() : '';
  return s === '' ? null : s;
}
function num(v: unknown): number | null {
  const n = Number(v);
  return Number.isFinite(n) && v !== '' && v != null ? n : null;
}
function arr(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === 'string' && v.trim()) return [v.trim()];
  return [];
}
