"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Navigation,
  AnnouncementBanner,
  Footer,
  ContactForm,
} from "../components";

function AboutHero() {
  return (
    <section className="page-hero" style={{ background: "var(--bone)" }}>
      <div className="wrap">
        <p className="eyebrow">About Us</p>
        <h1>
          Deep roots.
          <br />
          One operator.
        </h1>
      </div>
    </section>
  );
}

function AboutBody() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      className="section-block"
      style={{ paddingTop: "44px", background: "var(--bone)" }}
    >
      <div className="wrap two-col">
        <div className="prose">
          <p>
            Ponderosa was started with the belief that talent can make or break
            a company – that sometimes you’re only one significant game-changer
            away from everything being different. We look to help connect
            companies with this game changing talent.
          </p>
          <p>
            Our specialty is finding elite Engineering talent that can drive
            results and take your product to the next level. Ponderosa’s
            philosophy isn’t to be the quickest, cheapest, or easiest to work
            with. But rather to be a recruiting partner who becomes an extension
            of your team, who understands your business and market well enough
            to challenge you, who treats your brand like an extension of our
            brand, and who won’t stop until we find the right person. Ponderosa
            was started with the belief that talent can make or break a company
            – that sometimes you’re only one significant game-changer away from
            everything being different. We look to help connect companies with
            this game changing talent. Our specialty is finding elite
            Engineering talent that can drive results and take your product to
            the next level. Ponderosa’s philosophy isn’t to be the quickest,
            cheapest, or easiest to work with. But rather to be a recruiting
            partner who becomes an extension of your team, who understands your
            business and market well enough to challenge you, who treats your
            brand like an extension of our brand, and who won’t stop until we
            find the right person.
          </p>

          {expanded && (
            <div style={{ marginTop: "0" }}>
              <p>
                Drake has spent the past 6+ years recruiting engineers,
                primarily across software and cloud/platform roles. Before
                starting Ponderosa, he spent 4+ years at Robert Half, where he
                was a top-five technical recruiter in North America.
              </p>
              <p>
                His approach is built on being fair to both sides — telling a
                hiring team where they're missing the mark, telling a candidate
                when a role isn't the right fit — because the only placements
                worth making are the ones where both sides know what they signed
                up for. He prides himself on the technical depth to vet the work
                himself, and on trusting his gut on whether a match will last.
              </p>
              <p>
                Outside of work, Drake is a huge sports fan (Colorado Buffaloes,
                Chicago Cubs, Denver Broncos, and Colorado Avalanche) and spends
                plenty of time frustrated on the golf course.
              </p>
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--amber-dk)",
              fontWeight: 600,
              fontSize: "14px",
              padding: 0,
              fontFamily: "var(--font-body)",
            }}
          >
            {expanded ? "Show less ↑" : "Read more about Drake ↓"}
          </button>
        </div>

        <div>
          <Image
            src="/drake-olson.PNG"
            alt="Drake Olson, Founder of Ponderosa"
            width={304}
            height={306}
            quality={100}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow)",
            }}
          />
          <p
            style={{
              marginTop: "16px",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "16px",
              color: "var(--ink-soft)",
              lineHeight: 1.5,
            }}
          >
            &ldquo;The ponderosa pine puts down a taproot before it ever grows
            tall. That&apos;s the order of operations here too — expertise
            first.&rdquo;
          </p>
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
              Let&apos;s talk.
            </h2>
            <p
              style={{
                fontSize: "18px",
                color: "var(--sage)",
                lineHeight: 1.6,
              }}
            >
              Interested in working together? Fill out some info and we&apos;ll
              be in touch shortly.
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
              formType="about"
              showNewsletter
              buttonText="Send"
              successMessage="Thank you! We'll be in touch soon."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />
      <AboutHero />
      <AboutBody />
      <ContactSection />
      <Footer />
    </div>
  );
}
