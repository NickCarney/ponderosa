"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function AnnouncementBanner({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        background: "var(--amber)",
        textAlign: "center",
        padding: "8px 40px",
        position: "relative",
        fontFamily: "var(--font-body)",
      }}
    >
      <a
        href="/salary-guide"
        style={{ color: "#2a1c08", fontWeight: 700, fontSize: "14px" }}
      >
        Check out our brand new 2026 Salary Guide →
      </a>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#2a1c08",
          background: "none",
          border: 0,
          cursor: "pointer",
          padding: "4px",
          opacity: 0.7,
        }}
        aria-label="Close announcement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/salary-guide", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/specialties", label: "Specialties" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ||
    (href === "/salary-guide" &&
      (pathname === "/salary-guide" || pathname === "/playbook"));

  return (
    <header
      className="site-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(34, 58, 36, 0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Brand */}
        <a
          href="/"
          className="nav-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo.svg"
            alt="Ponderosa"
            width={166}
            height={100}
            style={{ height: "100px", width: "auto", display: "block" }}
            priority
          />
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "21px",
              letterSpacing: "-0.01em",
              color: "var(--cream)",
              textIndent: "-75%",
            }}
          >
            Ponderosa
          </span>
        </a>

        {/* Desktop tabs */}
        <nav
          className="hidden md:flex"
          style={{ gap: "6px", alignItems: "center" }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`nav-tab${isActive(href) ? " active" : ""}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a href="/contact" className="nav-cta hidden md:inline-flex">
          Start a Search →
        </a>
      </div>

      {/* Mobile nav strip */}
      <div className="nav-mobile-strip">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={`nav-tab${isActive(href) ? " active" : ""}`}
          >
            {label}
          </a>
        ))}
      </div>
    </header>
  );
}
