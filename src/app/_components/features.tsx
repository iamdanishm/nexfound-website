"use client";

interface DeliverableItem {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  desc: string;
  outcome: string;
  specs: string[];
}

const DELIVERABLES: DeliverableItem[] = [
  {
    id: "domain",
    badge: "DELIVERABLE 01",
    badgeColor: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
    title: "Production App on Your Custom Domain",
    subtitle: "High-speed edge routing across mobile and desktop",
    desc: "A polished, ultra-responsive web application live on your custom domain. Sub-second initial load, SEO meta-tags pre-configured, and native-grade responsiveness on iPhone and Android.",
    outcome: "Immediate professional credibility with your first 100 paying customers.",
    specs: ["Next.js 15 App Router", "Sub-800ms Global CDN", "Custom SSL Certificate"],
  },
  {
    id: "payments",
    badge: "DELIVERABLE 02",
    badgeColor: "bg-[#DFCA9F]/10 border-[#DFCA9F]/30 text-[#DFCA9F]",
    title: "Live Customer Checkout & Payment Rails",
    subtitle: "UPI, Cards, Apple Pay, & Automated Invoicing",
    desc: "Frictionless checkout connected directly to your Stripe or Razorpay merchant account. Webhooks cryptographically verified with automatic customer access unlocking and PDF invoices.",
    outcome: "Start collecting real revenue into your bank account on Day 30.",
    specs: ["Stripe / Razorpay Rails", "Instant Bank Settlement", "Automated Webhooks"],
  },
  {
    id: "admin",
    badge: "DELIVERABLE 03",
    badgeColor: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
    title: "Founder Operations Control Center",
    subtitle: "Manage users, transactions, and data without code",
    desc: "A clean, high-utility administration dashboard where you can inspect new signups, monitor live revenue, manage active customer accounts, and export CSV reports in one click.",
    outcome: "You run the business independently without having to ping an engineer.",
    specs: ["User Management", "Transaction Auditing", "1-Click CSV Exports"],
  },
  {
    id: "ip-transfer",
    badge: "DELIVERABLE 04",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    title: "100% Code & Cloud Intellectual Property",
    subtitle: "Direct GitHub transfer with zero hostage fees",
    desc: "Every single line of TypeScript, database migration, and cloud configuration is transferred directly to your organization. Complete freedom with zero ongoing retainers.",
    outcome: "True ownership. You control your company's technology forever.",
    specs: ["GitHub Org Transfer", "Vercel / AWS Access", "14-Day Post-Launch Warranty"],
  },
];

export default function Features() {
  const scrollToPricing = () => {
    const el = document.querySelector("#pricing");
    if (el) {
      const offset = 85;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden bg-transparent scroll-mt-24">
      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="studio-badge mb-3.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Zero Tech Jargon · 100% Tangible Deliverables</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-white mb-4">
              What do you actually get when we{" "}
              <span className="text-gold-gradient block sm:inline">hand you the keys?</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
              No developer hand-waving or vague hourly timesheets. Everything required to sign up users,
              process payments, and scale on Day 30.
            </p>
          </div>

          {/* 4 Deliverables Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7 mb-12">
            {DELIVERABLES.map((del) => (
              <div
                key={del.id}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl studio-panel flex flex-col justify-between group border border-white/[0.08] hover:border-white/[0.18] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-tag text-[10px] text-zinc-500">
                      SYSTEM COMPONENT
                    </span>
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${del.badgeColor}`}
                    >
                      {del.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-1.5 group-hover:text-zinc-100 transition-colors">
                    {del.title}
                  </h3>

                  <div className="text-xs font-mono text-[#DFCA9F] mb-4">
                    {del.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 font-normal">
                    {del.desc}
                  </p>

                  {/* Specs chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {del.specs.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/50 border border-white/[0.08] text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcome Footer */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-300 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span className="font-medium">{del.outcome}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="p-6 rounded-2xl studio-panel border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="text-sm font-display font-bold text-white">
                Ready to review sprint deliverables and pricing?
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">
                Design Sprints from ₹49,000 · Full Production MVP from ₹1,49,000*.
              </div>
            </div>
            <button
              onClick={scrollToPricing}
              className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider font-mono font-bold cursor-pointer whitespace-nowrap"
            >
              View Sprint Pricing Tiers →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
