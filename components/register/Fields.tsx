'use client';

import type { ReactNode } from 'react';
import { ACCEPTED_UPLOAD_LABEL, ACCEPTED_UPLOAD_TYPES } from './validate';
import type { FieldValue, Values } from './validate';
import type { Submission } from './useRegForm';

/**
 * Minimal shape the field components need from `useRegForm`, so a form of any
 * value type can pass its own state object straight through.
 */
export type FormLike = {
  idPrefix: string;
  values: Values;
  errors: Record<string, string>;
  set: (name: string, value: FieldValue) => void;
};

type Aria = {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
  'aria-required'?: true;
};

type ShellProps = {
  form: FormLike;
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  span?: boolean;
  children: (aria: Aria) => ReactNode;
};

/** Label + control + inline message, reusing the site's existing `.field` styles. */
function FieldShell({ form, name, label, required, hint, span, children }: ShellProps) {
  const id = `${form.idPrefix}-${name}`;
  const error = form.errors[name];
  const msgId = `${id}-msg`;
  return (
    <div className={`field${error ? ' err' : ''}${span ? ' span2' : ''}`} data-field={name}>
      <label htmlFor={id}>
        {label} {required ? <span className="req">*</span> : null}
      </label>
      {hint ? <span className="reg-hint">{hint}</span> : null}
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? msgId : undefined,
        'aria-required': required ? true : undefined,
      })}
      <span className="msg" id={msgId} role="alert">
        {error}
      </span>
    </div>
  );
}

const asString = (v: unknown) => (typeof v === 'string' ? v : '');

type TextFieldProps = {
  form: FormLike;
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  span?: boolean;
  type?: 'text' | 'email' | 'tel' | 'date' | 'url' | 'number';
  placeholder?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'tel' | 'email' | 'numeric' | 'url';
  max?: string;
  min?: string;
  onChangeValue?: (value: string) => void;
};

export function TextField({
  form,
  name,
  label,
  required,
  hint,
  span,
  type = 'text',
  placeholder,
  autoComplete,
  inputMode,
  max,
  min,
  onChangeValue,
}: TextFieldProps) {
  return (
    <FieldShell form={form} name={name} label={label} required={required} hint={hint} span={span}>
      {(aria) => (
        <input
          {...aria}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          max={max}
          min={min}
          value={asString(form.values[name])}
          onChange={(e) => (onChangeValue ? onChangeValue(e.target.value) : form.set(name, e.target.value))}
        />
      )}
    </FieldShell>
  );
}

type SelectFieldProps = {
  form: FormLike;
  name: string;
  label: string;
  options: readonly string[];
  required?: boolean;
  hint?: string;
  span?: boolean;
  placeholder?: string;
  disabled?: boolean;
  onChangeValue?: (value: string) => void;
};

