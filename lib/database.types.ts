/**
 * Hand-authored database types matching supabase/migrations/0001_init.sql.
 * Kept in sync by hand (the project has no generation step). If you later add
 * the Supabase CLI you can replace this with `supabase gen types typescript`.
 */

export type UserRole =
  | 'patient' | 'therapist' | 'doctor' | 'counselor'
  | 'pharmacy' | 'laboratory' | 'nutritionist' | 'admin';

export type ProviderKind =
  | 'therapist' | 'doctor' | 'counselor' | 'pharmacy' | 'laboratory' | 'nutritionist';

export type AppointmentStatus =
  | 'requested' | 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
export type AppointmentMode = 'in_person' | 'video' | 'phone';
export type ReferralStatus = 'open' | 'accepted' | 'completed' | 'declined';
export type NotificationType = 'appointment' | 'referral' | 'account' | 'system';

/** Shape of the providers.connection jsonb column. */
export type ProviderConnection = {
  phone?: string;
  message?: boolean;
  video?: boolean;
  appointment_url?: string;
};

/** One availability window stored in providers.availability jsonb. */
export type AvailabilityWindow = { day: string; slots: string[] };

type Profile = {
  id: string;
  role: UserRole;
  full_name: string | null;
  username: string | null;
  email: string | null;
  phone: string | null;
  locale: string;
  created_at: string;
  updated_at: string;
};

type PatientProfile = {
  user_id: string;
  patient_name: string | null;
  date_of_birth: string | null;
  age_group: string | null;
  gender: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  patient_type: string | null;
  relationship: string | null;
  care_needs: string[];
  service_preferences: string[];
  notes: string | null;
  updated_at: string;
};

type Provider = {
  id: string;
  user_id: string | null;
  kind: ProviderKind;
  name: string;
  title: string | null;
  specialty: string | null;
  services: string[];
  bio: string | null;
  qualifications: string | null;
  years_experience: number | null;
  npi: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  availability: AvailabilityWindow[];
  insurance: string[];
  accepting_new: boolean;
  connection: ProviderConnection;
  image_url: string | null;
  rating: number | null;
  review_count: number;
  verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
};

type Appointment = {
  id: string;
  patient_id: string;
  provider_id: string;
  starts_at: string;
  ends_at: string | null;
  mode: AppointmentMode;
  status: AppointmentStatus;
  reason: string | null;
  notes: string | null;
  patient_name: string | null;
  patient_email: string | null;
  patient_phone: string | null;
  created_at: string;
  updated_at: string;
};

type SavedProvider = {
  user_id: string;
  provider_id: string;
  created_at: string;
};

type Referral = {
  id: string;
  patient_id: string;
  provider_id: string | null;
  from_provider_id: string | null;
  note: string | null;
  status: ReferralStatus;
  created_at: string;
};

type Notification = {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  body: string | null;
  href: string | null;
  read: boolean;
  created_at: string;
};

/** Generic Row/Insert/Update triple. Insert/Update loosen generated columns. */
type Table<Row, Insert = Partial<Row>, Update = Partial<Row>> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile>;
      patient_profiles: Table<PatientProfile>;
      providers: Table<Provider>;
      appointments: Table<Appointment>;
      saved_providers: Table<SavedProvider>;
      referrals: Table<Referral>;
      notifications: Table<Notification>;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: UserRole;
      provider_kind: ProviderKind;
      appointment_status: AppointmentStatus;
      appointment_mode: AppointmentMode;
      referral_status: ReferralStatus;
      notification_type: NotificationType;
    };
  };
};

/** Convenience row aliases for app code. */
export type ProfileRow = Profile;
export type PatientProfileRow = PatientProfile;
export type ProviderRow = Provider;
export type AppointmentRow = Appointment;
export type SavedProviderRow = SavedProvider;
export type ReferralRow = Referral;
export type NotificationRow = Notification;
