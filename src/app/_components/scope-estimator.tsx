"use client";

import { useState, useMemo } from "react";
import TiltCard from "./tilt-card";

type FeatureImpact = "Critical" | "High" | "Expansion";

interface ArchitectureFeature {
  id: string;
  tag: string;
  name: string;
  desc: string;
  impact: FeatureImpact;
  recommendedForV1: boolean;
  whyDefer?: string;
}

const ARCH_FEATURES: ArchitectureFeature[] = [
  {
    id: "core-workflow",
    tag: "SYS_CORE",
    name: "Primary Value Workflow & UX Loop",
    desc: "The single indispensable user transaction or creation workflow that justifies why the product exists.",
    impact: "Critical",
    recommendedForV1: true,
  },
  {
    id: "auth-rbac",
    tag: "SEC_AUTH",
    name: "User Authentication & Profiles",
    desc: "Secure OAuth social logins, magic links, JWT token rotation, and basic user profile management.",
    impact: "Critical",
    recommendedForV1: true,
  },
  {
    id: "relational-db",
    tag: "DB_SCHEMA",
    name: "Relational Database & Core APIs",
    desc: "Normalized PostgreSQL/Supabase database schema with indexed queries, migrations, and REST/RPC endpoints.",
    impact: "Critical",
    recommendedForV1: true,
  },
  {
    id: "payments-invoicing",
    tag: "FIN_GATE",
    name: "Payment Gateways & Subscriptions",
    desc: "Stripe or Razorpay checkout integration with secure webhook verification, access gating, and billing logs.",
    impact: "High",
    recommendedForV1: true,
  },
  {
    id: "realtime-sync",
    tag: "LIVE_SYNC",
    name: "Real-Time Telemetry / BLE / WebSockets",
    desc: "Live bi-directional data channels, hardware IoT communication, or real-time presence indicators.",
    impact: "High",
    recommendedForV1: false,
    whyDefer: "Unless your product is a live tracker or chat, polling or standard REST saves 1-2 weeks of initial build time.",
  },
  {
    id: "admin-backoffice",
    tag: "OPS_ADMIN",
    name: "Multi-Role Admin & Operations Console",
    desc: "Internal dashboard for user management, manual overrides, transaction logs, and platform moderation.",
    impact: "Expansion",
    recommendedForV1: false,
    whyDefer: "In early validation, database GUIs (like Supabase Studio or TablePlus) eliminate the need to code a custom admin UI.",
  },
  {
    id: "ai-orchestration",
    tag: "AI_AGENT",
    name: "AI / LLM Pipelines & Embeddings",
    desc: "Custom prompt orchestration, streaming completion interfaces, retrieval-augmented generation (RAG).",
    impact: "High",
    recommendedForV1: false,
    whyDefer: "Build the manual workflow first to verify if users will actually pay before layering automated agent tokens.",
  },
  {
    id: "notification-engine",
    tag: "NOTIF_HUB",
    name: "Automated Push & Transactional Email",
    desc: "Resend/SendGrid transactional email triggers, webhook-based mobile push, or SMS status alerts.",
    impact: "Expansion",
    recommendedForV1: false,
    whyDefer: "Standard email confirmations suffice for V1; complex multi-channel notification hubs add unnecessary dev debt.",
  },
];