export function SelectField({
  form,
  name,
  label,
  options,
  required,
  hint,
  span,
  placeholder = 'Select',
  disabled,
  onChangeValue,
}: SelectFieldProps) {
  return (
    <FieldShell form={form} name={name} label={label} required={required} hint={hint} span={span}>
      {(aria) => (
        <select
          {...aria}
          name={name}
          disabled={disabled}
          value={asString(form.values[name])}
          onChange={(e) => (onChangeValue ? onChangeValue(e.target.value) : form.set(name, e.target.value))}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}

type TextareaFieldProps = {
  form: FormLike;
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  placeholder?: string;
  rows?: number;
};

export function TextareaField({ form, name, label, required, hint, placeholder, rows = 4 }: TextareaFieldProps) {
  return (
    <FieldShell form={form} name={name} label={label} required={required} hint={hint} span>
      {(aria) => (
        <textarea
          {...aria}
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={asString(form.values[name])}
          onChange={(e) => form.set(name, e.target.value)}
        />
      )}
    </FieldShell>
  );
}

type ChoiceGroupProps = {
  form: FormLike;
  name: string;
  label: string;
  options: readonly string[];
  /** `multi` stores an array of values, `single` stores one value. */
  mode?: 'multi' | 'single';
  required?: boolean;
  hint?: string;
};

/**
 * Checkbox / radio group styled to match the dropdowns. `mode="multi"` is the
 * multi-select used for age groups and service lists; `mode="single"` gives the
 * Yes / No choices.
 */
export function ChoiceGroup({ form, name, label, options, mode = 'multi', required, hint }: ChoiceGroupProps) {
  const error = form.errors[name];
  const msgId = `${form.idPrefix}-${name}-msg`;
  const raw = form.values[name];
  const selected = mode === 'multi' ? (Array.isArray(raw) ? raw : []) : [asString(raw)];

  const toggle = (option: string, checked: boolean) => {
    if (mode === 'single') {
      form.set(name, option);
      return;
    }
    const next = checked ? [...selected, option] : selected.filter((v) => v !== option);
    form.set(name, next);
  };

  return (
    <fieldset
      className={`field reg-choicefield${error ? ' err' : ''}`}
      data-field={name}
      aria-describedby={error ? msgId : undefined}
    >
      <legend>
        {label} {required ? <span className="req">*</span> : null}
      </legend>
      {hint ? <span className="reg-hint">{hint}</span> : null}
      <div className="reg-choices">
        {options.map((option) => (
          <label className="reg-choice" key={option}>
            <input
              type={mode === 'multi' ? 'checkbox' : 'radio'}
              name={`${form.idPrefix}-${name}`}
              value={option}
              checked={selected.includes(option)}
              onChange={(e) => toggle(option, e.target.checked)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      <span className="msg" id={msgId} role="alert">
        {error}
      </span>
    </fieldset>
  );
}

type FileFieldProps = {
  form: FormLike;
  name: string;
  label: string;
  required?: boolean;
};

/**
 * Credential upload. Files are validated in the browser and never rendered or
 * linked anywhere public; nothing is transmitted until the secure upload
 * endpoint is connected.
 */
export function FileField({ form, name, label, required }: FileFieldProps) {
  const value = form.values[name];
  const file = value instanceof File ? value : null;
  return (
    <FieldShell
      form={form}
      name={name}
      label={label}
      required={required}
      hint={ACCEPTED_UPLOAD_LABEL}
      span
    >
      {(aria) => (
        <div className="reg-file">
          <input
            {...aria}
            name={name}
            type="file"
            accept={ACCEPTED_UPLOAD_TYPES.join(',')}
            onChange={(e) => form.set(name, e.target.files?.[0] ?? null)}
          />
          {file ? (
            <span className="reg-file-name">
              {file.name} · {(file.size / 1024 / 1024).toFixed(2)} MB
            </span>
          ) : null}
        </div>
      )}
    </FieldShell>
  );
}

/* ---------------- Layout helpers ---------------- */

export function FormCard({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="reg-card">
      <div className="reg-card-head">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      <div className="reg-card-body">{children}</div>
    </div>
  );
}

export function FormSection({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="reg-sec">
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}

export function Grid({ cols = 2, children }: { cols?: 2 | 3; children: ReactNode }) {
  return <div className={cols === 3 ? 'reg-grid reg-grid-3' : 'reg-grid'}>{children}</div>;
}

export function SubmitRow({ label, submitting }: { label: string; submitting: boolean }) {
  return (
    <div className="reg-actions">
      <button type="submit" className="btn btn-primary btn-lg" disabled={submitting}>
        {submitting ? 'Submitting…' : label}
      </button>
      <p className="reg-note">
        Fields marked <span className="req">*</span> are required. By submitting you agree to be contacted by URiBCARE
        about this registration.
      </p>
    </div>
  );
}

export function SuccessPanel({ heading, submission, note }: { heading: string; submission: Submission; note: string }) {
  return (
    <div className="form-success show" role="status" aria-live="polite">
      <div className="ok">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4L19 6" />
        </svg>
      </div>
      <h3>{heading}</h3>
      <p className="reg-status">Status: {submission.status}</p>
      <p>{note}</p>
      <p className="reg-ref">
        Reference <strong>{submission.reference}</strong>
      </p>
    </div>
  );
}
