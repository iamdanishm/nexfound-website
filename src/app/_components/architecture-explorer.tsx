"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ARCHITECTURES = [
  {
    id: "saas",
    title: "Multi-Tenant SaaS Engine",
    subtitle: "Modular, horizontally scalable foundation for B2B & consumer platforms.",
    latency: "34ms",
    throughput: "50,000 req/sec",
    security: "SOC2 Ready",
    nodes: [
      { name: "Global Edge CDN", role: "Vercel / Cloudflare Edge Routing", status: "Active" },
      { name: "Application Tier", role: "Next.js 15 + Server Actions (Node.js)", status: "Active" },
      { name: "Data Layer", role: "PostgreSQL with Connection Pooling (Neon/Supabase)", status: "Active" },
      { name: "Cache & Queue", role: "Upstash Redis + BullMQ Background Workers", status: "Active" },
      { name: "Billing Engine", role: "Stripe Webhooks & Metered Subscription Sync", status: "Active" },
    ],
    tech: ["Next.js 15", "TypeScript", "PostgreSQL", "Redis", "Tailwind CSS", "Stripe API"],
  },
  {
    id: "ai",
    title: "Autonomous AI Agent Pipeline",
    subtitle: "Low-latency LLM orchestration with verifiable zero-leak RAG cache.",
    latency: "120ms",
    throughput: "Streaming SSE",
    security: "Zero-Data Retention",
    nodes: [
      { name: "Ingestion Gateway", role: "Multi-modal OCR & Document Parsing Queue", status: "Active" },
      { name: "Semantic Embedding", role: "OpenAI / Claude Embedding API with Pinecone Index", status: "Active" },
      { name: "RAG Cache", role: "Redis Semantic Cache (Reduces Token Costs by 60%)", status: "Active" },
      { name: "Agent Execution", role: "LangChain / Custom Agent State Machine", status: "Active" },
      { name: "Output Stream", role: "Server-Sent Events (SSE) to Interactive Client UI", status: "Active" },
    ],
    tech: ["Python", "FastAPI", "Pinecone", "OpenAI API", "Anthropic Claude", "LangChain"],
  },
  {
    id: "fintech",
    title: "High-Throughput Fintech & Payments",
    subtitle: "Bank-grade encrypted transaction processor with idempotent accounting ledger.",
    latency: "18ms",
    throughput: "10,000 tx/sec",
    security: "AES-256 / PCI-DSS",
    nodes: [
      { name: "API Shield", role: "DDoS Mitigation & Rate Limiter Gateway", status: "Active" },
      { name: "Double-Entry Ledger", role: "Immutable Append-Only Transaction Database", status: "Active" },
      { name: "Reconciliation Engine", role: "Automated Daily Payout & Settlement Verification", status: "Active" },
      { name: "KMS Encryption", role: "AWS Key Management Service for Sensitive Payloads", status: "Active" },
      { name: "Audit Stream", role: "Real-time Kafka Event Stream for Fraud Scoring", status: "Active" },
    ],
    tech: ["Go / Node.js", "PostgreSQL", "Kafka", "AWS KMS", "Docker", "WebSockets"],
  },
  {
    id: "mobile",
    title: "Native Mobile & Cloud Ecosystem",
    subtitle: "Offline-first React Native / Flutter apps with instantaneous cloud delta sync.",
    latency: "25ms",
    throughput: "Bi-directional Sync",
    security: "Biometric & Secure Enclave",
    nodes: [
      { name: "Client Storage", role: "WatermelonDB / SQLite Local Reactive Cache", status: "Active" },
      { name: "Delta Sync Engine", role: "Conflict-Free Replicated Data Types (CRDT)", status: "Active" },
      { name: "Push Gateway", role: "Firebase Cloud Messaging (FCM) + Apple APNs", status: "Active" },
      { name: "Real-time Transport", role: "WebSocket Mesh for Instant Peer Updates", status: "Active" },
      { name: "Telemetry Node", role: "Sentry Error Tracking & Performance Tracing", status: "Active" },
    ],
    tech: ["React Native", "Flutter", "GraphQL", "WebSockets", "Firebase", "PostgreSQL"],
  },
];

export default function ArchitectureExplorer() {
  const [activeTab, setActiveTab] = useState(0);
  const current = ARCHITECTURES[activeTab];

  return (
    <section className="relative py-14 sm:py-18 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <div className="luxury-badge mb-3">
              <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                Modern Tech Stacks
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-display">
              <span>Explore How We </span>
              <span className="text-gold-foil block sm:inline">Build For Scale.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed">
              Modern, battle-tested technologies designed for high performance, smooth user experiences, and easy maintenance.
            </p>
          </div>

          {/* Interactive Tab Switcher */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
            {ARCHITECTURES.map((arch, index) => (
              <button
                key={arch.id}
                onClick={() => setActiveTab(index)}
                className={`px-4 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm font-display font-bold transition-all duration-300 ${
                  activeTab === index
                    ? "bg-[#DFCA9F] text-[#030305] shadow-[0_0_25px_rgba(223,202,159,0.4)] scale-105"
                    : "glass-obsidian text-[#9E9EB0] hover:text-white hover:border-[#DFCA9F]/40"
                }`}
              >
                {arch.title}
              </button>
            ))}
          </div>

          {/* Architecture Showcase Workstation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="glass-obsidian p-6 sm:p-10 rounded-3xl border border-white/[0.12] shadow-2xl"
            >
              {/* Header Telemetry Strip */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-8 mb-8 border-b border-white/[0.08] gap-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                    {current.title}
                  </h3>
                  <p className="text-sm text-[#9E9EB0] max-w-xl">
                    {current.subtitle}
                  </p>
                </div>

                {/* Metrics Badges */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                    <div className="text-[11px] font-mono text-[#9E9EB0] uppercase">Target Latency</div>
                    <div className="text-sm font-mono font-bold text-[#10B981]">{current.latency}</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                    <div className="text-[11px] font-mono text-[#9E9EB0] uppercase">Throughput</div>
                    <div className="text-sm font-mono font-bold text-[#DFCA9F]">{current.throughput}</div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center">
                    <div className="text-[11px] font-mono text-[#9E9EB0] uppercase">Compliance</div>
                    <div className="text-sm font-mono font-bold text-white">{current.security}</div>
                  </div>
                </div>
              </div>

              {/* Node Architecture Pipeline */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-mono tracking-wider text-[#9E9EB0] uppercase mb-4">
                  SYSTEM TOPOLOGY & MICROSERVICES:
                </div>
                {current.nodes.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-[#DFCA9F]/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-7 h-7 rounded-lg bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 font-mono text-xs font-bold text-[#DFCA9F] flex items-center justify-center shrink-0">
                        {nIdx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-gold-foil transition-colors">
                          {node.name}
                        </div>
                        <div className="text-xs text-[#9E9EB0]">{node.role}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="text-[11px] font-mono text-[#9E9EB0] uppercase">ONLINE & ISOLATED</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-[#9E9EB0] mr-2">TECH STACK:</span>
                  {current.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-[#F7ECD5]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="text-xs font-display font-bold text-[#DFCA9F] hover:text-white uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <span>Build this architecture</span>
                  <span>→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
