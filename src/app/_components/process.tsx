"use client";

import { motion } from "framer-motion";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Scope Discipline",
    tagline: "Cut the fat before writing code",
    description:
      "We interrogate your product idea to isolate the smallest useful version that proves value to real users. Non-essential features are archived for post-launch.",
    deliverable: "Refined feature backlog & MVP specification",
  },
  {
    step: "02",
    title: "Platform Recommendation",
    tagline: "Web or mobile: choose the fastest path",
    description:
      "Instead of doubling costs by building both platforms on day one, we recommend the single platform (web or mobile) that validates your product fastest with least friction.",
    deliverable: "Platform justification & user workflow mapping",
  },
  {
    step: "03",
    title: "Technical Architecture",
    tagline: "Solid foundation, zero rework",
    description:
      "We design the schema, secure authentication flows, database relationships, third-party integrations, and cloud infrastructure so your product doesn't crash on launch.",
    deliverable: "System topology & data flow architecture",
  },
  {
    step: "04",
    title: "Agile Production Build",
    tagline: "Rapid, production-ready code",
    description:
      "We build the agreed core product workflows using modern, battle-tested full-stack technologies. Direct communication with your builder, no layers of bureaucracy.",
    deliverable: "Working product build with weekly progress demos",
  },
  {
    step: "05",
    title: "Hardening & Testing",
    tagline: "Catch blockers before your users do",
    description:
      "We stress-test edge cases, patch security flaws, optimize database queries, and resolve all critical usability blockers preventing a seamless first release.",
    deliverable: "Passed QA audit & verified production build",
  },
  {
    step: "06",
    title: "Launch & Expansion",
    tagline: "Ship to production, plan next steps",
    description:
      "We deploy to your live infrastructure, configure domains, and hand over 100% of the code and IP. Once real user data is in, we decide when to expand to the second platform.",
    deliverable: "Live deployment, DNS/domain setup & 100% IP handover",
  },
];

export default function Process() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="process" className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
      {/* Subtle Background Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[500px] rounded-full opacity-15 pointer-events-none blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="luxury-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
                The Scope-to-Launch Roadmap
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>How We Take You From </span>
              <span className="text-gold-foil block sm:inline">Idea to First Release.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed">
              A structured 6-step delivery process designed to eliminate wasted engineering hours and get a usable first version into users&apos; hands.
            </p>
          </div>

          {/* 6-Step Process Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map((step) => (
              <motion.div
                key={step.step}
                initial={false}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="glass-obsidian glass-obsidian-hover p-6 sm:p-7 rounded-2xl border border-white/[0.08] flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle Step Glow Watermark */}
                <span className="absolute top-3 right-4 font-mono font-black text-4xl text-white/[0.04] group-hover:text-[#DFCA9F]/10 transition-colors pointer-events-none select-none">
                  {step.step}
                </span>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#DFCA9F]/10 text-[#DFCA9F] border border-[#DFCA9F]/20">
                      Step {step.step}
                    </span>
                    <span className="text-xs text-[#A2A2B0] font-medium tracking-wide">
                      {step.tagline}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2.5 group-hover:text-gold-foil transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
                  <svg
                    className="w-3.5 h-3.5 text-[#DFCA9F] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-xs font-mono text-[#DFCA9F]/90 truncate">
                    {step.deliverable}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Process CTA Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-obsidian border border-[#DFCA9F]/20 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 font-display">
                Have an idea ready to be scoped?
              </h4>
              <p className="text-xs sm:text-sm text-[#9E9EB0]">
                Let&apos;s break it down into the smallest valuable first release.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider shrink-0"
            >
              <span>Discuss Your Product Idea</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
