"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./tilt-card";

export default function PlatformStrategy() {
  const [selectedRoute, setSelectedRoute] = useState<"web" | "mobile">("web");

  return (
    <section id="platform-strategy" className="relative py-14 sm:py-20 overflow-hidden bg-transparent scroll-mt-24">
      {/* Ambient Warm Champagne Glow */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[350px] rounded-full opacity-10 pointer-events-none blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.25) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="studio-badge mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F] animate-pulse" />
              <span>Smart Launch Strategy</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2.5 font-display">
              <span>What if you cut </span>
              <span className="text-gold-gradient block sm:inline">80% of the noise?</span>
            </h2>

            <p className="text-xs sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Defaulting to web and mobile simultaneously on day one doubles your cost, doubles your timeline, and drains your budget. We help you pick the ONE platform that proves customer demand fastest.
            </p>
          </div>

          {/* Platform Route Selector Pills */}
          <div className="flex justify-center mb-8">
            <div className="p-1 rounded-xl bg-[#0A0A10] border border-white/[0.08] backdrop-blur-md flex items-center gap-1 relative">
              <button
                onClick={() => setSelectedRoute("web")}
                className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 flex items-center gap-2 ${
                  selectedRoute === "web" ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {selectedRoute === "web" && (
                  <motion.div
                    layoutId="platformRouteTabPill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_4px_15px_rgba(223,202,159,0.35)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>🌐</span>
                  <span>Option A: Web First</span>
                </span>
              </button>

              <button
                onClick={() => setSelectedRoute("mobile")}
                className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors duration-200 z-10 flex items-center gap-2 ${
                  selectedRoute === "mobile" ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                {selectedRoute === "mobile" && (
                  <motion.div
                    layoutId="platformRouteTabPill"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_4px_15px_rgba(223,202,159,0.35)]"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <span>📱</span>
                  <span>Option B: Mobile Native</span>
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Decision Blueprint Card */}
          <TiltCard
            className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-[#08080C]/90 border border-white/[0.1] shadow-2xl mb-8"
            maxTilt={2}
          >
            <AnimatePresence mode="wait">
              {selectedRoute === "web" ? (
                <motion.div
                  key="web-route"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
                >
                  <div className="md:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFCA9F]/10 border border-[#DFCA9F]/25 text-[#DFCA9F] text-[11px] font-mono font-semibold">
                      <span>Best For: Fast Link Sharing, Portals &amp; Direct Sales</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      Validate Customer Demand in 30 Days on the Web
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      Zero app download friction, instant customer link sharing on WhatsApp, and zero 30% App Store cuts. Best for booking tools, marketplaces, and SaaS platforms where users discover you via links, ads, or search.
                    </p>
                    <div className="space-y-2.5 pt-1 text-xs text-zinc-200">
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Zero App Store barriers: Customers tap your link and start using it immediately</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Update instantly: Change pricing, copy, or features in seconds with no review delays</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>Keep 100% of revenue: Direct UPI and card payments deposited straight into your bank</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-5 rounded-2xl bg-[#0B0B14] border border-white/[0.08] space-y-3 font-mono text-xs">
                    <div className="text-[10px] uppercase text-[#DFCA9F] font-semibold border-b border-white/[0.06] pb-2 flex items-center justify-between">
                      <span>Web Launch Blueprint</span>
                      <span className="text-emerald-400 font-bold">FASTEST ROUTE</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>App Store Download Friction:</span>
                      <span className="text-emerald-400 font-bold">0% (Instant Link)</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Deployment Updates:</span>
                      <span className="text-emerald-400 font-bold">Live in Seconds</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Platform Commission Fees:</span>
                      <span className="text-emerald-400 font-bold">0% (Keep All Revenue)</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Time to Live Launch:</span>
                      <span className="text-[#DFCA9F] font-bold">30 Days</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mobile-route"
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
                >
                  <div className="md:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[11px] font-mono font-semibold">
                      <span>Best For: Daily Habits, Hardware &amp; Push Alerts</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      Permanent Home-Screen Habit &amp; Direct Phone Hardware
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      Essential when your product requires Bluetooth connection to hardware (like EV Dock), continuous GPS tracking, push notifications, or offline-first operation on the road.
                    </p>
                    <div className="space-y-2.5 pt-1 text-xs text-zinc-200">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>Home screen real estate: Lives in their pocket for daily recurring habits</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>Free retention: Send instant push alerts directly to their notifications</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>Hardware pairing: Seamless offline Bluetooth, camera scanning, and location services</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-5 rounded-2xl bg-[#0B0B14] border border-white/[0.08] space-y-3 font-mono text-xs">
                    <div className="text-[10px] uppercase text-cyan-400 font-semibold border-b border-white/[0.06] pb-2 flex items-center justify-between">
                      <span>Mobile Launch Blueprint</span>
                      <span className="text-cyan-400 font-bold">HIGH RETENTION</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Hardware Integration:</span>
                      <span className="text-cyan-400 font-bold">Bluetooth / GPS / Camera</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Offline Capability:</span>
                      <span className="text-emerald-400 font-bold">Works Without Internet</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Customer Retention:</span>
                      <span className="text-emerald-400 font-bold">Instant Push Alerts</span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Time to Live Launch:</span>
                      <span className="text-cyan-400 font-bold">30 Days</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TiltCard>

          {/* Pragmatic Founder Rule */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#08080E] border border-white/[0.08] p-5 sm:p-7">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-[#DFCA9F]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
                  <span>FOUNDER GOLDEN RULE</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold font-display text-white">
                  Pick one first. Expand when customers are already paying.
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-2xl">
                  We build your product so that when demand justifies launching on the second platform, all your customer data, accounts, and payments plug right in. Zero wasted code.
                </p>
              </div>

              <div className="shrink-0">
                <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.1] text-xs font-mono text-zinc-300">
                  <span className="text-emerald-400 font-bold">Zero</span> Throwaway Work
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
