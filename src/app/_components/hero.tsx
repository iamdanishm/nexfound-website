"use client";

import { useEffect, useState, useMemo } from "react";
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

const DEFAULT_WORDS = [
  "scales effortlessly.",
  "investors back.",
  "users love.",
  "drives revenue.",
  "never breaks.",
];

const DEFAULT_STATS = [
  { value: "$40M+", label: "Client Revenue Generated" },
  { value: "50+", label: "Apps & MVPs Shipped" },
  { value: "99.4%", label: "On-Time Delivery" },
  { value: "<24h", label: "Direct Founder Support" },
];

export default function Hero({ hero }: { hero?: HeroData }) {
  const [wordIdx, setWordIdx] = useState(0);

  // Compute rotating words list from Sanity (supports comma-separated) or fallback defaults
  const rotatingWords = useMemo(() => {
    if (hero?.highlightedText && hero.highlightedText.includes(",")) {
      return hero.highlightedText
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean);
    }
    if (hero?.highlightedText && hero.highlightedText.trim()) {
      return [
        hero.highlightedText.trim(),
        ...DEFAULT_WORDS.filter(
          (w) => w.toLowerCase() !== hero.highlightedText?.toLowerCase()
        ),
      ];
    }
    return DEFAULT_WORDS;
  }, [hero?.highlightedText]);

  // Continuously cycle rotating words
  useEffect(() => {
    if (rotatingWords.length <= 1) return;
    const interval = setInterval(() => {
      setWordIdx((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [rotatingWords]);

  const badgeText = hero?.badgeText || "Fast, Reliable Product Development";
  const subheading =
    hero?.subheading ||
    "Your dedicated product team. We partner with ambitious founders to design, build, and scale custom web and mobile apps in weeks — with clean code and zero friction.";
  const ctaPrimary = hero?.cta?.ctaTitle || "Discuss Your Project";
  const trustStats =
    hero?.trustIndicators && hero.trustIndicators.length > 0
      ? hero.trustIndicators
      : DEFAULT_STATS;

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
            initial={{ y: 15, opacity: 0 }}
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

          {/* Clean Single Headline with Centered Multi-word Ticker */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 text-center w-full"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.15]">
              <span>We build software that</span>
              <br />
              <div className="relative h-[1.3em] w-full flex items-center justify-center overflow-hidden mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIdx}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="text-gold-foil font-extrabold text-center block whitespace-nowrap px-2"
                  >
                    {rotatingWords[wordIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </h1>
          </motion.div>

          {/* Subheading Narrative */}
          <motion.p
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
          >
            {subheading}
          </motion.p>

          {/* Dual Action Buttons */}
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
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
              onClick={() => scrollToSection("#work")}
              className="btn-noir w-full sm:w-auto text-sm sm:text-base py-3.5 px-8"
            >
              <span>See Our Work</span>
              <span className="text-[#DFCA9F] ml-1">↓</span>
            </button>
          </motion.div>

          {/* Bento Proof Counter Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
          >
            {trustStats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-obsidian glass-obsidian-hover p-4 sm:p-5 text-center rounded-2xl group cursor-default"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-extrabold text-gold-foil mb-0.5 tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white font-medium">
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
