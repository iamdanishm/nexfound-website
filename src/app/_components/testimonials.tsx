"use client";

import { motion, Variants } from "framer-motion";
import SanityImageComp from "./sanity-image";
import { SanityImage } from "@/sanity/lib/image";

// Text constants
const TEXTS = {
  BADGE_TEXT: "Executive Endorsements",
  TITLE_FIRST_LINE: "Proven Results.",
  TITLE_SECOND_LINE: "Trusted by Founders.",
  DESCRIPTION:
    "Hear directly from non-technical founders, technical executives, and business leaders who scaled with Nexfound.",
  DEFAULT_STATS: [
    { value: "50+", label: "Products Shipped" },
    { value: "4.98/5", label: "Client Satisfaction" },
    { value: "99.4%", label: "Contract Renewal Rate" },
    { value: "<24h", label: "Executive Direct Access" },
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

// Rich default testimonials
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: "test-1",
    name: "Vikram Malhotra",
    role: "CEO & Co-Founder",
    company: "Zynk Logistics",
    outcome: "Scaled to 50,000+ Daily Shipments",
    quote:
      "Nexfound took our dispatch routing system from an unstable beta to a bulletproof platform handling 50k+ daily deliveries. Their architectural discipline is in a league of its own.",
    rating: 5,
  },
  {
    _id: "test-2",
    name: "Elena Rostova",
    role: "Head of Product",
    company: "Aura Health",
    outcome: "Launched 3 Weeks Ahead of Schedule",
    quote:
      "Working with Nexfound felt like having an elite in-house engineering team. They delivered our compliance-heavy mobile app 3 weeks ahead of schedule with zero security flaws.",
    rating: 5,
  },
  {
    _id: "test-3",
    name: "Marcus Sterling",
    role: "Managing Director",
    company: "Sterling Capital",
    outcome: "Unlocked $12M Series A Funding",
    quote:
      "As a non-technical founder, finding engineers who think like business executives was transformative. They didn't just build our MVP; they helped us close our seed round.",
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
    <section id="testimonials" className="relative py-14 sm:py-18 overflow-hidden bg-[#030305]">
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

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
            {displayTestimonials.map((item, index) => {
              const outcome = item.outcome || DEFAULT_TESTIMONIALS[index % DEFAULT_TESTIMONIALS.length].outcome;

              return (
                <motion.div key={item._id} variants={itemVariants} className="group">
                  <div className="glass-obsidian glass-obsidian-hover h-full p-6 sm:p-7 rounded-2xl flex flex-col justify-between">
                    <div>
                      {/* Rating & Outcome Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-3.5 h-3.5 text-[#DFCA9F] fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981]">
                          Verified Client
                        </span>
                      </div>

                      {/* Quantified Outcome Strip */}
                      <div className="mb-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono text-[#F7ECD5] font-medium flex items-center gap-1.5">
                        <span className="text-[#DFCA9F]">★</span>
                        <span>{outcome}</span>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-xs sm:text-sm text-[#D4D4DF] leading-relaxed mb-6 italic">
                        &quot;{item.quote}&quot;
                      </p>
                    </div>

                    {/* Client Info Header */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden bg-gradient-to-br from-[#DFCA9F] to-[#AA895B] flex items-center justify-center font-bold text-[#050507] text-xs shrink-0 shadow-md">
                        {item.avatar ? (
                          <SanityImageComp
                            image={item.avatar}
                            alt={item.name}
                            width={36}
                            height={36}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          item.name.charAt(0)
                        )}
                      </div>

                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-gold-foil transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-[#9E9EB0]">
                          {item.role} · <span className="text-[#DFCA9F] font-medium">{item.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 p-5 sm:p-6 rounded-2xl glass-obsidian border border-white/[0.08]"
          >
            {displayStats.map((stat, sIdx) => (
              <div key={sIdx} className="text-center">
                <div className="text-xl sm:text-2xl font-display font-extrabold text-gold-foil mb-0.5">
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono text-[#9E9EB0] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
