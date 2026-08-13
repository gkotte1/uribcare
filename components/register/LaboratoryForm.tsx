'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField } from './Fields';
import { CLIA_CERTIFICATE_TYPES, LAB_AVAILABILITY, LAB_SERVICES, US_STATES } from './options';
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
  const form = useRegForm('laboratory', INITIAL, (v) => ({
    labName: [required('Please enter the laboratory name.')],
    legalName: [required('Please enter the legal business name.')],
    email: [required('Please enter a business email.'), email],
    phone: [required('Please enter a phone number.'), phone],
    address: [required('Please enter the address.')],
    city: [required('Please enter the city.')],
    state: [requiredChoice('Please choose a state.')],
    zip: [required('Please enter the ZIP code.'), zip],
    website: [website],
    clia: [required('Please enter the CLIA number.')],
    certificateExpiration: [futureDate],
    servicesOther: [onlyIf(v.services.includes('Other'), required('Please specify the other services offered.'))],
  }));

  const { values, status } = form;

  const updateLocation = (index: number, key: string, value: string) => {
    const next = values.locations.map((loc, i) => (i === index ? { ...loc, [key]: value } : loc));
    form.set('locations', next);
  };

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Laboratory Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Our team will verify the CLIA and accreditation details before the laboratory goes live."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Laboratory Registration Form" intro="Register your laboratory to receive test orders from across the network.">
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend="Business information">
          <Grid>
            <TextField form={form} name="labName" label="Laboratory Name" required />
            <TextField form={form} name="legalName" label="Legal Business Name" required />
            <TextField form={form} name="email" label="Business Email" type="email" required autoComplete="email" />
            <TextField form={form} name="phone" label="Phone Number" type="tel" required autoComplete="tel" />
            <TextField form={form} name="address" label="Address" required autoComplete="street-address" span />
          </Grid>
          <Grid cols={3}>
            <TextField form={form} name="city" label="City" required autoComplete="address-level2" />
            <SelectField form={form} name="state" label="State" options={US_STATES} required placeholder="Select state" />
            <TextField form={form} name="zip" label="ZIP Code" required inputMode="numeric" autoComplete="postal-code" />
          </Grid>
          <Grid>
            <TextField form={form} name="website" label="Website" type="url" placeholder="laboratory.com" />
            <TextField form={form} name="hours" label="Operating Hours" placeholder="Mon–Sat 7am–6pm" />
          </Grid>
        </FormSection>

        <FormSection legend="Credentials">
          <Grid>
            <TextField form={form} name="clia" label="CLIA Number" required hint="10-character CLIA identifier" />
            <SelectField
              form={form}
              name="cliaType"
              label="CLIA Certificate Type"
              options={CLIA_CERTIFICATE_TYPES}
              placeholder="Select certificate type"
            />
            <TextField form={form} name="certificateExpiration" label="Certificate Expiration Date" type="date" />
            <TextField form={form} name="stateLicense" label="State License" hint="Where applicable" />
            <TextField form={form} name="accreditation" label="Accreditation" hint="Where applicable — e.g. CAP, COLA, Joint Commission" span />
          </Grid>
        </FormSection>

        <FormSection legend="Laboratory services">
          <ChoiceGroup
            form={form}
            name="services"
            label="Laboratory Services"
            options={LAB_SERVICES}
            hint="Select all that apply."
          />
          {values.services.includes('Other') ? (
            <Grid>
              <TextField form={form} name="servicesOther" label="Please specify" required span />
            </Grid>
          ) : null}
          <ChoiceGroup
            form={form}
            name="availability"
            label="Service Availability"
            options={LAB_AVAILABILITY}
            hint="Select all that apply."
          />
        </FormSection>

        <FormSection legend="Additional locations">
          {values.locations.length ? (
            <div className="reg-repeat">
              {values.locations.map((loc, index) => (
                // Index-keyed: rows are only ever appended or removed from the end
                // of this list, so the position is a stable identity here.
                <div className="reg-loc" key={`location-${index}`}>
                  <div className="reg-loc-head">
                    <h4>Location {index + 2}</h4>
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
                      Remove
                    </button>
                  </div>
                  <div className="reg-grid">
                    <div className="field span2">
                      <label htmlFor={`lab-loc-${index}-address`}>Address</label>
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
                      <label htmlFor={`lab-loc-${index}-city`}>City</label>
                      <input
                        id={`lab-loc-${index}-city`}
                        type="text"
                        value={loc.city}
                        onChange={(e) => updateLocation(index, 'city', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-state`}>State</label>
                      <select
                        id={`lab-loc-${index}-state`}
                        value={loc.state}
                        onChange={(e) => updateLocation(index, 'state', e.target.value)}
                      >
                        <option value="" disabled>
                          Select state
                        </option>
                        {US_STATES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-zip`}>ZIP</label>
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
                      <label htmlFor={`lab-loc-${index}-phone`}>Phone</label>
                      <input
                        id={`lab-loc-${index}-phone`}
                        type="tel"
                        value={loc.phone}
                        onChange={(e) => updateLocation(index, 'phone', e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label htmlFor={`lab-loc-${index}-hours`}>Operating Hours</label>
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
            <p className="reg-empty">Only the main address above so far. Add a location for every additional collection site.</p>
          )}
          <button
            type="button"
            className="btn btn-ghost reg-add"
            onClick={() => form.set('locations', [...values.locations, { ...EMPTY_LOCATION }])}
          >
            + Add Another Location
          </button>
        </FormSection>

        <SubmitRow label="Submit Laboratory Registration" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
