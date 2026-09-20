const STAGES = [
  {
    num: "01",
    title: "Analyze Core Workflow",
    desc: "We look at where your ideal users actually perform their work—desktop browser or mobile device on the go.",
  },
  {
    num: "02",
    title: "Select Fastest Platform",
    desc: "We pick the single platform that validates the core value proposition with the least build time and overhead.",
  },
  {
    num: "03",
    title: "Launch First Version",
    desc: "Build, harden, and deploy the focused first release without managing two separate app lifecycles at once.",
  },
  {
    num: "04",
    title: "Learn From Live Usage",
    desc: "Observe real user retention, bottlenecks, and conversions instead of guessing what users want.",
  },
  {
    num: "05",
    title: "Expand With Evidence",
    desc: "Add the second platform only when customer demand, usage patterns, and unit economics justify the investment.",
  },
];

export default function PlatformStrategy() {
  return (
    <section id="platform-strategy" className="relative py-16 sm:py-24 overflow-hidden bg-transparent">
      {/* Background Radial Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-15 pointer-events-none blur-[140px]"
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
              <span className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
                Platform Decision Framework
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>Why We Don&apos;t Recommend </span>
              <span className="text-gold-foil block sm:inline">Both Platforms at Once.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-3xl mx-auto leading-relaxed">
              Defaulting to building web and mobile simultaneously on day one doubles your cost, doubles your timeline, and doubles your bug surface before validating if anyone wants the product.
            </p>
          </div>

          {/* Staged Stepper Flow */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-12">
            {STAGES.map((s, idx) => (
              <div
                key={s.num}
                className="glass-obsidian p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between group hover:border-[#DFCA9F]/30 transition-colors"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-[#DFCA9F] mb-3">
                    STAGE {s.num}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 font-display">
                    {s.title}
                  </h4>
                  <p className="text-xs text-[#9E9EB0] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {idx < 4 && (
                  <div className="hidden md:flex justify-end pt-3 text-white/20 group-hover:text-[#DFCA9F]/60 transition-colors">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Platform Criteria Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Web First */}
            <div className="glass-obsidian p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 flex items-center justify-center text-[#DFCA9F]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono text-[#DFCA9F] uppercase tracking-wider font-semibold">Validation Path A</span>
                  <h3 className="text-xl font-bold font-display text-white">When Web is First</h3>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#9E9EB0]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>B2B portals, admin consoles, and complex desktop dashboards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Fast iteration cycles with zero App Store review delays or 30% fees.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Customer acquisition relies heavily on SEO, public URLs, or direct links.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Cheapest and quickest way to test core customer willingness to pay.</span>
                </li>
              </ul>
            </div>

            {/* Mobile First */}
            <div className="glass-obsidian p-6 sm:p-8 rounded-3xl border border-white/[0.08] relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 flex items-center justify-center text-[#DFCA9F]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono text-[#DFCA9F] uppercase tracking-wider font-semibold">Validation Path B</span>
                  <h3 className="text-xl font-bold font-display text-white">When Mobile is First</h3>
                </div>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-[#9E9EB0]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Product relies critically on native camera, GPS, Bluetooth, or sensors.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Frequent on-the-go usage with high dependency on push notifications.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Offline-first capabilities or field operations where desktop is absent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Mobile-native consumer habits where web friction kills retention.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Building Callout */}
          <div className="mt-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
            <p className="text-xs sm:text-sm text-[#A2A2B0]">
              <span className="text-white font-semibold">Note:</span> Both platforms can be built simultaneously if you have a clear requirement, justified budget, and established scope. Staging is a risk-reduction practice to protect your capital, not a limitation of our capability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
