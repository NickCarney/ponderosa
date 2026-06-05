export function Footer() {
  return (
    <footer
      style={{
        background: "var(--pine-900)",
        color: "var(--sage)",
        padding: "56px 0 36px",
      }}
    >
      <div className="wrap">
        <div className="foot-top">
          <div className="foot-brand">
            <div className="name">Ponderosa</div>
            <p>
              Boutique technical recruiting. Senior, staff, and founding
              engineers for VC-backed startups. Rooted in expertise.
            </p>
          </div>
          <div className="foot-links">
            <div className="foot-col">
              <h4>Explore</h4>
              <a href="/salary-guide">Blog</a>
              <a href="/about">About</a>
              <a href="/specialties">Specialties</a>
              <a href="/contact">Contact</a>
            </div>
            <div className="foot-col">
              <h4>Connect</h4>
              <a href="mailto:drake.olson@ponderosatalent.com">Email Drake</a>
              <a href="tel:+17206354186">(720) 635-4186</a>
              <a href="/privacy-policy">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Ponderosa Talent Group. All rights reserved.</span>
          <span>Denver, Colorado</span>
        </div>
      </div>
    </footer>
  );
}
