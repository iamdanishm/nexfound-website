"use client";

import { motion } from "framer-motion";

export default function Features() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] rounded-full opacity-15 pointer-events-none blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="luxury-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                Services & Pricing Structure
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>Our Primary Offer & </span>
              <span className="text-gold-foil block sm:inline">Secondary Services.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed">
              We don&apos;t claim to build everything for everyone. We focus on MVP development from idea to launch, backed by targeted technical rescue when needed.
            </p>
          </div>

          {/* PRIMARY OFFER (Dominant Bento Card) */}
          <motion.div
            initial={false}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="mb-8 glass-obsidian p-7 sm:p-10 rounded-3xl border border-[#DFCA9F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(223,202,159,0.08)] relative overflow-hidden group"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#DFCA9F]/15 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFCA9F]/10 border border-[#DFCA9F]/25 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#DFCA9F] font-bold">
                    Primary 90-Day Offer
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-white mb-3 tracking-tight">
                  MVP Development: Idea to First Release
                </h3>

                <p className="text-sm sm:text-base text-[#C2C2D0] leading-relaxed mb-6 font-normal">
                  For founders and small businesses with a validated market idea and the budget to build it right. We take full technical responsibility from initial scope reduction through production deployment.
                </p>

                {/* Key Deliverables Bullet Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DFCA9F]">
                    <span className="font-bold">✓</span>
                    <span className="text-[#E0E0EC]">Ruthless scope reduction to smallest useful MVP</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DFCA9F]">
                    <span className="font-bold">✓</span>
                    <span className="text-[#E0E0EC]">Web or Mobile platform recommendation</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DFCA9F]">
                    <span className="font-bold">✓</span>
                    <span className="text-[#E0E0EC]">Production-ready backend, auth, db & APIs</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#DFCA9F]">
                    <span className="font-bold">✓</span>
                    <span className="text-[#E0E0EC]">100% Code, database and IP handover</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center lg:items-end justify-center shrink-0 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-8">
                <div className="text-xs font-mono uppercase text-[#9E9EB0] mb-1">
                  Starting Floor
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-gold-foil font-display mb-1">
                  From ₹50,000
                </div>
                <div className="text-[11px] text-[#808090] text-center lg:text-right max-w-[200px] mb-5">
                  Small, focused single-platform builds. Larger MVPs quoted by scope.
                </div>
                <button
                  onClick={scrollToContact}
                  className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider w-full lg:w-auto"
                >
                  <span>Discuss Your MVP Scope</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* SECONDARY SERVICES (Clearly Subordinated Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Product Improvement */}
            <div className="glass-obsidian p-6 sm:p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between group hover:border-[#DFCA9F]/30 transition-colors">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-[#A2A2B0] font-semibold mb-4">
                  Secondary Service
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-2 group-hover:text-gold-foil transition-colors">
                  Product Improvement
                </h4>
                <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-5">
                  For existing web or mobile products that need new feature workflows, UX overhauls, payment or API integrations, and speed optimization.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A2B0] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>Targeted feature additions to active codebases</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>Third-party API & payment gateway integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>Database indexing and latency reduction</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={scrollToContact}
                className="text-xs font-mono font-semibold text-[#DFCA9F] hover:underline inline-flex items-center gap-1.5"
              >
                Inquire about improvements <span>→</span>
              </button>
            </div>

            {/* Technical Rescue */}
            <div className="glass-obsidian p-6 sm:p-8 rounded-3xl border border-white/[0.08] flex flex-col justify-between group hover:border-[#DFCA9F]/30 transition-colors">
              <div>
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono uppercase tracking-wider text-[#A2A2B0] font-semibold mb-4">
                  Secondary Service
                </div>
                <h4 className="text-xl font-bold font-display text-white mb-2 group-hover:text-gold-foil transition-colors">
                  Technical Rescue
                </h4>
                <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-5">
                  For incomplete, buggy, abandoned, or AI-generated codebases that need architectural stabilization, security audits, and a reliable path to launch.
                </p>
                <ul className="space-y-2 text-xs text-[#A2A2B0] mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>In-depth codebase and dependency audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>Auth, database schema, and security patching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#DFCA9F] font-bold">→</span>
                    <span>Clear remediation plan to unblock production launch</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={scrollToContact}
                className="text-xs font-mono font-semibold text-[#DFCA9F] hover:underline inline-flex items-center gap-1.5"
              >
                Inquire about technical rescue <span>→</span>
              </button>
            </div>
          </div>

          {/* Pricing Direction Transparency Note */}
          <div className="glass-obsidian p-6 sm:p-7 rounded-2xl border border-white/[0.08] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#DFCA9F] font-bold block mb-1">
                Pricing Policy & Estimates
              </span>
              <p className="text-xs sm:text-sm text-[#9E9EB0] max-w-2xl leading-relaxed">
                Projects are scoped individually. Small focused builds may start from ₹50,000; larger MVPs are priced according to platform, features, integrations, and delivery requirements. We use a structured discovery step to prevent vague ideas from causing wasted effort.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="btn-noir text-xs py-2.5 px-5 shrink-0 whitespace-nowrap"
            >
              <span>Request an Estimate</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
