'use client';

import { useCallback, useRef, useState } from 'react';
import type { FieldValue, Rule, Values } from './validate';

export type Schema = Record<string, Rule[]>;
export type Status = 'editing' | 'submitting' | 'submitted';

export type Submission = {
  reference: string;
  /** Every registration starts life pending a manual credential review. */
  status: 'Submitted / Under Review';
};

/** Result shape returned by a real server-action submit handler. */
export type SubmitResult = { ok: boolean; error?: string; message?: string };

export type RegForm<T extends Values> = {
  idPrefix: string;
  values: T;
  errors: Record<string, string>;
  status: Status;
  submission: Submission | null;
  /** Success message returned by a server action (e.g. "confirm your email"). */
  successMessage: string | null;
  /** Form-level error surfaced from a failed server submission. */
  formError: string | null;
  formRef: React.RefObject<HTMLFormElement>;
  /** Update one field and clear any error already shown for it. */
  set: (name: string, value: FieldValue) => void;
  /** Update several fields at once — used when one dropdown resets another. */
  patch: (changes: Partial<Record<keyof T & string, FieldValue>>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const asText = (v: FieldValue) => (typeof v === 'string' ? v : '');

/**
 * Minimum-length rule for credential fields. Empty values stay valid so
 * `required` owns the "field is empty" message and only one error shows.
 */
export const minLength =
  (length: number, message?: string): Rule =>
  (v) => {
    const s = asText(v);
    if (s === '') return null;
    return s.length >= length ? null : message ?? `Must be at least ${length} characters.`;
  };

/**
 * Cross-field match rule (confirm password === password). Reads the sibling
 * field from the full values object the validator is already given.
 */
export const matches =
  (otherField: string, message = 'Passwords do not match.'): Rule =>
  (v, values) => {
    const s = asText(v);
    if (s === '') return null;
    return s === asText(values[otherField] as FieldValue) ? null : message;
  };

const REFERENCE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const makeReference = (kind: string) => {
  const prefix = kind.slice(0, 3).toUpperCase();
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  const body = Array.from(bytes, (b) => REFERENCE_ALPHABET[b % REFERENCE_ALPHABET.length]).join('');
  return `URB-${prefix}-${body}`;
};

/**
 * Shared state, validation and submission handling for the registration forms.
 *
 * Validation runs on submit and an individual error is cleared as soon as that
 * field changes — the same interaction the site's existing lead form uses, so no
 * field shows an error before the visitor has touched it.
 *
 * `buildSchema` receives the current values, which lets a rule depend on another
 * field (for example, "Please specify" is only required while the related
 * dropdown is set to "Other").
 */
export function useRegForm<T extends Values>(
  idPrefix: string,
  initialValues: T,
  buildSchema: (values: T) => Schema,
  onSubmit?: (values: T) => Promise<SubmitResult>
): RegForm<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('editing');
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const clearErrors = useCallback((names: string[]) => {
    setErrors((prev) => {
      if (!names.some((n) => prev[n])) return prev;
      const next = { ...prev };
      names.forEach((n) => delete next[n]);
      return next;
    });
  }, []);

  const set = useCallback(
    (name: string, value: FieldValue) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      clearErrors([name]);
    },
    [clearErrors]
  );

  const patch = useCallback(
    (changes: Partial<Record<keyof T & string, FieldValue>>) => {
      setValues((prev) => ({ ...prev, ...changes }));
      clearErrors(Object.keys(changes));
    },
    [clearErrors]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (status === 'submitting') return;

      const schema = buildSchema(values);
      const found: Record<string, string> = {};
      Object.entries(schema).forEach(([name, rules]) => {
        for (const rule of rules) {
          const message = rule(values[name] as FieldValue, values);
          if (message) {
            found[name] = message;
            break;
          }
        }
      });

      setErrors(found);
      setFormError(null);

      const firstInvalid = Object.keys(found)[0];
      if (firstInvalid) {
        const field = formRef.current?.querySelector<HTMLElement>(
          `[data-field="${firstInvalid}"] input, [data-field="${firstInvalid}"] select, [data-field="${firstInvalid}"] textarea`
        );
        field?.focus();
        field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      setStatus('submitting');

      // When a real submit handler is wired in, hand the validated values to it.
      if (onSubmit) {
        try {
          const result = await onSubmit(values);
          if (result.ok) {
            setSuccessMessage(result.message ?? null);
            setStatus('submitted');
          } else {
            setFormError(result.error ?? 'Something went wrong. Please try again.');
            setStatus('editing');
          }
        } catch (err) {
          // A successful server action redirects by throwing NEXT_REDIRECT; that
          // must propagate so the Next router performs the navigation. Only true
          // failures are turned into a visible form error.
          const digest = (err as { digest?: string })?.digest;
          if (typeof digest === 'string' && digest.startsWith('NEXT_REDIRECT')) {
            throw err;
          }
          setFormError('Something went wrong. Please try again.');
          setStatus('editing');
        }
        return;
      }

      // Fallback (no real handler): nothing leaves the browser. The validated
      // values are held in component state and handed back with a pending review
      // status and a local reference code.
      const payload = {
        kind: idPrefix,
        fields: Object.fromEntries(
          Object.entries(values).filter(([, v]) => !(v instanceof File))
        ),
        uploads: Object.entries(values)
          .filter((entry): entry is [string, File] => entry[1] instanceof File)
          .map(([name, file]) => ({ name, fileName: file.name, size: file.size, type: file.type })),
      };
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.info('[uribcare] registration ready to submit', payload);
      }
      setSubmission({ reference: makeReference(idPrefix), status: 'Submitted / Under Review' });
      setStatus('submitted');
    },
    [buildSchema, idPrefix, onSubmit, status, values]
  );

  return {
    idPrefix,
    values,
    errors,
    status,
    submission,
    successMessage,
    formError,
    formRef,
    set,
    patch,
    handleSubmit,
  };
}
