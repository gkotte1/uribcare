-- Uribcare platform schema
-- Run this in the Supabase SQL editor, or via `supabase db push` with the CLI.
-- It is idempotent where practical so a re-run is safe on a fresh project.

create extension if not exists citext;
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type user_role as enum
    ('patient','therapist','doctor','counselor','pharmacy','laboratory','nutritionist','admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type provider_kind as enum
    ('therapist','doctor','counselor','pharmacy','laboratory','nutritionist');
exception when duplicate_object then null; end $$;

do $$ begin
  create type appointment_status as enum
    ('requested','confirmed','rescheduled','cancelled','completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type appointment_mode as enum ('in_person','video','phone');
exception when duplicate_object then null; end $$;

do $$ begin
  create type referral_status as enum ('open','accepted','completed','declined');
exception when duplicate_object then null; end $$;

do $$ begin
  create type notification_type as enum ('appointment','referral','account','system');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- updated_at helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user (requirement 1, 3)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  role        user_role not null default 'patient',
  full_name   text,
  username    citext unique,
  email       text,
  phone       text,
  locale      text not null default 'en',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

-- On sign-up, mirror the account into profiles using the metadata the client
-- passes to supabase.auth.signUp (role, full_name, username, phone, locale).
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, role, full_name, username, email, phone, locale)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'patient'),
    new.raw_user_meta_data ->> 'full_name',
    nullif(new.raw_user_meta_data ->> 'username', ''),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'phone', new.phone),
    coalesce(new.raw_user_meta_data ->> 'locale', 'en')
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- patient_profiles (requirement 3)
-- ---------------------------------------------------------------------------
create table if not exists public.patient_profiles (
  user_id             uuid primary key references public.profiles(id) on delete cascade,
  patient_name        text,
  date_of_birth       date,
  age_group           text,
  gender              text,
  phone               text,
  email               text,
  address             text,
  city                text,
  state               text,
  zip                 text,
  patient_type        text,
  relationship        text,
  care_needs          text[] not null default '{}',
  service_preferences text[] not null default '{}',
  notes               text,
  updated_at          timestamptz not null default now()
);

drop trigger if exists patient_profiles_updated_at on public.patient_profiles;
create trigger patient_profiles_updated_at before update on public.patient_profiles
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- providers: counselors, doctors, nutritionists, labs, pharmacies, therapists
-- (requirements 4, 5, 6, 9). user_id is nullable so seeded directory listings
-- exist without an owning account.
-- ---------------------------------------------------------------------------
create table if not exists public.providers (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid references public.profiles(id) on delete set null,
  kind             provider_kind not null,
  name             text not null,
  title            text,
  specialty        text,
  services         text[] not null default '{}',
  bio              text,
  qualifications   text,
  years_experience int,
  npi              text,
  address          text,
  city             text,
  state            text,
  zip              text,
  phone            text,
  email            text,
  website          text,
  availability     jsonb not null default '[]'::jsonb,
  insurance        text[] not null default '{}',
  accepting_new    boolean not null default true,
  connection       jsonb not null default '{}'::jsonb,
  image_url        text,
  rating           numeric(2,1),
  review_count     int not null default 0,
  verified         boolean not null default false,
  status           text not null default 'pending',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

drop trigger if exists providers_updated_at on public.providers;
create trigger providers_updated_at before update on public.providers
  for each row execute function public.set_updated_at();

create index if not exists providers_kind_idx    on public.providers (kind);
create index if not exists providers_state_idx   on public.providers (state);
create index if not exists providers_status_idx  on public.providers (status);
create index if not exists providers_services_idx on public.providers using gin (services);
create index if not exists providers_search_idx  on public.providers
  using gin (to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(specialty,'') || ' ' || coalesce(city,'')));

-- ---------------------------------------------------------------------------
-- appointments (requirement 7). Patient contact is denormalised onto the row
-- so a provider can see who booked without reading the patient's private
-- profile.
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id            uuid primary key default gen_random_uuid(),
  patient_id    uuid not null references public.profiles(id) on delete cascade,
  provider_id   uuid not null references public.providers(id) on delete cascade,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  mode          appointment_mode not null default 'in_person',
  status        appointment_status not null default 'requested',
  reason        text,
  notes         text,
  patient_name  text,
  patient_email text,
  patient_phone text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

