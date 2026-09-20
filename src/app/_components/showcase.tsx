"use client";

import { motion, Variants } from "framer-motion";

// Text constants
const TEXTS = {
  BADGE_TEXT: "Proof & Credibility",
  TITLE_FIRST_LINE: "Transparent Experience. ",
  TITLE_SECOND_LINE: "Real Proof.",
  DESCRIPTION:
    "We present honest engineering proof and active in-house product execution—never inflated vanity metrics or exaggerated agency claims.",
  CTA_HEADING: "Have an MVP idea ready to build?",
  CTA_SUBHEADING:
    "Let's discuss your requirements, recommend the right first platform, and outline an execution plan.",
  CTA_BUTTON: "Discuss Your Product Idea",
} as const;

type Project = {
  _id: string;
  title: string;
  category: {
    _id: string;
    title: string;
  };
  description: string;
  tags?: string[];
  status?: string;
  metrics?: { label: string; value: string }[];
  highlight?: string;
  proofType?: string;
};

// Truthful, grounded project data aligned with nexfound-positioning.md
const GROUNDED_PROJECTS: Project[] = [
  {
    _id: "proj-evdock",
    title: "EV Dock — Charging Network Mobile App",
    category: { _id: "cat-mobile", title: "Mobile Engineering" },
    description:
      "Danish's professional mobile development contribution. Engineered native mobile architecture for electric vehicle charging stations, integrating real-time telemetry, map navigation, and hardware Bluetooth connectivity.",
    tags: ["Flutter", "Dart", "BLE Connectivity", "Maps SDK", "State Management"],
    status: "Professional Experience",
    highlight: "Real-world hardware & mobile integration",
    proofType: "Professional Contribution",
    metrics: [
      { label: "Platform", value: "Mobile Native" },
      { label: "Connectivity", value: "BLE / IoT" },
      { label: "Execution", value: "Direct Code" },
    ],
  },
  {
    _id: "proj-dalalfree",
    title: "DalalFree — Direct Real Estate Platform",
    category: { _id: "cat-product", title: "Nexfound Product" },
    description:
      "A Nexfound-owned product being built from scratch as an end-to-end real estate web platform, backend, and mobile application. Demonstrates full-stack capability and our disciplined staged web-to-mobile expansion.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Node.js"],
    status: "Active Build",
    highlight: "End-to-End Staged Web & Mobile Build",
    proofType: "In-House Product",
    metrics: [
      { label: "Stage", value: "Active Build" },
      { label: "Approach", value: "Staged Rollout" },
      { label: "Ownership", value: "100% In-House" },
    ],
  },
  {
    _id: "proj-mvp-rescue",
    title: "Focused MVPs & Technical Stabilization",
    category: { _id: "cat-mvp", title: "MVP & Rescue" },
    description:
      "Turnaround first-release MVPs and technical rescue for incomplete, buggy, or AI-generated prototypes. Structured schemas, secure authentication, payment webhooks, and clean deployment handover with 100% IP.",
    tags: ["MVP Scoping", "Supabase / Postgres", "Auth Security", "Stripe / Razorpay", "Docker"],
    status: "Production Ready",
    highlight: "Clean handovers with zero vendor lock-in",
    proofType: "Anonymized Work",
    metrics: [
      { label: "Timeline", value: "3-4 Weeks" },
      { label: "IP Handover", value: "100% Client" },
      { label: "Tech Debt", value: "Eliminated" },
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

export default function Showcase() {
  // Use grounded projects that match nexfound-positioning.md
  const displayProjects = GROUNDED_PROJECTS;

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.div variants={itemVariants} className="mb-3">
              <div className="luxury-badge">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                  {TEXTS.BADGE_TEXT}
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
            >
              <span>{TEXTS.TITLE_FIRST_LINE} </span>
              <span className="text-gold-foil block sm:inline">{TEXTS.TITLE_SECOND_LINE}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed"
            >
              {TEXTS.DESCRIPTION}
            </motion.p>
          </div>

          {/* High-Craft Editorial Case Study Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {displayProjects.map((project) => {
              const metrics = project.metrics;
              const highlight = project.highlight;

              return (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="glass-obsidian glass-obsidian-hover p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between overflow-hidden border border-white/[0.08]">
                    <div>
                      {/* Visual Showcase Glass Frame */}
                      <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-5 bg-[#090910] border border-white/[0.08] p-4 flex flex-col justify-between">
                        {/* Simulated HUD Header */}
                        <div className="flex items-center justify-between z-10">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#DFCA9F]/10 border border-[#DFCA9F]/30 text-[#DFCA9F]">
                            {project.category.title}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-white">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                            <span>{project.status || "Verified"}</span>
                          </span>
                        </div>

                        {/* Simulated Metrics Strip */}
                        <div className="grid grid-cols-3 gap-2 z-10 pt-2 border-t border-white/[0.06]">
                          {metrics?.map((m, mIdx) => (
                            <div key={mIdx} className="text-center p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                              <div className="text-xs font-mono font-bold text-[#F7ECD5]">{m.value}</div>
                              <div className="text-[9px] font-mono text-[#9E9EB0] uppercase">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlight Tag */}
                      <div className="text-xs font-mono text-[#DFCA9F] font-semibold mb-2 flex items-center gap-1.5">
                        <span>★</span>
                        <span>{highlight}</span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-gold-foil transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-5">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md text-[11px] font-mono text-[#9E9EB0] bg-white/[0.03] border border-white/[0.06] group-hover:border-[#DFCA9F]/30 group-hover:text-[#DFCA9F] transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Review Strip */}
          <motion.div variants={itemVariants}>
            <div className="glass-obsidian p-6 sm:p-8 rounded-2xl border border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1">
                  {TEXTS.CTA_HEADING}
                </h3>
                <p className="text-[#9E9EB0] text-xs sm:text-sm">
                  {TEXTS.CTA_SUBHEADING}
                </p>
              </div>

              <button
                onClick={scrollToContact}
                className="btn-gold shrink-0 text-xs sm:text-sm py-3 px-6"
              >
                <span>{TEXTS.CTA_BUTTON}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
