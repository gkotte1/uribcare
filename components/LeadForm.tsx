'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function LeadForm() {
  const locale = localeFromPath(usePathname() || '/');
  const t = getDictionary(locale).lead;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const [errName, setErrName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errRole, setErrRole] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const ph = phone.trim();
    const r = role;
    const msg = message.trim();

    let ok = true;
    const nameBad = !n;
    const emailBad = !emailOk(em);
    const roleBad = !r;
    setErrName(nameBad);
    if (nameBad) ok = false;
    setErrEmail(emailBad);
    if (emailBad) ok = false;
    setErrRole(roleBad);
    if (roleBad) ok = false;
    if (!ok) {
      // The `.err` classes are applied by the render that follows this handler,
      // so resolve the first invalid control from the flags rather than the DOM.
      const firstBad = nameBad ? 'in-name' : emailBad ? 'in-email' : 'in-role';
      document.getElementById(firstBad)?.focus();
      return;
    }

    const body =
      `New free-trial request from the Uribcare site:\n\n` +
      `Name: ${n}\nEmail: ${em}\nPhone: ${ph || 'Not provided'}\nI am a: ${r}\n\n` +
      `What they need:\n${msg || 'Not provided'}\n`;
    const mailto =
      'mailto:contact@uribcare.com' +
      '?subject=' +
      encodeURIComponent('Free trial request: ' + n) +
      '&body=' +
      encodeURIComponent(body);

    // Hand off to the user's email client (the lead lands in the Uribcare inbox)
    window.location.href = mailto;

    // Show the confirmation state
    setSubmitted(true);
  };

  return (
    <div className="contact-form">
      <form id="leadForm" noValidate onSubmit={handleSubmit} style={submitted ? { display: 'none' } : undefined}>
        <h3>{t.heading}</h3>
        <p className="sub">{t.sub}</p>
        <div className={`field${errName ? ' err' : ''}`} id="f-name">
          <label htmlFor="in-name">
            {t.fullName} <span className="req">*</span>
          </label>
          <input
            id="in-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            value={name}
            aria-invalid={errName || undefined}
            aria-describedby={errName ? 'e-name' : undefined}
            onChange={(e) => {
              setName(e.target.value);
              setErrName(false);
            }}
          />
          <span className="msg" id="e-name">{t.nameError}</span>
        </div>
        <div className="row2">
          <div className={`field${errEmail ? ' err' : ''}`} id="f-email">
            <label htmlFor="in-email">
              {t.email} <span className="req">*</span>
            </label>
            <input
              id="in-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              value={email}
              aria-invalid={errEmail || undefined}
              aria-describedby={errEmail ? 'e-email' : undefined}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrEmail(false);
              }}
            />
            <span className="msg" id="e-email">{t.emailError}</span>
          </div>
          <div className="field" id="f-phone">
            <label htmlFor="in-phone">{t.phone}</label>
            <input
              id="in-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={t.optional}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <span className="msg"></span>
          </div>
        </div>
        <div className={`field${errRole ? ' err' : ''}`} id="f-role">
          <label htmlFor="in-role">
            {t.role} <span className="req">*</span>
          </label>
          <select
            id="in-role"
            name="role"
            value={role}
            aria-invalid={errRole || undefined}
            aria-describedby={errRole ? 'e-role' : undefined}
            onChange={(e) => {
              setRole(e.target.value);
              setErrRole(false);
            }}
          >
            <option value="" disabled>
              {t.selectOne}
            </option>
            {t.roles.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <span className="msg" id="e-role">{t.roleError}</span>
        </div>
        <div className="field" id="f-msg">
          <label htmlFor="in-message">{t.needHelp}</label>
          <textarea
            id="in-message"
            name="message"
            placeholder={t.needPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <span className="msg"></span>
        </div>
        <button type="submit" className="btn btn-primary btn-lg">
          {t.submit}
        </button>
        <p className="form-note">{t.note}</p>
      </form>

      <div className={`form-success${submitted ? ' show' : ''}`} id="leadSuccess" role="status" aria-live="polite">
        <div className="ok">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4L19 6" />
          </svg>
        </div>
        <h3>{t.thanks}</h3>
        <p>
          Your email app should open with your request ready to send. If it didn&apos;t, email us directly at{' '}
          <a href="mailto:contact@uribcare.com" style={{ color: 'var(--pine-deep)', textDecoration: 'underline' }}>
            contact@uribcare.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
