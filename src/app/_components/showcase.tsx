"use client";

import { motion, Variants } from "framer-motion";
import SanityImageComp from "./sanity-image";
import { SanityImage } from "@/sanity/lib/image";

// Text constants
const TEXTS = {
  BADGE_TEXT: "Featured Work",
  TITLE_FIRST_LINE: "Recent Work.",
  TITLE_SECOND_LINE: "Real Results.",
  DESCRIPTION:
    "Explore recent projects we've built and delivered for ambitious founders and companies.",
  CTA_HEADING: "Ready to build your product?",
  CTA_SUBHEADING:
    "Let's talk through your requirements and start building something exceptional.",
  CTA_BUTTON: "Get in Touch",
} as const;

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    _id: string;
    title: string;
    slug?: { current: string };
    color?: string;
  };
  description: string;
  mainImage?: SanityImage;
  gradient?: string;
  tags?: string[];
  status?: string;
  metrics?: { label: string; value: string }[];
  highlight?: string;
};

// Rich default project data
const DEFAULT_PROJECTS: Project[] = [
  {
    _id: "proj-1",
    title: "Apex Global Fleet & Logistics Engine",
    slug: { current: "apex-logistics" },
    category: { _id: "cat-1", title: "Enterprise SaaS" },
    description:
      "Engineered an event-driven fleet orchestration platform processing 50k+ daily shipments with sub-40ms WebSocket telemetry and automated route optimization.",
    tags: ["Next.js 15", "TypeScript", "PostgreSQL", "Redis", "Kafka", "AWS"],
    status: "Production Grade",
    highlight: "Zero-Downtime Event Sourcing Migration",
    metrics: [
      { label: "Throughput", value: "50k req/s" },
      { label: "Latency", value: "32ms" },
      { label: "MRR Growth", value: "+340%" },
    ],
  },
  {
    _id: "proj-2",
    title: "Veritas AI Compliance & Audit Pipeline",
    slug: { current: "veritas-ai" },
    category: { _id: "cat-2", title: "AI Infrastructure" },
    description:
      "Architected an enterprise multi-agent document analysis system parsing 10,000+ legal filings per hour with verifiable zero data leak RAG indexing.",
    tags: ["Python", "FastAPI", "Pinecone", "Claude 3.5", "Docker", "Next.js"],
    status: "SOC-2 Certified",
    highlight: "99.2% Extraction Accuracy at Scale",
    metrics: [
      { label: "Parse Speed", value: "1.2s / doc" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Cost Saved", value: "68%" },
    ],
  },
  {
    _id: "proj-3",
    title: "Lumina Wealth & High-Frequency Trading Portal",
    slug: { current: "lumina-wealth" },
    category: { _id: "cat-3", title: "Fintech Platform" },
    description:
      "Delivered a bank-grade portfolio management and real-time execution workstation featuring double-entry ledger accuracy and live streaming charting.",
    tags: ["React 19", "Node.js", "PostgreSQL", "WebSockets", "AWS KMS"],
    status: "Live & Scaled",
    highlight: "$12M Seed Round Closed Post-Launch",
    metrics: [
      { label: "AUM Managed", value: "$180M+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Active Users", value: "120k+" },
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

export default function Showcase({ projects }: { projects?: Project[] }) {
  const displayProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative py-14 sm:py-18 overflow-hidden bg-transparent">
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

          {/* High-Craft Editorial Case Study Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 sm:mb-12">
            {displayProjects.map((project, index) => {
              const defaultMetrics = DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length].metrics;
              const metrics = project.metrics || defaultMetrics;
              const highlight = project.highlight || DEFAULT_PROJECTS[index % DEFAULT_PROJECTS.length].highlight;

              return (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  className="group relative"
                >
                  <div className="glass-obsidian glass-obsidian-hover p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between overflow-hidden">
                    <div>
                      {/* Visual Showcase Glass Frame */}
                      <div className="relative h-44 w-full rounded-2xl overflow-hidden mb-5 bg-[#090910] border border-white/[0.08] p-4 flex flex-col justify-between">
                        {project.mainImage ? (
                          <SanityImageComp
                            image={project.mainImage}
                            alt={project.mainImage.alt || project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        ) : (
                          <>
                            {/* Simulated Glass Architecture HUD Header */}
                            <div className="flex items-center justify-between z-10">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#DFCA9F]/10 border border-[#DFCA9F]/30 text-[#DFCA9F]">
                                {project.category.title}
                              </span>
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/[0.05] border border-white/10 text-white">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                                <span>{project.status || "Live"}</span>
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
                          </>
                        )}
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
                      <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-5 line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div>
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                          {project.tags.slice(0, 4).map((tag, tIdx) => (
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
