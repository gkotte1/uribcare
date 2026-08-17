'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField, TextareaField } from './Fields';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import { optionsFor } from './optionsFor';
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
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.patient;
  const o = optionsFor(locale);
  const form = useRegForm('patient', INITIAL, (v) => ({
    firstName: [required(d.validation.required)],
    lastName: [required(d.validation.required)],
    dob: [required(d.validation.required), pastDate],
    phone: [required(d.validation.required), phone],
    email: [required(d.validation.required), email],
    zip: [zip],
    patientType: [requiredChoice(d.validation.choice)],
    problem: [requiredChoice(d.validation.choice)],
    problemOther: [onlyIf(v.problem === 'Other', required(d.validation.required))],
    therapyOther: [onlyIf(v.therapy === 'Other', required(d.validation.required))],
    guardianName: [onlyIf(v.isMinor === 'Yes', required(d.validation.required))],
    guardianPhone: [onlyIf(v.isMinor === 'Yes', required(d.validation.required)), phone],
    guardianEmail: [email],
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
        <FormSection legend={d.sections.patientDetails}>
          <Grid>
            <TextField form={form} name="firstName" label={d.fields.firstName} required autoComplete="given-name" />
            <TextField form={form} name="lastName" label={d.fields.lastName} required autoComplete="family-name" />
            <TextField
              form={form}
              name="dob"
              label={d.fields.dob}
              type="date"
              required
              onChangeValue={(value) => form.patch({ dob: value, age: ageFromDob(value) })}
            />
            <TextField
              form={form}
              name="age"
              label={d.fields.age}
              type="number"
              inputMode="numeric"
              min="0"
              max="130"
              hint={t.ageHint}
            />
            <SelectField form={form} name="gender" label={d.fields.gender} options={o.genders} />
            <TextField form={form} name="phone" label={d.fields.phone} type="tel" required autoComplete="tel" />
            <TextField form={form} name="email" label={d.fields.email} type="email" required autoComplete="email" span />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.address}>
          <Grid>
            <TextField form={form} name="address" label={d.fields.address} autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label={d.fields.city} autoComplete="address-level2" />
            <SelectField form={form} name="state" label={d.fields.state} options={o.states} />
            <TextField form={form} name="zip" label={d.fields.zip} inputMode="numeric" autoComplete="postal-code" />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.careNeeded}>
          <Grid>
            <SelectField form={form} name="patientType" label={t.patientType} options={o.patientTypes} required placeholder={t.selectPatientType} />
            <SelectField
              form={form}
              name="problem"
              label={t.problem}
              options={o.patientProblems}
              required
              placeholder={t.selectProblem}
              onChangeValue={(value) =>
                form.patch({ problem: value, problemOther: value === 'Other' ? values.problemOther : '' })
              }
            />
            {values.problem === 'Other' ? (
              <TextField form={form} name="problemOther" label={d.common.pleaseSpecify} required span />
            ) : null}
            <SelectField
              form={form}
              name="therapy"
              label={t.therapy}
              options={o.therapySupport}
              placeholder={t.selectService}
              onChangeValue={(value) =>
                form.patch({ therapy: value, therapyOther: value === 'Other' ? values.therapyOther : '' })
              }
            />
            {values.therapy === 'Other' ? (
              <TextField form={form} name="therapyOther" label={d.common.pleaseSpecify} required />
            ) : null}
            <TextareaField
              form={form}
              name="message"
              label={d.fields.message}
              placeholder={t.messagePlaceholder}
            />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.guardian}>
          <ChoiceGroup form={form} name="isMinor" label={t.isMinor} options={o.yesNo} mode="single" />
          {values.isMinor === 'Yes' ? (
            <Grid>
              <TextField form={form} name="guardianName" label={t.guardianName} required />
              <SelectField form={form} name="guardianRelationship" label={t.relationship} options={o.relationships} />
              <TextField form={form} name="guardianPhone" label={t.guardianPhone} type="tel" required />
              <TextField form={form} name="guardianEmail" label={t.guardianEmail} type="email" />
            </Grid>
          ) : null}
        </FormSection>

        <SubmitRow label={t.submit} submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