export default function ScopeEstimator() {
  const [platform, setPlatform] = useState<"web" | "mobile" | "staged">("web");
  
  // Track which features are assigned to V1 vs V2
  const [v1Features, setV1Features] = useState<string[]>([
    "core-workflow",
    "auth-rbac",
    "relational-db",
    "payments-invoicing",
  ]);

  const toggleFeatureStage = (id: string) => {
    setV1Features((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Preset quick actions
  const applyLeanPreset = () => {
    setV1Features(["core-workflow", "auth-rbac", "relational-db"]);
  };

  const applyCompletePreset = () => {
    setV1Features([
      "core-workflow",
      "auth-rbac",
      "relational-db",
      "payments-invoicing",
    ]);
  };

  // Calculations for Scope Health
  const scopeAnalysis = useMemo(() => {
    const v1Count = v1Features.length;
    const v2Count = ARCH_FEATURES.length - v1Count;

    let healthScore = 100;
    let statusTitle = "Lean & Launch-Ready";
    let statusColor = "text-[#10B981]";
    let statusBg = "bg-[#10B981]/10 border-[#10B981]/25";
    let estimatedTimeline = "3 – 4 Weeks";
    let sprintType = "1 Focused Sprint";
    let advice =
      "Optimal launch velocity. Your scope isolates the core value proposition without burning budget on premature enterprise features.";

    if (v1Count <= 3) {
      healthScore = 96;
      statusTitle = "Ultra-Lean Velocity";
      statusColor = "text-[#10B981]";
      statusBg = "bg-[#10B981]/10 border-[#10B981]/25";
      estimatedTimeline = "2 – 3 Weeks";
      sprintType = "1 Fast-Track Sprint";
      advice =
        "Laser-focused single workflow. Fastest way to put a working URL in front of paying customers.";
    } else if (v1Count === 4) {
      healthScore = 90;
      statusTitle = "Balanced MVP Release";
      statusColor = "text-[#DFCA9F]";
      statusBg = "bg-[#DFCA9F]/10 border-[#DFCA9F]/25";
      estimatedTimeline = "3 – 4 Weeks";
      sprintType = "1 Production Sprint";
      advice =
        "Recommended sweet spot. Covers full loop (auth, core workflow, database, and payments) without unnecessary baggage.";
    } else if (v1Count === 5 || v1Count === 6) {
      healthScore = 72;
      statusTitle = "Scope Expansion Risk";
      statusColor = "text-[#F59E0B]";
      statusBg = "bg-[#F59E0B]/10 border-[#F59E0B]/25";
      estimatedTimeline = "5 – 7 Weeks";
      sprintType = "2 Staged Sprints";
      advice =
        "Moderate complexity. Adding real-time sync or custom admin panels prior to launch increases testing overhead by ~40%. Consider deferring non-essential modules to V2.";
    } else {
      healthScore = 48;
      statusTitle = "High Scope-Creep Danger";
      statusColor = "text-[#EF4444]";
      statusBg = "bg-[#EF4444]/10 border-[#EF4444]/25";
      estimatedTimeline = "7 – 10+ Weeks";
      sprintType = "3+ Complex Sprints";
      advice =
        "Warning: Attempting to build an enterprise platform on Day 1 drastically increases capital risk. Ruthlessly trim features to validate customer willingness to pay first.";
    }

    return {
      v1Count,
      v2Count,
      healthScore,
      statusTitle,
      statusColor,
      statusBg,
      estimatedTimeline,
      sprintType,
      advice,
    };
  }, [v1Features]);

  // Sync to Contact Form
  const handleImportToBrief = () => {
    const v1Names = ARCH_FEATURES.filter((f) => v1Features.includes(f.id)).map(
      (f) => f.name
    );
    const v2Names = ARCH_FEATURES.filter((f) => !v1Features.includes(f.id)).map(
      (f) => f.name
    );

    const platformLabel =
      platform === "web"
        ? "Web First"
        : platform === "mobile"
        ? "Mobile First"
        : "Staged Rollout (Web → Mobile)";

    const event = new CustomEvent("scopeConfigured", {
      detail: {
        platform: platformLabel,
        budget: "Starting floor from ₹50,000 (Detailed quote via Discovery)",
        timeline: scopeAnalysis.estimatedTimeline,
        modules: `V1 (Ship at Launch): [${v1Names.join(", ")}] | V2 (Post-Launch Expansion): [${v2Names.join(", ")}]`,
      },
    });

    window.dispatchEvent(event);

    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      const offset = 80;
      const pos =
        contactEl.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }
  };

  return (
    <section
      id="estimator"
      className="relative py-16 sm:py-24 overflow-hidden bg-transparent"
    >
      {/* Background Ambience Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] rounded-full opacity-15 pointer-events-none blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.22) 0%, transparent 70%)",
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="luxury-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                Interactive Scope Architecture Matrix
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
              <span>Prioritize Your </span>
              <span className="text-gold-foil block sm:inline">
                V1 Launch vs. V2 Scope.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#9E9EB0] max-w-3xl mx-auto leading-relaxed">
              The number one killer of early-stage startups isn&apos;t competition—it&apos;s overbuilding before validating. 
              Sort your product features into <span className="text-white font-medium">Ship in V1</span> vs <span className="text-[#DFCA9F] font-medium">Defer to V2</span> to engineer a lean, launch-ready scope.
            </p>
          </div>

          {/* Platform Strategy Segment Selector */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl glass-obsidian border border-white/[0.08] mb-8">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-[#DFCA9F] uppercase tracking-wider font-semibold">
                PLATFORM //
              </span>
              <span className="text-xs text-[#9E9EB0]">
                Select primary launch target:
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPlatform("web")}
                className={`py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                  platform === "web"
                    ? "bg-[#DFCA9F] text-[#050507] shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                    : "text-[#A2A2B0] hover:text-white bg-white/[0.03] border border-white/[0.06]"
                }`}
              >
                Web First (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setPlatform("mobile")}
                className={`py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                  platform === "mobile"
                    ? "bg-[#DFCA9F] text-[#050507] shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                    : "text-[#A2A2B0] hover:text-white bg-white/[0.03] border border-white/[0.06]"
                }`}
              >
                Mobile First (Native)
              </button>
              <button
                type="button"
                onClick={() => setPlatform("staged")}
                className={`py-2 px-4 rounded-xl text-xs font-mono font-bold transition-all ${
                  platform === "staged"
                    ? "bg-[#DFCA9F] text-[#050507] shadow-[0_0_15px_rgba(223,202,159,0.3)]"
                    : "text-[#A2A2B0] hover:text-white bg-white/[0.03] border border-white/[0.06]"
                }`}
              >
                Staged Rollout (Web → Mobile)
              </button>
            </div>
          </div>

          {/* Main Dual-Column Workstation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Feature Palette (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="text-xs font-mono text-[#9E9EB0] uppercase tracking-wider flex items-center gap-2">
                  <span>Architecture Modules</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-white text-[10px]">
                    {ARCH_FEATURES.length} Modules Available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={applyLeanPreset}
                    className="text-[11px] font-mono text-[#DFCA9F] hover:underline"
                  >
                    Preset: Lean V1
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={applyCompletePreset}
                    className="text-[11px] font-mono text-[#DFCA9F] hover:underline"
                  >
                    Preset: Full Loop
                  </button>
                </div>
              </div>

              {ARCH_FEATURES.map((feature) => {
                const isV1 = v1Features.includes(feature.id);

                return (
                  <div
                    key={feature.id}
                    onClick={() => toggleFeatureStage(feature.id)}
                    className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                      isV1
                        ? "glass-obsidian border-[#DFCA9F]/40 shadow-[0_0_20px_rgba(223,202,159,0.06)] bg-[#0c0c14]/90"
                        : "glass-obsidian border-white/[0.06] hover:border-white/[0.15] opacity-75"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono font-bold text-[#DFCA9F] px-2 py-0.5 rounded bg-[#DFCA9F]/10 border border-[#DFCA9F]/20">
                          {feature.tag}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white font-display">
                          {feature.name}
                        </h4>
                      </div>

                      {/* Stage Pill Toggle */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatureStage(feature.id);
                        }}
                        className={`shrink-0 px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                          isV1
                            ? "bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40"
                            : "bg-white/[0.05] text-[#9E9EB0] border border-white/[0.1] hover:text-white"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isV1 ? "bg-[#10B981] animate-pulse" : "bg-white/40"
                          }`}
                        />
                        <span>{isV1 ? "🟢 Ship in V1" : "🟡 Defer to V2"}</span>
                      </button>
                    </div>

                    <p className="text-xs text-[#9E9EB0] leading-relaxed mb-2">
                      {feature.desc}
                    </p>

                    {/* Contextual Guidance on Deferral */}
                    {!isV1 && feature.whyDefer && (
                      <div className="mt-2 text-[11px] font-mono text-[#DFCA9F]/80 flex items-start gap-1.5 pt-2 border-t border-white/[0.04]">
                        <span>⚡ Deferral Benefit:</span>
                        <span>{feature.whyDefer}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Launch Cockpit & Scoping Reality (5 Cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <TiltCard
                className="glass-obsidian p-6 sm:p-7 rounded-3xl border border-[#DFCA9F]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(223,202,159,0.08)] relative overflow-hidden"
                maxTilt={5}
                glareOpacity={0.15}
              >
                {/* HUD Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-ping" />
                    <span className="text-xs font-mono text-white font-bold tracking-wider uppercase">
                      Scope Health Cockpit
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#DFCA9F]">
                    V1:{scopeAnalysis.v1Count} / V2:{scopeAnalysis.v2Count}
                  </span>
                </div>

                {/* Scope Health Score Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-[#9E9EB0]">Launch Feasibility:</span>
                    <span className={`font-bold ${scopeAnalysis.statusColor}`}>
                      {scopeAnalysis.healthScore}% • {scopeAnalysis.statusTitle}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        scopeAnalysis.healthScore > 80
                          ? "bg-gradient-to-r from-[#10B981] to-[#34D399]"
                          : scopeAnalysis.healthScore > 65
                          ? "bg-gradient-to-r from-[#DFCA9F] to-[#F59E0B]"
                          : "bg-gradient-to-r from-[#F59E0B] to-[#EF4444]"
                      }`}
                      style={{ width: `${scopeAnalysis.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* Estimated Delivery Sprint */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-[#808090] mb-1">
                      Estimated Delivery
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-white">
                      {scopeAnalysis.estimatedTimeline}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-[#808090] mb-1">
                      Sprint Structure
                    </div>
                    <div className="text-base sm:text-lg font-bold font-mono text-[#DFCA9F]">
                      {scopeAnalysis.sprintType}
                    </div>
                  </div>
                </div>

                {/* Scoping Advisory Notice */}
                <div
                  className={`p-4 rounded-2xl border text-xs leading-relaxed mb-6 ${scopeAnalysis.statusBg} ${scopeAnalysis.statusColor}`}
                >
                  <div className="font-bold font-mono text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>💡 Builder Analysis</span>
                  </div>
                  <p className="text-[#D0D0E0]">{scopeAnalysis.advice}</p>
                </div>

                {/* Transparent Pricing Policy (NO FAKE TOTAL RUPEE SUM) */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] mb-6">
                  <div className="text-xs font-mono uppercase text-[#DFCA9F] font-semibold mb-1">
                    Transparent Pricing Policy
                  </div>
                  <div className="text-sm font-bold text-white mb-2">
                    Single-Workflow Builds: <span className="text-gold-foil">From ₹50,000</span>
                  </div>
                  <p className="text-[11px] text-[#9E9EB0] leading-relaxed">
                    Comprehensive MVPs featuring custom database schemas, authenticated roles, and business workflows are quoted individually following technical discovery. We do not use arbitrary additive calculators because building a 3-field CRUD screen vs. an enterprise telemetry dashboard requires entirely different engineering.
                  </p>
                </div>

                {/* Action CTA */}
                <button
                  type="button"
                  onClick={handleImportToBrief}
                  className="w-full btn-gold py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(223,202,159,0.3)] flex items-center justify-center gap-2 group"
                >
                  <span>Import Scoped V1 Brief into Discovery Call</span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <div className="text-center mt-3 text-[10px] font-mono text-[#707080]">
                  Direct consultation with Danish • Zero obligation • 100% IP Handover
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
