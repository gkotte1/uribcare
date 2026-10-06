# Uribcare platform setup

This app is a bilingual Next.js 14 site plus a Supabase backend that powers the
10 platform features: accounts, profiles, the provider directory, search,
booking, connect, referrals and the patient dashboard.

## 1. Create a Supabase project
1. Go to <https://supabase.com>, create a project, and wait for it to provision.
2. In **Project Settings -> API**, copy the Project URL, the `anon` public key,
   and the `service_role` secret key.

> Healthcare note: this stores patient data. For production, use a plan that
> offers a signed BAA and enable it before holding any real patient information.

## 2. Configure environment
```bash
cp .env.local.example .env.local
```
Fill in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` from step 1
- `SUPABASE_SERVICE_ROLE_KEY` from step 1 (server-only, never exposed)
- `NEXT_PUBLIC_SITE_URL` = `http://localhost:3000` for local dev

## 3. Create the schema and seed data
In the Supabase dashboard, open **SQL Editor** and run, in order:
1. `supabase/migrations/0001_init.sql` (tables, row-level security, triggers)
2. `supabase/seed.sql` (demo provider directory, optional but recommended)

Or with the Supabase CLI:
```bash
supabase link --project-ref <your-ref>
supabase db push          # applies migrations/0001_init.sql
psql "$DATABASE_URL" -f supabase/seed.sql
```

## 4. Auth settings (Supabase dashboard)
- **Authentication -> URL Configuration**: add `http://localhost:3000/auth/callback`
  (and your production equivalent) to the redirect allow-list.
- **Authentication -> Providers -> Email**: for a quick local demo you can turn
  **Confirm email** off so new accounts sign in immediately. Leave it on for
  production (the signup flow already handles the "check your email" case).

## 5. Install and run
```bash
npm install
npm run dev
```
Open <http://localhost:3000>.

## What you can do
- **Register** a patient/family account, or a provider account from `/register`.
- **Log in / out**, recover a **username**, and **reset a password**.
- **Search and filter** the directory by category, location, service and insurance.
- **View a provider**, **save** them, **book** or **request** an appointment, and
  **connect** by phone, message, video or an external booking link.
- **Dashboard**: profile, upcoming and past appointments, saved providers,
  referrals and notifications.

## Notes
- Provider sign-ups start as `pending` / unverified and are hidden from the
  public directory until an admin sets `status = 'published'` and `verified = true`.
  The seeded demo providers are already published so the app is usable at once.
- Username login works by resolving the username to its email server-side with
  the service-role key, so no username is ever exposed to the browser.
