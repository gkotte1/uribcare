'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField } from './Fields';
import { usePathname } from 'next/navigation';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import { optionsFor } from './optionsFor';
import { useRegForm } from './useRegForm';
import type { RowValue } from './validate';
import { email, futureDate, onlyIf, phone, required, requiredChoice, website, zip } from './validate';

const EMPTY_LOCATION: RowValue = { address: '', city: '', state: '', zip: '', phone: '', hours: '' };

const INITIAL = {
  labName: '',
  legalName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  website: '',
  hours: '',
  clia: '',
  cliaType: '',
  certificateExpiration: '',
  stateLicense: '',
  accreditation: '',
  services: [] as string[],
  servicesOther: '',
  availability: [] as string[],
  locations: [] as RowValue[],
};

export default function LaboratoryForm() {
  const locale = localeFromPath(usePathname() || '/');
  const d = getDictionary(locale).register;
  const t = d.forms.laboratory;
  const o = optionsFor(locale);
  const form = useRegForm('laboratory', INITIAL, (v) => ({
    labName: [required(d.validation.required)],
    legalName: [required(d.validation.required)],
    email: [required(d.validation.required), email],
    phone: [required(d.validation.required), phone],
    address: [required(d.validation.required)],
    city: [required(d.validation.required)],
    state: [requiredChoice(d.validation.choice)],
    zip: [required(d.validation.required), zip],
    website: [website],
    clia: [required(d.validation.required)],
    certificateExpiration: [futureDate],
    servicesOther: [onlyIf(v.services.includes('Other'), required(d.validation.required))],
  }));

  const { values, status } = form;

  const updateLocation = (index: number, key: string, value: string) => {
    const next = values.locations.map((loc, i) => (i === index ? { ...loc, [key]: value } : loc));
    form.set('locations', next);
  };

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
            <TextField form={form} name="labName" label={t.labName} required />
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
            <TextField form={form} name="hours" label={t.operatingHours} placeholder={t.hoursPlaceholder} />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.credentials}>
          <Grid>
            <TextField form={form} name="clia" label={t.clia} required hint={t.cliaHint} />
            <SelectField
              form={form}
              name="cliaType"
              label={t.cliaType}
              options={o.cliaTypes}
              placeholder={t.selectCliaType}
            />
            <TextField form={form} name="certificateExpiration" label={t.certExpiration} type="date" />
            <TextField form={form} name="stateLicense" label={t.stateLicense} hint={t.whereApplicable} />
            <TextField form={form} name="accreditation" label={t.accreditation} hint={t.accreditationHint} span />
          </Grid>
        </FormSection>

        <FormSection legend={d.sections.labServices}>
          <ChoiceGroup
            form={form}
            name="services"
            label={t.labServices}
            options={o.labServices}
            hint={d.common.selectAllThatApply}
          />
          {values.services.includes('Other') ? (
            <Grid>
              <TextField form={form} name="servicesOther" label={d.common.pleaseSpecify} required span />
            </Grid>
          ) : null}
          <ChoiceGroup
            form={form}
            name="availability"
            label={t.availability}
            options={o.labAvailability}
            hint={d.common.selectAllThatApply}
          />
        </FormSection>

        <FormSection legend={d.sections.additionalLocations}>
          {values.locations.length ? (
            <div className="reg-repeat">
              {values.locations.map((loc, index) => (
                // Index-keyed: rows are only ever appended or removed from the end
                // of this list, so the position is a stable identity here.
                <div className="reg-loc" key={`location-${index}`}>
                  <div className="reg-loc-head">
                    <h4>{d.common.location} {index + 2}</h4>
                    <button
                      type="button"
                      className="reg-remove"
                      onClick={() =>
                        form.set(
                          'locations',
                          values.locations.filter((_, i) => i !== index)
                        )
                      }
                    >
                      {d.common.remove}
                    </button>
                  </div>
                  <div className="reg-grid">
                    <div className="field span2">
                      <label htmlFor={`lab-loc-${index}-address`}>{d.fields.address}</label>
                      <input
                        id={`lab-loc-${index}-address`}
                        type="text"
                        value={loc.address}
                        onChange={(e) => updateLocation(index, 'address', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="reg-grid reg-grid-3">
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-city`}>{d.fields.city}</label>
                      <input
                        id={`lab-loc-${index}-city`}
                        type="text"
                        value={loc.city}
                        onChange={(e) => updateLocation(index, 'city', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-state`}>{d.fields.state}</label>
                      <select
                        id={`lab-loc-${index}-state`}
                        value={loc.state}
                        onChange={(e) => updateLocation(index, 'state', e.target.value)}
                      >
                        <option value="" disabled>
                          {t.selectState}
                        </option>
                        {o.states.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-zip`}>{t.zipShort}</label>
                      <input
                        id={`lab-loc-${index}-zip`}
                        type="text"
                        inputMode="numeric"
                        value={loc.zip}
                        onChange={(e) => updateLocation(index, 'zip', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="reg-grid">
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-phone`}>{t.phone}</label>
                      <input
                        id={`lab-loc-${index}-phone`}
                        type="tel"
                        value={loc.phone}
                        onChange={(e) => updateLocation(index, 'phone', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-hours`}>{t.operatingHours}</label>
                      <input
                        id={`lab-loc-${index}-hours`}
                        type="text"
                        value={loc.hours}
                        onChange={(e) => updateLocation(index, 'hours', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="reg-empty">{d.common.noLocations}</p>
          )}
          <button
            type="button"
            className="btn btn-ghost reg-add"
            onClick={() => form.set('locations', [...values.locations, { ...EMPTY_LOCATION }])}
          >
            {d.common.addLocation}
          </button>
        </FormSection>

        <SubmitRow label={t.submit} submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
