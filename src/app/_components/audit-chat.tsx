"use client";

import { useState } from "react";
import { MarketRadar, DataFlux } from "./animated-shapes";

type AuditState = "input" | "loading" | "result" | "error";

interface AuditFix {
  title: string;
  problem: string;
  solution: string;
  impact: string;
}

interface AuditGap {
  category: string;
  title: string;
  problem: string;
  cost: string;
}

interface StructuredAudit {
  the_fix: AuditFix;
  the_gaps: AuditGap[];
}

interface LoadingStep {
  step: number;
  label: string;
  detail: string;
  status: "active" | "done" | "pending";
}

const STEP_TEMPLATES: Omit<LoadingStep, "status">[] = [
  { step: 1, label: "Scanning web benchmarks", detail: "Analyzing industry baselines & tech stacks" },
  { step: 2, label: "Analyzing operations", detail: "Locating latency & architecture bottlenecks" },
  { step: 3, label: "Calculating impact", detail: "Quantifying revenue leakage & cost of delay" },
  { step: 4, label: "Finalizing roadmap", detail: "Compiling strategic implementation blueprint" },
];

const SUGGESTED_NICHES = [
  "B2B SaaS Platform",
  "E-Commerce & D2C",
  "Fintech & Payments",
  "HealthTech & Telehealth",
  "Logistics & Fleet",
  "AI & Automation Tool",
];

