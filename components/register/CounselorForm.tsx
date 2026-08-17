'use client';

import { ChoiceGroup, FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
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
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.counselor;
  const o = optionsFor(locale);
  const form = useRegForm('counselor', INITIAL, (v) => ({
    firstName: [required(d.validation.required)],
    lastName: [required(d.validation.required)],
    email: [required(d.validation.required), email],
    phone: [required(d.validation.required), phone],
    title: [requiredChoice(d.validation.choice)],
    titleOther: [onlyIf(v.title === 'Other', required(d.validation.required))],
    specialty: [requiredChoice(d.validation.choice)],
    specialtyOther: [onlyIf(v.specialty === 'Other', required(d.validation.required))],
    zip: [zip],
    licenseExpiration: [futureDate],
    npi: [npi],
    uploadLicense: [upload],
    uploadCertification: [upload],
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
              options={o.counselorTitles}
              required
              placeholder={t.selectTitle}
              onChangeValue={(value) => form.patch({ title: value, titleOther: value === 'Other' ? values.titleOther : '' })}
            />
            {values.title === 'Other' ? <TextField form={form} name="titleOther" label={d.common.pleaseSpecify} required /> : null}
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

        <FormSection legend={d.sections.specialty}>
          <Grid>
            <SelectField
              form={form}
              name="specialty"
              label={t.specialty}
              options={o.counselingSpecialties}
              required
              placeholder={t.selectSpecialty}
              onChangeValue={(value) =>
                form.patch({ specialty: value, specialtyOther: value === 'Other' ? values.specialtyOther : '' })
              }
            />
            {values.specialty === 'Other' ? (
              <TextField form={form} name="specialtyOther" label={d.common.pleaseSpecify} required />
            ) : null}
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.autismExperience}>
          <Grid>
            <SelectField
              form={form}
              name="autismExperience"
              label={t.autismExperience}
              options={o.yesNo}
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
                label={d.fields.experience}
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
                label={t.ageGroups}
                options={o.ageGroups}
                hint={d.common.selectAllThatApply}
              />
              <Grid>
                <TextareaField
                  form={form}
                  name="autismTraining"
                  label={t.autismTraining}
                  rows={3}
                />
              </Grid>
            </>
          ) : null}
        </FormSection>

        <FormSection legend={d.sections.credentials}>
          <Grid>
            <TextField form={form} name="licenseType" label={d.fields.licenseType} />
            <TextField form={form} name="licenseNumber" label={d.fields.licenseNumber} />
            <SelectField form={form} name="licensingState" label={d.fields.licensingState} options={o.states} placeholder={t.selectState} />
            <TextField form={form} name="licenseExpiration" label={t.licenseExpiration} type="date" />
            <TextField form={form} name="npi" label={d.fields.npi} inputMode="numeric" hint={t.npiHint} />
            <TextField form={form} name="certifications" label={d.fields.certifications} />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.uploads}>
          <Grid>
            <FileField form={form} name="uploadLicense" label={t.uploadLicense} />
            <FileField form={form} name="uploadCertification" label={t.uploadCertification} />
          </Grid>
        </FormSection>

        <SubmitRow label={t.submit} submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
