/* eslint-disable @next/next/no-img-element */
import Year from '@/components/Year';

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
              <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={164} height={55} />
            </a>
            <p>
              Connecting care, simplifying healthcare. One platform, multiple healthcare services, one connected
              journey for every patient.
            </p>
          </div>
          <div className="ft">
            <h5>Platform</h5>
            <a href={`${base}#ecosystem`}>Ecosystem</a>
            <a href={`${base}#journey`}>How it works</a>
            <a href={`${base}#audience`}>For providers</a>
            <a href={`${base}#trust`}>Security</a>
          </div>
          <div className="ft">
            <h5>Care</h5>
            <a href={`${base}#autism`}>Autism care</a>
            <a href={`${base}#ecosystem`}>Therapy & counseling</a>
            <a href={`${base}#ecosystem`}>Diagnostics</a>
            <a href={`${base}#faq`}>FAQ</a>
          </div>
          <div className="ft ft-contact">
            <h5>Get in touch</h5>
            <a href="mailto:contact@uribcare.com">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>{' '}
              contact@uribcare.com
            </a>
            <a href="tel:+17709105581">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>{' '}
              +1 (770) 910-5581
            </a>
            <a href="tel:+12016863935">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
              </svg>{' '}
              +1 (201) 686-3935
            </a>
            <a href="https://uribcare.com" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>{' '}
              uribcare.com
            </a>
          </div>
        </div>
        <div className="ft-bottom">
          <span>
            © <Year /> URiBCare LLC. All rights reserved.
          </span>
          <span>HIPAA-ready · Online &amp; in-person care</span>
        </div>
      </div>
    </footer>
  );
}
