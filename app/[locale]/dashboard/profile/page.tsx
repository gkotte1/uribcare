import { getProfile } from '@/lib/auth';
import { getPatientProfile } from '@/lib/dashboard';
import { isLocale, type Locale } from '@/lib/i18n';
import PatientProfileForm, { type ProfileFormValues } from '@/components/dashboard/PatientProfileForm';

type Params = { params: { locale: string } };

export default async function ProfilePage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';

  const [profile, patient] = await Promise.all([getProfile(), getPatientProfile()]);

  const initial: ProfileFormValues = {
    full_name: profile?.full_name ?? '',
    patient_name: patient?.patient_name ?? profile?.full_name ?? '',
    date_of_birth: patient?.date_of_birth ?? '',
    age_group: patient?.age_group ?? '',
    gender: patient?.gender ?? '',
    phone: patient?.phone ?? profile?.phone ?? '',
    email: patient?.email ?? profile?.email ?? '',
    address: patient?.address ?? '',
    city: patient?.city ?? '',
    state: patient?.state ?? '',
    zip: patient?.zip ?? '',
    patient_type: patient?.patient_type ?? '',
    relationship: patient?.relationship ?? '',
    care_needs: patient?.care_needs ?? [],
    service_preferences: patient?.service_preferences ?? [],
    notes: patient?.notes ?? '',
  };

  return (
    <>
      <div className="dash-head">
        <span className="eyebrow">Profile</span>
        <h1>Your profile</h1>
        <p className="lead">Keep your details current so your care team and provider matches stay accurate.</p>
      </div>

      <PatientProfileForm initial={initial} locale={locale} />
    </>
  );
}
