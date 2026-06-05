"use client";

import React, { useState } from "react";
import {
  Navigation,
  AnnouncementBanner,
  Footer,
  ContactForm,
} from "../components";

const SPECIALTIES = [
  {
    num: "→",
    title: "AI Roles",
    description:
      "ML, applied AI, research, and forward-deployed engineers for teams building on the frontier — vetted for who's actually shipped models to production, not just fine-tuned them.",
  },
  {
    num: "→",
    title: "SWE Roles",
    description:
      "Full-stack, backend, and product engineers — the core builders who turn roadmap into shipped software, vetted for range, ownership, and sound judgment under speed.",
  },
  {
    num: "→",
    title: "Platform & Cloud",
    description:
      "Infrastructure, DevOps, SRE, and platform engineers who keep systems fast, reliable, and scalable — the hires that make every other engineer more productive.",
  },
  {
    num: "→",
    title: "Mobile",
    description:
      "iOS, Android, and cross-platform engineers (React Native, Expo, Flutter) for teams whose product lives in your customer's pocket — sourced for craft and shipping cadence.",
  },
  {
    num: "→",
    title: "Engineering Leadership",
    description:
      "Engineering managers, leads, and heads of engineering who can hire, ship, and set the technical bar — the hires that shape every hire after them.",
  },
];

function PageHero() {
  return (
    <section className="page-hero" style={{ background: "var(--bone)" }}>
      <div className="wrap">
        <p className="eyebrow">Specialties</p>
        <h1>What we recruit for.</h1>
        <p>
          Where Ponderosa goes deep — the engineering roles we run end-to-end,
          one search at a time. Contingency, no retainer.
        </p>
      </div>
    </section>
  );
}

function SpecialtiesGrid() {
  return (
    <section
      className="section-block"
      style={{ paddingTop: "44px", background: "var(--bone)" }}
    >
      <div className="wrap">
        <div className="principles">
          {SPECIALTIES.map((s) => (
            <div key={s.title} className="pcard">
              <div className="num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>

        {/* The model */}
        <div style={{ marginTop: "34px" }}>
          <div className="svc-band">
            <div className="section-head" style={{ margin: 0 }}>
              <h2>The model</h2>
              <p>
                Contingency: you pay a percentage of first-year base, due only
                when a candidate we sourced is hired. No retainer, no upfront
                risk. You only pay when we deliver.
              </p>
            </div>
            <div style={{ marginTop: "24px" }}>
              <a href="/contact" className="btn-primary">
                Start a Search →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section
      className="section-block"
      style={{ background: "var(--pine-900)" }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "64px",
            alignItems: "center",
          }}
          className="two-col"
        >
          <div style={{ color: "var(--cream)" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "clamp(32px, 5vw, 52px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: "16px",
              }}
            >
              Let&apos;s build your team.
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "var(--sage)",
                lineHeight: 1.6,
              }}
            >
              Tell us about the role. We&apos;ll come back with an honest read
              on whether Ponderosa is the right partner.
            </p>
          </div>
          <div
            style={{
              background: "var(--cream)",
              borderRadius: "22px",
              padding: "36px 32px",
              boxShadow: "var(--shadow)",
            }}
          >
            <ContactForm
              formType="specialties"
              showNewsletter
              buttonText="Send"
              successMessage="Thank you! We'll get back to you soon."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SpecialtiesPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />
      <PageHero />
      <SpecialtiesGrid />
      <ContactSection />
      <Footer />
    </div>
  );
}
