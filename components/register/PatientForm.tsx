'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import {
  GENDERS,
  PATIENT_PROBLEMS,
  PATIENT_TYPES,
  RELATIONSHIPS,
  THERAPY_SUPPORT,
  US_STATES,
  YES_NO,
} from './options';
import { useRegForm } from './useRegForm';
import { email, onlyIf, pastDate, phone, required, requiredChoice, zip } from './validate';

const INITIAL = {
  firstName: '',
  lastName: '',
  dob: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  patientType: '',
  problem: '',
  problemOther: '',
  // Single select for now. The list is shared with the multi-select components,
  // so switching to <ChoiceGroup mode="multi"> is the only change needed once
  // multiple services per patient are supported.
  therapy: '',
  therapyOther: '',
  message: '',
  isMinor: '',
  guardianName: '',
  guardianRelationship: '',
  guardianPhone: '',
  guardianEmail: '',
};

/** Whole years between a yyyy-mm-dd date of birth and today. */
const ageFromDob = (dob: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return '';
  const born = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(born.getTime())) return '';
  const today = new Date();
  let years = today.getFullYear() - born.getFullYear();
  const beforeBirthday =
    today.getMonth() < born.getMonth() ||
    (today.getMonth() === born.getMonth() && today.getDate() < born.getDate());
  if (beforeBirthday) years -= 1;
  return years >= 0 && years < 130 ? String(years) : '';
};

export default function PatientForm() {
  const form = useRegForm('patient', INITIAL, (v) => ({
    firstName: [required('Please enter the first name.')],
    lastName: [required('Please enter the last name.')],
    dob: [required('Please enter a date of birth.'), pastDate],
    phone: [required('Please enter a phone number.'), phone],
    email: [required('Please enter an email address.'), email],
    zip: [zip],
    patientType: [requiredChoice('Please choose a patient type.')],
    problem: [requiredChoice('Please choose the reason for care.')],
    problemOther: [onlyIf(v.problem === 'Other', required('Please specify the reason for care.'))],
    therapyOther: [onlyIf(v.therapy === 'Other', required('Please specify the support required.'))],
    guardianName: [onlyIf(v.isMinor === 'Yes', required('Please enter the parent or guardian name.'))],
    guardianPhone: [onlyIf(v.isMinor === 'Yes', required('Please enter a parent or guardian phone number.')), phone],
    guardianEmail: [email],
  }));

  const { values, status } = form;

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Patient Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Our care team will review the details and reach out to match you with the right providers."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Patient Registration Form" intro="Tell us who needs care and what kind of support they're looking for.">
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend="Patient details">
          <Grid>
            <TextField form={form} name="firstName" label="First Name" required autoComplete="given-name" />
            <TextField form={form} name="lastName" label="Last Name" required autoComplete="family-name" />
            <TextField
              form={form}
              name="dob"
              label="Date of Birth"
              type="date"
              required
              onChangeValue={(value) => form.patch({ dob: value, age: ageFromDob(value) })}
            />
            <TextField
              form={form}
              name="age"
              label="Age"
              type="number"
              inputMode="numeric"
              min="0"
              max="130"
              hint="Filled in from the date of birth — edit if needed."
            />
            <SelectField form={form} name="gender" label="Gender" options={GENDERS} />
            <TextField form={form} name="phone" label="Phone Number" type="tel" required autoComplete="tel" />
            <TextField form={form} name="email" label="Email Address" type="email" required autoComplete="email" span />
          </Grid>
        </FormSection>

        <FormSection legend="Address">
          <Grid>
            <TextField form={form} name="address" label="Address" autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label="City" autoComplete="address-level2" />
            <SelectField form={form} name="state" label="State" options={US_STATES} />
            <TextField form={form} name="zip" label="ZIP Code" inputMode="numeric" autoComplete="postal-code" />
          </Grid>
        </FormSection>

        <FormSection legend="Care needed">
          <Grid>
            <SelectField form={form} name="patientType" label="Patient Type" options={PATIENT_TYPES} required placeholder="Select patient type" />
            <SelectField
              form={form}
              name="problem"
              label="Problem / Reason for Care"
              options={PATIENT_PROBLEMS}
              required
              placeholder="Select problem"
              onChangeValue={(value) =>
                form.patch({ problem: value, problemOther: value === 'Other' ? values.problemOther : '' })
              }
            />
            {values.problem === 'Other' ? (
              <TextField form={form} name="problemOther" label="Please specify" required span />
            ) : null}
            <SelectField
              form={form}
              name="therapy"
              label="Therapy / Support Required"
              options={THERAPY_SUPPORT}
              placeholder="Select service"
              onChangeValue={(value) =>
                form.patch({ therapy: value, therapyOther: value === 'Other' ? values.therapyOther : '' })
              }
            />
            {values.therapy === 'Other' ? (
              <TextField form={form} name="therapyOther" label="Please specify" required />
            ) : null}
            <TextareaField
              form={form}
              name="message"
              label="Message / Additional Information"
              placeholder="Anything else the care team should know."
            />
          </Grid>
        </FormSection>

        <FormSection legend="Parent / guardian">
          <ChoiceGroup form={form} name="isMinor" label="Is the patient a minor?" options={YES_NO} mode="single" />
          {values.isMinor === 'Yes' ? (
            <Grid>
              <TextField form={form} name="guardianName" label="Parent / Guardian Name" required />
              <SelectField form={form} name="guardianRelationship" label="Relationship to Patient" options={RELATIONSHIPS} />
              <TextField form={form} name="guardianPhone" label="Parent / Guardian Phone" type="tel" required />
              <TextField form={form} name="guardianEmail" label="Parent / Guardian Email" type="email" />
            </Grid>
          ) : null}
        </FormSection>

        <SubmitRow label="Register Patient" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
