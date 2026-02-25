"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    { step: 1, label: "Scanning web data", detail: "Locating regional benchmarks" },
    { step: 2, label: "Analyzing operations", detail: "Identifying inefficiencies" },
    { step: 3, label: "Calculating impact", detail: "Quantifying revenue gaps" },
    { step: 4, label: "Finalizing", detail: "Compiling strategic roadmap" },
];

export default function AuditChat() {
    const [state, setState] = useState<AuditState>("input");
    const [businessType, setBusinessType] = useState("");
    const [location, setLocation] = useState("");
    const [auditResult, setAuditResult] = useState<StructuredAudit | null>(null);
    const [plainResult, setPlainResult] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!businessType.trim() || !location.trim()) return;

        setState("loading");
        setErrorMessage("");
        setAuditResult(null);
        setPlainResult("");
        setLoadingSteps(
            STEP_TEMPLATES.map((s) => ({ ...s, status: "pending" as const }))
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
                let errMsg = "Analysis interrupted.";
                try {
                    const parsed = JSON.parse(text);
                    errMsg = parsed.error || errMsg;
                } catch { /* ignore */ }
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
                                    if (s.step === event.step) return { ...s, label: event.label || s.label, detail: event.detail || s.detail, status: "active" };
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
                            throw new Error(event.error || "Analysis failed during processing.");
                        }
                    } catch (parseErr) {
                        if (parseErr instanceof Error && parseErr.message !== "Analysis interrupted." && parseErr.message !== cleaned) {
                            throw parseErr;
                        }
                    }
                }
            }
        } catch (err) {
            setErrorMessage(
                err instanceof Error ? err.message : "An unexpected failure occurred in the data stream."
            );
            setState("error");
        }
    };

    const handleReset = () => {
        setState("input");
        setBusinessType("");
        setLocation("");
        setAuditResult(null);
        setPlainResult("");
        setErrorMessage("");
        setLoadingSteps([]);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 flex items-center border-t border-white/5 overflow-hidden"
            id="audit"
        >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B08D57]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1A7F6B]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <DataFlux className="w-full h-full" />
            </div>

            {/* High-end visual separator */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B08D57] to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#F4E6C0] to-transparent blur-sm" />
            </div>

            <div className="container-custom relative z-10 mx-auto px-6 lg:px-12 max-w-5xl">
                <div className="flex flex-col items-center gap-12 lg:gap-16">

                    {/* HEADER: Bold Typography & Visuals */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center text-center max-w-3xl"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 border border-[#B08D57]/30 bg-[#B08D57]/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#F4E6C0] animate-pulse shadow-[0_0_10px_#F4E6C0]" />
                            <span className="text-xs font-bold text-[#F4E6C0] uppercase tracking-widest">Live AI Intelligence</span>
                        </div>

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            Stop Guessing.<br />
                            <span className="bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent">Start Knowing.</span>
                        </h2>

                        <p className="text-[#888888] text-lg md:text-xl leading-relaxed max-w-2xl">
                            Deploy our proprietary AI agent to scan your local market in real-time. Uncover hidden revenue gaps and identify the exact processes you need to automate to scale faster.
                        </p>

                        {/* Subtle Tactical Visual */}
                        <div className="absolute -top-12 -left-12 w-64 h-64 opacity-10 pointer-events-none hidden lg:block">
                            <MarketRadar className="w-full h-full" />
                        </div>
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 opacity-10 pointer-events-none hidden lg:block rotate-180">
                            <MarketRadar className="w-full h-full" />
                        </div>

                    </motion.div>

                    {/* INTERACTIVE CARD */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="w-full max-w-4xl"
                    >
                        <div className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">

                            {/* Inner ambient light */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#B08D57]/5 via-transparent to-transparent pointer-events-none" />

                            {/* Card Header (Terminal Style) */}
                            <div className="h-12 border-b border-white/10 bg-black/40 flex items-center justify-between px-6">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                                    <div className="w-3 h-3 rounded-full bg-[#333]" />
                                </div>
                                <div className="text-[10px] uppercase tracking-widest text-[#B08D57]/70 font-mono">
                                    Nexfound.Agent_v2.1
                                </div>
                            </div>

                            <div className="p-8 sm:p-12 relative z-10 min-h-[400px] flex flex-col justify-center">
                                <AnimatePresence mode="wait">
                                    {/* --- INPUT STATE --- */}
                                    {state === "input" && (
                                        <motion.div
                                            key="input"
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                                        >
                                            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
                                                <div className="text-center">
                                                    <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">Free AI Audit</h3>
                                                    <p className="text-[#888888] text-sm">Tell us about your business to receive a custom analysis.</p>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="group">
                                                        <label className="block text-xs font-bold text-[#B08D57] uppercase tracking-widest mb-2 ml-1 text-left">Business Type</label>
                                                        <input
                                                            type="text"
                                                            value={businessType}
                                                            onChange={(e) => setBusinessType(e.target.value)}
                                                            placeholder="e.g. Legal Firm, E-commerce..."
                                                            required
                                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#B08D57] transition-all"
                                                        />
                                                    </div>

                                                    <div className="group">
                                                        <label className="block text-xs font-bold text-[#B08D57] uppercase tracking-widest mb-2 ml-1 text-left">Location</label>
                                                        <input
                                                            type="text"
                                                            value={location}
                                                            onChange={(e) => setLocation(e.target.value)}
                                                            placeholder="e.g. London, Dubai..."
                                                            required
                                                            className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-[#B08D57] transition-all"
                                                        />
                                                    </div>
                                                </div>

                                                <button
                                                    type="submit"
                                                    className="group relative w-full flex items-center justify-center gap-3 py-5 px-6 rounded-2xl text-black bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] overflow-hidden transition-all shadow-[0_0_20px_rgba(176,141,87,0.2)] hover:shadow-[0_0_40px_rgba(176,141,87,0.4)] hover:scale-[1.01]"
                                                >
                                                    <span className="relative z-10 font-bold text-lg tracking-wide uppercase">Start Audit</span>
                                                    <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                                </button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {/* --- LOADING STATE --- */}
                                    {state === "loading" && (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                                            className="space-y-10 py-6 max-w-2xl mx-auto w-full"
                                        >
                                            <div className="text-center space-y-4">
                                                <div className="relative w-20 h-20 mx-auto">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 rounded-full border-t-2 border-r-2 border-[#B08D57] border-l-2 border-l-transparent border-b-2 border-b-transparent"
                                                    />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-8 h-8 rounded-full bg-[#1A7F6B]/30 animate-pulse border border-[#1A7F6B]" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-white tracking-wide">Analyzing Business</h3>
                                                    <p className="text-[#B08D57] font-mono text-xs uppercase mt-2 tracking-widest">{businessType} • {location}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                {loadingSteps.map((step, idx) => (
                                                    <div key={idx} className={`flex items-center gap-5 p-4 rounded-xl transition-all duration-500 ${step.status === 'active' ? 'bg-[#B08D57]/10 border border-[#B08D57]/30 shadow-[0_0_15px_rgba(176,141,87,0.1)]' :
                                                        step.status === 'done' ? 'bg-white/[0.03] border border-white/5' : 'opacity-30 border border-transparent'
                                                        }`}>
                                                        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center border transition-colors duration-500 ${step.status === 'done' ? 'bg-[#22c55e]/20 border-[#22c55e] text-[#22c55e]' :
                                                            step.status === 'active' ? 'border-[#B08D57] text-[#B08D57]' : 'border-white/20 text-white/40'
                                                            }`}>
                                                            {step.status === 'done' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> :
                                                                step.status === 'active' ? <div className="w-2.5 h-2.5 rounded-full bg-[#B08D57] animate-ping" /> :
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />}
                                                        </div>
                                                        <div className="text-left">
                                                            <p className={`text-base font-bold tracking-wide ${step.status === 'done' ? 'text-white' : step.status === 'active' ? 'text-[#F4E6C0]' : 'text-white/50'}`}>{step.label}</p>
                                                            <p className="text-sm text-white/40 font-mono mt-0.5">{step.detail}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* --- RESULT STATE --- */}
                                    {state === "result" && (
                                        <motion.div
                                            key="result"
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                                        >
                                            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-8">
                                                <h3 className="text-3xl font-bold text-white tracking-tight">Audit Complete</h3>
                                                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full">
                                                    <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                                                    <span className="text-[#22c55e] text-[10px] uppercase tracking-widest font-bold">Success</span>
                                                </div>
                                            </div>

                                            <div>
                                                {auditResult ? (
                                                    <div className="space-y-8">
                                                        {/* Primary Fix Output */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                                            className="relative bg-gradient-to-br from-[#1A7F6B]/10 to-[#1A7F6B]/5 border border-[#1A7F6B]/30 rounded-2xl p-6 overflow-hidden md:p-8"
                                                        >
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A7F6B]/20 blur-3xl rounded-full" />

                                                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                                                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#1A7F6B] flex items-center justify-center">
                                                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                                                </div>
                                                                <h4 className="text-2xl text-[#F4E6C0] font-bold tracking-tight">The #1 High-ROI Fix</h4>
                                                            </div>
                                                            <div className="relative z-10 space-y-6 text-left">
                                                                <div>
                                                                    <h5 className="text-white text-xl font-bold mb-2">{auditResult.the_fix.title}</h5>
                                                                    <p className="text-[#B3B3B3] text-base leading-relaxed">{auditResult.the_fix.problem}</p>
                                                                </div>

                                                                <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:p-6">
                                                                    <p className="text-[10px] text-[#1A7F6B] font-bold uppercase tracking-widest mb-3">Recommended Solution</p>
                                                                    <p className="text-white/90 text-base leading-relaxed">{auditResult.the_fix.solution}</p>
                                                                </div>

                                                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full backdrop-blur-sm">
                                                                    <svg className="w-4 h-4 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                                                    <span className="text-xs text-[#22c55e] font-bold uppercase tracking-wider">{auditResult.the_fix.impact}</span>
                                                                </div>
                                                            </div>
                                                        </motion.div>

                                                        {/* Secondary Gaps */}
                                                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                                            <h4 className="text-xs font-bold text-[#B08D57] uppercase tracking-widest mb-4 text-left">Additional Opportunities ({auditResult.the_gaps.length})</h4>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                                {auditResult.the_gaps.map((gap, i) => (
                                                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#B08D57]/30 transition-all hover:bg-white/10 group cursor-default text-left">
                                                                        <div className="flex items-center gap-2 mb-3">
                                                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                                                                            <span className="text-[10px] text-[#ef4444] uppercase font-bold tracking-widest">{gap.category}</span>
                                                                        </div>
                                                                        <h5 className="text-white font-bold text-base mb-2 group-hover:text-[#F4E6C0] transition-colors">{gap.title}</h5>
                                                                        <p className="text-[#888888] text-sm mb-4 leading-relaxed line-clamp-3">{gap.problem}</p>
                                                                        <div className="flex items-center gap-1.5">
                                                                            <svg className="w-4 h-4 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                                            <span className="text-[#ef4444] text-[10px] font-bold uppercase tracking-widest">{gap.cost}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white/80 text-sm whitespace-pre-line leading-relaxed text-left">
                                                        {plainResult}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-8 border-t border-white/10 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <button
                                                    onClick={() => {
                                                        const element = document.querySelector("#contact");
                                                        element?.scrollIntoView({ behavior: "smooth" });
                                                    }}
                                                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#B08D57] text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-[#c29b62] hover:scale-[1.02] transition-all shadow-[0_0_20px_rgba(176,141,87,0.3)]"
                                                >
                                                    Scale Now
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </button>
                                                <button
                                                    onClick={handleReset}
                                                    className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-white/10 transition-colors"
                                                >
                                                    Run New Audit
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* --- ERROR STATE --- */}
                                    {state === "error" && (
                                        <motion.div
                                            key="error"
                                            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}
                                            className="text-center py-12 space-y-6 w-full"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-[#ef4444]/10 flex items-center justify-center mx-auto border border-[#ef4444]/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                                                <svg className="w-10 h-10 text-[#ef4444]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2">Audit Failed</h3>
                                                <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">{errorMessage}</p>
                                            </div>
                                            <button
                                                onClick={handleReset}
                                                className="mt-4 px-8 py-3 border border-white/20 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wider text-sm transition-colors"
                                            >
                                                Try Again
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
