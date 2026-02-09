"use client";

import React from "react";
import { ContactForm } from "./ContactForm";

/* ──────────────────────────────────────────────────────────
   VERSION C — "Particle Network / Modern"
   Connected nodes, diagonal transitions, bold typography
   ────────────────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function ParticleNetworkBackground() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let dpr = 1;
    let particles: Particle[] = [];

    const resize = () => {
      dpr = Math.min(1.5, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      initParticles();
    };

    const initParticles = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const count = Math.floor((width * height) / 8000);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.5,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const connectionDist = 140;

    const animate = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Deep green gradient bg
      const grad = ctx.createRadialGradient(
        width * 0.5, height * 0.4, 0,
        width * 0.5, height * 0.4, Math.max(width, height) * 0.8
      );
      grad.addColorStop(0, "#3d5a3d");
      grad.addColorStop(0.5, "#273927");
      grad.addColorStop(1, "#1a291a");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(229, 223, 207, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 223, 207, ${p.opacity})`;
        ctx.fill();
      }

      // Subtle glow dots at key positions
      const glowPoints = [
        { x: width * 0.2, y: height * 0.3 },
        { x: width * 0.7, y: height * 0.5 },
        { x: width * 0.5, y: height * 0.2 },
      ];
      for (const gp of glowPoints) {
        const glowGrad = ctx.createRadialGradient(gp.x, gp.y, 0, gp.x, gp.y, 80);
        glowGrad.addColorStop(0, "rgba(100, 83, 60, 0.08)");
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(gp.x - 80, gp.y - 80, 160, 160);
      }

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

export function HeroSectionC() {
  return (
    <section className="relative h-[56vh] md:h-[86vh] flex flex-col items-center">
      <ParticleNetworkBackground />

      {/* Subtle bottom fade */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 50%, rgba(26, 41, 26, 0.6) 100%)",
        }}
      />

      {/* Diagonal slice transition */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none h-[10vh] md:h-[16vh]"
        style={{
          background: "#e5dfcf",
          clipPath: "polygon(0 60%, 100% 0%, 100% 100%, 0 100%)",
        }}
      />

      <div className="relative z-10 text-center px-8 py-10 md:py-20 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-white text-3xl md:text-7xl lg:text-8xl font-extrabold leading-none md:max-w-5xl mx-auto tracking-tight">
          BETTER TALENT
        </h1>
        <div className="flex items-center gap-4 md:gap-6 my-4 md:my-6">
          <div className="h-[2px] w-12 md:w-24 bg-[#e5dfcf]/40" />
          <span className="text-[#e5dfcf]/60 text-sm md:text-lg tracking-[0.4em] uppercase">
            Ponderosa
          </span>
          <div className="h-[2px] w-12 md:w-24 bg-[#e5dfcf]/40" />
        </div>
        <h1 className="text-[#e5dfcf] text-3xl md:text-7xl lg:text-8xl font-extrabold leading-none md:max-w-5xl mx-auto tracking-tight">
          FASTER RESULTS
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10 md:mt-14">
          <a
            href="/contact"
            className="bg-[#64533c] text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-[#7a6a4d] transition-colors"
          >
            Find Next Job
          </a>
          <a
            href="/contact"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/20 transition-colors"
          >
            Find Qualified Talent
          </a>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSectionC() {
  const cards = [
    {
      title: "Expertise & Precision Hiring",
      subtitle: "ERP • Data Analytics • Security",
      description:
        "Driving transformation with top talent in ERP, Data Analytics, and Security. We connect you with proven experts who deliver results, protect your systems, and unlock insights.",
      stat: "100%",
      statLabel: "Focused Expertise",
    },
    {
      title: "Speed, Quality, & Flexibility",
      subtitle: "Fast • Reliable • Adaptable",
      description:
        "We quickly deliver top professionals through our network and proactive recruiting — tailored for contract, contract-to-hire, or direct hire needs.",
      stat: "3x",
      statLabel: "Faster Placement",
    },
    {
      title: "Scalable, Long-Term Partners",
      subtitle: "Growth • Partnership • Success",
      description:
        "We don't just fill roles — we align talent with your growth goals. From single hires to full teams, our flexible solutions scale with your business.",
      stat: "∞",
      statLabel: "Scalable Solutions",
    },
  ];

  return (
    <section className="bg-[#e5dfcf] py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-[#273927] tracking-tight">
            Why Ponderosa?
          </h2>
          <p className="text-[#64533c] mt-4 text-lg">
            Three pillars that set us apart
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Accent top border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  index === 0
                    ? "bg-[#273927]"
                    : index === 1
                    ? "bg-[#64533c]"
                    : "bg-gradient-to-r from-[#273927] to-[#64533c]"
                }`}
              />

              {/* Large stat */}
              <div className="mb-6">
                <span className="text-5xl md:text-6xl font-extrabold text-[#273927]/10 group-hover:text-[#273927]/20 transition-colors">
                  {card.stat}
                </span>
                <p className="text-[#64533c] text-xs tracking-widest uppercase mt-1 font-semibold">
                  {card.statLabel}
                </p>
              </div>

              <p className="text-[#64533c]/60 text-xs tracking-widest uppercase mb-2">
                {card.subtitle}
              </p>
              <h3 className="text-[#273927] text-xl font-bold mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {card.description}
              </p>

              {/* Subtle network dot pattern in bottom right */}
              <div className="absolute bottom-4 right-4 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="10" cy="10" r="2" fill="#273927" />
                  <circle cx="30" cy="10" r="2" fill="#273927" />
                  <circle cx="50" cy="10" r="2" fill="#273927" />
                  <circle cx="10" cy="30" r="2" fill="#273927" />
                  <circle cx="30" cy="30" r="2" fill="#273927" />
                  <circle cx="50" cy="30" r="2" fill="#273927" />
                  <circle cx="10" cy="50" r="2" fill="#273927" />
                  <circle cx="30" cy="50" r="2" fill="#273927" />
                  <circle cx="50" cy="50" r="2" fill="#273927" />
                  <line x1="10" y1="10" x2="30" y2="30" stroke="#273927" strokeWidth="0.5" />
                  <line x1="50" y1="10" x2="30" y2="30" stroke="#273927" strokeWidth="0.5" />
                  <line x1="30" y1="30" x2="10" y2="50" stroke="#273927" strokeWidth="0.5" />
                  <line x1="30" y1="30" x2="50" y2="50" stroke="#273927" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EssentialResourcesSectionC() {
  return (
    <section className="bg-[#f7f5f0] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle diagonal bg accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(45deg, #273927 0px, #273927 1px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#273927] text-center mb-4 tracking-tight">
          Essential Resources
        </h2>
        <p className="text-gray-500 text-center text-lg mb-16">
          Comprehensive guides to stay ahead in today&apos;s competitive market.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Salary Guide — glass-style card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#64533c] to-[#7a6a4d] rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-gradient-to-br from-[#64533c]/95 to-[#7a6a4d]/95 backdrop-blur rounded-2xl p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-white/50 text-xs tracking-widest uppercase">Guide</span>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mt-1">2026 Salary Guide</h3>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed">
                Unlock up-to-date salary benchmarks, regional variations, and expert insights on compensation to attract and retain top talent.
              </p>
              <a
                href="/salary-guide"
                className="inline-flex items-center gap-2 bg-white text-[#64533c] py-3 px-6 rounded-lg font-semibold hover:bg-[#e5dfcf] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Guide
              </a>
            </div>
          </div>

          {/* Playbook */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#273927] to-[#3d5a3d] rounded-2xl transform group-hover:scale-[1.02] transition-transform duration-300" />
            <div className="relative bg-gradient-to-br from-[#273927]/95 to-[#3d5a3d]/95 backdrop-blur rounded-2xl p-8 md:p-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-white/50 text-xs tracking-widest uppercase">Playbook</span>
                  <h3 className="text-white text-2xl md:text-3xl font-bold mt-1">SAP Hiring Playbook</h3>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-white/70 mb-8 leading-relaxed">
                A step-by-step framework for identifying, interviewing, and recruiting top-tier SAP talent for your organization.
              </p>
              <a
                href="/playbook"
                className="inline-flex items-center gap-2 bg-white text-[#273927] py-3 px-6 rounded-lg font-semibold hover:bg-[#e5dfcf] transition-colors"
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

export function ContactSectionC() {
  return (
    <section className="relative bg-[#1a291a] py-24 px-4 md:px-8 overflow-hidden">
      {/* Particle-style dot pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.04]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#e5dfcf" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3d5a3d] rounded-full blur-[150px] opacity-20 z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#64533c] rounded-full blur-[120px] opacity-15 z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4">
            Let&apos;s <span className="text-[#e5dfcf]">Connect</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to find exceptional talent or take the next step in your career? We&apos;re here to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Info cards */}
          <div className="lg:w-1/3 space-y-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 bg-[#64533c] rounded-lg flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Quick Response</h3>
              <p className="text-white/50 text-sm">We respond within 24 hours</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="w-10 h-10 bg-[#273927] rounded-lg flex items-center justify-center mb-3 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">Personalized</h3>
              <p className="text-white/50 text-sm">Solutions tailored to you</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 bg-white rounded-2xl shadow-2xl p-8 md:p-10">
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
