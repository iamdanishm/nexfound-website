"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./tilt-card";

const TABS = [
  { id: "notes", label: "01 · Raw Idea Note", icon: "📝", subtitle: "Sitting in notes for months" },
  { id: "cut", label: "02 · The Ruthless Cut", icon: "✂️", subtitle: "Strip 80% useless bloat" },
  { id: "live", label: "03 · Live App & Sales", icon: "💳", subtitle: "Real customers paying on Day 30" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Hero() {
  const [activeTab, setActiveTab] = useState<TabId>("notes");
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 6-second auto-cycle with smooth progress bar
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 60; // 60ms tick
    const totalCycle = 6000; // 6 seconds per stage
    const step = (intervalTime / totalCycle) * 100;

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((current) => {
            const nextIdx = (TABS.findIndex((t) => t.id === current) + 1) % TABS.length;
            return TABS[nextIdx].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, activeTab]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
    setProgress(0);
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const offset = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 overflow-hidden bg-transparent"
    >
      {/* Luminous Ambient Glow (Warm Champagne & Subtle Indigo) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1100px] h-[400px] sm:h-[600px] rounded-full opacity-20 pointer-events-none blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.22) 0%, rgba(99, 102, 241, 0.14) 40%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 w-full px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Empathetic Studio Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md mb-6 sm:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-zinc-300 uppercase">
              From Napkin Note to First Customer · 30-Day Sprint
            </span>
          </motion.div>

          {/* Master Opening Question */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.12] mb-5 sm:mb-6 max-w-4xl"
          >
            <span>Still letting your app idea collect dust in your </span>
            <span className="text-gold-gradient inline-block">notes app?</span>
          </motion.h1>

          {/* Direct Empathetic Problem & Solution Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed mb-8 sm:mb-10 font-normal px-2"
          >
            Agencies quote 6 months and ₹15L. Freelancers vanish halfway through. Building alone feels overwhelming. Nexfound turns your raw concept into a live, payment-ready app in 30 days—starting at ₹50,000.
          </motion.p>

          {/* High-Contrast Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center mb-12 sm:mb-16 px-4"
          >
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-primary w-full sm:w-auto text-xs sm:text-sm py-4 px-8 font-semibold tracking-wider uppercase flex items-center justify-center gap-2 group"
            >
              <span>Discuss Your Idea (Takes 60s)</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <button
              onClick={() => scrollToSection("#comparison")}
              className="btn-secondary w-full sm:w-auto text-xs sm:text-sm py-4 px-8 font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>See The 30-Day Blueprint</span>
              <span className="text-zinc-400">↓</span>
            </button>
          </motion.div>

          {/* Founder-First Real Value Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mb-12 px-2"
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md text-center hover:border-white/[0.15] transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-white">30 Days</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Idea to Live Launch</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md text-center hover:border-white/[0.15] transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-emerald-400">From ₹50k</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Clear Starting Scope Floor</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md text-center hover:border-white/[0.15] transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-white">100% Yours</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Code &amp; Cloud Ownership</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md text-center hover:border-white/[0.15] transition-colors">
              <div className="text-xl sm:text-2xl font-bold font-display text-white">1 Platform First</div>
              <div className="text-xs text-zinc-400 mt-1 font-medium">Web or Mobile to Prove It Fast</div>
            </div>
          </motion.div>

          {/* FLAGSHIP SHOWCASE: 3-Stage Idea-to-Cash Transformation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-5xl px-2 sm:px-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <TiltCard
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#07070B] border border-white/[0.12] shadow-[0_30px_100px_rgba(0,0,0,0.95),0_0_60px_rgba(223,202,159,0.12)] text-left"
              maxTilt={1.5}
              glareOpacity={0.06}
            >
              {/* Studio Window Bar & Automated Tabs */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 py-3.5 bg-[#0A0A12] border-b border-white/[0.08] gap-3 sm:gap-0">
                {/* Traffic lights + Progress status */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-zinc-400 font-medium">
                      Stage:
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#DFCA9F]/10 border border-[#DFCA9F]/30 text-[#DFCA9F]">
                      {activeTab === "notes" && "01 · Raw Problem in Notes"}
                      {activeTab === "cut" && "02 · The 80% Bloat Cut"}
                      {activeTab === "live" && "03 · Live App & Paying Customers"}
                    </span>
                  </div>
                </div>

                {/* Tab Switcher with Progress Fill */}
                <div className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={`relative px-3 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 overflow-hidden whitespace-nowrap ${
                          isActive
                            ? "text-black font-semibold bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_2px_12px_rgba(223,202,159,0.35)]"
                            : "text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.05]"
                        }`}
                      >
                        {/* Dynamic progress line on active tab */}
                        {isActive && !isPaused && (
                          <div
                            className="absolute bottom-0 left-0 h-[2.5px] bg-black/40 transition-all duration-75"
                            style={{ width: `${progress}%` }}
                          />
                        )}
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Showcase Stage Canvas */}
              <div className="p-4 sm:p-8 bg-gradient-to-b from-[#08080E] to-[#040407] min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {/* STAGE 1: THE RAW FOUNDER IDEA NOTE */}
                  {activeTab === "notes" && (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-3xl rounded-2xl bg-[#14141E]/95 border border-white/[0.1] p-5 sm:p-7 shadow-2xl relative"
                    >
                      {/* Apple Notes Style Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400 text-sm">📁</span>
                          <span className="text-xs font-mono text-zinc-400">Notes &gt; Startup Ideas &gt; 2:14 AM</span>
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">Sitting here for 8 months</span>
                      </div>

                      {/* Note Title */}
                      <h3 className="text-lg sm:text-2xl font-display font-bold text-white mb-4">
                        Idea: Direct Booking &amp; Payment Link for Local Services
                      </h3>

                      {/* Realistic Founder Journal Notes */}
                      <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        <div className="p-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-500/20 text-amber-200">
                          <strong className="text-amber-300 block mb-1">🚨 The Real Customer Pain:</strong>
                          Businesses waste 15+ hours every week chasing clients manually on WhatsApp. Customers hate back-and-forth bank transfers and want a 1-click confirmation link.
                        </div>

                        <div className="space-y-2">
                          <div className="text-zinc-400 text-xs font-mono uppercase tracking-wider">
                            What customers actually need to give us money:
                          </div>
                          <ul className="space-y-2 list-none">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>A clean link where customers choose a service and date</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>Instant UPI / Card payment that deposits money directly to bank</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>Automated WhatsApp &amp; SMS confirmation receipt</span>
                            </li>
                          </ul>
                        </div>

                        {/* Struck-through Founder Nightmare */}
                        <div className="pt-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                          <div className="text-red-400/90 line-through">
                            Agency Quote: ₹12,00,000 &middot; 7 Months &middot; 14-page feature list
                          </div>
                          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium">
                            Nexfound Solution: 30-Day Focused Sprint from ₹50,000
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 2: THE RUTHLESS CUT */}
                  {activeTab === "cut" && (
                    <motion.div
                      key="cut"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-3xl rounded-2xl bg-[#0D0E17] border border-white/[0.12] p-5 sm:p-7 shadow-2xl relative"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-5">
                        <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                          Scope Triage: Cut 80% of Features → Launch 5x Faster
                        </span>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                          Saved ₹8.5L &amp; 5 Months
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Cut Bloat */}
                        <div className="p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                          <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span>❌</span>
                            <span>Cut for V2 (Zero Impact on First Sale)</span>
                          </div>
                          <ul className="space-y-2 text-xs text-zinc-400">
                            <li className="line-through">Custom cryptocurrency &amp; blockchain loyalty wallet</li>
                            <li className="line-through">Multi-language AI voice assistant chatbot</li>
                            <li className="line-through">Multi-tiered affiliate MLM referral matrix</li>
                            <li className="line-through">Over-engineered enterprise microservice architecture</li>
                          </ul>
                        </div>

                        {/* Kept Essentials */}
                        <div className="p-4 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/25">
                          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <span>✅</span>
                            <span>The Core Workflow (Customers Open Wallets)</span>
                          </div>
                          <ul className="space-y-2 text-xs text-zinc-200">
                            <li className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>1-Click booking &amp; instant payment checkout</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>Direct bank deposits via UPI, cards &amp; netbanking</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>Automated customer WhatsApp &amp; email confirmations</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>Simple founder dashboard to view sales &amp; users</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-zinc-400 text-center font-mono">
                        Rule: If a feature doesn&apos;t directly help you validate willingness to pay, it waits for V2.
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 3: LIVE APP & PAYMENTS */}
                  {activeTab === "live" && (
                    <motion.div
                      key="live"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -15, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full max-w-3xl rounded-2xl bg-[#0C0D16] border border-white/[0.12] overflow-hidden shadow-2xl"
                    >
                      {/* Web App Browser Header */}
                      <div className="px-4 py-3 bg-[#111220] border-b border-white/[0.08] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-xs font-mono text-zinc-300">
                            https://app.yourproduct.com
                          </span>
                        </div>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-medium">
                          LIVE IN PRODUCTION · DAY 30
                        </span>
                      </div>

                      {/* Live Dashboard Interface Preview */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {/* Metrics Bar */}
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="text-[11px] text-zinc-400">Total Orders</div>
                            <div className="text-lg sm:text-2xl font-bold font-display text-white mt-0.5">48</div>
                            <div className="text-[10px] text-emerald-400 mt-0.5">First 2 weeks</div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="text-[11px] text-zinc-400">Revenue Volume</div>
                            <div className="text-lg sm:text-2xl font-bold font-display text-[#DFCA9F] mt-0.5">₹1,48,500</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5">Direct to your bank</div>
                          </div>
                          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="text-[11px] text-zinc-400">Code Ownership</div>
                            <div className="text-lg sm:text-2xl font-bold font-display text-white mt-0.5">100%</div>
                            <div className="text-[10px] text-emerald-400 mt-0.5">GitHub transferred</div>
                          </div>
                        </div>

                        {/* Recent Transactions Stream */}
                        <div className="space-y-2">
                          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                            Live Customer Transactions (Direct Deposit):
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span className="text-white font-medium">Rahul S.</span>
                              <span className="text-zinc-500">· 2 mins ago via UPI</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                              +₹4,999
                            </span>
                          </div>
                          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span className="text-white font-medium">Priya M.</span>
                              <span className="text-zinc-500">· 14 mins ago via Credit Card</span>
                            </div>
                            <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                              +₹2,499
                            </span>
                          </div>
                        </div>

                        {/* Founder Outcome Ribbon */}
                        <div className="p-3 rounded-xl bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-[#DFCA9F] text-xs flex items-center justify-between">
                          <span>Live on your domain. Full code &amp; cloud accounts handed over to you.</span>
                          <span className="font-bold text-white uppercase text-[10px] tracking-wider">Zero Hostage Fees</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Interactive Hint */}
              <div className="px-4 sm:px-6 py-3 bg-[#08080E] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">💡</span>
                  <span>Hover to pause &middot; Click any stage to explore</span>
                </div>
                <div className="text-zinc-300 font-medium">
                  Nexfound &middot; Focused Production Engineering
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
