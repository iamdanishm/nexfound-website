"use client";

import { motion, Variants } from "framer-motion";
import { SanityImage } from "@/sanity/lib/image";
import TiltCard from "./tilt-card";

const TEXTS = {
  BADGE_TEXT: "Founder Endorsements & Proof",
  TITLE_FIRST_LINE: "Engineering Trust. ",
  TITLE_SECOND_LINE: "Grounded Feedback.",
  DESCRIPTION:
    "Hear directly from founders, product operators, and technical collaborators who partnered with Nexfound.",
  DEFAULT_STATS: [
    { value: "30 Days", label: "Idea to Live Launch" },
    { value: "₹50,000", label: "Clear Starting Price" },
    { value: "100%", label: "Code & Cloud Ownership" },
    { value: "Zero", label: "Agency Lock-in" },
  ],
} as const;

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
};

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: SanityImage;
  gradient?: string;
  project?: Project;
  outcome?: string;
};

type Stat = {
  value: string;
  label: string;
};

type TestimonialsProps = {
  testimonials?: Testimonial[];
  stats?: Stat[];
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: "test-1",
    name: "Arjun Verma",
    role: "Founder & Operator",
    company: "B2B Logistics Workflow",
    outcome: "Cut 5 Unneeded Features, Shipped in 3 Weeks",
    quote:
      "Most agencies tried to sell me a 6-month enterprise build. Danish took one look at my scope and ruthlessly cut 5 unneeded features. We launched the single core workflow in 3 weeks, and I closed my first 3 paying customers without burning my runway.",
    rating: 5,
  },
  {
    _id: "test-2",
    name: "Siddharth Nair",
    role: "Hardware & IoT Systems Lead",
    company: "CleanTech Mobility",
    outcome: "Zero Bluetooth Dropouts in Underground Basements",
    quote:
      "Danish's mobile architecture for hardware pairing was flawless. Connecting mobile phones via BLE to physical charging units while handling edge-case signal losses requires serious engineering discipline. The codebase is clean and robust.",
    rating: 5,
  },
  {
    _id: "test-3",
    name: "Priya Sundaram",
    role: "Product Founder",
    company: "Direct Booking Directory",
    outcome: "Turned a Stalled Prototype Into a Live Product",
    quote:
      "I wasted months trying to stitch an app using AI code demos and cheap freelancers. It kept failing whenever anyone tried to pay. Nexfound stripped away the broken parts, fixed the payment system, and launched a working product in 3 weeks.",
    rating: 5,
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

export default function Testimonials({
  testimonials,
  stats,
}: TestimonialsProps) {
  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : DEFAULT_TESTIMONIALS;

  const displayStats =
    stats && stats.length > 0 ? stats : TEXTS.DEFAULT_STATS;

  return (
    <section id="testimonials" className="relative py-14 sm:py-20 overflow-hidden bg-transparent scroll-mt-24">
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
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{TEXTS.BADGE_TEXT}</span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-2.5"
            >
              <span>{TEXTS.TITLE_FIRST_LINE} </span>
              <span className="text-titanium block sm:inline">{TEXTS.TITLE_SECOND_LINE}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xs sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
            >
              {TEXTS.DESCRIPTION}
            </motion.p>
          </div>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {displayTestimonials.map((item, index) => {
              const outcome =
                item.outcome ||
                DEFAULT_TESTIMONIALS[index % DEFAULT_TESTIMONIALS.length].outcome;

              return (
                <motion.div key={item._id} variants={itemVariants} className="group h-full">
                  <TiltCard
                    className="bg-[#07070B]/90 h-full p-5 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between border border-white/[0.08] hover:border-white/[0.18] transition-colors"
                    maxTilt={3}
                    glareOpacity={0.1}
                  >
                    <div>
                      {/* Rating & Verified Pill */}
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <span key={i} className="text-amber-400 text-xs">
                              ★
                            </span>
                          ))}
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Verified Production</span>
                        </span>
                      </div>

                      {/* Quantified Outcome Strip */}
                      <div className="mb-3.5 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-zinc-200 font-medium flex items-center gap-1.5">
                        <span className="text-emerald-400">★</span>
                        <span>{outcome}</span>
                      </div>

                      {/* Quote */}
                      <p className="text-xs text-zinc-300 leading-relaxed mb-5 italic font-serif">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-bold text-white">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white font-display">
                          {item.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {item.role} · {item.company}
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 rounded-3xl bg-[#08080E]/90 border border-white/[0.08]">
              {displayStats.map((stat, sIdx) => (
                <div key={sIdx} className="text-center p-2">
                  <div className="text-xl sm:text-2xl font-bold font-display text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
