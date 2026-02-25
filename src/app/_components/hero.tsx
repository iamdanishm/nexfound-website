"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

// Text constants
const TEXTS = {
  BADGE_TEXT_DEFAULT: "Crafting Digital Excellence",
  MAIN_HEADING_DEFAULT: "Stop Worrying About Code.",
  HIGHLIGHTED_TEXT_DEFAULT: "Start Scaling Your Business.",
  SUBHEADING_DEFAULT:
    "Premium digital service studio crafting exceptional experiences for ambitious brands.",
  HIGHLIGHT_TEXTS: [
    "actually scales.",
    "investors trust.",
    "drives revenue.",
    "never breaks.",
  ],
  TRUST_INDICATORS_DEFAULT: [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Industry Awards" },
    { value: "24/7", label: "Support Available" },
  ],
  CTA_BUTTON_PRIMARY: "Get Your Roadmap Now!",
  CTA_BUTTON_SECONDARY: "Get Free AI Audit",
  SCROLL_INDICATOR_TEXT: "Discover More",
} as const;

type TrustItem = { value: string; label: string };

type HeroData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  subheading?: string;
  cta?: { ctaTitle?: string; ctaSubtitle?: string };
  trustIndicators?: TrustItem[];
};

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const trustContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.6 },
  },
};

const trustItemVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 12 },
  },
};

export default function Hero({ hero }: { hero?: HeroData }) {
  const badgeText = hero?.badgeText ?? "Crafting Digital Excellence";
  const mainHeading = hero?.mainHeading ?? "Stop Worrying About Code.";
  const subheading =
    hero?.subheading ??
    "Premium digital service studio crafting exceptional experiences for ambitious brands.";

  const cta = {
    title: hero?.cta?.ctaTitle,
    subtitle: hero?.cta?.ctaSubtitle,
  };

  const trustIndicators: TrustItem[] = useMemo(
    () =>
      hero?.trustIndicators && hero.trustIndicators.length > 0
        ? hero.trustIndicators
        : [
          { value: "50+", label: "Projects Delivered" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "15+", label: "Industry Awards" },
          { value: "24/7", label: "Support Available" },
        ],
    [hero?.trustIndicators]
  );

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

  const highlightTexts = [
    "actually scales.",
    "investors trust.",
    "drives revenue.",
    "never breaks.",
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlightIndex((prev) => (prev + 1) % highlightTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [highlightTexts.length]);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Background Gradient tied to mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100
            }%, rgba(176, 141, 87, 0.08) 0%, transparent 40%)`,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />

      {/* Energetic Background SVGs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
        {/* Animated Grid SVG */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <defs>
            <pattern
              id="hero-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(176,141,87,0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </motion.svg>

        {/* Dynamic Abstract Tech Shape 1 */}
        <motion.svg
          className="absolute top-[10%] left-[10%] w-64 h-64 text-[#B08D57]"
          viewBox="0 0 100 100"
          fill="none"
          initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
          animate={{
            rotate: [0, 90, 180, 360],
            scale: [0.8, 1.1, 0.9, 0.8],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <path
            d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="0.5" />
        </motion.svg>

        {/* Dynamic Abstract Tech Shape 2 */}
        <motion.svg
          className="absolute bottom-[20%] right-[10%] w-80 h-80 text-[#1A7F6B]"
          viewBox="0 0 100 100"
          fill="none"
          initial={{ rotate: 360, x: 50 }}
          animate={{
            rotate: [360, 180, 0],
            x: [50, 0, 50],
            y: [0, -30, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect
            x="30"
            y="30"
            width="40"
            height="40"
            stroke="currentColor"
            strokeWidth="0.5"
            transform="rotate(45 50 50)"
          />
          <path
            d="M 10 50 Q 50 10 90 50 T 10 50"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="2 6"
          />
        </motion.svg>
      </div>

      {/* Main Content Container */}
      <motion.div
        className="container-custom relative z-10 px-6 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto text-center">
          {/* Enhanced Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-5 mt-8 backdrop-blur-md border border-[#B08D57]/40 shadow-[0_8px_32px_rgba(176,141,87,0.1)] bg-gradient-to-br from-[#B08D57]/15 to-[#F4E6C0]/5"
          >
            <div className="relative flex items-center justify-center w-3 h-3">
              <motion.div
                className="w-2 h-2 bg-[#B08D57] rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-[#F4E6C0] rounded-full opacity-50"
                animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            </div>
            <span className="text-sm font-semibold text-[#F4E6C0] tracking-wide uppercase">
              {badgeText}
            </span>
          </motion.div>

          {/* Refined Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
          >
            <span className="block text-white">{mainHeading}</span>
            <span className="block h-[1.2em] relative overflow-hidden mt-2">
              {/* Using AnimatePresence for the text change if we wanted, but simple motion key works too */}
              <motion.span
                key={currentHighlightIndex}
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -50, opacity: 0, scale: 1.05 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 0.5,
                }}
                className="absolute inset-0 flex justify-center bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(176,141,87,0.4)]"
              >
                {highlightTexts[currentHighlightIndex]}
              </motion.span>
            </span>
          </motion.h1>

          {/* Improved Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#B3B3B3] mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            {subheading}
          </motion.p>

          {/* Enhanced CTA Section */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="p-8 md:p-12 rounded-2xl backdrop-blur-xl border border-[#B08D57]/20 shadow-[0_20px_60px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] bg-gradient-to-br from-white/5 to-[#B08D57]/5 relative overflow-hidden group">
              {/* Hover shimmer effect managed by Framer Motion or CSS */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#B08D57]/10 to-transparent z-0"
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />

              <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {cta.title}
                  </h3>
                  <p className="text-[#B3B3B3] text-base md:text-lg">
                    {cta.subtitle}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(176,141,87,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.querySelector("#contact");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="relative px-8 py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl overflow-hidden"
                  >
                    <span className="relative z-10">
                      {TEXTS.CTA_BUTTON_PRIMARY}
                    </span>
                  </motion.button>
                  <button
                    onClick={() => {
                      const element = document.querySelector("#audit");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="block w-full lg:w-auto"
                  >
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(176,141,87,0.1)",
                        boxShadow: "0 0 20px rgba(176,141,87,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 border-2 border-[#B08D57]/60 text-[#F4E6C0] font-semibold rounded-xl text-center w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      <span className="relative z-10">
                        {TEXTS.CTA_BUTTON_SECONDARY}
                      </span>
                    </motion.div>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Trust Indicators */}
          <motion.div
            variants={trustContainerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-16"
          >
            {trustIndicators.map((stat, index) => (
              <motion.div
                key={`${stat.label}-${index}`}
                variants={trustItemVariants}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  borderColor: "rgba(176,141,87,0.4)",
                  boxShadow: "0 15px 30px rgba(176,141,87,0.15)",
                }}
                className="group text-center p-8 rounded-2xl backdrop-blur-md border border-[#B08D57]/20 bg-gradient-to-br from-[#B08D57]/10 to-[#F4E6C0]/5 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold mb-4">
                    <span className="text-white drop-shadow-lg">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-[#B3B3B3] font-semibold uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Refined Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button
          onClick={() => {
            const element = document.querySelector("#services");
            element?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group flex flex-col items-center gap-3 text-[#B3B3B3] hover:text-[#F4E6C0] transition-colors duration-300 p-2"
          aria-label="Scroll to services"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
            {TEXTS.SCROLL_INDICATOR_TEXT}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
