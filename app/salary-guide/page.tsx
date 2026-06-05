"use client";

import { useState } from "react";
import { Navigation, AnnouncementBanner, Footer, ContactForm } from "../components";

function SalaryGuideSection() {
  return (
    <>
      <section
        style={{
          background: "var(--pine-900)",
          padding: "72px 0 56px",
        }}
      >
        <div className="wrap" style={{ maxWidth: "640px" }}>
          <p className="eyebrow" style={{ color: "var(--amber)" }}>2026 Salary Guide</p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              color: "var(--cream)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: "14px 0 18px",
            }}
          >
            Know what the<br />
            <em style={{ fontStyle: "italic", color: "var(--amber)" }}>market pays.</em>
          </h1>
          <p style={{ color: "var(--sage)", fontSize: "17px", lineHeight: 1.6, maxWidth: "520px" }}>
            Comp benchmarks, regional breakdowns, and band data across stage and geography — for engineers, AI roles, and platform teams.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "64px 0 84px" }}>
        <div className="wrap" style={{ maxWidth: "560px" }}>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "var(--radius)",
              padding: "36px 32px",
              boxShadow: "var(--shadow)",
              border: "1px solid rgba(16, 42, 34, 0.08)",
            }}
          >
            <p style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 600, color: "var(--pine-900)", marginBottom: "22px" }}>
              Get the guide — it&apos;s free.
            </p>
            <ContactForm
              formType="salary-guide"
              showNewsletter
              showPhone
              showCompany
              buttonVariant="burgundy"
              buttonText="Send me the guide →"
              successMessage="You're on the list. We'll send the guide to your inbox shortly."
              messageRequired={false}
              messageRows={3}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function SalaryGuidePage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />
      <SalaryGuideSection />
      <Footer />
    </div>
  );
}
