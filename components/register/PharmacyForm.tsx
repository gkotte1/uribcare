'use client';

import { ChoiceGroup, FormCard, FormSection, Grid, SelectField, SubmitRow, SuccessPanel, TextField } from './Fields';
import { PHARMACY_SERVICES, US_STATES, YES_NO } from './options';
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
  const form = useRegForm('pharmacy', INITIAL, (v) => ({
    pharmacyName: [required('Please enter the pharmacy name.')],
    legalName: [required('Please enter the legal business name.')],
    email: [required('Please enter a business email.'), email],
    phone: [required('Please enter a phone number.'), phone],
    address: [required('Please enter the address.')],
    city: [required('Please enter the city.')],
    state: [requiredChoice('Please choose a state.')],
    zip: [required('Please enter the ZIP code.'), zip],
    website: [website],
    licenseNumber: [required('Please enter the pharmacy license number.')],
    issuingState: [requiredChoice('Please choose the issuing state.')],
    licenseExpiration: [required('Please enter the license expiration date.'), futureDate],
    pharmacistFirstName: [required("Please enter the pharmacist's first name.")],
    pharmacistLastName: [required("Please enter the pharmacist's last name.")],
    pharmacistLicenseNumber: [required('Please enter the pharmacist license number.')],
    pharmacistState: [requiredChoice('Please choose a state.')],
    servicesOther: [onlyIf(v.services.includes('Other'), required('Please specify the other services offered.'))],
  }));

  const { values, status } = form;

  if (status === 'submitted' && form.submission) {
    return (
      <FormCard title="Pharmacy Registration Form">
        <SuccessPanel
          heading="Registration received"
          submission={form.submission}
          note="Our team will verify the pharmacy licence details before the listing goes live."
        />
      </FormCard>
    );
  }

  return (
    <FormCard title="Pharmacy Registration Form" intro="Register your pharmacy to fulfil prescriptions across the URiBCARE network.">
      <form ref={form.formRef} noValidate onSubmit={form.handleSubmit}>
        <FormSection legend="Business information">
          <Grid>
            <TextField form={form} name="pharmacyName" label="Pharmacy Name" required />
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
            <TextField form={form} name="website" label="Website" type="url" placeholder="pharmacy.com" />
            <TextField form={form} name="hours" label="Business Hours" placeholder="Mon–Fri 9am–7pm, Sat 9am–2pm" />
          </Grid>
        </FormSection>

        <FormSection legend="Pharmacy licence">
          <Grid cols={3}>
            <TextField form={form} name="licenseNumber" label="Pharmacy License Number" required />
            <SelectField form={form} name="issuingState" label="Issuing State" options={US_STATES} required placeholder="Select state" />
            <TextField form={form} name="licenseExpiration" label="License Expiration Date" type="date" required />
          </Grid>
        </FormSection>

        <FormSection legend="Responsible pharmacist">
          <Grid>
            <TextField form={form} name="pharmacistFirstName" label="First Name" required />
            <TextField form={form} name="pharmacistLastName" label="Last Name" required />
            <TextField form={form} name="pharmacistLicenseNumber" label="Pharmacist License Number" required />
            <SelectField form={form} name="pharmacistState" label="State" options={US_STATES} required placeholder="Select state" />
          </Grid>
        </FormSection>

        <FormSection legend="Services">
          <ChoiceGroup
            form={form}
            name="services"
            label="Services Offered"
            options={PHARMACY_SERVICES}
            hint="Select all that apply."
          />
          {values.services.includes('Other') ? (
            <Grid>
              <TextField form={form} name="servicesOther" label="Please specify" required span />
            </Grid>
          ) : null}
          <ChoiceGroup
            form={form}
            name="discountInterest"
            label="Interested in offering discounts to URiBCARE patients?"
            options={YES_NO}
            mode="single"
            hint="Recorded as a preference only — no discount programme is set up at registration."
          />
        </FormSection>

        <SubmitRow label="Submit Pharmacy Registration" submitting={status === 'submitting'} />
      </form>
    </FormCard>
  );
}
