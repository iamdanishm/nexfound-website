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

      // 1. Eyebrow badge: Fade + Lift
      tl.fromTo(
        ".hero-eyebrow",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" }
      );

      // 2. Grand Headline: Signature Clip Reveal (rises up from clip mask)
      tl.fromTo(
        ".hero-headline-clip",
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.3"
      );

      // 3. Subhead: Fade + Lift
      tl.fromTo(
        ".hero-subhead",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        "-=0.45"
      );

      // 4. Magnetic CTAs: Fade + Lift + Elastic Spring
      tl.fromTo(
        ".hero-ctas",
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "back.out(1.3)" },
        "-=0.4"
      );

      // 5. Execution Runway: Fade + Lift
      tl.fromTo(
        ".hero-runway",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.35"
      );

      // 6. Guarantees Bar: Fade + Lift
      tl.fromTo(
        ".hero-guarantees",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
        "-=0.35"
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
      {/* Studio Ambient Center Warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(223,202,159,0.12)_0%,rgba(223,202,159,0.02)_45%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container-custom relative z-10 text-center">

        {/* 1. Technical Eyebrow (Fade + Lift) */}
        <div className="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#DFCA9F]/20 bg-[#DFCA9F]/[0.05] mb-5 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#DFCA9F] font-semibold">
            Predictable 30-Day Production Sprints
          </span>
        </div>

        {/* 2. Grand Headline with Architectural Clip Reveal */}
        <div className="overflow-hidden pb-2 mb-4 sm:mb-6">
          <h1 className="hero-headline-clip text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-display font-bold tracking-normal [word-spacing:0.28em] text-white leading-[1.08] max-w-5xl mx-auto text-balance">
            Turn your product idea into a{" "}
            <span className="relative inline-block italic text-gold-shimmer px-2 font-bold [word-spacing:0.28em] pr-3.5">
              live, payment-ready
              <span className="absolute -bottom-1 left-1 right-2 h-[2px] bg-gradient-to-r from-transparent via-[#DFCA9F]/60 to-transparent pointer-events-none" />
            </span>{" "}
            MVP in 30 days.
          </h1>
        </div>

        {/* 3. Punchy 1-Sentence Subhead (Fade + Lift) */}
        <p className="hero-subhead text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-9 font-normal">
          We architect, design, and ship production-grade Web &amp; Mobile MVPs for ambitious founders. Fixed timeline. 100% direct Git ownership.
        </p>

        {/* 4. Magnetic CTA Buttons with Tactile Press + Spring */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12 w-full max-w-lg mx-auto">
          <button
            ref={magneticBtnRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() => scrollToSection("#contact")}
            className="w-full sm:w-auto btn-primary py-4 px-8 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 group cursor-pointer shadow-[0_12px_40px_rgba(223,202,159,0.4)] hover:shadow-[0_18px_50px_rgba(223,202,159,0.55)] transition-shadow will-change-transform whitespace-nowrap"
          >
            <span>Start Your 30-Day Sprint</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 font-bold">
              →
            </span>
          </button>

          <button
            onClick={() => scrollToSection("#work")}
            className="w-full sm:w-auto btn-secondary py-4 px-7 text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer hover:border-white/30 transition-all whitespace-nowrap"
          >
            <span>See Shipped MVPs</span>
            <span className="text-zinc-500">↓</span>
          </button>
        </div>

        {/* 5. Interactive 30-Day Sprint Velocity Runway Widget (Fade + Lift & Spring Cards) */}
        <div className="hero-runway max-w-3xl mx-auto mb-10 p-2 sm:p-2.5 rounded-2xl bg-[#08080D]/95 border border-white/[0.08] shadow-2xl">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/[0.06] mb-2 text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 uppercase font-semibold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
              The 30-Day Execution Trajectory
            </span>
            <span className="text-zinc-500 font-mono hidden sm:inline">Click or hover to inspect</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {SPRINT_PHASES.map((phase, idx) => (
              <div
                key={idx}
                onClick={() => setActivePhase(idx)}
                onMouseEnter={() => setActivePhase(idx)}
                className={`p-3.5 rounded-xl text-left tab-spring cursor-pointer ${
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
                <div className="mt-1.5 text-[9px] font-mono text-[#DFCA9F] flex items-center gap-1 font-semibold">
                  <span>✓</span> {phase.milestone}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Quick Founder Guarantees Pill Bar (Fade + Lift) */}
        <div className="hero-guarantees inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-400">
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
