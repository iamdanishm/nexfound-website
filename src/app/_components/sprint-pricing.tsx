"use client";

import { useState } from "react";
import ScrollReveal from "./scroll-reveal";

export type SprintTierKey = "tier1" | "tier2" | "tier3";

interface SprintTierData {
  id: SprintTierKey;
  name: string;
  badge?: string;
  isPopular?: boolean;
  duration: string;
  price: string;
  slashedPrice: string;
  discount: string;
  summary: string;
  features: string[];
  ctaText: string;
}

const TIERS: Record<SprintTierKey, SprintTierData> = {
  tier1: {
    id: "tier1",
    name: "Design Sprint",
    duration: "7–10 Days",
    price: "₹49,000",
    slashedPrice: "₹75,000",
    discount: "35% OFF",
    summary: "Clickable Figma prototype & architecture spec to validate customer willingness-to-pay before code.",
    features: [
      "Clickable interactive prototype",
      "Database schema & API architecture",
      "Fixed-price scope for full build",
      "100% credited toward MVP build",
    ],
    ctaText: "Book Design Sprint",
  },
  tier2: {
    id: "tier2",
    name: "30-Day MVP",
    badge: "RECOMMENDED",
    isPopular: true,
    duration: "30-Day Sprint",
    price: "₹1,49,000*",
    slashedPrice: "₹2,25,000",
    discount: "SAVE ₹76k",
    summary: "Our flagship production build. Live Web or Mobile application on your domain, taking real customer payments.",
    features: [
      "1 Core revenue workflow (Web / Mobile)",
      "Live Stripe or Razorpay payment rails",
      "PostgreSQL DB with Auth & Row-Level Security",
      "100% Direct GitHub repo & IP transfer",
    ],
    ctaText: "Start 30-Day Sprint",
  },
  tier3: {
    id: "tier3",
    name: "Scale & Ecosystem",
    duration: "45-Day Sprint",
    price: "₹3,49,000",
    slashedPrice: "₹4,50,000",
    discount: "22% OFF",
    summary: "For startups requiring synchronized Web + Mobile apps with custom AI pipelines or hardware links.",
    features: [
      "Synchronized Web + iOS & Android apps",
      "Custom AI / LLM pipeline or WebSockets",
      "Multi-role RBAC & founder admin panel",
      "60-Day launch support & priority SLA",
    ],
    ctaText: "Book Scale Sprint",
  },
};

export default function SprintPricing() {
  const [selectedTier, setSelectedTier] = useState<SprintTierKey>("tier2");

  // Fast, layout-thrash-free mouse spotlight handler
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.nativeEvent.offsetX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.nativeEvent.offsetY}px`);
  };

  const scrollToContact = (tierName: string) => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 85;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });

      const ideaInput = document.querySelector<HTMLTextAreaElement>("textarea[name='idea']");
      if (ideaInput && !ideaInput.value) {
        ideaInput.value = `Interested in ${tierName}. Here is what I am planning to build: `;
      }
    }
  };

  return (
    <section
      id="pricing"
      className="relative py-16 sm:py-20 overflow-hidden bg-transparent scroll-mt-24"
    >
      {/* Ambient background depth */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(223,202,159,0.06)_0%,transparent_70%)] blur-[80px] pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <ScrollReveal variant="fade-lift">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
                  Transparent Fixed Pricing
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="clip" as="h2" className="mb-2.5">
              <span className="text-2xl sm:text-4xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white">
                Pick your sprint.{" "}
              </span>
              <span className="text-2xl sm:text-4xl font-display font-bold tracking-normal [word-spacing:0.24em] text-gold-gradient block sm:inline">
                Launch on Day 30.
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-lift" delay={120}>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
                Fixed fees agreed upfront. Zero open-ended hourly billing. 100% direct Git ownership on delivery.
              </p>
            </ScrollReveal>
          </div>

          {/* Compact Informative Pricing Grid with Spotlight Illumination & Staggered Reveal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
            {(Object.keys(TIERS) as SprintTierKey[]).map((key, idx) => {
              const tier = TIERS[key];
              const isFlagship = tier.isPopular;
              const isSelected = selectedTier === key;

              return (
                <ScrollReveal key={tier.id} variant="fade-lift" delay={100 + idx * 110}>
                  <div
                    onClick={() => setSelectedTier(key)}
                    onMouseMove={handleSpotlight}
                    className={`spotlight-card h-full rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 tab-spring cursor-pointer ${
                      isFlagship
                        ? "bg-[#0E0F16] border border-[#DFCA9F]/45 shadow-[0_15px_45px_rgba(223,202,159,0.12)] relative"
                        : "bg-[#090A0E] border border-white/[0.08] hover:border-white/[0.2]"
                    } ${isSelected && !isFlagship ? "border-white/30" : ""}`}
                  >
                    <div>
                      {/* Top Row: Title + Badge/Duration */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-display font-bold text-white whitespace-nowrap">
                            {tier.name}
                          </h3>
                          {tier.badge && (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#DFCA9F]/15 text-[#DFCA9F] font-bold border border-[#DFCA9F]/30 uppercase tracking-wider whitespace-nowrap">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-mono text-zinc-400 shrink-0">
                          {tier.duration}
                        </span>
                      </div>

                      {/* Summary One-Liner */}
                      <p className="text-xs text-zinc-400 leading-relaxed mb-4 min-h-[36px]">
                        {tier.summary}
                      </p>

                      {/* Responsive Price Block */}
                      <div className="py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4 group-hover:border-white/10 transition-colors">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                            {tier.price}
                          </span>
                          <span className="text-[10px] font-mono text-[#DFCA9F] font-semibold px-2 py-0.5 rounded bg-[#DFCA9F]/10 border border-[#DFCA9F]/25 whitespace-nowrap shrink-0">
                            {tier.discount}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 text-xs font-mono text-zinc-500">
                          <span className="line-through">{tier.slashedPrice}</span>
                          <span>·</span>
                          <span>Fixed sprint fee</span>
                        </div>
                      </div>

                      {/* 4 Crisp Informative Features */}
                      <div className="space-y-2 mb-5">
                        {tier.features.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-zinc-300 leading-snug"
                          >
                            <span className="text-[#DFCA9F] font-bold text-xs shrink-0 mt-0.5">
                              ✓
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Compact CTA Button with Tactile Spring */}
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToContact(tier.name);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer btn-spring ${
                          isFlagship
                            ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-md shadow-[#DFCA9F]/20 hover:shadow-lg hover:shadow-[#DFCA9F]/35"
                            : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                        }`}
                      >
                        <span>{tier.ctaText}</span>
                        <span>→</span>
                      </button>
                      <div className="text-center mt-2 text-[10px] font-mono text-zinc-500">
                        {isFlagship ? "14-Day Warranty Included" : "Direct Git Handover"}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
