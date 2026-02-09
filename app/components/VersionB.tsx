"use client";

import React from "react";
import { ContactForm } from "./ContactForm";

/* ──────────────────────────────────────────────────────────
   VERSION B — "Topographic / Organic Flow"
   Flowing contour lines, curved transitions, editorial layout
   ────────────────────────────────────────────────────────── */

function TopographicBackground() {
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

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rich gradient background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#273927");
      grad.addColorStop(0.4, "#3d5a3d");
      grad.addColorStop(0.7, "#4a5a40");
      grad.addColorStop(1, "#64533c");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Topographic contour lines
      const lineCount = 18;
      for (let i = 0; i < lineCount; i++) {
        const baseY = (height / (lineCount - 1)) * i;
        const opacity = 0.06 + (i / lineCount) * 0.12;
        const lineWidth = 1 + (i % 3 === 0 ? 1 : 0);

        ctx.beginPath();
        ctx.strokeStyle = `rgba(229, 223, 207, ${opacity})`;
        ctx.lineWidth = lineWidth;

        for (let x = -10; x <= width + 10; x += 3) {
          const wave1 = Math.sin((x * 0.008) + time + i * 0.6) * 30;
          const wave2 = Math.sin((x * 0.004) + time * 0.7 + i * 0.3) * 20;
          const wave3 = Math.sin((x * 0.015) + time * 1.2 + i * 0.9) * 10;
          const y = baseY + wave1 + wave2 + wave3;

          if (x === -10) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Accent elevation rings (like topographic map features)
      const ringCount = 4;
      for (let r = 0; r < ringCount; r++) {
        const cx = width * (0.2 + r * 0.2) + Math.sin(time * 0.3 + r) * 40;
        const cy = height * (0.3 + (r % 2) * 0.3) + Math.cos(time * 0.4 + r) * 30;

        for (let ring = 0; ring < 4; ring++) {
          const radius = 30 + ring * 18;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(229, 223, 207, ${0.04 - ring * 0.008})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      time += 0.006;
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

export function HeroSectionB() {
  return (
    <section className="relative h-[56vh] md:h-[86vh] flex flex-col items-center">
      <TopographicBackground />

      {/* Soft vignette overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(39, 57, 39, 0.4) 100%)",
        }}
      />

      {/* Curved wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[8vh] md:h-[14vh]"
        >
          <path
            d="M0,60 C360,120 720,0 1080,80 C1260,100 1380,40 1440,60 L1440,120 L0,120 Z"
            fill="#e5dfcf"
          />
        </svg>
      </div>

      <div className="relative z-10 text-center px-8 py-10 md:py-20 flex-1 flex flex-col items-center justify-center">
        <p className="text-[#e5dfcf]/70 text-sm tracking-[0.3em] uppercase mb-4">
          Rooted in Expertise
        </p>
        <h1 className="text-white text-2xl md:text-6xl lg:text-7xl font-extrabold leading-tight md:max-w-5xl mx-auto">
          The Ponderosa
          <br />
          <span className="text-[#e5dfcf]">Advantage</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto">
          Better Talent, Faster Results
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="/contact"
            className="bg-[#e5dfcf] text-[#273927] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors"
          >
            Find Next Job
          </a>
          <a
            href="/contact"
            className="border-2 border-[#e5dfcf] text-[#e5dfcf] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e5dfcf] hover:text-[#273927] transition-colors"
          >
            Find Qualified Talent
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSectionB() {
  const cards = [
    {
      num: "01",
      title: "Expertise & Precision Hiring",
      subtitle: "ERP • Data Analytics • Security",
      description:
        "Driving transformation with top talent in ERP, Data Analytics, and Security. We connect you with proven experts who deliver results, protect your systems, and unlock insights.",
      icon: (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <circle cx="40" cy="40" r="30" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.4" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="#e5dfcf" strokeWidth="2" opacity="0.6" />
          <circle cx="40" cy="40" r="6" fill="#e5dfcf" opacity="0.9" />
          <line x1="40" y1="5" x2="40" y2="75" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" />
          <line x1="5" y1="40" x2="75" y2="40" stroke="#e5dfcf" strokeWidth="1" opacity="0.3" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Speed, Quality, & Flexibility",
      subtitle: "Fast • Reliable • Adaptable",
      description:
        "We quickly deliver top professionals through our network and proactive recruiting — tailored for contract, contract-to-hire, or direct hire needs.",
      icon: (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <path d="M15 60 A30 30 0 0 1 65 60" fill="none" stroke="#e5dfcf" strokeWidth="3" opacity="0.5" strokeLinecap="round" />
          <line x1="40" y1="58" x2="55" y2="30" stroke="#e5dfcf" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="40" cy="58" r="4" fill="#e5dfcf" opacity="0.9" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Scalable, Long-Term Partners",
      subtitle: "Growth • Partnership • Success",
      description:
        "We don't just fill roles — we align talent with your growth goals. From single hires to full teams, our flexible solutions scale with your business.",
      icon: (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect x="10" y="50" width="12" height="20" rx="2" fill="#e5dfcf" opacity="0.4" />
          <rect x="26" y="38" width="12" height="32" rx="2" fill="#e5dfcf" opacity="0.55" />
          <rect x="42" y="26" width="12" height="44" rx="2" fill="#e5dfcf" opacity="0.7" />
          <rect x="58" y="14" width="12" height="56" rx="2" fill="#e5dfcf" opacity="0.85" />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#e5dfcf] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-[#273927] mb-4">
          Why Choose Ponderosa?
        </h2>
        <div className="w-20 h-1 bg-[#64533c] mb-16" />

        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-stretch rounded-xl overflow-hidden shadow-lg ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Icon / Number panel */}
              <div className="bg-gradient-to-br from-[#273927] via-[#3d5a3d] to-[#4a5a40] md:w-1/3 p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
                {/* Subtle contour lines in bg */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 400 300" preserveAspectRatio="none">
                  <path d="M0 50 Q100 20 200 60 Q300 100 400 40" fill="none" stroke="#e5dfcf" strokeWidth="2" />
                  <path d="M0 100 Q100 70 200 110 Q300 150 400 90" fill="none" stroke="#e5dfcf" strokeWidth="2" />
                  <path d="M0 150 Q100 120 200 160 Q300 200 400 140" fill="none" stroke="#e5dfcf" strokeWidth="2" />
                  <path d="M0 200 Q100 170 200 210 Q300 250 400 190" fill="none" stroke="#e5dfcf" strokeWidth="2" />
                  <path d="M0 250 Q100 220 200 260 Q300 300 400 240" fill="none" stroke="#e5dfcf" strokeWidth="2" />
                </svg>
                <span className="text-[#e5dfcf]/30 text-7xl md:text-8xl font-extrabold relative z-10">
                  {card.num}
                </span>
                <div className="relative z-10 mt-4">{card.icon}</div>
              </div>

              {/* Text panel */}
              <div className="bg-white md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[#64533c] text-xs tracking-widest uppercase mb-2 font-semibold">
                  {card.subtitle}
                </p>
                <h3 className="text-[#273927] text-2xl md:text-3xl font-bold mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EssentialResourcesSectionB() {
  return (
    <section className="bg-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#64533c] text-sm tracking-[0.2em] uppercase font-semibold mb-2">
            Stay Ahead
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#273927]">
            Essential Resources
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Salary Guide */}
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-[#64533c] to-[#7a6a4d] rounded-xl p-8 md:p-10 text-white h-full flex flex-col shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-white/60 text-sm tracking-widest uppercase">Guide</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">2026 Salary Guide</h3>
              <p className="text-white/80 mb-8 flex-1">
                Unlock up-to-date salary benchmarks, regional variations, and expert insights on compensation.
              </p>
              <a
                href="/salary-guide"
                className="bg-white text-[#64533c] text-center py-3 px-6 rounded-lg font-semibold hover:bg-[#e5dfcf] transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Guide
              </a>
            </div>
          </div>

          {/* Playbook */}
          <div className="relative">
            <div className="bg-gradient-to-br from-[#273927] to-[#3d5a3d] rounded-xl p-8 md:p-10 text-white h-full flex flex-col shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-white/60 text-sm tracking-widest uppercase">Playbook</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">SAP Hiring Playbook</h3>
              <p className="text-white/80 mb-8 flex-1">
                A step-by-step framework for identifying, interviewing, and recruiting top-tier SAP talent.
              </p>
              <a
                href="/playbook"
                className="bg-white text-[#273927] text-center py-3 px-6 rounded-lg font-semibold hover:bg-[#e5dfcf] transition-colors inline-flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

export function ContactSectionB() {
  return (
    <section className="relative py-20 px-4 md:px-8 overflow-hidden">
      {/* Asymmetric green background shape */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #273927 0%, #3d5a3d 50%, #4a5a40 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />
      {/* Decorative contour accent */}
      <svg className="absolute inset-0 w-full h-full z-[1] opacity-[0.04]" preserveAspectRatio="none" viewBox="0 0 1440 600">
        <path d="M0 100 Q360 50 720 150 Q1080 250 1440 100" fill="none" stroke="#e5dfcf" strokeWidth="3" />
        <path d="M0 200 Q360 150 720 250 Q1080 350 1440 200" fill="none" stroke="#e5dfcf" strokeWidth="3" />
        <path d="M0 300 Q360 250 720 350 Q1080 450 1440 300" fill="none" stroke="#e5dfcf" strokeWidth="3" />
        <path d="M0 400 Q360 350 720 450 Q1080 550 1440 400" fill="none" stroke="#e5dfcf" strokeWidth="3" />
        <path d="M0 500 Q360 450 720 550 Q1080 650 1440 500" fill="none" stroke="#e5dfcf" strokeWidth="3" />
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <p className="text-[#e5dfcf]/60 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              Get Started
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Let&apos;s Build
              <br />
              <span className="text-[#e5dfcf]">Together</span>
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Ready to find exceptional talent or take the next step in your career? We&apos;re here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e5dfcf]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e5dfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/90">Quick Response Time</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e5dfcf]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#e5dfcf]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-white/90">Personalized Solutions</span>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-10">
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
