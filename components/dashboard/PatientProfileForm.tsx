'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { savePatientProfile, type ActionResult } from '@/app/actions/account';
import type { Locale } from '@/lib/i18n';
import { Check } from '@/components/Icons';

export type ProfileFormValues = {
  full_name: string;
  patient_name: string;
  date_of_birth: string;
  age_group: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  patient_type: string;
  relationship: string;
  care_needs: string[];
  service_preferences: string[];
  notes: string;
};

const CARE_NEEDS = [
  'Behavioral therapy',
  'Speech therapy',
  'Occupational therapy',
  'Counseling',
  'Medication support',
  'Nutrition',
  'Diagnostics',
];

const SERVICE_PREFERENCES = ['Counseling', 'Medication support', 'Pharmacy', 'Laboratory', 'Nutrition', 'Therapy'];

const AGE_GROUPS = ['Infant (0-2)', 'Child (3-12)', 'Teen (13-17)', 'Adult (18-64)', 'Senior (65+)'];
const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];
const PATIENT_TYPES = ['Myself', 'My child', 'A dependent', 'Someone I care for'];
const RELATIONSHIPS = ['Self', 'Parent', 'Guardian', 'Spouse', 'Caregiver', 'Other'];

const INITIAL: ActionResult = { ok: false };

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending} aria-busy={pending}>
      {pending ? 'Saving...' : 'Save profile'}
    </button>
  );
}

function Select({ name, label, value, options }: { name: string; label: string; value: string; options: string[] }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} defaultValue={value}>
        <option value="">Select one</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function PatientProfileForm({ initial, locale }: { initial: ProfileFormValues; locale: Locale }) {
  const [state, formAction] = useFormState(savePatientProfile, INITIAL);

  return (
    <form action={formAction} className="profile-form">
      <input type="hidden" name="locale" value={locale} />

      {state.ok && state.message ? (
        <div className="form-banner ok" role="status">
          <Check size={18} /> {state.message}
        </div>
      ) : null}
      {state.error ? (
        <div className="form-banner err" role="alert">
          {state.error}
        </div>
      ) : null}

      <div className="dcard">
        <h2>About you</h2>
        <p className="hint">Who the care is for and how we can reach you.</p>
        <div className="pf-grid">
          <div className="field">
            <label htmlFor="full_name">Full name</label>
            <input id="full_name" name="full_name" type="text" autoComplete="name" defaultValue={initial.full_name} />
          </div>
          <div className="field">
            <label htmlFor="patient_name">Patient name</label>
            <input id="patient_name" name="patient_name" type="text" defaultValue={initial.patient_name} />
          </div>
          <div className="field">
            <label htmlFor="date_of_birth">Date of birth</label>
            <input id="date_of_birth" name="date_of_birth" type="date" defaultValue={initial.date_of_birth} />
          </div>
          <Select name="age_group" label="Age group" value={initial.age_group} options={AGE_GROUPS} />
          <Select name="gender" label="Gender" value={initial.gender} options={GENDERS} />
          <Select name="patient_type" label="Who is this for" value={initial.patient_type} options={PATIENT_TYPES} />
          <Select name="relationship" label="Your relationship" value={initial.relationship} options={RELATIONSHIPS} />
        </div>
      </div>

      <div className="dcard">
        <h2>Contact</h2>
        <p className="hint">Used to confirm appointments and share updates.</p>
        <div className="pf-grid">
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={initial.phone} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" defaultValue={initial.email} />
          </div>
          <div className="field full">
            <label htmlFor="address">Address</label>
            <input id="address" name="address" type="text" autoComplete="street-address" defaultValue={initial.address} />
          </div>
          <div className="field">
            <label htmlFor="city">City</label>
            <input id="city" name="city" type="text" autoComplete="address-level2" defaultValue={initial.city} />
          </div>
          <div className="field">
            <label htmlFor="state">State</label>
            <input id="state" name="state" type="text" autoComplete="address-level1" defaultValue={initial.state} />
          </div>
          <div className="field">
            <label htmlFor="zip">ZIP</label>
            <input id="zip" name="zip" type="text" autoComplete="postal-code" defaultValue={initial.zip} />
          </div>
        </div>
      </div>

      <div className="dcard">
        <h2>Care needs</h2>
        <p className="hint">Pick everything that applies so we can match the right providers.</p>
        <div className="check-grid">
          {CARE_NEEDS.map((need) => (
            <label key={need} className="check">
              <input type="checkbox" name="care_needs" value={need} defaultChecked={initial.care_needs.includes(need)} />
              {need}
            </label>
          ))}
        </div>
      </div>

      <div className="dcard">
        <h2>Service preferences</h2>
        <p className="hint">The kinds of services you are most interested in.</p>
        <div className="check-grid">
          {SERVICE_PREFERENCES.map((pref) => (
            <label key={pref} className="check">
              <input
                type="checkbox"
                name="service_preferences"
                value={pref}
                defaultChecked={initial.service_preferences.includes(pref)}
              />
              {pref}
            </label>
          ))}
        </div>
      </div>

      <div className="dcard">
        <h2>Notes</h2>
        <p className="hint">Anything else your care team should know.</p>
        <div className="field">
          <label htmlFor="notes" className="sr-only">Notes</label>
          <textarea id="notes" name="notes" placeholder="Allergies, preferences, access needs..." defaultValue={initial.notes} />
        </div>
      </div>

      <div className="pf-actions">
        <SaveButton />
      </div>
    </form>
  );
}
