'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField } from './Fields';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import { optionsFor } from './optionsFor';
import { useRegForm } from './useRegForm';
import { email, futureDate, onlyIf, phone, required, requiredChoice, website, zip } from './validate';

const INITIAL = {
  pharmacyName: '',
  legalName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  website: '',
  hours: '',
  licenseNumber: '',
  issuingState: '',
  licenseExpiration: '',
  pharmacistFirstName: '',
  pharmacistLastName: '',
  pharmacistLicenseNumber: '',
  pharmacistState: '',
  services: [] as string[],
  servicesOther: '',
  discountInterest: '',
};

export default function PharmacyForm() {
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.pharmacy;
  const o = optionsFor(locale);
  const form = useRegForm('pharmacy', INITIAL, (v) => ({
    pharmacyName: [required(d.validation.required)],
    legalName: [required(d.validation.required)],
    email: [required(d.validation.required), email],
    phone: [required(d.validation.required), phone],
    address: [required(d.validation.required)],
    city: [required(d.validation.required)],
    state: [requiredChoice(d.validation.choice)],
    zip: [required(d.validation.required), zip],
    website: [website],
    licenseNumber: [required(d.validation.required)],
    issuingState: [requiredChoice(d.validation.choice)],
    licenseExpiration: [required(d.validation.required), futureDate],
    pharmacistFirstName: [required(d.validation.required)],
    pharmacistLastName: [required(d.validation.required)],
    pharmacistLicenseNumber: [required(d.validation.required)],
    pharmacistState: [requiredChoice(d.validation.choice)],
    servicesOther: [onlyIf(v.services.includes('Other'), required(d.validation.required))],
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
        <FormSection legend={d.sections.business}>
          <Grid>
            <TextField form={form} name="pharmacyName" label={t.pharmacyName} required />
            <TextField form={form} name="legalName" label={t.legalName} required />
            <TextField form={form} name="email" label={d.fields.businessEmail} type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label={d.fields.phone} type="tel" required autoComplete="tel" />
            <TextField form={form} name="address" label={d.fields.address} required autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label={d.fields.city} required autoComplete="address-level2" />
            <SelectField form={form} name="state" label={d.fields.state} options={o.states} required placeholder={t.selectState} />
            <TextField form={form} name="zip" label={d.fields.zip} required inputMode="numeric" autoComplete="postal-code" />
          </Grid>
          <Grid>
            <TextField form={form} name="website" label={d.fields.website} type="url" placeholder={t.websitePlaceholder} />
            <TextField form={form} name="hours" label={t.businessHours} placeholder={t.hoursPlaceholder} />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.pharmacyLicence}>
          <Grid cols={3}>
            <TextField form={form} name="licenseNumber" label={t.pharmacyLicense} required />
            <SelectField form={form} name="issuingState" label={d.fields.issuingState} options={o.states} required placeholder={t.selectState} />
            <TextField form={form} name="licenseExpiration" label={d.fields.licenseExpiration} type="date" required />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.responsiblePharmacist}>
          <Grid>
            <TextField form={form} name="pharmacistFirstName" label={d.fields.firstName} required />
            <TextField form={form} name="pharmacistLastName" label={d.fields.lastName} required />
            <TextField form={form} name="pharmacistLicenseNumber" label={t.pharmacistLicense} required />
            <SelectField form={form} name="pharmacistState" label={d.fields.state} options={o.states} required placeholder={t.selectState} />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.services}>
          <ChoiceGroup
            form={form}
            name="services"
            label={t.servicesOffered}
            options={o.pharmacyServices}
            hint={d.common.selectAllThatApply}
          />
          {values.services.includes('Other') ? (
            <Grid>
              <TextField form={form} name="servicesOther" label={d.common.pleaseSpecify} required span />
            </Grid>
          ) : null}
          <ChoiceGroup
            form={form}
            name="discountInterest"
            label={t.discountInterest}
            options={o.yesNo}
            mode="single"
            hint={t.discountHint}
          />
        </FormSection>

        <SubmitRow label={t.submit} submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
