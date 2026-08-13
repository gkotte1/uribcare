'use client';

import { ChoiceGroup, FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import {
  AGE_GROUPS,
  GENDERS,
  THERAPIST_AREAS,
  THERAPIST_LICENSE_TYPES,
  THERAPY_TYPES,
  US_STATES,
  YES_NO,
  isTherapyType,
} from './options';
import { useRegForm } from './useRegForm';
import { date, email, futureDate, npi, onlyIf, phone, required, requiredChoice, upload, zip } from './validate';

const INITIAL = {
  therapyType: '',
  area: '',
  areaOther: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  experience: '',
  gender: '',
  bio: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  autismExperience: '',
  autismYears: '',
  ageGroups: [] as string[],
  licenseType: '',
  licenseTypeOther: '',
  licenseNumber: '',
  issuingState: '',
  licenseIssueDate: '',
  licenseExpiration: '',
  npi: '',
  certifications: '',
  education: '',
  uploadLicense: null as File | null,
  uploadCertification: null as File | null,
};

export default function TherapistForm() {
  const form = useRegForm('therapist', INITIAL, (v) => ({
    therapyType: [requiredChoice('Please choose a therapy type.')],
    area: [requiredChoice('Please choose an area of practice.')],
    areaOther: [onlyIf(v.area === 'Other', required('Please specify the area of practice.'))],
    firstName: [required('Please enter your first name.')],
    lastName: [required('Please enter your last name.')],
    email: [required('Please enter your professional email.'), email],
    phone: [required('Please enter a phone number.'), phone],
    zip: [zip],
    licenseType: [requiredChoice('Please choose a license type.')],
    licenseTypeOther: [onlyIf(v.licenseType === 'Other', required('Please specify the license type.'))],
    licenseNumber: [required('Please enter your license number.')],
    issuingState: [requiredChoice('Please choose the issuing state.')],
    licenseIssueDate: [date],
    licenseExpiration: [required('Please enter the license expiration date.'), futureDate],
    npi: [npi],
    uploadLicense: [upload],
    uploadCertification: [upload],
  }));

  const { values, status } = form;

  // The problem dropdown is driven entirely by the selected therapy type, so
  // only that type's options are ever offered.
  const areaOptions = isTherapyType(values.therapyType) ? THERAPIST_AREAS[values.therapyType] : [];

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Therapist Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Your license and certifications will be reviewed by our team before your profile goes live."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Therapist Registration Form" intro="Start with your therapy type — the areas of practice update to match.">
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend="Therapy focus">
          <Grid>
            <SelectField
              form={form}
              name="therapyType"
              label="Therapy Type"
              options={THERAPY_TYPES}
              required
              placeholder="Select therapy type"
              // Changing the therapy type clears the dependent problem selection.
              onChangeValue={(value) => form.patch({ therapyType: value, area: '', areaOther: '' })}
            />
            <SelectField
              form={form}
              name="area"
              label="Area of Practice / Problem Treated"
              options={areaOptions}
              required
              disabled={areaOptions.length === 0}
              placeholder={areaOptions.length ? 'Select area of practice' : 'Select a therapy type first'}
              onChangeValue={(value) => form.patch({ area: value, areaOther: value === 'Other' ? values.areaOther : '' })}
            />
            {values.area === 'Other' ? (
              <TextField form={form} name="areaOther" label="Please specify" required span />
            ) : null}
          </Grid>
        </FormSection>

        <FormSection legend="Professional information">
          <Grid>
            <TextField form={form} name="firstName" label="First Name" required autoComplete="given-name" />
            <TextField form={form} name="lastName" label="Last Name" required autoComplete="family-name" />
            <TextField form={form} name="email" label="Professional Email" type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label="Phone Number" type="tel" required autoComplete="tel" />
            <TextField form={form} name="experience" label="Years of Experience" type="number" inputMode="numeric" min="0" max="70" />
            <SelectField form={form} name="gender" label="Gender" options={GENDERS} />
            <TextareaField
              form={form}
              name="bio"
              label="Professional Bio"
              placeholder="A short summary of your practice and approach."
            />
          </Grid>
        </FormSection>

        <FormSection legend="Practice address">
          <Grid>
            <TextField form={form} name="address" label="Address" autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label="City" autoComplete="address-level2" />
            <SelectField form={form} name="state" label="State" options={US_STATES} />
            <TextField form={form} name="zip" label="ZIP Code" inputMode="numeric" autoComplete="postal-code" />
          </Grid>
        </FormSection>

        <FormSection legend="Autism care experience">
          <Grid>
            <SelectField
              form={form}
              name="autismExperience"
              label="Experience working with autistic patients?"
              options={YES_NO}
              onChangeValue={(value) =>
                form.patch(
                  value === 'Yes'
                    ? { autismExperience: value }
                    : { autismExperience: value, autismYears: '', ageGroups: [] }
                )
              }
            />
            {values.autismExperience === 'Yes' ? (
              <TextField
                form={form}
                name="autismYears"
                label="Years of Autism Care Experience"
                type="number"
                inputMode="numeric"
                min="0"
                max="70"
              />
            ) : null}
          </Grid>
          {values.autismExperience === 'Yes' ? (
            <ChoiceGroup
              form={form}
              name="ageGroups"
              label="Age Groups Served"
              options={AGE_GROUPS}
              hint="Select all that apply."
            />
          ) : null}
        </FormSection>

        <FormSection legend="Credentials">
          <Grid>
            <SelectField
              form={form}
              name="licenseType"
              label="License Type"
              options={THERAPIST_LICENSE_TYPES}
              required
              placeholder="Select license type"
              onChangeValue={(value) =>
                form.patch({ licenseType: value, licenseTypeOther: value === 'Other' ? values.licenseTypeOther : '' })
              }
            />
            {values.licenseType === 'Other' ? (
              <TextField form={form} name="licenseTypeOther" label="Please specify" required />
            ) : null}
            <TextField form={form} name="licenseNumber" label="License Number" required />
            <SelectField form={form} name="issuingState" label="Issuing State" options={US_STATES} required placeholder="Select state" />
            <TextField form={form} name="licenseIssueDate" label="License Issue Date" type="date" />
            <TextField form={form} name="licenseExpiration" label="License Expiration Date" type="date" required />
            <TextField form={form} name="npi" label="NPI Number" inputMode="numeric" hint="10 digits, if applicable" />
            <TextField form={form} name="certifications" label="Certifications" />
            <TextField form={form} name="education" label="Education / Degree" />
          </Grid>
        </FormSection>

        <FormSection legend="Credential uploads">
          <Grid>
            <FileField form={form} name="uploadLicense" label="Upload License" />
            <FileField form={form} name="uploadCertification" label="Upload Certification" />
          </Grid>
        </FormSection>

        <SubmitRow label="Submit Therapist Registration" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