drop trigger if exists appointments_updated_at on public.appointments;
create trigger appointments_updated_at before update on public.appointments
  for each row execute function public.set_updated_at();

create index if not exists appointments_patient_idx  on public.appointments (patient_id, starts_at desc);
create index if not exists appointments_provider_idx on public.appointments (provider_id, starts_at desc);

-- ---------------------------------------------------------------------------
-- saved_providers (requirement 10)
-- ---------------------------------------------------------------------------
create table if not exists public.saved_providers (
  user_id     uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (user_id, provider_id)
);

-- ---------------------------------------------------------------------------
-- referrals (requirement 10)
-- ---------------------------------------------------------------------------
create table if not exists public.referrals (
  id               uuid primary key default gen_random_uuid(),
  patient_id       uuid not null references public.profiles(id) on delete cascade,
  provider_id      uuid references public.providers(id) on delete set null,
  from_provider_id uuid references public.providers(id) on delete set null,
  note             text,
  status           referral_status not null default 'open',
  created_at       timestamptz not null default now()
);

create index if not exists referrals_patient_idx on public.referrals (patient_id, created_at desc);

-- ---------------------------------------------------------------------------
-- notifications (requirement 10)
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references public.profiles(id) on delete cascade,
  type       notification_type not null default 'system',
  title      text not null,
  body       text,
  href       text,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Row-level security
-- ---------------------------------------------------------------------------
alter table public.profiles         enable row level security;
alter table public.patient_profiles enable row level security;
alter table public.providers        enable row level security;
alter table public.appointments     enable row level security;
alter table public.saved_providers  enable row level security;
alter table public.referrals        enable row level security;
alter table public.notifications    enable row level security;

-- Helper: provider ids owned by the current user.
create or replace function public.owns_provider(p uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.providers where id = p and user_id = auth.uid());
$$;

-- profiles: a user sees and edits only their own row.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles
  for select using (auth.uid() = id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles
  for insert with check (auth.uid() = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- patient_profiles: owner only.
drop policy if exists patient_all_own on public.patient_profiles;
create policy patient_all_own on public.patient_profiles
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- providers: published rows are world-readable; an owner sees and edits theirs.
drop policy if exists providers_select_public on public.providers;
create policy providers_select_public on public.providers
  for select using (status = 'published' or user_id = auth.uid());
drop policy if exists providers_insert_own on public.providers;
create policy providers_insert_own on public.providers
  for insert with check (user_id = auth.uid());
drop policy if exists providers_update_own on public.providers;
create policy providers_update_own on public.providers
  for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- appointments: visible to the booking patient and the provider's owner.
drop policy if exists appts_select on public.appointments;
create policy appts_select on public.appointments
  for select using (patient_id = auth.uid() or public.owns_provider(provider_id));
drop policy if exists appts_insert on public.appointments;
create policy appts_insert on public.appointments
  for insert with check (patient_id = auth.uid());
drop policy if exists appts_update on public.appointments;
create policy appts_update on public.appointments
  for update using (patient_id = auth.uid() or public.owns_provider(provider_id));

-- saved_providers / notifications: owner only.
drop policy if exists saved_all_own on public.saved_providers;
create policy saved_all_own on public.saved_providers
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists notif_select_own on public.notifications;
create policy notif_select_own on public.notifications
  for select using (auth.uid() = user_id);
drop policy if exists notif_update_own on public.notifications;
create policy notif_update_own on public.notifications
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists notif_insert_own on public.notifications;
create policy notif_insert_own on public.notifications
  for insert with check (auth.uid() = user_id);

-- referrals: patient and the involved providers' owners can read.
drop policy if exists referrals_select on public.referrals;
create policy referrals_select on public.referrals
  for select using (
    patient_id = auth.uid()
    or public.owns_provider(provider_id)
    or public.owns_provider(from_provider_id)
  );
drop policy if exists referrals_insert on public.referrals;
create policy referrals_insert on public.referrals
  for insert with check (
    patient_id = auth.uid() or public.owns_provider(from_provider_id)
  );
