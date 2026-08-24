"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion, Variants } from "framer-motion";

// Text constants
const TEXTS = {
  BADGE_TEXT_DEFAULT: "Start a Project",
  MAIN_HEADING_DEFAULT: "Ready to Build",
  HIGHLIGHTED_TEXT_DEFAULT: "Your Next Big Idea?",
  DESCRIPTION_DEFAULT:
    "Tell us about your product goals, timeline, and budget. We'll get back to you within 24 hours with an actionable plan.",
  FORM_TITLE_DEFAULT: "Project Inquiry",
  EMAIL_DEFAULT: "hello@nexfound.in",
  PHONE_DEFAULT: "+91 8286556661",
  WHY_CHOOSE_POINTS_DEFAULT: [
    "Direct communication with experienced developers",
    "Quick turnaround & clear milestone roadmaps",
    "Transparent pricing with no surprise costs",
    "Clean, scale-ready code with post-launch support",
  ],
} as const;

type CTAData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
  formTitle?: string;
  quickContactTitle?: string;
  whyChooseTitle?: string;
  whyChoosePoints?: string[];
};

type CTAProps = {
  cta?: CTAData;
  contactEmail?: string;
  contactPhone?: string;
};

const BUDGET_OPTIONS = ["$5k - $15k", "$15k - $35k", "$35k - $75k", "$75k+"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function CTA({ cta, contactEmail, contactPhone }: CTAProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    budget: "$15k - $35k",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const badgeText = cta?.badgeText ?? TEXTS.BADGE_TEXT_DEFAULT;
  const mainHeading = cta?.mainHeading ?? TEXTS.MAIN_HEADING_DEFAULT;
  const highlightedText =
    cta?.highlightedText ?? TEXTS.HIGHLIGHTED_TEXT_DEFAULT;
  const description = cta?.description ?? TEXTS.DESCRIPTION_DEFAULT;
  const email = contactEmail ?? TEXTS.EMAIL_DEFAULT;
  const phone = contactPhone ?? TEXTS.PHONE_DEFAULT;
  const whyPoints =
    cta?.whyChoosePoints && cta.whyChoosePoints.length > 0
      ? cta.whyChoosePoints
      : TEXTS.WHY_CHOOSE_POINTS_DEFAULT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        budget: "$15k - $35k",
      });
      toast.success(
        "Inquiry received. A senior engineer will review your specs and reply within 24 hours.",
        {
          duration: 6000,
          icon: "✨",
        }
      );
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send message. Please email hello@nexfound.in directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-14 sm:py-18 overflow-hidden bg-[#030305]">
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Narrative & Guarantees */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <div>
                <div className="luxury-badge mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
                  <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                    {badgeText}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
                  <span>{mainHeading} </span>
                  <span className="text-gold-foil block">{highlightedText}</span>
                </h2>

                <p className="text-sm sm:text-base text-[#9E9EB0] leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Direct Contact Pills */}
              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#DFCA9F]/40 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFCA9F]/10 flex items-center justify-center text-[#DFCA9F] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#A2A2B0]">Direct Email</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#DFCA9F] transition-colors">{email}</div>
                  </div>
                </a>

                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#DFCA9F]/40 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFCA9F]/10 flex items-center justify-center text-[#DFCA9F] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#A2A2B0]">Phone / WhatsApp</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#DFCA9F] transition-colors">{phone}</div>
                  </div>
                </a>
              </div>

              {/* Engineering Guarantees */}
              <div className="space-y-2.5 pt-2">
                {whyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#D4D4DF]">
                    <span className="text-[#DFCA9F]">✦</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Luxury Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.1] shadow-2xl">
                <h3 className="text-2xl font-display font-bold text-white mb-6">
                  {TEXTS.FORM_TITLE_DEFAULT}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2.5">
                      Estimated Project Scope / Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                            formData.budget === opt
                              ? "bg-[#DFCA9F] text-[#050507] font-bold shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                              : "bg-white/[0.03] text-[#A2A2B0] border border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Company / Product Name
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Technologies"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Architecture & Scope Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about the product goals, existing codebase (if any), timeline, or specific challenges..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-gold w-full py-4 text-sm uppercase tracking-wider font-bold rounded-xl shadow-[0_0_25px_rgba(223,202,159,0.4)] hover:shadow-[0_0_35px_rgba(223,202,159,0.6)] cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? "Submitting Inquiry..." : "Submit Project Inquiry"}
                    </span>
                    <svg
                      className="w-4 h-4 ml-1.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}