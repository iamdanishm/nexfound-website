"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";

export type PillarData = {
  title: string;
  desc: string;
};

export type AboutData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
  pillars?: PillarData[];
  teamTagline?: string;
  foundedInfo?: string;
};

const DEFAULT_PHASES = [
  {
    phase: "01",
    timeframe: "PHASE 1",
    title: "Scoping & Planning",
    tagline: "Clear requirements and roadmapping before writing any code.",
    deliverables: [
      "Product roadmap & feature priorities",
      "Database schema & API planning",
      "Tech stack recommendation",
      "Fixed milestone timeline",
    ],
  },
  {
    phase: "02",
    timeframe: "PHASE 2",
    title: "UI/UX & Prototyping",
    tagline: "Clean, responsive, and intuitive design built for real users.",
    deliverables: [
      "Interactive Figma prototypes",
      "Modern component library",
      "Mobile & desktop responsiveness",
      "Smooth user flows & micro-interactions",
    ],
  },
  {
    phase: "03",
    timeframe: "PHASE 3",
    title: "Full-Stack Development",
    tagline: "Experienced developers building clean, maintainable code.",
    deliverables: [
      "Modern React / Next.js / Node.js development",
      "Fast, reliable database integration",
      "Weekly progress updates & demos",
      "Automated testing & deployment setups",
    ],
  },
  {
    phase: "04",
    timeframe: "PHASE 4",
    title: "Launch & Ongoing Support",
    tagline: "Smooth deployment with continued support after going live.",
    deliverables: [
      "Live deployment to your domain",
      "Full repository & IP handover",
      "Performance & security checks",
      "Ongoing maintenance & updates",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export default function About({ about }: { about?: AboutData }) {
  const [activeStep, setActiveStep] = useState(0);

  const badgeText = about?.badgeText || "Our Process";
  const mainHeading = about?.mainHeading || "How We Build";
  const highlightedText = about?.highlightedText || "Your Product.";
  const description =
    about?.description ||
    "How we turn your idea into a working, high-quality product with clear communication, fast iterations, and zero hassle.";

  // If Sanity provides custom pillars, map them nicely
  const hasCustomPillars = Boolean(about?.pillars && about.pillars.length > 0);
  const itemsCount = hasCustomPillars
    ? about?.pillars?.length || 3
    : DEFAULT_PHASES.length;

  const gridColsClass =
    itemsCount === 1
      ? "grid grid-cols-1 max-w-md mx-auto"
      : itemsCount === 2
      ? "grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
      : itemsCount === 3
      ? "grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <section id="about" className="relative py-14 sm:py-18 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <motion.div variants={itemVariants} className="mb-3">
              <div className="luxury-badge">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                  {badgeText}
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
            >
              <span>{mainHeading} </span>
              <span className="text-gold-foil block sm:inline">{highlightedText}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Interactive Process Grid - Perfectly Centered */}
          <div className={`${gridColsClass} gap-4 sm:gap-5 mb-10 sm:mb-12`}>
            {hasCustomPillars
              ? about?.pillars?.map((pillar, idx) => {
                  const isActive = activeStep === idx;
                  const stepNum = (idx + 1).toString().padStart(2, "0");

                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      onClick={() => setActiveStep(idx)}
                      className="cursor-pointer group"
                    >
                      <div
                        className={`h-full p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                          isActive
                            ? "glass-obsidian border-[#DFCA9F]/60 shadow-[0_15px_40px_rgba(197,168,128,0.15)] ring-1 ring-[#DFCA9F]/40"
                            : "glass-obsidian border-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-display font-extrabold text-gold-foil">
                              {stepNum}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-[#DFCA9F]">
                              STEP {idx + 1}
                            </span>
                          </div>

                          <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-gold-foil transition-colors">
                            {pillar.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              : DEFAULT_PHASES.map((phase, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <motion.div
                      key={phase.phase}
                      variants={itemVariants}
                      onClick={() => setActiveStep(idx)}
                      className="cursor-pointer group"
                    >
                      <div
                        className={`h-full p-5 sm:p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                          isActive
                            ? "glass-obsidian border-[#DFCA9F]/60 shadow-[0_15px_40px_rgba(197,168,128,0.15)] ring-1 ring-[#DFCA9F]/40"
                            : "glass-obsidian border-white/[0.06] hover:border-white/20"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-display font-extrabold text-gold-foil">
                              {phase.phase}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-[#DFCA9F]">
                              {phase.timeframe}
                            </span>
                          </div>

                          <h3 className="text-base font-display font-bold text-white mb-2 group-hover:text-gold-foil transition-colors">
                            {phase.title}
                          </h3>

                            <p className="text-xs text-[#9E9EB0] leading-relaxed mb-4">
                            {phase.tagline}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
                          {phase.deliverables.map((item, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 text-[11px] text-[#D4D4DF]">
                              <span className="text-[#DFCA9F] font-bold shrink-0">✓</span>
                              <span className="leading-tight">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
          </div>

          {/* Guarantee Banner */}
          <motion.div variants={itemVariants}>
            <div className="glass-obsidian p-6 sm:p-7 rounded-2xl border border-white/[0.08] flex flex-wrap items-center justify-around gap-4 text-center text-xs font-mono text-[#D4D4DF]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>100% Code & IP Ownership on Day 1</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
                <span>Weekly Working Demos & Transparent Updates</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                <span>Direct Slack / Discord Access with Developers</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}