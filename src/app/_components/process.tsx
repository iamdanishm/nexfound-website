"use client";

import TiltCard from "./tilt-card";

const SPRINTS = [
  {
    step: "01",
    tag: "WEEK 1 · SCOPE & FOUNDATION",
    title: "Isolate the Core Workflow",
    desc: "We strip away distractions and identify the single feature that makes customers open their wallets. We choose the right first platform (web or mobile) and map out the exact user journey.",
    deliverable: "1-Feature Roadmap & Wireframe Prototype",
    badgeColor: "text-amber-300 border-amber-500/20 bg-amber-500/10",
  },
  {
    step: "02",
    tag: "WEEKS 2–3 · RAPID BUILD",
    title: "Design, Build & Integrate Payments",
    desc: "We build a sleek, high-converting interface, reliable database, secure user accounts, and direct payment processing (UPI/Cards). You get continuous staging links to test it as we build.",
    deliverable: "Live Staging App with Working Payments",
    badgeColor: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10",
  },
  {
    step: "03",
    tag: "WEEK 4 · LAUNCH & HANDOVER",
    title: "Live Production Launch & Full Ownership",
    desc: "We connect your custom domain, stress-test real transactions, and hand over 100% of the code and cloud accounts directly to you. You own everything—zero lock-in.",
    deliverable: "Live Production App & 100% Code Handover",
    badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
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
    <section id="process" className="relative py-16 sm:py-24 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 pointer-events-none blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.2) 0%, rgba(99, 102, 241, 0.15) 50%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="studio-badge mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
              <span>The 4-Week Sprint Roadmap</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-display">
              <span>From Idea to Real Customers in </span>
              <span className="text-gold-gradient block sm:inline">4 Predictable Weeks.</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              No endless discovery meetings or disappearing developers. A transparent, milestone-driven sprint designed to get your product into paying customers&apos; hands.
            </p>
          </div>

          {/* 3-Sprint Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12">
            {SPRINTS.map((sprint) => (
              <TiltCard
                key={sprint.step}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#08080E]/90 border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-between group"
                maxTilt={2}
                glareOpacity={0.08}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#DFCA9F]">
                      {sprint.step}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${sprint.badgeColor}`}>
                      {sprint.tag}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-2.5 group-hover:text-zinc-200 transition-colors">
                    {sprint.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {sprint.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-zinc-300 flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{sprint.deliverable}</span>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Bottom Action Prompt */}
          <div className="text-center">
            <button
              onClick={scrollToContact}
              className="btn-primary text-xs sm:text-sm py-3.5 px-8 font-semibold tracking-wider uppercase inline-flex items-center gap-2 group"
            >
              <span>Map Your 4-Week Sprint Roadmap</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
