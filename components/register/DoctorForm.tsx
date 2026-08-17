'use client';

import { FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import { optionsFor } from './optionsFor';
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
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.doctor;
  const o = optionsFor(locale);
  const form = useRegForm('doctor', INITIAL, (v) => ({
    firstName: [required(d.validation.required)],
    lastName: [required(d.validation.required)],
    email: [required(d.validation.required), email],
    phone: [required(d.validation.required), phone],
    title: [requiredChoice(d.validation.choice)],
    titleOther: [onlyIf(v.title === 'Other', required(d.validation.required))],
    specialty: [requiredChoice(d.validation.choice)],
    specialtyOther: [onlyIf(v.specialty === 'Other', required(d.validation.required))],
    zip: [zip],
    licenseNumber: [required(d.validation.required)],
    licensingState: [requiredChoice(d.validation.choice)],
    licenseExpiration: [required(d.validation.required), futureDate],
    npi: [required(d.validation.required), npi],
    uploadLicense: [upload],
    uploadBoardCert: [upload],
    uploadNpi: [upload],
    uploadGovId: [upload],
    uploadOther: [upload],
  }));

  const { values, status } = form;

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title={t.title}>
        <SuccessPanel
          heading={d.common.received}
          submission={form.submission}
          note={t.successNote}
        />
      </FormCard>
    );
  }

  return (
    <FormCard title={t.title} intro={t.intro}>
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend={d.sections.professional}>
          <Grid>
            <TextField form={form} name="firstName" label={d.fields.firstName} required autoComplete="given-name" />
            <TextField form={form} name="lastName" label={d.fields.lastName} required autoComplete="family-name" />
            <TextField form={form} name="email" label={d.fields.professionalEmail} type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label={d.fields.phone} type="tel" required autoComplete="tel" />
            <SelectField
              form={form}
              name="title"
              label={d.fields.title}
              options={o.doctorTitles}
              required
              placeholder={t.selectTitle}
              onChangeValue={(value) => form.patch({ title: value, titleOther: value === 'Other' ? values.titleOther : '' })}
            />
            {values.title === 'Other' ? <TextField form={form} name="titleOther" label={d.common.pleaseSpecify} required /> : null}
            <SelectField
              form={form}
              name="specialty"
              label={d.fields.specialty}
              options={o.doctorSpecialties}
              required
              placeholder={t.selectSpecialty}
              onChangeValue={(value) =>
                form.patch({ specialty: value, specialtyOther: value === 'Other' ? values.specialtyOther : '' })
              }
            />
            {values.specialty === 'Other' ? (
              <TextField form={form} name="specialtyOther" label={d.common.pleaseSpecify} required />
            ) : null}
            <TextField form={form} name="subSpecialty" label={d.fields.subSpecialty} />
            <TextField form={form} name="experience" label={d.fields.experience} type="number" inputMode="numeric" min="0" max="70" />
            <SelectField form={form} name="gender" label={d.fields.gender} options={o.genders} />
            <TextareaField
              form={form}
              name="bio"
              label={d.fields.bio}
              placeholder={t.bioPlaceholder}
            />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.practiceAddress}>
          <Grid>
            <TextField form={form} name="address" label={d.fields.address} autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label={d.fields.city} autoComplete="address-level2" />
            <SelectField form={form} name="state" label={d.fields.state} options={o.states} />
            <TextField form={form} name="zip" label={d.fields.zip} inputMode="numeric" autoComplete="postal-code" />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.credentials}>
          <Grid>
            <TextField form={form} name="licenseNumber" label={t.medicalLicense} required />
            <SelectField form={form} name="licensingState" label={d.fields.licensingState} options={o.states} required placeholder={t.selectState} />
            <TextField form={form} name="licenseExpiration" label={d.fields.licenseExpiration} type="date" required />
            <TextField form={form} name="npi" label={d.fields.npi} required inputMode="numeric" hint={t.npiHint} />
            <SelectField form={form} name="boardCertified" label={t.boardCertified} options={o.yesNo} />
            <TextField form={form} name="dea" label={t.dea} hint={t.deaHint} />
            <TextField form={form} name="medicalSchool" label={t.medicalSchool} />
            <TextField form={form} name="degree" label={t.degree} />
            <TextField form={form} name="residency" label={t.residency} />
            <TextField form={form} name="fellowship" label={t.fellowship} />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.uploads}>
          <Grid>
            <FileField form={form} name="uploadLicense" label={t.uploadLicense} />
            <FileField form={form} name="uploadBoardCert" label={t.uploadBoardCert} />
            <FileField form={form} name="uploadNpi" label={t.uploadNpi} />
            <FileField form={form} name="uploadGovId" label={t.uploadGovId} />
            <FileField form={form} name="uploadOther" label={t.uploadOther} />
          </Grid>
        </FormSection>

        <SubmitRow label={t.submit} submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
