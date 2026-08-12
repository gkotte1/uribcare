# Uribcare — Next.js 14 landing site

A production-quality Next.js 14 (App Router, TypeScript) rebuild of the Uribcare
(URiBCare LLC) landing page — a connected-care healthcare platform. It faithfully
reproduces the original single-file HTML page, including the animated "care
constellation" canvas, the light/dark theme toggle, scroll reveals, and the lead
capture form.

## Getting started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

`npm start` serves the optimized production build (also on <http://localhost:3000>).

Other scripts:

- `npm run lint` — run ESLint (`next/core-web-vitals`).

## Deploy to Vercel (1-click)

This is a stock Next.js App Router project, so it deploys to
[Vercel](https://vercel.com) with zero configuration:

1. Push the project to a Git repository (GitHub / GitLab / Bitbucket).
2. In Vercel, **Add New… → Project**, import the repo, and accept the detected
   Next.js defaults.
3. Click **Deploy**.

No environment variables are required for the static marketing page as shipped.

## Project structure

```
app/
  layout.tsx     # <html lang="en">, metadata (title/description), viewport (themeColor), imports globals.css
  globals.css    # all three original <style> blocks, concatenated verbatim
  page.tsx       # server component composing all sections + footer + mobile bar
components/
  Nav.tsx             # sticky header: logo, scrolled-state class + theme toggle (client)
  CareConstellation.tsx  # animated <canvas> care graphic (client)
  LeadForm.tsx        # contact form + validation + mailto compose + success panel (client)
  Reveal.tsx          # IntersectionObserver reveal-on-scroll behavior + safety-net fallback (client)
  Year.tsx            # footer copyright year, rendered client-side (client)
public/
  images/             # logo.png + Services card photos + autism-band photo
```

## Editing contact details

The contact details live directly in the JSX (they appear in several places, so
update all of them):

- **Email** `contact@uribcare.com` — in `components/LeadForm.tsx` (form logic +
  success panel) and `app/page.tsx` (contact side panel + footer).
- **Primary phone** `+1 (770) 910-5581` / `tel:+17709105581` — in `app/page.tsx`
  (contact side panel, footer, sticky mobile bar).
- **Secondary phone** `+1 (201) 686-3935` / `tel:+12016863935` — in `app/page.tsx`
  (footer only).
- **Website** `https://uribcare.com` — in `app/page.tsx` (footer).
- **Images** live in `public/images/` (referenced as `/images/...`). Replace the
  logo and Services/autism photos there to rebrand.

## Wiring the lead form to a real backend

As shipped, the form in `components/LeadForm.tsx` validates its fields and then
composes a `mailto:contact@uribcare.com` link, handing the message off to the
visitor's email client. That requires no backend, but it depends on the visitor
having a configured mail app and it does not store leads. To capture leads
reliably, replace the `mailto` hand-off in the `handleSubmit` function with a real
submission. A few common options:

### Option A — Formspree (no backend code)

Create a form endpoint at <https://formspree.io> and POST to it:

```ts
await fetch('https://formspree.io/f/your-form-id', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify({ name: n, email: em, phone: ph, role: r, message: msg }),
});
setSubmitted(true);
```

### Option B — Next.js Route Handler / Server Action (Vercel)

Add `app/api/lead/route.ts` and POST the payload to it, then forward it to your
email provider (Resend, SendGrid, Postmark) or a database:

```ts
// components/LeadForm.tsx
await fetch('/api/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: n, email: em, phone: ph, role: r, message: msg }),
});
```

```ts
// app/api/lead/route.ts
export async function POST(req: Request) {
  const data = await req.json();
  // send email (Resend/SendGrid/Postmark) or persist to a DB here
  return Response.json({ ok: true });
}
```

Store provider API keys as environment variables (`.env.local` locally, Project
Settings → Environment Variables on Vercel).

### Option C — CRM

POST the same payload to your CRM's inbound-lead / web-to-lead endpoint
(HubSpot Forms API, Salesforce Web-to-Lead, Pipedrive, etc.). Keep the existing
client-side validation, and swap the success state (`setSubmitted(true)`) to run
after a successful response.
