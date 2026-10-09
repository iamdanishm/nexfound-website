"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SPRINT_PHASES = [
  {
    phase: "PHASE 01",
    days: "DAYS 01–07",
    title: "Scope & Prototype",
    deliverable: "Clickable Figma + DB Schema",
    milestone: "Zero Scope Creep",
  },
  {
    phase: "PHASE 02",
    days: "DAYS 08–22",
    title: "Production Build",
    deliverable: "Auth, Payments & API Rails",
    milestone: "Staging URL Previews",
  },
  {
    phase: "PHASE 03",
    days: "DAYS 23–30",
    title: "Deployment & Transfer",
    deliverable: "Custom Domain + 100% Git IP",
    milestone: "Day 30 Live Revenue",
  },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);
  const [activePhase, setActivePhase] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-entrance-secondary",
        { y: 24, opacity: 0, filter: "blur(4px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          clearProps: "all",
        }
      );
    },
    { scope: heroRef }
  );

  // Magnetic Button Physics
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(btn, {
      x: x * 0.32,
      y: y * 0.32,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.35)",
    });
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      const offset = 85;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative pt-32 sm:pt-40 lg:pt-36 pb-20 sm:pb-28 overflow-hidden bg-transparent"
    >
      {/* Studio Ambient Gold Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(223,202,159,0.13)_0%,rgba(223,202,159,0.03)_50%,transparent_75%)] blur-[105px] pointer-events-none -z-10" />

      {/* Engineering Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="container-custom relative z-10 text-center">

        {/* Grand Headline with Editorial Contrast & Kinetic Gold Light Sweep (Instantly Painted for Optimal LCP) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-display font-extrabold tracking-tight text-white leading-[1.05] max-w-5xl mx-auto mb-6">
          Turn your product idea into a{" "}
          <span className="relative inline-block font-serif italic font-normal tracking-normal text-gold-shimmer px-1">
            live, payment-ready
            <span className="absolute -bottom-1 left-1 right-1 h-[2px] bg-gradient-to-r from-transparent via-[#DFCA9F]/60 to-transparent pointer-events-none" />
          </span>{" "}
          MVP in 30 days.
        </h1>

        {/* Punchy 1-Sentence Subhead */}
        <p className="hero-entrance-secondary text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-9 font-normal">
          We architect, design, and ship production-grade Web &amp; Mobile MVPs for ambitious founders. Fixed timeline. 100% direct Git ownership.
        </p>

        {/* Magnetic CTA Buttons */}
        <div className="hero-entrance-secondary flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12 max-w-md mx-auto">
          <button
            ref={magneticBtnRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => scrollToSection("#contact")}
            className="w-full sm:w-auto btn-primary py-4 px-8 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer shadow-[0_12px_40px_rgba(223,202,159,0.4)] hover:shadow-[0_18px_50px_rgba(223,202,159,0.55)] transition-shadow will-change-transform"
          >
            <span>Start Your 30-Day Sprint</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-bold">
              →
            </span>
          </button>

          <button
            onClick={() => scrollToSection("#work")}
            className="w-full sm:w-auto btn-secondary py-4 px-7 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer hover:border-white/30 transition-all"
          >
            <span>See Shipped MVPs</span>
            <span className="text-zinc-500">↓</span>
          </button>
        </div>

        {/* Interactive 30-Day Sprint Velocity Runway Widget */}
        <div className="hero-entrance-secondary max-w-3xl mx-auto mb-10 p-2 sm:p-2.5 rounded-2xl bg-[#08080D]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] mb-2 text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 uppercase font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
              The 30-Day Execution Trajectory
            </span>
            <span className="text-zinc-500 font-mono hidden sm:inline">Hover to inspect deliverables</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {SPRINT_PHASES.map((phase, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActivePhase(idx)}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  activePhase === idx
                    ? "bg-white/[0.06] border border-[#DFCA9F]/40 shadow-[0_4px_20px_rgba(223,202,159,0.1)]"
                    : "bg-white/[0.02] border border-white/[0.04] hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-[#DFCA9F]">
                    {phase.phase}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400">
                    {phase.days}
                  </span>
                </div>
                <div className="text-xs font-display font-bold text-white mb-0.5">
                  {phase.title}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 truncate">
                  {phase.deliverable}
                </div>
                <div className="mt-1.5 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <span>✓</span> {phase.milestone}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Founder Guarantees Pill Bar */}
        <div className="hero-entrance-secondary inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-[#DFCA9F]">✓</span> 30-Day Guaranteed Launch
          </span>
          <span className="text-zinc-700 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-[#DFCA9F]">✓</span> Fixed Fees From ₹1.49L
          </span>
          <span className="text-zinc-700 hidden sm:inline">·</span>
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <span className="text-[#DFCA9F]">✓</span> 100% Direct Git Transfer
          </span>
        </div>
      </div>
    </section>
  );
}
