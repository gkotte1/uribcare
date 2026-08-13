'use client';

import { FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import { DOCTOR_SPECIALTIES, DOCTOR_TITLES, GENDERS, US_STATES, YES_NO } from './options';
import { useRegForm } from './useRegForm';
import { email, futureDate, npi, onlyIf, phone, required, requiredChoice, upload, zip } from './validate';

const INITIAL = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  title: '',
  titleOther: '',
  specialty: '',
  specialtyOther: '',
  subSpecialty: '',
  experience: '',
  gender: '',
  bio: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  licenseNumber: '',
  licensingState: '',
  licenseExpiration: '',
  npi: '',
  boardCertified: '',
  dea: '',
  medicalSchool: '',
  degree: '',
  residency: '',
  fellowship: '',
  uploadLicense: null as File | null,
  uploadBoardCert: null as File | null,
  uploadNpi: null as File | null,
  uploadGovId: null as File | null,
  uploadOther: null as File | null,
};

export default function DoctorForm() {
  const form = useRegForm('doctor', INITIAL, (v) => ({
    firstName: [required('Please enter your first name.')],
    lastName: [required('Please enter your last name.')],
    email: [required('Please enter your professional email.'), email],
    phone: [required('Please enter a phone number.'), phone],
    title: [requiredChoice('Please choose your professional title.')],
    titleOther: [onlyIf(v.title === 'Other', required('Please specify your professional title.'))],
    specialty: [requiredChoice('Please choose your specialty.')],
    specialtyOther: [onlyIf(v.specialty === 'Other', required('Please specify your specialty.'))],
    zip: [zip],
    licenseNumber: [required('Please enter your medical license number.')],
    licensingState: [requiredChoice('Please choose the licensing state.')],
    licenseExpiration: [required('Please enter the license expiration date.'), futureDate],
    npi: [required('Please enter your NPI number.'), npi],
    uploadLicense: [upload],
    uploadBoardCert: [upload],
    uploadNpi: [upload],
    uploadGovId: [upload],
    uploadOther: [upload],
  }));

  const { values, status } = form;

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Doctor Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Your credentials will be reviewed by our team before your profile goes live. Nothing is marked verified until that review is complete."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Doctor Registration Form" intro="Credentials are reviewed manually — profiles stay unverified until that review completes.">
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
              options={DOCTOR_TITLES}
              required
              placeholder="Select title"
              onChangeValue={(value) => form.patch({ title: value, titleOther: value === 'Other' ? values.titleOther : '' })}
            />
            {values.title === 'Other' ? <TextField form={form} name="titleOther" label="Please specify" required /> : null}
            <SelectField
              form={form}
              name="specialty"
              label="Specialty"
              options={DOCTOR_SPECIALTIES}
              required
              placeholder="Select specialty"
              onChangeValue={(value) =>
                form.patch({ specialty: value, specialtyOther: value === 'Other' ? values.specialtyOther : '' })
              }
            />
            {values.specialty === 'Other' ? (
              <TextField form={form} name="specialtyOther" label="Please specify" required />
            ) : null}
            <TextField form={form} name="subSpecialty" label="Sub-specialty" />
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

        <FormSection legend="Credentials">
          <Grid>
            <TextField form={form} name="licenseNumber" label="Medical License Number" required />
            <SelectField form={form} name="licensingState" label="Licensing State" options={US_STATES} required placeholder="Select state" />
            <TextField form={form} name="licenseExpiration" label="License Expiration Date" type="date" required />
            <TextField form={form} name="npi" label="NPI Number" required inputMode="numeric" hint="10 digits" />
            <SelectField form={form} name="boardCertified" label="Board Certified?" options={YES_NO} />
            <TextField form={form} name="dea" label="DEA Registration" hint="If applicable" />
            <TextField form={form} name="medicalSchool" label="Medical School" />
            <TextField form={form} name="degree" label="Degree" />
            <TextField form={form} name="residency" label="Residency" />
            <TextField form={form} name="fellowship" label="Fellowship" />
          </Grid>
        </FormSection>

        <FormSection legend="Credential uploads">
          <Grid>
            <FileField form={form} name="uploadLicense" label="Upload Medical License" />
            <FileField form={form} name="uploadBoardCert" label="Upload Board Certification" />
            <FileField form={form} name="uploadNpi" label="Upload NPI Documentation" />
            <FileField form={form} name="uploadGovId" label="Upload Government ID" />
            <FileField form={form} name="uploadOther" label="Upload Other Credentials" />
          </Grid>
        </FormSection>

        <SubmitRow label="Submit Doctor Registration" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
