"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./tilt-card";

const FOUNDER_PATHS = [
  {
    id: "agency",
    title: "The 6-Month Agency Trap",
    badge: "BURNS BUDGET & TIME",
    badgeStyle: "bg-red-500/10 border-red-500/25 text-red-400 font-semibold",
    borderStyle: "border-red-500/20 bg-[#0E0608]/90",
    icon: "🏢",
    timeline: "6 – 9 Months",
    cost: "₹10L – ₹25L+ Retainers",
    ownership: "Vendor Lock-in / Complex IP Contracts",
    points: [
      "Endless discovery workshops & 30-page requirement decks",
      "Junior developers assigned while you pay senior rates",
      "Building 20 secondary features before testing if anyone cares",
      "Runway drained before a single customer actually pays",
    ],
    verdict: "High financial risk & painful slow-motion progress.",
  },
  {
    id: "freelancer",
    title: "The Freelancer & AI Toy Maze",
    badge: "FRAGILE & UNPREDICTABLE",
    badgeStyle: "bg-amber-500/10 border-amber-500/25 text-amber-400 font-semibold",
    borderStyle: "border-amber-500/20 bg-[#0E0A06]/90",
    icon: "🧩",
    timeline: "Unpredictable / Stalls",
    cost: "Cheap upfront, 3x on rewrites",
    ownership: "Cobbled fragments & missing keys",
    points: [
      "AI code demos that look great until real customers hit edge cases",
      "Crashes on live webhooks, real authentication, & UPI payments",
      "Freelancer vanishes or takes another job midway through",
      "Code is unmaintainable and has to be rewritten from scratch",
    ],
    verdict: "False economy that leaves your product stuck at 80%.",
  },
  {
    id: "nexfound",
    title: "The Nexfound 30-Day Sprint",
    badge: "RECOMMENDED FOR FOUNDERS",
    badgeStyle: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold",
    borderStyle: "border-[#DFCA9F]/40 bg-[#090A12]/95 shadow-[0_20px_60px_rgba(223,202,159,0.1)]",
    icon: "⚡",
    timeline: "30-Day Hard Sprint",
    cost: "From ₹50,000 (Transparent Scope)",
    ownership: "100% Direct GitHub & Cloud Transfer",
    points: [
      "Ruthlessly isolate the single workflow customers will pay for",
      "Direct technical partnership with an experienced builder",
      "Production-ready backend, real payments, and clean modern UX",
      "Live launch in 30 days with zero retainers or agency bloat",
    ],
    verdict: "The fastest, lowest-risk path from idea to first paying customer.",
  },
];

const COMPARISON_ROWS = [
  {
    criteria: "Time to First Paying User",
    agency: "6 – 9 Months",
    freelancer: "3 – 5 Months (stalled)",
    nexfound: "30 Days Live Launch",
  },
  {
    criteria: "Starting Budget Floor",
    agency: "₹10,00,000+ retainers",
    freelancer: "Unpredictable hourly billing",
    nexfound: "From ₹50,000 (Clear Scope)",
  },
  {
    criteria: "Code & Cloud Ownership",
    agency: "Vendor locked / IP disputes",
    freelancer: "Disjointed zip files & missing keys",
    nexfound: "100% Direct GitHub & Cloud Transfer",
  },
  {
    criteria: "Production Stability",
    agency: "Heavy enterprise overhead",
    freelancer: "Brittle prototype (fails live)",
    nexfound: "Scalable, modern production cloud",
  },
  {
    criteria: "Builder Accountability",
    agency: "Account managers & middle layers",
    freelancer: "High ghosting risk",
    nexfound: "Direct founder-to-builder access",
  },
];

export default function Comparison() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

  return (
    <section id="comparison" className="relative py-16 sm:py-24 overflow-hidden bg-transparent scroll-mt-24">
      {/* Ambient Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] rounded-full opacity-15 pointer-events-none blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.2) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <div className="studio-badge mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F] animate-pulse" />
              <span>The Founder Reality Check</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 font-display">
              <span>Are you about to make the 3 mistakes that kill </span>
              <span className="text-gold-gradient block sm:inline">90% of first-time products?</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Most founders blow their entire runway before getting a single customer. Here is why traditional routes fail—and the lean sprint that gets you launched.
            </p>

            {/* View Mode Toggle */}
            <div className="flex justify-center mt-6">
              <div className="p-1 rounded-xl bg-[#0A0A12] border border-white/[0.08] backdrop-blur-md flex items-center gap-1">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    viewMode === "cards"
                      ? "text-black bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  The 3 Founder Paths
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    viewMode === "table"
                      ? "text-black bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-md"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Side-by-Side Matrix
                </button>
              </div>
            </div>
          </div>

          {/* VIEW 1: 3 FOUNDER PATH CARDS */}
          <AnimatePresence mode="wait">
            {viewMode === "cards" ? (
              <motion.div
                key="cards"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {FOUNDER_PATHS.map((path) => (
                  <TiltCard
                    key={path.id}
                    className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border flex flex-col justify-between transition-all ${path.borderStyle}`}
                    maxTilt={2}
                  >
                    <div>
                      {/* Badge & Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl">{path.icon}</span>
                        <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full uppercase ${path.badgeStyle}`}>
                          {path.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold font-display text-white mb-3">
                        {path.title}
                      </h3>

                      {/* Timeline & Cost Pills */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                          ⏱ {path.timeline}
                        </span>
                        <span className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                          💰 {path.cost}
                        </span>
                      </div>

                      {/* Points */}
                      <ul className="space-y-2.5 mb-6">
                        {path.points.map((pt, i) => (
                          <li key={i} className="text-xs sm:text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                            <span className={path.id === "nexfound" ? "text-emerald-400 font-bold" : "text-red-400"}>
                              {path.id === "nexfound" ? "✓" : "×"}
                            </span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08]">
                      <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                        Outcome:
                      </div>
                      <div className={`text-xs font-medium ${path.id === "nexfound" ? "text-emerald-300 font-semibold" : "text-zinc-400"}`}>
                        {path.verdict}
                      </div>
                    </div>
                  </TiltCard>
                ))}
              </motion.div>
            ) : (
              /* VIEW 2: SIDE-BY-SIDE MATRIX */
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl sm:rounded-3xl bg-[#08080C]/90 border border-white/[0.1] overflow-x-auto shadow-2xl"
              >
                <table className="w-full text-left text-xs sm:text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                      <th className="p-4 sm:p-5 font-mono text-zinc-400 uppercase tracking-wider text-[11px]">
                        Evaluation Criteria
                      </th>
                      <th className="p-4 sm:p-5 text-red-400 font-bold">
                        Traditional Agency
                      </th>
                      <th className="p-4 sm:p-5 text-amber-400 font-bold">
                        Freelancer / AI Demo
                      </th>
                      <th className="p-4 sm:p-5 text-emerald-400 font-bold bg-[#DFCA9F]/[0.03]">
                        Nexfound 30-Day Sprint
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors"
                      >
                        <td className="p-4 sm:p-5 font-medium text-white">
                          {row.criteria}
                        </td>
                        <td className="p-4 sm:p-5 text-zinc-400">
                          {row.agency}
                        </td>
                        <td className="p-4 sm:p-5 text-zinc-400">
                          {row.freelancer}
                        </td>
                        <td className="p-4 sm:p-5 text-emerald-300 font-semibold bg-[#DFCA9F]/[0.03]">
                          {row.nexfound}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
