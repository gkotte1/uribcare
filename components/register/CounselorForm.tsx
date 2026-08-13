'use client';

import { ChoiceGroup, FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import { AGE_GROUPS, COUNSELING_SPECIALTIES, COUNSELOR_TITLES, GENDERS, US_STATES, YES_NO } from './options';
import { useRegForm } from './useRegForm';
import { email, futureDate, npi, onlyIf, phone, required, requiredChoice, upload, zip } from './validate';

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  title: '',
  titleOther: '',
  experience: '',
  gender: '',
  bio: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  specialty: '',
  specialtyOther: '',
  autismExperience: '',
  autismYears: '',
  ageGroups: [] as string[],
  autismTraining: '',
  licenseType: '',
  licenseNumber: '',
  licensingState: '',
  licenseExpiration: '',
  npi: '',
  certifications: '',
  uploadLicense: null as File | null,
  uploadCertification: null as File | null,
};

export default function CounselorForm() {
  const form = useRegForm('counselor', INITIAL, (v) => ({
    firstName: [required('Please enter your first name.')],
    lastName: [required('Please enter your last name.')],
    email: [required('Please enter your professional email.'), email],
    phone: [required('Please enter a phone number.'), phone],
    title: [requiredChoice('Please choose your professional title.')],
    titleOther: [onlyIf(v.title === 'Other', required('Please specify your professional title.'))],
    specialty: [requiredChoice('Please choose your counseling specialty.')],
    specialtyOther: [onlyIf(v.specialty === 'Other', required('Please specify your counseling specialty.'))],
    zip: [zip],
    licenseExpiration: [futureDate],
    npi: [npi],
    uploadLicense: [upload],
    uploadCertification: [upload],
  }));

  const { values, status } = form;

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Counselor Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Your license and training details will be reviewed by our team before your profile goes live."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Counselor Registration Form" intro="Tell us about your counseling practice and credentials.">
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend="Professional information">
          <Grid>
            <TextField form={form} name="firstName" label="First Name" required autoComplete="given-name" />
            <TextField form={form} name="lastName" label="Last Name" required autoComplete="family-name" />
            <TextField form={form} name="email" label="Professional Email" type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label="Phone Number" type="tel" required autoComplete="tel" />
            <SelectField
              form={form}
              name="title"
              label="Professional Title"
              options={COUNSELOR_TITLES}
              required
              placeholder="Select title"
              onChangeValue={(value) => form.patch({ title: value, titleOther: value === 'Other' ? values.titleOther : '' })}
            />
            {values.title === 'Other' ? <TextField form={form} name="titleOther" label="Please specify" required /> : null}
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

        <FormSection legend="Specialty">
          <Grid>
            <SelectField
              form={form}
              name="specialty"
              label="Counseling Specialty"
              options={COUNSELING_SPECIALTIES}
              required
              placeholder="Select specialty"
              onChangeValue={(value) =>
                form.patch({ specialty: value, specialtyOther: value === 'Other' ? values.specialtyOther : '' })
              }
            />
            {values.specialty === 'Other' ? (
              <TextField form={form} name="specialtyOther" label="Please specify" required />
            ) : null}
          </Grid>
        </FormSection>

        <FormSection legend="Autism care experience">
          <Grid>
            <SelectField
              form={form}
              name="autismExperience"
              label="Experience with Autism?"
              options={YES_NO}
              onChangeValue={(value) =>
                form.patch(
                  value === 'Yes'
                    ? { autismExperience: value }
                    : { autismExperience: value, autismYears: '', ageGroups: [], autismTraining: '' }
                )
              }
            />
            {values.autismExperience === 'Yes' ? (
              <TextField
                form={form}
                name="autismYears"
                label="Years of Experience"
                type="number"
                inputMode="numeric"
                min="0"
                max="70"
              />
            ) : null}
          </Grid>
          {values.autismExperience === 'Yes' ? (
            <>
              <ChoiceGroup
                form={form}
                name="ageGroups"
                label="Age Groups Served"
                options={AGE_GROUPS}
                hint="Select all that apply."
              />
              <Grid>
                <TextareaField
                  form={form}
                  name="autismTraining"
                  label="Relevant Training / Certification"
                  rows={3}
                />
              </Grid>
            </>
          ) : null}
        </FormSection>

        <FormSection legend="Credentials">
          <Grid>
            <TextField form={form} name="licenseType" label="License Type" />
            <TextField form={form} name="licenseNumber" label="License Number" />
            <SelectField form={form} name="licensingState" label="Licensing State" options={US_STATES} placeholder="Select state" />
            <TextField form={form} name="licenseExpiration" label="License Expiration" type="date" />
            <TextField form={form} name="npi" label="NPI Number" inputMode="numeric" hint="10 digits, where applicable" />
            <TextField form={form} name="certifications" label="Certifications" />
          </Grid>
        </FormSection>

        <FormSection legend="Credential uploads">
          <Grid>
            <FileField form={form} name="uploadLicense" label="Upload License" />
            <FileField form={form} name="uploadCertification" label="Upload Certification" />
          </Grid>
        </FormSection>

        <SubmitRow label="Submit Counselor Registration" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
