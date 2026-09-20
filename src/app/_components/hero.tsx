"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type HeroData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  subheading?: string;
  cta?: {
    ctaTitle?: string;
    ctaSubtitle?: string;
  };
  trustIndicators?: {
    value: string;
    label: string;
  }[];
};

const POSITIONING_WORDS = [
  "focused MVP.",
  "usable web app.",
  "validated mobile app.",
  "production release.",
];

const POSITIONING_PILLARS = [
  { value: "Web or Mobile", label: "Picked to validate fastest" },
  { value: "Smallest Scope", label: "Zero bloat, launch-ready" },
  { value: "From ₹50,000", label: "Transparent entry floor" },
  { value: "100% IP & Code", label: "Complete founder ownership" },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  // Continuously cycle rotating focus words
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % POSITIONING_WORDS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const badgeText = "MVP DEVELOPMENT & LAUNCH PARTNER";
  const subheading =
    "Nexfound helps founders and small businesses turn a clear product idea into a focused, usable MVP—starting with the web or mobile platform that proves it fastest.";
  const supportingText =
    "We handle product scoping, backend architecture, development, testing, and launch preparation so you can validate your idea without hiring a full-time technical team.";
  const ctaPrimary = "Discuss your product idea";
  const trustStats = POSITIONING_PILLARS;

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col justify-center items-center pt-32 pb-14 sm:pb-18 overflow-hidden bg-transparent"
    >
      {/* Ambient Top Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-25 pointer-events-none blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.25) 0%, rgba(197, 168, 128, 0.08) 50%, transparent 75%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <div className="luxury-badge">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                {badgeText}
              </span>
            </div>
          </motion.div>

          {/* Clean Headline with Centered Multi-word Ticker */}
          <motion.div
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
              <span>Turn your product idea into a</span>
              <br />
              <div className="relative h-[1.3em] w-full flex items-center justify-center overflow-hidden mt-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={wordIdx}
                    initial={wordIdx === 0 ? false : { y: 35, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -35, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-gold-foil font-extrabold text-center block whitespace-nowrap px-2"
                  >
                    {POSITIONING_WORDS[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
          </motion.div>

          {/* Subheading Narrative */}
          <motion.p
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-[#F0F0F5] max-w-3xl mx-auto leading-relaxed mb-4 font-normal"
          >
            {subheading}
          </motion.p>

          {/* Supporting Clarification */}
          <motion.p
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
          >
            {supportingText}
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-gold w-full sm:w-auto text-sm sm:text-base py-3.5 px-8"
            >
              <span>{ctaPrimary}</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            <button
              onClick={() => scrollToSection("#process")}
              className="btn-noir w-full sm:w-auto text-sm sm:text-base py-3.5 px-8"
            >
              <span>See the 6-Step Process</span>
              <span className="text-[#DFCA9F] ml-1">↓</span>
            </button>
          </motion.div>

          {/* Bento Proof Counter Grid */}
          <motion.div
            initial={false}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
          >
            {trustStats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-obsidian glass-obsidian-hover p-4 sm:p-5 text-center rounded-2xl group cursor-default"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-display font-extrabold text-gold-foil mb-1 tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-[#A2A2B0] font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