export default function AuditChat() {
  const [state, setState] = useState<AuditState>("input");
  const [businessType, setBusinessType] = useState("");
  const [location, setLocation] = useState("");
  const [auditResult, setAuditResult] = useState<StructuredAudit | null>(null);
  const [plainResult, setPlainResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessType.trim() || !location.trim()) return;

    setState("loading");
    setErrorMessage("");
    setAuditResult(null);
    setPlainResult("");
    setLoadingSteps(
      STEP_TEMPLATES.map((s, idx) => ({
        ...s,
        status: idx === 0 ? "active" : ("pending" as const),
      }))
    );

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessType: businessType.trim(),
          location: location.trim(),
        }),
      });

      if (!response.ok || !response.body) {
        const text = await response.text();
        let errMsg = "Analysis stream interrupted.";
        try {
          const parsed = JSON.parse(text);
          errMsg = parsed.error || errMsg;
        } catch {
          /* ignore */
        }
        throw new Error(errMsg);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const cleaned = line.replace(/^data: /, "").trim();
          if (!cleaned) continue;

          try {
            const event = JSON.parse(cleaned);

            if (event.type === "step") {
              setLoadingSteps((prev) =>
                prev.map((s) => {
                  if (s.step < event.step) return { ...s, status: "done" };
                  if (s.step === event.step)
                    return {
                      ...s,
                      label: event.label || s.label,
                      detail: event.detail || s.detail,
                      status: "active",
                    };
                  return s;
                })
              );
            } else if (event.type === "result") {
              setLoadingSteps((prev) =>
                prev.map((s) => ({ ...s, status: "done" }))
              );
              if (event.format === "structured") {
                setAuditResult(event.audit);
              } else {
                setPlainResult(event.audit);
              }
              setState("result");
            } else if (event.type === "error") {
              throw new Error(event.error || "Analysis failed during execution.");
            }
          } catch (parseErr) {
            if (
              parseErr instanceof Error &&
              parseErr.message !== "Analysis stream interrupted." &&
              parseErr.message !== cleaned
            ) {
              throw parseErr;
            }
          }
        }
      }
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred during diagnostics."
      );
      setState("error");
    }
  };

  const handleReset = () => {
    setState("input");
    setAuditResult(null);
    setPlainResult("");
    setErrorMessage("");
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) {
      const offset = 90;
      const pos = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section id="audit" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="mb-4 inline-block">
              <div className="luxury-pill">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
                  Free AI Diagnostic Workstation
                </span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              <span>Instant Technical & </span>
              <span className="text-gold-gradient block sm:inline">Revenue Gap Analysis.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#A2A2B0] max-w-2xl mx-auto leading-relaxed">
              Identify architectural vulnerabilities, calculate revenue leaks, and receive a customized engineering roadmap in under 30 seconds.
            </p>
          </div>

          {/* Diagnostic Console Container */}
          <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/[0.1] shadow-2xl relative">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs font-mono text-[#A2A2B0]">
                  nexfound-diagnostic-v2.4
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#DFCA9F]">STATUS: READY</span>
              </div>
            </div>

            {/* State 1: Input Form */}
            {state === "input" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Suggested Niche Pills */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-3">
                    Select Quick Industry Preset:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_NICHES.map((niche) => (
                      <button
                        type="button"
                        key={niche}
                        onClick={() => setBusinessType(niche)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                          businessType === niche
                            ? "bg-[#DFCA9F] text-[#050507] font-semibold"
                            : "bg-white/[0.04] text-[#D4D4DF] border border-white/[0.08] hover:border-[#DFCA9F]/40 hover:text-white"
                        }`}
                      >
                        {niche}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Business Type Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Business Model / Product Concept *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI-driven cold outreach SaaS"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                    />
                  </div>

                  {/* Target Market / Location Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#A2A2B0] mb-2">
                      Target Market / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United States, Global, India"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08080E] border border-white/[0.1] text-white placeholder:text-[#525260] text-sm focus:outline-none focus:border-[#DFCA9F] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-luxury-primary w-full py-4 text-sm sm:text-base uppercase tracking-wider font-bold mt-4"
                >
                  <span>Run Architectural Diagnostic</span>
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </button>
              </form>
            )}

            {/* State 2: Live Scanning Radar & Steps */}
            {state === "loading" && (
              <div className="py-8 text-center flex flex-col items-center">
                <MarketRadar className="mb-6" />

                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Running Neural Architecture Diagnostic...
                </h3>
                <p className="text-xs text-[#A2A2B0] font-mono mb-8">
                  SCANNING: {businessType.toUpperCase()} IN {location.toUpperCase()}
                </p>

                {/* Progress Checkpoints */}
                <div className="w-full max-w-md space-y-3 text-left">
                  {loadingSteps.map((step) => (
                    <div
                      key={step.step}
                      className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                        step.status === "done"
                          ? "bg-[#10B981]/10 border-[#10B981]/30 text-white"
                          : step.status === "active"
                          ? "bg-[#DFCA9F]/10 border-[#DFCA9F]/40 text-[#F4E6C0]"
                          : "bg-white/[0.02] border-white/[0.04] text-[#525260]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-mono">
                          {step.status === "done" ? (
                            <span className="text-[#10B981]">✓</span>
                          ) : step.status === "active" ? (
                            <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-ping" />
                          ) : (
                            <span>{step.step}</span>
                          )}
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{step.label}</div>
                          <div className="text-[11px] opacity-70">{step.detail}</div>
                        </div>
                      </div>

                      {step.status === "active" && <DataFlux />}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* State 3: Structured Results */}
            {state === "result" && (
              <div className="space-y-8 animate-[fade-in_0.4s_ease-out]">
                {/* Result Top Banner */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                    <span className="text-xs font-mono font-bold text-[#10B981] uppercase">
                      Diagnostic Complete · Actionable Blueprint Ready
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs text-[#DFCA9F] hover:underline font-mono"
                  >
                    ↺ Run New Audit
                  </button>
                </div>

                {auditResult ? (
                  <div className="space-y-6">
                    {/* The Core Fix */}
                    <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#181824] to-[#0A0A10] border border-[#DFCA9F]/40 shadow-xl">
                      <div className="text-xs font-mono text-[#DFCA9F] uppercase tracking-wider mb-2 font-bold">
                        ★ Priority Architectural Fix
                      </div>
                      <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">
                        {auditResult.the_fix.title}
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-semibold text-red-400 mb-1">
                            Vulnerability:
                          </div>
                          <p className="text-sm text-[#A2A2B0]">
                            {auditResult.the_fix.problem}
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                          <div className="text-xs font-semibold text-[#10B981] mb-1">
                            Engineering Solution:
                          </div>
                          <p className="text-sm text-[#A2A2B0]">
                            {auditResult.the_fix.solution}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#DFCA9F]/10 border border-[#DFCA9F]/30 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#DFCA9F] uppercase">
                          Projected ROI Impact:
                        </span>
                        <span className="text-sm font-mono font-bold text-white">
                          {auditResult.the_fix.impact}
                        </span>
                      </div>
                    </div>

                    {/* Identified Revenue Gaps */}
                    {auditResult.the_gaps && auditResult.the_gaps.length > 0 && (
                      <div>
                        <h4 className="text-base font-display font-bold text-white mb-4 uppercase tracking-wider text-xs font-mono">
                          Identified Revenue Gaps & Technical Risks
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {auditResult.the_gaps.map((gap, gIdx) => (
                            <div
                              key={gIdx}
                              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
                            >
                              <div>
                                <div className="text-[11px] font-mono text-[#DFCA9F] mb-1">
                                  {gap.category}
                                </div>
                                <div className="text-base font-bold text-white mb-2">
                                  {gap.title}
                                </div>
                                <p className="text-xs text-[#A2A2B0] leading-relaxed mb-4">
                                  {gap.problem}
                                </p>
                              </div>
                              <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-red-400">
                                Estimated Drag: {gap.cost}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-sm text-[#D4D4DF] leading-relaxed whitespace-pre-wrap font-mono">
                    {plainResult}
                  </div>
                )}

                {/* Call to Action from Audit */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.08]">
                  <div className="text-xs text-[#A2A2B0] text-center sm:text-left">
                    Ready to implement this architectural blueprint?
                  </div>
                  <button
                    onClick={scrollToContact}
                    className="btn-luxury-primary py-3 px-6 text-xs uppercase tracking-wider font-semibold w-full sm:w-auto"
                  >
                    <span>Schedule Architecture Strategy Call</span>
                  </button>
                </div>
              </div>
            )}

            {/* State 4: Error */}
            {state === "error" && (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
                  !
                </div>
                <h4 className="text-lg font-bold text-white">Diagnostic Interrupted</h4>
                <p className="text-xs text-red-300 max-w-md mx-auto">{errorMessage}</p>
                <button
                  onClick={handleReset}
                  className="btn-luxury-secondary text-xs uppercase tracking-wider py-2.5 px-6"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
