"use client";

import React, { useState } from "react";
import {
  Navigation,
  AnnouncementBanner,
  Footer,
  ContactForm,
  VersionToggle,
  HeroSectionB,
  WhyChooseSectionB,
  EssentialResourcesSectionB,
  ContactSectionB,
  HeroSectionC,
  WhyChooseSectionC,
  EssentialResourcesSectionC,
  ContactSectionC,
} from "./components";
import type { DesignVersion } from "./components";

function GeometricBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    resize();
    window.addEventListener("resize", resize);

    // Colors - Ponderosa brand colors (green/brown/beige)
    const topColor = "hsl(35, 25%, 31%)"; // brown top
    const leftColor = "hsl(120, 19%, 15%)"; // darker green left
    const rightColor = "hsl(120, 19%, 25%)"; // lighter green right
    const bgColor = "hsl(120, 19%, 19%)"; // dark green background

    // Helper to interpolate between two HSL colors
    const lerpColor = (t: number) => {
      // t = 0: brown (35, 25%, 31%)
      // t = 1: green-ish (120, 19%, 19%)
      const h = 35 + (120 - 35) * t;
      const s = 25 + (19 - 25) * t;
      const l = 31 + (19 - 31) * t;
      return `hsl(${h}, ${s}%, ${l}%)`;
    };

    const drawCube = (
      cx: number,
      cy: number,
      w: number,
      h: number,
      depth: number,
      yOffset: number,
      amplitude: number,
    ) => {
      const y = cy + yOffset;

      // Calculate blend factor: lower = more blue (0 = highest/burgundy, 1 = lowest/blue)
      const blendFactor = (yOffset + amplitude) / (amplitude * 2);
      const currentTopColor = lerpColor(blendFactor);

      // Top face (diamond) - color shifts based on height
      ctx.beginPath();
      ctx.moveTo(cx, y);
      ctx.lineTo(cx + w / 2, y + h / 2);
      ctx.lineTo(cx, y + h);
      ctx.lineTo(cx - w / 2, y + h / 2);
      ctx.closePath();
      ctx.fillStyle = currentTopColor;
      ctx.fill();

      // Left face - darker blue
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, y + h / 2);
      ctx.lineTo(cx, y + h);
      ctx.lineTo(cx, y + h + depth);
      ctx.lineTo(cx - w / 2, y + h / 2 + depth);
      ctx.closePath();
      ctx.fillStyle = leftColor;
      ctx.fill();

      // Right face - lighter blue
      ctx.beginPath();
      ctx.moveTo(cx + w / 2, y + h / 2);
      ctx.lineTo(cx, y + h);
      ctx.lineTo(cx, y + h + depth);
      ctx.lineTo(cx + w / 2, y + h / 2 + depth);
      ctx.closePath();
      ctx.fillStyle = rightColor;
      ctx.fill();
    };

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Cube dimensions - ~6 cubes across screen
      const cubeWidth = width / 5.5;
      const cubeHeight = cubeWidth * 0.5; // height of diamond top
      const cubeDepth = cubeWidth * 0.32; // depth of side faces

      // Grid spacing for proper tessellation
      const spacingX = cubeWidth;
      const spacingY = cubeHeight / 2 + cubeDepth;

      // Calculate grid
      const cols = Math.ceil(width / spacingX) + 3;
      const rows = Math.ceil(height / spacingY) + 4;

      // Draw cubes row by row (back to front)
      for (let row = -2; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          // Offset every other row for isometric grid
          const xOffset = row % 2 === 0 ? 0 : cubeWidth / 2;
          const x = col * spacingX + xOffset - cubeWidth / 2;
          const y = row * spacingY - cubeHeight;

          // Left-to-right wave motion
          // Left starts low, right starts high, then swap
          // Phase offset of ~π across screen width so opposite sides are opposite
          const phase = col * 0.5;
          const amplitude = 25;
          const yOff = Math.sin(time + phase) * amplitude;

          drawCube(x, y, cubeWidth, cubeHeight, cubeDepth, yOff, amplitude);
        }
      }

      // Slow animation speed
      time += 0.008;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-[55vh] md:h-[85vh]"
      style={{ display: "block" }}
    />
  );
}

