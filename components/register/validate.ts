/**
 * Field validators shared by every registration form. A rule returns an error
 * message or `null`. Optional fields stay valid while empty, so format rules can
 * be attached to any field without making it required.
 */

/** One row of a repeatable group, e.g. an extra laboratory location. */
export type RowValue = Record<string, string>;
export type FieldValue = string | string[] | File | RowValue[] | null | undefined;
export type Values = Record<string, unknown>;
export type Rule = (value: FieldValue, values: Values) => string | null;

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB
export const ACCEPTED_UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
export const ACCEPTED_UPLOAD_LABEL = 'PDF, JPG, PNG or WEBP · max 8 MB';

const text = (v: FieldValue) => (typeof v === 'string' ? v.trim() : '');

const isEmpty = (v: FieldValue) => {
  if (v instanceof File) return false;
  if (Array.isArray(v)) return v.length === 0;
  return text(v) === '';
};

export const required =
  (message = 'This field is required.'): Rule =>
  (v) =>
    isEmpty(v) ? message : null;

export const requiredChoice =
  (message = 'Please select an option.'): Rule =>
  (v) =>
    isEmpty(v) ? message : null;

export const email: Rule = (v) =>
  isEmpty(v) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text(v))
    ? null
    : 'Please enter a valid email address.';

export const phone: Rule = (v) => {
  if (isEmpty(v)) return null;
  const digits = text(v).replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15
    ? null
    : 'Please enter a valid phone number (10–15 digits).';
};

export const zip: Rule = (v) =>
  isEmpty(v) || /^\d{5}(-\d{4})?$/.test(text(v)) ? null : 'Please enter a valid ZIP code (12345 or 12345-6789).';

export const website: Rule = (v) =>
  isEmpty(v) || /^(https?:\/\/)?[\w-]+(\.[\w-]+)+([/?#][^\s]*)?$/.test(text(v))
    ? null
    : 'Please enter a valid website address.';

const parseDate = (v: FieldValue) => {
  const s = text(v);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const d = new Date(`${s}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const date: Rule = (v) => (isEmpty(v) || parseDate(v) ? null : 'Please enter a valid date.');

/** For dates that cannot be in the future, e.g. a date of birth. */
export const pastDate: Rule = (v) => {
  if (isEmpty(v)) return null;
  const d = parseDate(v);
  if (!d) return 'Please enter a valid date.';
  return d.getTime() > Date.now() ? 'Date cannot be in the future.' : null;
};

/** For licence and certificate expiry dates, which must still be valid. */
export const futureDate: Rule = (v) => {
  if (isEmpty(v)) return null;
  const d = parseDate(v);
  if (!d) return 'Please enter a valid date.';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime()
    ? 'This date has already passed — please provide a current expiration date.'
    : null;
};

/** 10 digits with the standard NPI (Luhn over the 80840 prefix) check digit. */
export const npi: Rule = (v) => {
  if (isEmpty(v)) return null;
  const raw = text(v).replace(/\s|-/g, '');
  const invalid = 'Please enter a valid 10-digit NPI number.';
  if (!/^\d{10}$/.test(raw)) return invalid;
  const body = `80840${raw.slice(0, 9)}`;
  let sum = 0;
  let double = true;
  for (let i = body.length - 1; i >= 0; i -= 1) {
    let digit = Number(body[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    double = !double;
    sum += digit;
  }
  return (10 - (sum % 10)) % 10 === Number(raw[9]) ? null : invalid;
};

/** File type and size validation for the credential uploads. */
export const upload: Rule = (v) => {
  if (!(v instanceof File)) return null;
  if (!ACCEPTED_UPLOAD_TYPES.includes(v.type)) return 'Unsupported file type. Upload a PDF, JPG, PNG or WEBP file.';
  if (v.size > MAX_UPLOAD_BYTES) return 'File is too large. Please keep uploads under 8 MB.';
  return null;
};

/** Runs `rule` only when `when` is true — used for conditionally shown fields. */
export const onlyIf =
  (when: boolean, rule: Rule): Rule =>
  (v, values) =>
    when ? rule(v, values) : null;

export const digitsOnly =
  (length: number, label: string): Rule =>
  (v) =>
    isEmpty(v) || new RegExp(`^\\d{${length}}$`).test(text(v).replace(/\s|-/g, ''))
      ? null
      : `Please enter a valid ${length}-digit ${label}.`;
