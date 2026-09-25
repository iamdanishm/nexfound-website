"use client";

import TiltCard from "./tilt-card";

const DELIVERABLES = [
  {
    icon: "🌐",
    title: "Live App on Your Custom Domain",
    subtitle: "Lightning-fast & responsive across every screen",
    desc: "A polished, modern product running live on your domain. Built to load in under a second and look exceptional on iPhones, Android devices, and laptops.",
    outcome: "Instant credibility with your first 100 customers.",
    badge: "DELIVERABLE 01",
    badgeColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  {
    icon: "💳",
    title: "Instant Customer Checkout & Payments",
    subtitle: "UPI, Credit Cards, Apple Pay & NetBanking",
    desc: "Seamless checkout connected directly to your Stripe or Razorpay account. Every rupee and dollar paid by your users deposits directly into your bank.",
    outcome: "Start collecting real revenue on Day 30.",
    badge: "DELIVERABLE 02",
    badgeColor: "bg-[#DFCA9F]/10 border-[#DFCA9F]/20 text-[#DFCA9F]",
  },
  {
    icon: "📊",
    title: "Simple Founder Control Panel",
    subtitle: "Manage your business without touching code",
    desc: "A clean, human-friendly admin screen where you can view new signups, monitor live sales, manage user accounts, and download customer data with one click.",
    outcome: "You run the business without calling a developer.",
    badge: "DELIVERABLE 03",
    badgeColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  },
  {
    icon: "🔑",
    title: "100% Code & Cloud Ownership",
    subtitle: "Zero hostage fees or agency lock-in",
    desc: "Every line of code and cloud account is transferred directly to your GitHub and your server accounts. You own 100% of your intellectual property forever.",
    outcome: "Complete freedom. No monthly agency retainers.",
    badge: "DELIVERABLE 04",
    badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
];

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
    <section id="services" className="relative py-14 sm:py-20 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Ambience */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-10 pointer-events-none blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.22) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="studio-badge mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Tech Jargon · 100% Tangible Deliverables</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2.5 font-display">
              <span>What do you actually get when we </span>
              <span className="text-gold-gradient block sm:inline">hand you the keys?</span>
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              No developer mumbo-jumbo. No vendor lock-in. Just everything you need to start signing up customers and taking payments on day 30.
            </p>
          </div>

          {/* 4 Deliverables Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-10">
            {DELIVERABLES.map((del) => (
              <TiltCard
                key={del.badge}
                className="p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[#08080C]/90 border border-white/[0.08] hover:border-white/[0.18] transition-colors flex flex-col justify-between group shadow-xl"
                maxTilt={2}
                glareOpacity={0.06}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{del.icon}</span>
                    <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${del.badgeColor}`}>
                      {del.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white mb-1.5">
                    {del.title}
                  </h3>

                  <div className="text-xs font-mono text-zinc-400 mb-3">
                    {del.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal mb-5">
                    {del.desc}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-zinc-400 font-mono text-[11px]">Real Outcome:</span>
                  <span className="text-emerald-300 font-semibold">{del.outcome}</span>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Pricing Floor & Direct Sprint Callout */}
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#0C0D16] to-[#0A0A10] border border-[#DFCA9F]/25 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#DFCA9F]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>TRANSPARENT PRICING FLOOR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Focused 30-Day Sprints starting from ₹50,000.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl leading-relaxed">
                No open-ended hourly billing or surprise invoices. We isolate your core workflow, agree on a fixed deliverable scope, and ship in 30 days.
              </p>
            </div>

            <button
              onClick={scrollToContact}
              className="btn-primary py-3.5 px-8 text-xs sm:text-sm font-bold uppercase tracking-wider shrink-0 w-full md:w-auto flex items-center justify-center gap-2"
            >
              <span>Discuss Your Scope</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
