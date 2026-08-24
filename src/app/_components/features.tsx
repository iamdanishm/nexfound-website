"use client";

import { motion, Variants } from "framer-motion";
import SanityImage from "./sanity-image";
import {
  MvpArchitectureSVG,
  CodeRescueSVG,
  ProcessAutomationSVG,
  FractionalCtoSVG,
} from "./animated-shapes";

// Text constants
const TEXTS = {
  BADGE_TEXT: "What We Do",
  TITLE_FIRST_LINE: "High-Quality Development",
  TITLE_SECOND_LINE: "For Every Stage.",
  DESCRIPTION:
    "From early-stage MVP prototypes to full-scale web platforms and automation, we build software that works reliably from day one.",
  CTA_HEADING: "Have a project in mind?",
  CTA_SUBHEADING:
    "Talk directly with our developers to discuss timeline, scope, and pricing.",
  CTA_BUTTON: "Discuss Your Project",
} as const;

type Service = {
  _id: string;
  title: string;
  icon: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  description: string;
  gradient?: string;
};

// Fallback services if Sanity is empty
const DEFAULT_SERVICES = [
  {
    _id: "srv-1",
    title: "MVP & Web App Development",
    description:
      "Turn your concept into a live, fast web application with modern tech, clean code, and smooth user experience.",
    iconName: "mvp",
    tag: "01 // ZERO TO ONE",
  },
  {
    _id: "srv-2",
    title: "Codebase Fixes & Upgrades",
    description:
      "Fix bugs, speed up slow endpoints, eliminate technical debt, and get your project back on track fast.",
    iconName: "rescue",
    tag: "02 // RECOVERY & SCALE",
  },
  {
    _id: "srv-3",
    title: "AI & Workflow Automation",
    description:
      "Integrate custom AI features, smart automation, and internal tools that save your team hours every week.",
    iconName: "automation",
    tag: "03 // INTELLIGENCE",
  },
  {
    _id: "srv-4",
    title: "Technical Consulting & Advisory",
    description:
      "Help you choose the right tech stack, plan for growth, and make smart technical decisions without costly mistakes.",
    iconName: "cto",
    tag: "04 // STRATEGIC",
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

export default function Features({ services }: { services?: Service[] }) {
  const displayServices =
    services && services.length >= 4 ? services : (DEFAULT_SERVICES as unknown as Service[]);

  const renderVisual = (title: string, index: number, icon?: Service["icon"]) => {
    const lower = title.toLowerCase();
    if (lower.includes("mvp") || lower.includes("architecture") || index === 0) {
      return <MvpArchitectureSVG className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
    if (lower.includes("rescue") || lower.includes("refactor") || index === 1) {
      return <CodeRescueSVG className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
    if (lower.includes("automation") || lower.includes("ai") || index === 2) {
      return <ProcessAutomationSVG className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
    if (lower.includes("cto") || lower.includes("advisory") || index === 3) {
      return <FractionalCtoSVG className="w-14 h-14 sm:w-16 sm:h-16" />;
    }
    if (icon) {
      return (
        <SanityImage
          image={icon}
          alt={title}
          width={64}
          height={64}
          sizes="64px"
          className="w-14 h-14 object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
        />
      );
    }
    return <MvpArchitectureSVG className="w-14 h-14" />;
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-14 sm:py-18 overflow-hidden bg-transparent">
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

          {/* Compact 2x2 Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10 sm:mb-12">
            {displayServices.slice(0, 4).map((service, index) => {
              const tag =
                DEFAULT_SERVICES[index]?.tag ?? `0${index + 1} // CAPABILITY`;

              return (
                <motion.div
                  key={service._id || index}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="glass-obsidian glass-obsidian-hover p-6 sm:p-7 rounded-2xl flex flex-col justify-between h-full">
                    {/* Top Tag & Visual Blueprint */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono tracking-wider text-[#DFCA9F] font-semibold">
                        {tag}
                      </div>

                      <div className="relative p-1.5 rounded-xl bg-[#050507]/60 border border-white/[0.08] group-hover:border-[#DFCA9F]/30 transition-colors duration-300">
                        {renderVisual(service.title, index, service.icon)}
                      </div>
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2 group-hover:text-gold-foil transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[#9E9EB0] text-xs sm:text-sm leading-relaxed group-hover:text-[#D4D4DF] transition-colors duration-300">
                        {service.description}
                      </p>
                    </div>

                    {/* Bottom Hairline */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#686878] group-hover:text-[#DFCA9F] font-medium uppercase transition-colors">
                        Zero Tech Debt Guarantee
                      </span>
                      <svg
                        className="w-3.5 h-3.5 text-[#686878] group-hover:text-[#DFCA9F] group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Compact Section Conversion Strip */}
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
