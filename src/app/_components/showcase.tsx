"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CLIENT_PROJECTS = [
  {
    id: "dalalfree",
    clientLabel: "PRODUCTION PLATFORM",
    platformType: "Full-Stack Web Application",
    title: "DalalFree",
    tagline: "Direct Buyer-to-Seller Real Estate Platform",
    summary:
      "A complete property marketplace engineered to eliminate broker commission fees. Includes verified owner listings, real-time messaging, fast property search, and instant checkout workflows.",
    image: "/images/dalalfree_real_platform.jpg",
    imageAlt: "DalalFree Real Estate Web Platform",
    pills: [
      { label: "Platform", val: "Web First" },
      { label: "Core Feature", val: "Direct Owner Chat & Listings" },
      { label: "Business Model", val: "Zero Brokerage Direct" },
    ],
    verifiedOutcome: "Live in production with verified direct transactions.",
    badgeColor: "bg-[#DFCA9F]/10 border-[#DFCA9F]/30 text-[#DFCA9F]",
  },
  {
    id: "evdock",
    clientLabel: "MOBILE ENGINEERING",
    platformType: "Native Mobile Application",
    title: "EV Dock",
    tagline: "Smart EV Charging Mobile Application",
    summary:
      "Hardware-connected mobile app for electric vehicle charging stations. Built with custom Bluetooth communication so drivers can reserve slots and unlock chargers even in deep underground parking with zero cell reception.",
    image: "/images/ev-dock-showcase.jpg",
    imageAlt: "EV Dock Mobile Charging IoT System",
    pills: [
      { label: "Platform", val: "Native iOS & Android" },
      { label: "Core Feature", val: "1-Tap Offline Charger Unlock" },
      { label: "Hardware Link", val: "Bluetooth Low Energy" },
    ],
    verifiedOutcome: "Flawless offline charger unlock across underground parking basements.",
    badgeColor: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
];

export default function Showcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CLIENT_PROJECTS[activeIdx];

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative py-16 sm:py-24 overflow-hidden bg-transparent scroll-mt-24">
      {/* Warm Champagne & Emerald Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-15 pointer-events-none blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(223, 202, 159, 0.18) 0%, rgba(16, 185, 129, 0.1) 45%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="studio-badge mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F] animate-pulse" />
              <span>Verified Production Proof</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2.5 font-display">
              <span>How much does it cost, and </span>
              <span className="text-gold-gradient block sm:inline">who built this?</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
              No surprise invoices or vague hourly rates. Every project is a fixed 30-day sprint starting at ₹50,000, engineered directly with Danish.
            </p>

            {/* Project Selector */}
            <div className="flex justify-center mt-6">
              <div className="p-1 rounded-xl bg-[#0A0A10] border border-white/[0.08] backdrop-blur-md flex items-center gap-1 relative">
                {CLIENT_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => setActiveIdx(idx)}
                    className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 flex items-center gap-2 ${
                      activeIdx === idx ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {activeIdx === idx && (
                      <motion.div
                        layoutId="clientWorkTabPill"
                        className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_4px_15px_rgba(223,202,159,0.35)]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      <span>{proj.id === "dalalfree" ? "🌐" : "📱"}</span>
                      <span>{proj.title}</span>
                      <span
                        className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          activeIdx === idx
                            ? "bg-black/15 text-zinc-900 font-bold"
                            : "bg-white/[0.06] text-zinc-400"
                        }`}
                      >
                        Proof
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN SHOWCASE FRAME */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl sm:rounded-3xl bg-[#08080E]/95 border border-white/[0.1] p-5 sm:p-8 lg:p-10 shadow-2xl overflow-hidden mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left Column: Project Brief */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider border ${active.badgeColor}`}>
                      {active.clientLabel}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {active.platformType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white mb-1">
                      {active.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#DFCA9F]">
                      {active.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {active.summary}
                  </p>

                  {/* Fact Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {active.pills.map((pill, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs"
                      >
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          {pill.label}
                        </div>
                        <div className="font-semibold text-white mt-0.5 text-xs truncate">
                          {pill.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verified Result Banner */}
                  <div className="p-3 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    <span>{active.verifiedOutcome}</span>
                  </div>
                </div>

                {/* Right Column: Visual Mockup */}
                <div className="lg:col-span-7">
                  {active.id === "dalalfree" ? (
                    <div className="w-full rounded-2xl bg-[#0B0B14] border border-white/[0.12] overflow-hidden shadow-2xl group">
                      {/* Browser Header Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E18] border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                          <span className="text-[11px] font-mono text-zinc-400 ml-2">
                            dalalfree.com
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#DFCA9F]/15 text-[#DFCA9F] font-bold border border-[#DFCA9F]/20">
                          LIVE IN PRODUCTION
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black">
                        <Image
                          src={active.image}
                          alt={active.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-700"
                          priority
                        />
                        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/40 to-transparent" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full rounded-2xl bg-[#0B0B14] border border-white/[0.12] overflow-hidden shadow-2xl group">
                      {/* Mobile Header Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E18] border-b border-white/[0.08]">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-[10px] font-mono text-cyan-300 font-bold">
                            EV DOCK MOBILE APPLICATION
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/20">
                          HARDWARE PAIRED
                        </span>
                      </div>

                      {/* Image Preview */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black">
                        <Image
                          src={active.image}
                          alt={active.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover group-hover:scale-103 transition-transform duration-700"
                          priority
                        />
                        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/60 to-transparent" />

                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                          <div className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                            <span className="text-cyan-400 font-bold">Offline Bluetooth:</span>
                            <span>Basement Signal</span>
                          </div>
                          <div className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5">
                            <span>✓ Zero Connection Drops</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pricing Floor & Direct Sprint Callout */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#08080C] border border-white/[0.08] p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="text-xs font-mono text-[#DFCA9F] uppercase tracking-wider font-semibold">
                Transparent Pricing Floor
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                Single-platform MVPs start from ₹50,000 for a 30-day launch.
              </h4>
              <p className="text-xs text-zinc-400">
                You receive a fixed price and milestone schedule before we begin. No open-ended invoices.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="btn-primary py-3 px-6 text-xs font-bold uppercase tracking-wider shrink-0 w-full sm:w-auto"
            >
              Discuss Your Idea
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
