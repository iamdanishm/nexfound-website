"use client";

import { motion, Variants } from "framer-motion";
import TiltCard from "./tilt-card";

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

const DEFAULT_PILLARS = [
  {
    num: "01",
    tag: "ACCOUNTABILITY",
    title: "Direct Senior Builder Access",
    tagline: "No account manager middle-men or junior handoffs.",
    desc: "You collaborate directly with Danish and senior software engineers who architect the system and commit production code. Fast technical decisions, zero translation loss.",
    deliverables: [
      "Direct technical consultations & Slack communication",
      "Architectural decisions explained clearly without jargon",
      "Hands-on execution with production accountability",
    ],
  },
  {
    num: "02",
    tag: "CAPITAL_DISCIPLINE",
    title: "Ruthless Scope Protection",
    tagline: "We protect your runway by preventing overbuilding.",
    desc: "Agency incentives usually align with billing hours; our incentive is getting your MVP to market safely. If a requested feature doesn't validate customer willingness to pay, we push it to V2.",
    deliverables: [
      "Isolation of the single indispensable core workflow",
      "V1 vs. V2 scope triage to prevent delayed launches",
      "Strict avoidance of premature enterprise bloat",
    ],
  },
  {
    num: "03",
    tag: "ZERO_LOCKIN",
    title: "100% IP & Codebase Ownership",
    tagline: "Your intellectual property is entirely yours from Day 1.",
    desc: "We build on standard open-source stacks (Next.js 15, TypeScript, PostgreSQL, Flutter). You receive full GitHub repository access, database migration scripts, and deployment pipeline control.",
    deliverables: [
      "Zero proprietary runtime or agency vendor lock-in",
      "Automated CI/CD deployment to your cloud accounts",
      "Clean, typed code with standardized documentation",
    ],
  },
  {
    num: "04",
    tag: "RISK_ENGINEERING",
    title: "Staged Platform Expansion",
    tagline: "Empirical proof over speculative development.",
    desc: "Building web and mobile simultaneously doubles your cost and bug surface. We launch the single fastest platform first, observe live customer retention, and expand with real evidence.",
    deliverables: [
      "Objective Web vs. Mobile first evaluation",
      "Reusable APIs and schema for future platform expansion",
      "De-risked capital deployment for founders",
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
  const badgeText = about?.badgeText || "Studio Philosophy";
  const mainHeading = about?.mainHeading || "How We Operate as Your";
  const highlightedText = about?.highlightedText || "Technical Partner.";
  const description =
    about?.description ||
    "We treat your product as our own: engineering scalable foundations, ruthlessly trimming scope bloat, and taking full technical responsibility.";

  return (
    <section id="about" className="relative py-14 sm:py-20 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 pointer-events-none blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-14">
            <motion.div variants={itemVariants} className="mb-3">
              <div className="studio-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>{badgeText}</span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-2.5"
            >
              <span>{mainHeading} </span>
              <span className="text-titanium block sm:inline">{highlightedText}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {DEFAULT_PILLARS.map((pillar) => (
              <motion.div key={pillar.num} variants={itemVariants}>
                <TiltCard
                  className="bg-[#07070B]/90 p-5 sm:p-7 rounded-2xl sm:rounded-3xl h-full flex flex-col justify-between border border-white/[0.08] hover:border-white/[0.18] transition-colors group"
                  maxTilt={3}
                  glareOpacity={0.1}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl sm:text-2xl font-display font-extrabold text-zinc-200">
                        {pillar.num}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-white/[0.05] border border-white/[0.08] text-zinc-300">
                        {pillar.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-1">
                      {pillar.title}
                    </h3>

                    <p className="text-xs font-mono text-indigo-300 mb-2.5">
                      {pillar.tagline}
                    </p>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-5">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-white/[0.06] space-y-1.5">
                    {pillar.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="text-emerald-400 font-bold shrink-0">✓</span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {/* Trust Guarantees Strip */}
          <motion.div variants={itemVariants}>
            <div className="bg-[#08080E]/90 p-5 sm:p-6 rounded-3xl border border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center justify-center p-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Day 1 IP Rights
                </span>
                <span className="text-xs text-zinc-400">Full repository, code, and database ownership</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-white/[0.08]">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Weekly Demos
                </span>
                <span className="text-xs text-zinc-400">Live staging URL deployments every single week</span>
              </div>

              <div className="flex flex-col items-center justify-center p-2 border-t sm:border-t-0 sm:border-l border-white/[0.08]">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Direct Access
                </span>
                <span className="text-xs text-zinc-400">Direct senior engineer chat in dedicated Slack</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}