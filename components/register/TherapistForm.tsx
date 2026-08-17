'use client';

import { ChoiceGroup, FileField, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import { optionsFor } from './optionsFor';
import { THERAPY_TYPES as EN_THERAPY_TYPES, isTherapyType } from './options';
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
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.therapist;
  const o = optionsFor(locale);
  const form = useRegForm('therapist', INITIAL, (v) => ({
    therapyType: [requiredChoice(d.validation.choice)],
    area: [requiredChoice(d.validation.choice)],
    areaOther: [onlyIf(v.area === 'Other', required(d.validation.required))],
    firstName: [required(d.validation.required)],
    lastName: [required(d.validation.required)],
    email: [required(d.validation.required), email],
    phone: [required(d.validation.required), phone],
    zip: [zip],
    licenseType: [requiredChoice(d.validation.choice)],
    licenseTypeOther: [onlyIf(v.licenseType === 'Other', required(d.validation.required))],
    licenseNumber: [required(d.validation.required)],
    issuingState: [requiredChoice(d.validation.choice)],
    licenseIssueDate: [date],
    licenseExpiration: [required(d.validation.required), futureDate],
    npi: [npi],
    uploadLicense: [upload],
    uploadCertification: [upload],
  }));

  const { values, status } = form;

  // The problem dropdown is driven entirely by the selected therapy type, so
  // only that type's options are ever offered.
  // The stored therapy type is whichever label the visitor saw, so the area
  // list is resolved by position against the English type list. Both locales
  // keep the same order, so the dependency behaves identically.
  const typeIndex = o.therapyTypes.indexOf(values.therapyType);
  const englishType = typeIndex >= 0 ? EN_THERAPY_TYPES[typeIndex] : '';
  const areaOptions = isTherapyType(englishType) ? o.therapistAreas[englishType] : [];

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
        <FormSection legend={d.sections.therapyFocus}>
          <Grid>
            <SelectField
              form={form}
              name="therapyType"
              label={t.therapyType}
              options={o.therapyTypes}
              required
              placeholder={t.selectTherapyType}
              // Changing the therapy type clears the dependent problem selection.
              onChangeValue={(value) => form.patch({ therapyType: value, area: '', areaOther: '' })}
            />
            <SelectField
              form={form}
              name="area"
              label={t.area}
              options={areaOptions}
              required
              disabled={areaOptions.length === 0}
              placeholder={areaOptions.length ? t.selectArea : t.selectTypeFirst}
              onChangeValue={(value) => form.patch({ area: value, areaOther: value === 'Other' ? values.areaOther : '' })}
            />
            {values.area === 'Other' ? (
              <TextField form={form} name="areaOther" label={d.common.pleaseSpecify} required span />
            ) : null}
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.professional}>
          <Grid>
            <TextField form={form} name="firstName" label={d.fields.firstName} required autoComplete="given-name" />
            <TextField form={form} name="lastName" label={d.fields.lastName} required autoComplete="family-name" />
            <TextField form={form} name="email" label={d.fields.professionalEmail} type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label={d.fields.phone} type="tel" required autoComplete="tel" />
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
                    : { autismExperience: value, autismYears: '', ageGroups: [] }
                )
              }
            />
            {values.autismExperience === 'Yes' ? (
              <TextField
                form={form}
                name="autismYears"
                label={t.autismYears}
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
              label={t.ageGroups}
              options={o.ageGroups}
              hint={d.common.selectAllThatApply}
            />
          ) : null}
        </FormSection>

        <FormSection legend={d.sections.credentials}>
          <Grid>
            <SelectField
              form={form}
              name="licenseType"
              label={d.fields.licenseType}
              options={o.therapistLicenseTypes}
              required
              placeholder={t.selectLicenseType}
              onChangeValue={(value) =>
                form.patch({ licenseType: value, licenseTypeOther: value === 'Other' ? values.licenseTypeOther : '' })
              }
            />
            {values.licenseType === 'Other' ? (
              <TextField form={form} name="licenseTypeOther" label={d.common.pleaseSpecify} required />
            ) : null}
            <TextField form={form} name="licenseNumber" label={d.fields.licenseNumber} required />
            <SelectField form={form} name="issuingState" label={d.fields.issuingState} options={o.states} required placeholder={t.selectState} />
            <TextField form={form} name="licenseIssueDate" label={d.fields.licenseIssue} type="date" />
            <TextField form={form} name="licenseExpiration" label={d.fields.licenseExpiration} type="date" required />
            <TextField form={form} name="npi" label={d.fields.npi} inputMode="numeric" hint={t.npiHint} />
            <TextField form={form} name="certifications" label={d.fields.certifications} />
            <TextField form={form} name="education" label={d.fields.education} />
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
