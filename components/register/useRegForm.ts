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

export type RegForm<T extends Values> = {
  idPrefix: string;
  values: T;
  errors: Record<string, string>;
  status: Status;
  submission: Submission | null;
  formRef: React.RefObject<HTMLFormElement>;
  /** Update one field and clear any error already shown for it. */
  set: (name: string, value: FieldValue) => void;
  /** Update several fields at once — used when one dropdown resets another. */
  patch: (changes: Partial<Record<keyof T & string, FieldValue>>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
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
  buildSchema: (values: T) => Schema
): RegForm<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('editing');
  const [submission, setSubmission] = useState<Submission | null>(null);
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
    (e: React.FormEvent<HTMLFormElement>) => {
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

      const firstInvalid = Object.keys(found)[0];
      if (firstInvalid) {
        const field = formRef.current?.querySelector<HTMLElement>(
          `[data-field="${firstInvalid}"] input, [data-field="${firstInvalid}"] select, [data-field="${firstInvalid}"] textarea`
        );
        field?.focus();
        field?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      // No registration API exists yet, so nothing leaves the browser: the
      // validated values are held in component state and handed back with a
      // pending review status. Replace this block with the real request when the
      // endpoint is available — the shape below is what it needs to send.
      setStatus('submitting');
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
    [buildSchema, idPrefix, status, values]
  );

  return { idPrefix, values, errors, status, submission, formRef, set, patch, handleSubmit };
}