function HeroSection() {
  return (
    <section className="relative h-[56vh] md:h-[86vh] flex flex-col items-center">
      <GeometricBackground />

      {/* Shadow overlay matching original */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(20, 35, 55, 0.3) 0%, rgba(20, 35, 55, 0.4) 40%, rgba(20, 35, 55, 0.3) 100%)",
        }}
      />

      {/* White triangle transition */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none h-[10vh] md:h-[20vh]"
        style={{
          width: "100%",
          // height: "20vh",
          background: "#e5dfcf",
          clipPath: "polygon(0 100%, 0 70%, 75% 20%, 100% 70%, 100% 100%)",
        }}
      />

      <div className="relative z-10 text-center px-8 py-10 md:py-20">
        <h1 className="text-white text-2xl md:text-6xl lg:text-7xl font-semibold leading-tight md:max-w-5xl mx-auto ">
          The Ponderosa Advantage:
          <br />
          Better Talent, Faster Results
        </h1>
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
          <a
            href="/contact"
            className="bg-white text-[#273927] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Find Next Job
          </a>
          <a
            href="/contact"
            className="bg-white text-[#273927] px-10 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Find Qualified Talent
          </a>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  const cards = [
    {
      // Card 1: Expertise - Target/crosshair with data nodes representing precision hiring
      illustration: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Central target/crosshair */}
          <circle cx="200" cy="100" r="60" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.3" />
          <circle cx="200" cy="100" r="40" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />
          <circle cx="200" cy="100" r="20" fill="#e5dfcf" opacity="0.8" />
          <line x1="200" y1="30" x2="200" y2="170" stroke="#e5dfcf" strokeWidth="1.5" opacity="0.4" />
          <line x1="130" y1="100" x2="270" y2="100" stroke="#e5dfcf" strokeWidth="1.5" opacity="0.4" />

          {/* Data/tech nodes around - representing ERP, Analytics, Security */}
          <circle cx="80" cy="60" r="25" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <text x="80" y="65" textAnchor="middle" fill="#e5dfcf" fontSize="12" fontWeight="bold" opacity="0.8">ERP</text>

          <circle cx="320" cy="60" r="25" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <path d="M310 55 L320 65 L330 55 M310 65 L320 55 L330 65" stroke="#e5dfcf" strokeWidth="2" fill="none" opacity="0.8" />

          <circle cx="320" cy="150" r="25" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <path d="M310 150 L320 140 L330 150 L320 160 Z" fill="#e5dfcf" opacity="0.8" />

          <circle cx="80" cy="150" r="25" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <rect x="70" y="143" width="20" height="14" rx="2" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.8" />
          <circle cx="80" cy="140" r="4" fill="#e5dfcf" opacity="0.8" />

          {/* Connection lines */}
          <line x1="105" y1="70" x2="160" y2="90" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" />
          <line x1="295" y1="70" x2="240" y2="90" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" />
          <line x1="295" y1="140" x2="240" y2="115" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" />
          <line x1="105" y1="140" x2="160" y2="115" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" strokeDasharray="4,4" />
        </svg>
      ),
      title: "EXPERTISE & PRECISION HIRING",
      subtitle: "ERP • Data Analytics • Security",
      description: (
        <>
          Driving transformation with top talent in{" "}
          <strong className="text-[#64533c]">
            ERP, Data Analytics, and Security
          </strong>
          . We connect you with proven experts who deliver results, protect your
          systems, and unlock insights.
        </>
      ),
    },
    {
      // Card 2: Speed & Flexibility - Speedometer/gauge with checkmarks
      illustration: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Central speedometer arc */}
          <path d="M100 150 A100 100 0 0 1 300 150" fill="none" stroke="#e5dfcf" strokeWidth="8" opacity="0.3" strokeLinecap="round" />
          <path d="M100 150 A100 100 0 0 1 280 90" fill="none" stroke="#e5dfcf" strokeWidth="8" opacity="0.8" strokeLinecap="round" />

          {/* Speed needle */}
          <line x1="200" y1="150" x2="260" y2="80" stroke="#e5dfcf" strokeWidth="4" strokeLinecap="round" />
          <circle cx="200" cy="150" r="12" fill="#e5dfcf" opacity="0.9" />

          {/* Speed marks */}
          <line x1="115" y1="85" x2="125" y2="95" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />
          <line x1="150" y1="60" x2="155" y2="72" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />
          <line x1="200" y1="50" x2="200" y2="62" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />
          <line x1="250" y1="60" x2="245" y2="72" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />
          <line x1="285" y1="85" x2="275" y2="95" stroke="#e5dfcf" strokeWidth="2" opacity="0.5" />

          {/* Quality checkmarks on left */}
          <circle cx="50" cy="80" r="18" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <path d="M42 80 L48 86 L58 74" stroke="#e5dfcf" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          <circle cx="50" cy="130" r="18" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <path d="M42 130 L48 136 L58 124" stroke="#e5dfcf" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Flexibility arrows on right */}
          <path d="M340 70 C360 70 370 90 350 100 C370 110 360 130 340 130" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <path d="M345 65 L340 70 L345 75" fill="none" stroke="#e5dfcf" strokeWidth="2" strokeLinecap="round" />
          <path d="M345 125 L340 130 L345 135" fill="none" stroke="#e5dfcf" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: "SPEED, QUALITY, & FLEXIBILITY",
      subtitle: "Fast • Reliable • Adaptable",
      description: (
        <>
          We quickly deliver top professionals through our network and proactive
          recruiting—tailored for{" "}
          <strong className="text-[#64533c]">
            contract, contract-to-hire, or direct hire needs
          </strong>
          .
        </>
      ),
    },
    {
      // Card 3: Scalable Partners - Growing chart with handshake
      illustration: (
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Growth chart bars */}
          <rect x="60" y="140" width="30" height="40" fill="#e5dfcf" opacity="0.4" rx="2" />
          <rect x="100" y="110" width="30" height="70" fill="#e5dfcf" opacity="0.5" rx="2" />
          <rect x="140" y="80" width="30" height="100" fill="#e5dfcf" opacity="0.6" rx="2" />
          <rect x="180" y="50" width="30" height="130" fill="#e5dfcf" opacity="0.8" rx="2" />

          {/* Upward trend arrow */}
          <path d="M75 130 Q120 90 195 40" fill="none" stroke="#e5dfcf" strokeWidth="3" strokeLinecap="round" />
          <path d="M180 35 L195 40 L190 55" fill="none" stroke="#e5dfcf" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Handshake symbol on right */}
          <g transform="translate(280, 80)">
            <circle cx="30" cy="30" r="45" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.4" />
            {/* Left hand */}
            <path d="M10 45 L25 35 L35 35 C40 35 45 30 45 25" fill="none" stroke="#e5dfcf" strokeWidth="3" strokeLinecap="round" />
            {/* Right hand */}
            <path d="M50 45 L35 35 L25 35 C20 35 15 30 15 25" fill="none" stroke="#e5dfcf" strokeWidth="3" strokeLinecap="round" />
            {/* Clasp */}
            <ellipse cx="30" cy="32" rx="8" ry="5" fill="#e5dfcf" opacity="0.6" />
          </g>

          {/* Small people icons indicating team */}
          <circle cx="270" cy="160" r="8" fill="#e5dfcf" opacity="0.5" />
          <ellipse cx="270" cy="178" rx="10" ry="6" fill="#e5dfcf" opacity="0.5" />

          <circle cx="295" cy="155" r="8" fill="#e5dfcf" opacity="0.6" />
          <ellipse cx="295" cy="173" rx="10" ry="6" fill="#e5dfcf" opacity="0.6" />

          <circle cx="320" cy="150" r="8" fill="#e5dfcf" opacity="0.7" />
          <ellipse cx="320" cy="168" rx="10" ry="6" fill="#e5dfcf" opacity="0.7" />
        </svg>
      ),
      title: "SCALABLE, LONG-TERM PARTNERS",
      subtitle: "Growth • Partnership • Success",
      description: (
        <>
          We don&apos;t just fill roles—
          <strong className="text-[#64533c]">
            we align talent with your growth goals
          </strong>
          .{" "}
          <strong className="text-[#64533c]">
            From single hires to full teams, our flexible solutions scale with
            your business
          </strong>
          .
        </>
      ),
    },
  ];

  return (
    <section className="bg-[#e5dfcf] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold italic text-[#64533c] mb-12">
          Why Choose Ponderosa Talent Group?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="flex flex-col">
              {/* Card with gradient background */}
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#273927] via-[#3d5a3d] to-[#4a5a40] p-6 min-h-[280px] flex flex-col">
                {/* Decorative pine tree silhouettes in background */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                  <svg viewBox="0 0 400 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    <path d="M-20 280 L0 220 L-15 220 L10 160 L-10 160 L20 100 L0 100 L30 40 L60 100 L40 100 L70 160 L50 160 L75 220 L60 220 L80 280 Z" fill="#e5dfcf" />
                    <path d="M350 280 L370 230 L358 230 L380 180 L365 180 L390 130 L375 130 L400 80 L425 130 L410 130 L435 180 L420 180 L442 230 L430 230 L450 280 Z" fill="#e5dfcf" />
                  </svg>
                </div>

                {/* Illustration area */}
                <div className="relative z-10 flex-1 flex items-center justify-center mb-4">
                  {card.illustration}
                </div>

                {/* Title and subtitle */}
                <div className="relative z-10">
                  <p className="text-[#e5dfcf]/70 text-xs tracking-wider mb-1">{card.subtitle}</p>
                  <h3 className="text-white font-bold text-lg leading-tight">{card.title}</h3>
                </div>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="bg-gradient-to-br from-[#273927] to-[#3d5a3d] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Contact info */}
          <div className="text-white">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Let&apos;s Work Together
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Ready to find exceptional talent or take the next step in your
              career? We&apos;re here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-lg">Quick Response Time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <span className="text-lg">Personalized Solutions</span>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <ContactForm
              formType="homepage"
              buttonVariant="burgundy-gradient"
              buttonText="Send Message"
              successMessage="Thank you! We'll be in touch soon."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function EssentialResourcesSection() {
  return (
    <section className="bg-[#e5dfcf] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl py-16 px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-bold text-[#273927] text-center mb-4">
          Essential Resources
        </h2>
        <p className="text-gray-600 text-center text-lg mb-16">
          Access our comprehensive guides to stay ahead in today&apos;s
          competitive market.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Salary Guide Card */}
          <div className="flex flex-col shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#64533c] p-8 flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <div>
                <h3 className="text-white text-2xl font-bold">
                  2026 Salary Guide
                </h3>
                <p className="text-white/90 text-base">
                  Comprehensive Market Data
                </p>
              </div>
            </div>
            <div className="bg-white p-8 flex-1 flex flex-col">
              <p className="text-gray-700 text-base leading-relaxed mb-8 flex-1">
                Unlock up-to-date salary benchmarks, regional variations, and
                expert insights on compensation to attract and retain top
                talent.
              </p>
              <a
                href="/salary-guide"
                className="bg-[#64533c] text-white text-center py-4 px-6 rounded-md font-semibold hover:bg-[#544430] transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Salary Guide
              </a>
            </div>
          </div>

          {/* SAP Hiring Playbook Card */}
          <div className="flex flex-col shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#273927] p-8 flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <h3 className="text-white text-2xl font-bold">
                  SAP Hiring Playbook
                </h3>
                <p className="text-white/90 text-base">
                  Proven Hiring Methodologies
                </p>
              </div>
            </div>
            <div className="bg-white p-8 flex-1 flex flex-col">
              <p className="text-gray-700 text-base leading-relaxed mb-8 flex-1">
                A step-by-step framework for identifying, interviewing, and
                recruiting top-tier SAP talent for your organization.
              </p>
              <a
                href="/playbook"
                className="bg-[#273927] text-white text-center py-4 px-6 rounded-md font-semibold hover:bg-[#1d2b1d] transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                Download Playbook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [showBanner, setShowBanner] = useState(true);
  const [version, setVersion] = useState<DesignVersion>("A");

  return (
    <div className="min-h-screen">
      {showBanner && (
        <AnnouncementBanner onClose={() => setShowBanner(false)} />
      )}
      <Navigation />

      {/* Hero */}
      {version === "A" && <HeroSection />}
      {version === "B" && <HeroSectionB />}
      {version === "C" && <HeroSectionC />}

      {/* Why Choose */}
      {version === "A" && <WhyChooseSection />}
      {version === "B" && <WhyChooseSectionB />}
      {version === "C" && <WhyChooseSectionC />}

      {/* Essential Resources */}
      {version === "A" && <EssentialResourcesSection />}
      {version === "B" && <EssentialResourcesSectionB />}
      {version === "C" && <EssentialResourcesSectionC />}

      {/* Contact */}
      {version === "A" && <ContactSection />}
      {version === "B" && <ContactSectionB />}
      {version === "C" && <ContactSectionC />}

      <Footer />

      <VersionToggle current={version} onChange={setVersion} />
    </div>
  );
}
