import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';
import RegistrationTabs from '@/components/register/RegistrationTabs';

export const metadata: Metadata = {
  title: 'Register — Uribcare',
  description:
    'Register with URiBCARE as a patient, doctor, therapist, counselor, pharmacy or laboratory and join one connected care ecosystem.',
};

export default function RegisterPage() {
  return (
    <>
      <Nav />

      <main id="top">
        <section className="reg-page">
          <div className="wrap">
            <div className="reg-head">
              <span className="eyebrow">Join URiBCARE</span>
              <h1>REGISTER</h1>
              <p className="lead">Fill the form</p>
            </div>

            <RegistrationTabs />
          </div>
        </section>
      </main>

      <SiteFooter base="/" />
    </>
  );
}
