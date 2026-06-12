"use client";

import { useState } from "react";
import {
  Navigation,
  AnnouncementBanner,
  Footer,
  ContactForm,
} from "../components";

function ContactSection() {
  return (
    <>
      <section className="page-hero" style={{ background: "var(--bone)" }}>
        <div className="wrap">
          <p className="eyebrow">Contact</p>
          <h1>Start a search.</h1>
          <p>
            Tell us about the role. We&apos;ll come back with an honest read on
            whether Ponderosa is the right partner — usually within a day.
          </p>
        </div>
      </section>

      <section
        className="section-block"
        style={{ paddingTop: "40px", background: "var(--bone)" }}
      >
        <div className="wrap contact-grid">
          {/* Form */}
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "var(--radius)",
              padding: "32px 30px",
              boxShadow: "var(--shadow)",
              border: "1px solid rgba(16, 42, 34, 0.08)",
            }}
          >
            <ContactForm
              formType="contact"
              showCompany
              buttonText="Send →"
              successMessage="Thank you! Your message has been sent. We'll be in touch soon."
            />
          </div>

          {/* Aside */}
          <aside className="contact-aside">
            <h3>Or reach out direct.</h3>
            <div className="line">
              Email
              <br />
              <a href="mailto:drake.olson@ponderosatalent.com">
                drake.olson@ponderosatalent.com
              </a>
            </div>
            <div className="line">
              Phone
              <br />
              <a href="tel:+17206354186" style={{ color: "var(--sage)" }}>
                (720) 635-4186
              </a>
            </div>
            <div className="line">
              Based in
              <br />
              <span style={{ color: "var(--cream)" }}>Denver, Colorado</span>
            </div>
            <div className="line">
              LinkedIn
              <br />
              <a
                href="https://www.linkedin.com/company/ponderosatalentgroup"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/company/ponderosatalentgroup
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />
      <ContactSection />
      <Footer />
    </div>
  );
}
