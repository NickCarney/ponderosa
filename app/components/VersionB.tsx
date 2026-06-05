"use client";

/* ──────────────────────────────────────────────────────────
   Homepage sections — aligned to HTML mockup design
   ────────────────────────────────────────────────────────── */

export function HeroSectionB() {
  return (
    <section
      style={{
        position: "relative",
        padding: "92px 0 76px",
        overflow: "hidden",
        background: "var(--bone)",
      }}
    >
      {/* Topographic contour backdrop */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.5,
          maskImage: "linear-gradient(to bottom, #000 40%, transparent 92%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 40%, transparent 92%)",
        }}
      >
        <g fill="none" stroke="#8fa68e" strokeWidth="1.2" opacity="0.55">
          <path d="M-50 480 Q300 380 600 450 T1250 410" />
          <path d="M-50 430 Q300 330 600 400 T1250 360" />
          <path d="M-50 380 Q320 290 600 350 T1250 320" />
          <path d="M-50 330 Q340 250 600 300 T1250 280" />
          <path d="M-50 280 Q360 210 600 250 T1250 240" />
          <path d="M-50 230 Q380 170 600 200 T1250 200" />
          <path d="M-50 180 Q400 130 600 150 T1250 160" />
        </g>
      </svg>

      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <p className="eyebrow reveal">
          Boutique Technical Recruiting · Denver, CO
        </p>
        <h1
          className="reveal d1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "clamp(48px, 8.4vw, 104px)",
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: "var(--pine-900)",
            margin: "18px 0 6px",
          }}
        >
          Rooted in
          <br />
          <em style={{ fontStyle: "italic", color: "var(--amber-dk)" }}>
            Expertise.
          </em>
        </h1>
        <p
          className="reveal d2"
          style={{
            fontSize: "clamp(17px, 2.1vw, 21px)",
            color: "var(--ink-soft)",
            maxWidth: "560px",
            margin: "22px 0 34px",
          }}
        >
          We help high-growth and AI-native startups find the engineers who take
          their product to the next level — sourced one search at a time, vetted
          for fit, never for volume.
        </p>
        <div
          className="reveal d3"
          style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
        >
          <a href="/contact" className="btn-primary">
            Start a Search
          </a>
          <a href="/specialties" className="btn-ghost">
            How We Work
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSectionB() {
  return (
    <section
      className="section-block"
      style={{ background: "var(--bone)" }}
    >
      <div className="wrap">
        <div className="section-head">
          <p className="eyebrow">The Ponderosa Difference</p>
          <h2>Signal over volume. Every time.</h2>
          <p>
            Most agencies optimize for resumes sent. Ponderosa optimizes for the
            hire that compounds — fewer, sharper, contextual.
          </p>
        </div>
        <div className="principles">
          <div className="pcard">
            <div className="num">01</div>
            <h3>Founder-aligned</h3>
            <p>
              You work directly with the person running the search — not a
              coordinator, not a queue. Context goes straight from intake to
              outreach.
            </p>
          </div>
          <div className="pcard">
            <div className="num">02</div>
            <h3>Technically fluent</h3>
            <p>
              Real intake on the stack, the bar, and the team. We screen for the
              engineer who&apos;s right, and tell you when one isn&apos;t.
            </p>
          </div>
          <div className="pcard">
            <div className="num">03</div>
            <h3>Built for the long view</h3>
            <p>
              Contingency model, partnership mindset. We&apos;d rather earn your
              next ten searches than force this one.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EssentialResourcesSectionB() {
  return (
    <>
      {/* Specialties preview */}
      <section
        className="section-block"
        style={{ paddingTop: 0, background: "var(--bone)" }}
      >
        <div className="wrap">
          <div className="svc-band">
            <div className="section-head" style={{ marginBottom: "18px" }}>
              <p className="eyebrow">Specialties</p>
              <h2>Where Ponderosa goes deep.</h2>
              <p>
                Engineering search for early-to-growth-stage teams. Contingency.
                No retainer, no risk.
              </p>
            </div>
            <div className="svc-list">
              <div className="svc">
                <h3>AI Roles</h3>
                <p>
                  ML, applied AI, research, and forward-deployed engineers for
                  teams building on the frontier.
                </p>
              </div>
              <div className="svc">
                <h3>SWE Roles</h3>
                <p>
                  Full-stack, backend, and product engineers — the core builders
                  who turn roadmap into shipped software.
                </p>
              </div>
              <div className="svc">
                <h3>Platform &amp; Cloud</h3>
                <p>
                  Infra, DevOps, SRE, and platform engineers who keep systems
                  fast, reliable, and scalable.
                </p>
              </div>
            </div>
            <div className="reach">
              <span className="reach-label">Talent network</span>
              <p className="geos">
                San Francisco<i>·</i>New York<i>·</i>Denver<i>·</i>Austin
                <i>·</i>Canada
              </p>
            </div>
            <div style={{ marginTop: "26px" }}>
              <a href="/specialties" className="btn-primary">
                See all specialties →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog / resources preview */}
      <section
        className="section-block"
        style={{ paddingTop: 0, background: "var(--bone)" }}
      >
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">From the Blog</p>
            <h2>Notes on the talent market.</h2>
          </div>
          <div className="posts" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            <a href="/salary-guide" className="post">
              <div className="thumb" />
              <div className="body">
                <p className="meta">Market · 2026</p>
                <h3>2026 Engineering Salary Guide</h3>
                <p>
                  Comp benchmarks, regional variations, and what the band
                  actually looks like across stage and geography.
                </p>
              </div>
            </a>
            <a href="/playbook" className="post">
              <div className="thumb" />
              <div className="body">
                <p className="meta">Founders</p>
                <h3>Hiring Your First Engineer</h3>
                <p>
                  A field guide for pre-seed and seed founders making the first
                  technical hire.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function ContactSectionB() {
  return (
    <section
      className="section-block"
      style={{ paddingTop: 0, background: "var(--bone)" }}
    >
      <div className="wrap">
        <div className="cta-band">
          <h2>Let&apos;s build your team.</h2>
          <p>
            Tell us about the role. We&apos;ll tell you honestly whether
            we&apos;re the right partner for it.
          </p>
          <a href="/contact" className="btn-primary">
            Start a Search
          </a>
        </div>
      </div>
    </section>
  );
}
