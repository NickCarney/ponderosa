"use client";

import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Almarai } from "next/font/google";

const almarai = Almarai({
  weight: ["700"],
  subsets: ["arabic"],
});

export function AnnouncementBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-[#e5dfcf] text-center py-2 px-4 relative">
      <a
        href="/salary-guide"
        className={`text-[#273927] font-bold hover:underline ${almarai.className}`}
      >
        Check out our brand new 2026 Salary Guide!
      </a>
      <button
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#273927] hover:opacity-70"
        aria-label="Close announcement"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
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

export function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isHiringTrendsActive =
    pathname === "/salary-guide" || pathname === "/playbook";

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener(
        "touchstart",
        handleClickOutside as unknown as EventListener,
      );
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "touchstart",
        handleClickOutside as unknown as EventListener,
      );
    };
  }, [dropdownOpen]);

  // Close mobile menu when resizing to desktop
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
        setMobileDropdownOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="relative z-50 bg-[#273927]">
      <div className="flex items-center justify-between px-4 md:px-8 py-1">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Ponderosa Talent Group"
            width={120}
            height={120}
            className="h-20 w-auto object-contain scale-150 -mr-2"
            priority
          />
          <div className="hidden sm:flex flex-col leading-tight -ml-8">
            <span className="text-[#e5dfcf] font-bold text-xl md:text-2xl">
              Ponderosa
            </span>
            <span className="text-[#e5dfcf]/80 font-semibold text-sm md:text-base text-center">
              Talent Group
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div ref={dropdownRef} className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1 text-[#e5dfcf] font-medium hover:text-white pb-1 border-b-2 transition-colors ${
                isHiringTrendsActive ? "border-[#e5dfcf]" : "border-transparent"
              }`}
            >
              Hiring Trends
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`absolute top-full left-0 mt-0 pt-2 transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
              }`}
            >
              <div className="bg-[#273927] rounded-md shadow-lg py-2 min-w-[280px]">
                <a
                  href="/salary-guide"
                  className="block px-4 py-2 text-white hover:bg-[#64533c] transition-colors"
                >
                  2026 Salary Guide
                </a>
                <a
                  href="/playbook"
                  className="block px-4 py-2 text-white hover:bg-[#64533c] transition-colors"
                >
                  Free Hiring Guide For SAP Talent
                </a>
              </div>
            </div>
          </div>
          <a
            href="/specialties"
            className={`text-[#e5dfcf] font-medium hover:text-white pb-1 border-b-2 transition-colors ${
              isActive("/specialties")
                ? "border-[#e5dfcf]"
                : "border-transparent"
            }`}
          >
            Specialties
          </a>
          <a
            href="/about"
            className={`text-[#e5dfcf] font-medium hover:text-white pb-1 border-b-2 transition-colors ${
              isActive("/about") ? "border-[#e5dfcf]" : "border-transparent"
            }`}
          >
            About
          </a>
          <a
            href="/contact"
            className={`text-[#e5dfcf] font-medium hover:text-white pb-1 border-b-2 transition-colors ${
              isActive("/contact") ? "border-[#e5dfcf]" : "border-transparent"
            }`}
          >
            Contact
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#e5dfcf] hover:text-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 border-t border-[#e5dfcf]/20">
          {/* Hiring Trends Dropdown */}
          <div className="py-2">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="flex items-center justify-between w-full py-3 text-[#e5dfcf] font-medium"
            >
              Hiring Trends
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${
                mobileDropdownOpen
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-4 space-y-1">
                <a
                  href="/salary-guide"
                  className="block py-2 text-[#e5dfcf] hover:text-white"
                >
                  2026 Salary Guide
                </a>
                <a
                  href="/playbook"
                  className="block py-2 text-[#e5dfcf] hover:text-white"
                >
                  Free Hiring Guide For SAP Talent
                </a>
              </div>
            </div>
          </div>

          {/* Other Nav Links */}
          <a
            href="/specialties"
            className="block py-3 text-[#e5dfcf] font-medium hover:text-white border-t border-[#e5dfcf]/20"
          >
            Specialties
          </a>
          <a
            href="/about"
            className="block py-3 text-[#e5dfcf] font-medium hover:text-white border-t border-[#e5dfcf]/20"
          >
            About
          </a>
          <a
            href="/contact"
            className="block py-3 text-[#e5dfcf] font-medium hover:text-white border-t border-[#e5dfcf]/20"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
