"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { motion, Variants } from "framer-motion";

// Text constants
const TEXTS = {
  BADGE_TEXT_DEFAULT: "Discovery & Qualification",
  MAIN_HEADING_DEFAULT: "Discuss Your",
  HIGHLIGHTED_TEXT_DEFAULT: "Product Idea.",
  DESCRIPTION_DEFAULT:
    "Tell us what you want to build. We will evaluate technical feasibility, recommend the right first platform (web or mobile), and help you isolate the smallest useful release.",
  FORM_TITLE_DEFAULT: "Project Discovery & Scope Inquiry",
  EMAIL_DEFAULT: "hello@nexfound.in",
  PHONE_DEFAULT: "+91 9321456661",
  DISCOVERY_POINTS_DEFAULT: [
    "Feasibility check & ruthless scope reduction",
    "Web vs. Mobile first strategic recommendation",
    "Transparent estimate with starting floor of ₹50,000",
    "No-obligation direct technical discussion with builder",
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

const PLATFORM_OPTIONS = [
  "Web First",
  "Mobile First",
  "Both Platforms",
  "Need Guidance",
];

const BUDGET_OPTIONS = [
  "From ₹50,000 (Focused Build)",
  "₹50,000 – ₹1,50,000",
  "₹1,50,000 – ₹4,00,000",
  "Custom / Technical Rescue",
];

const TIMELINE_OPTIONS = ["< 30 Days", "1 – 2 Months", "Flexible / Exploring"];

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
    platform: "Web First",
    budget: "₹50,000 – ₹1,50,000",
    timeline: "< 30 Days",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const badgeText = cta?.badgeText ?? TEXTS.BADGE_TEXT_DEFAULT;
  const mainHeading = cta?.mainHeading ?? TEXTS.MAIN_HEADING_DEFAULT;
  const highlightedText =
    cta?.highlightedText ?? TEXTS.HIGHLIGHTED_TEXT_DEFAULT;
  const description = cta?.description ?? TEXTS.DESCRIPTION_DEFAULT;
  const email = contactEmail ?? TEXTS.EMAIL_DEFAULT;
  const phone = contactPhone ?? TEXTS.PHONE_DEFAULT;
  const discoveryPoints =
    cta?.whyChoosePoints && cta.whyChoosePoints.length > 0
      ? cta.whyChoosePoints
      : TEXTS.DISCOVERY_POINTS_DEFAULT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Compose formatted message containing the structured discovery qualifications
    const formattedMessage = `
[PLATFORM PREFERENCE]: ${formData.platform}
[BUDGET TIER]: ${formData.budget}
[TARGET TIMELINE]: ${formData.timeline}

[IDEA & CORE WORKFLOW]:
${formData.message}
`.trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formattedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setFormData({
        name: "",
        email: "",
        company: "",
        platform: "Web First",
        budget: "₹50,000 – ₹1,50,000",
        timeline: "< 30 Days",
        message: "",
      });
      toast.success(
        "Discovery inquiry received. We will review your idea and reply with an initial assessment within 24 hours.",
        {
          duration: 6000,
          icon: "🚀",
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
    <section id="contact" className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
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
                  href={`https://wa.me/919321456661`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#DFCA9F]/40 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#DFCA9F]/10 flex items-center justify-center text-[#DFCA9F] group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[#A2A2B0]">WhatsApp & Direct Line</div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#DFCA9F] transition-colors">{phone}</div>
                  </div>
                </a>
              </div>

              {/* Discovery Guarantees */}
              <div className="space-y-2.5 pt-2">
                {discoveryPoints.map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-[#D4D4DF]">
                    <span className="text-[#DFCA9F]">✦</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Pricing Floor Clarification */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-[#9E9EB0] leading-relaxed">
                <span className="text-[#DFCA9F] font-semibold">Pricing Note:</span> Small focused builds start from ₹50,000. Larger MVPs are estimated by platform, features, and delivery requirements.
              </div>
            </motion.div>

            {/* Right Column: Structured Qualification Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="glass-panel p-7 sm:p-9 rounded-3xl border border-white/[0.1] shadow-2xl">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-5">
                  {TEXTS.FORM_TITLE_DEFAULT}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Platform Preference Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Preferred First Platform *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PLATFORM_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, platform: opt })}
                          className={`py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                            formData.platform === opt
                              ? "bg-[#DFCA9F] text-[#050507] font-bold shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                              : "bg-white/[0.03] text-[#A2A2B0] border border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget Tier Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Target Budget Range *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {BUDGET_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, budget: opt })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-mono font-medium text-left transition-all ${
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

                  {/* Timeline Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Desired Timeline
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {TIMELINE_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, timeline: opt })}
                          className={`py-2 px-2.5 rounded-xl text-xs font-mono font-medium text-center transition-all ${
                            formData.timeline === opt
                              ? "bg-[#DFCA9F] text-[#050507] font-bold shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                              : "bg-white/[0.03] text-[#A2A2B0] border border-white/[0.06] hover:border-white/20"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Danish"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="danish@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-1.5">
                      Company or Product Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="MyProduct / Stealth Idea"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                    />
                  </div>

                  {/* Product Idea Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-1.5">
                      Idea, Target Users & Core Workflow *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="What does your product do? Who is the core user? What is the single most important action they take in the app?"
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
                    className="btn-gold w-full py-3.5 text-sm uppercase tracking-wider font-bold rounded-xl shadow-[0_0_25px_rgba(223,202,159,0.4)] hover:shadow-[0_0_35px_rgba(223,202,159,0.6)] cursor-pointer"
                  >
                    <span>
                      {isSubmitting ? "Submitting Discovery Request..." : "Submit Discovery Request"}
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