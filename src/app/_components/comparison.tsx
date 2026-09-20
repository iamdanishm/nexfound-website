"use client";

const COMPARISONS = [
  {
    category: "Scoping & Focus",
    traditional: "Unchecked feature creep, bloated scope, and guessing what users want before testing the core hypothesis.",
    nexfound: "Ruthlessly isolated to the smallest useful MVP that proves the idea with real users and minimal risk.",
  },
  {
    category: "Platform Strategy",
    traditional: "Defaulting to building web and mobile simultaneously, doubling costs and complexity before validation.",
    nexfound: "Staged selection: recommend and build the single platform that proves the product fastest, then expand.",
  },
  {
    category: "Backend & Data Integrity",
    traditional: "Fragile client-only code, unindexed databases, hardcoded credentials, and broken authentication.",
    nexfound: "Production-ready backend architecture, structured schemas, secure auth, and reliable third-party integrations.",
  },
  {
    category: "Code Reliability & Longevity",
    traditional: "Patchwork AI code generation that demo well but break under edge cases, concurrency, and real traffic.",
    nexfound: "Clean, maintainable, tested architecture designed to be built upon rather than rewritten after launch.",
  },
  {
    category: "Execution & Accountability",
    traditional: "Endless unpaid evenings stuck debugging cryptic tool errors with no guarantee of a usable release.",
    nexfound: "A responsible technical partner taking ownership from agreed scope to live, usable production deployment.",
  },
];

export default function Comparison() {
  return (
    <section id="approach" className="relative py-14 sm:py-20 overflow-hidden bg-transparent">
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
          <div className="text-center mb-10 sm:mb-14">
            <div className="luxury-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
                The Practical Comparison
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>DIY Prototyping vs. </span>
              <span className="text-gold-foil block sm:inline">An Accountable Partner.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-3xl mx-auto leading-relaxed">
              AI tools make it easy to generate toy demos. But reaching a secure, reliable first release requires product judgment, backend architecture, and a partner accountable for the outcome.
            </p>
          </div>

          {/* Comparison Matrix Table */}
          <div className="glass-obsidian rounded-3xl overflow-hidden border border-white/[0.1] shadow-2xl">
            {/* Table Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 bg-white/[0.02] border-b border-white/[0.08] gap-4 items-center">
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-[#9E9EB0] uppercase">
                KEY FACTOR
              </div>
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-red-400/80 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500/60" />
                DIY & AI EXPERIMENTATION
              </div>
              <div className="md:col-span-4 text-xs font-mono font-bold tracking-widest text-[#DFCA9F] uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-pulse" />
                THE NEXFOUND PARTNER
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

                  <div className="md:col-span-4 text-xs sm:text-sm text-[#F7ECD5] font-medium leading-relaxed flex items-start gap-2.5 bg-[#DFCA9F]/[0.03] p-3.5 rounded-xl border border-[#DFCA9F]/10">
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
