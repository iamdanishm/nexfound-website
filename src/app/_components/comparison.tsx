"use client";

const COMPARISONS = [
  {
    category: "Team & Communication",
    traditional: "Junior developers & overseas contractors passed down through account managers.",
    nexfound: "Direct collaboration with senior full-stack developers and product builders.",
  },
  {
    category: "Timeline & Speed",
    traditional: "Bloated 6-to-9 month waterfall cycles designed to maximize billable hours.",
    nexfound: "3-to-4 week rapid build sprints with weekly working updates and demos.",
  },
  {
    category: "Code Quality",
    traditional: "Hacked-together code that breaks under real traffic and requires a full rewrite.",
    nexfound: "Clean, modern, scale-ready code built to handle real traffic without breaking.",
  },
  {
    category: "Pricing & Scope",
    traditional: "Unpredictable hourly billing with surprise overages and scope creep.",
    nexfound: "Fixed, transparent milestone-based deliverables tied directly to your goals.",
  },
  {
    category: "Post-Launch Support",
    traditional: "Disappears after the final invoice; no documentation or handover help.",
    nexfound: "Dedicated launch support, automated deployment setups, and clean documentation.",
  },
];

export default function Comparison() {
  return (
    <section className="relative py-14 sm:py-18 overflow-hidden bg-[#030305]">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="luxury-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
                Why Work With Us
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>Why Ambitious Founders </span>
              <span className="text-gold-foil block sm:inline">Choose Us.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed">
              Most digital agencies are structured to bill endless hours. We focus on shipping your product fast with zero headache.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="glass-obsidian rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 bg-white/[0.02] border-b border-white/[0.08] gap-4 items-center">
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-[#9E9EB0] uppercase">
                CRITERIA
              </div>
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-red-400/80 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                TRADITIONAL AGENCIES
              </div>
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-[#DFCA9F] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-pulse" />
                NEXFOUND
              </div>
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-white/[0.06]">
              {COMPARISONS.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-4 items-start hover:bg-white/[0.02] transition-colors"
                >
                  <div className="md:col-span-4">
                    <span className="text-sm sm:text-base font-display font-bold text-white">
                      {row.category}
                    </span>
                  </div>

                  <div className="md:col-span-4 text-xs sm:text-sm text-[#9E9EB0] leading-relaxed flex items-start gap-2.5">
                    <span className="text-red-400 font-bold text-sm shrink-0">✕</span>
                    <span>{row.traditional}</span>
                  </div>

                  <div className="md:col-span-4 text-xs sm:text-sm text-[#F7ECD5] font-medium leading-relaxed flex items-start gap-2.5 bg-[#DFCA9F]/[0.03] p-3 rounded-xl border border-[#DFCA9F]/10">
                    <span className="text-[#DFCA9F] font-bold text-sm shrink-0">✓</span>
                    <span>{row.nexfound}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
