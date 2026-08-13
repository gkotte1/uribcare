/* eslint-disable @next/next/no-img-element */
import Year from '@/components/Year';
import { Mail, Phone, Globe, Shield } from '@/components/Icons';

/**
 * Site footer. `base` prefixes the in-page anchors so pages other than the home
 * page (e.g. /register) link back to the home page sections.
 */
export default function SiteFooter({ base = '' }: { base?: string }) {
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brandcol">
            <a className="brand" href={`${base}#top`} aria-label="URIBCARE home">
              <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={200} height={67} />
            </a>
            <p>
              Connecting care, simplifying healthcare. One platform, multiple healthcare services, one connected
              journey for every patient.
            </p>
          </div>

          <nav className="ft-col" aria-label="Platform">
            <h5>Platform</h5>
            <div className="ft-links">
              <a href={`${base}#ecosystem`}>Ecosystem</a>
              <a href={`${base}#journey`}>How it works</a>
              <a href={`${base}#audience`}>For providers</a>
              <a href={`${base}#trust`}>Security</a>
            </div>
          </nav>

          <nav className="ft-col" aria-label="Care">
            <h5>Care</h5>
            <div className="ft-links">
              <a href="/autism-care">Autism care</a>
              <a href={`${base}#ecosystem`}>Therapy &amp; counseling</a>
              <a href={`${base}#ecosystem`}>Diagnostics</a>
              <a href={`${base}#faq`}>FAQ</a>
            </div>
          </nav>

          <div className="ft-col ft-contact">
            <h5>Get in touch</h5>
            <div className="ft-links">
              <a href="mailto:contact@uribcare.com"><Mail size={16} /> contact@uribcare.com</a>
              <a href="tel:+17709105581"><Phone size={16} /> +1 (770) 910-5581</a>
              <a href="tel:+12016863935"><Phone size={16} /> +1 (201) 686-3935</a>
              <a href="https://uribcare.com" target="_blank" rel="noopener"><Globe size={16} /> uribcare.com</a>
            </div>
          </div>
        </div>

        <div className="ft-bottom">
          <span>
            © <Year /> URiBCare LLC. All rights reserved.
          </span>
          <span className="ft-badge">
            <Shield size={15} /> HIPAA-ready · Online &amp; in-person care
          </span>
        </div>
      </div>
    </footer>
  );
}
