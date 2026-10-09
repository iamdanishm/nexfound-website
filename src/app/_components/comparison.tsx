"use client";

export default function Comparison() {
  const pillars = [
    {
      badge: "VELOCITY",
      title: "30 Days, Hard Launch",
      desc: "Traditional agencies drag projects into 6-month retainer cycles. We focus exclusively on your primary revenue flow and launch on Day 30.",
      metric: "4 Weeks vs 6+ Months",
    },
    {
      badge: "PREDICTABILITY",
      title: "Fixed Sprint Pricing",
      desc: "No hourly billing games or surprise invoices. Your fee is locked before we begin, and we never bill for out-of-scope revisions without agreement.",
      metric: "Zero Scope Creep",
    },
    {
      badge: "AUTONOMY",
      title: "100% Direct Git Transfer",
      desc: "You own everything we build. On Day 30, we hand over full GitHub repository access, database credentials, and cloud hosting under your own name.",
      metric: "Zero Lock-In",
    },
  ];

  // Fast, layout-thrash-free mouse spotlight handler
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.nativeEvent.offsetX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.nativeEvent.offsetY}px`);
  };

  return (
    <section id="approach" className="relative py-20 sm:py-28 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,202,159,0.06)_0%,rgba(223,202,159,0.01)_50%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
                The Nexfound Difference
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white mb-4">
              Built for speed.{" "}
              <span className="text-gold-gradient block sm:inline">Engineered for ownership.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              We eliminated the agency fluff and freelancer unreliability so you can test your idea in market fast.
            </p>
          </div>

          {/* 3 Value Pillars with Mouse Spotlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                onMouseMove={handleSpotlight}
                className="spotlight-card p-7 rounded-2xl bg-[#090A0E] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#DFCA9F] uppercase font-bold group-hover:border-[#DFCA9F]/30 transition-colors">
                      {pillar.badge}
                    </span>
                    <span className="text-xs font-mono text-[#DFCA9F] font-semibold">
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-[#F5ECDA] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-zinc-300">
                  <span className="text-[#DFCA9F] font-bold">✓</span>
                  <span>Guaranteed in every sprint</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
