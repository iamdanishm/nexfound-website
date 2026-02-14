"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
    { step: 1, label: "Searching the web...", detail: "Finding local data" },
    { step: 2, label: "Analyzing market...", detail: "Processing market data" },
    { step: 3, label: "Generating audit...", detail: "Building your audit" },
    { step: 4, label: "Complete", detail: "Report is ready" },
];

export default function AuditChat() {
    const [state, setState] = useState<AuditState>("input");
    const [businessType, setBusinessType] = useState("");
    const [location, setLocation] = useState("");
    const [auditResult, setAuditResult] = useState<StructuredAudit | null>(null);
    const [plainResult, setPlainResult] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [revealStage, setRevealStage] = useState(0);
    const [loadingSteps, setLoadingSteps] = useState<LoadingStep[]>([]);

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

    // Stagger reveal animation for result sections
    useEffect(() => {
        if (state === "result") {
            setRevealStage(0);
            const timers = [
                setTimeout(() => setRevealStage(1), 200),
                setTimeout(() => setRevealStage(2), 700),
                setTimeout(() => setRevealStage(3), 1200),
            ];
            return () => timers.forEach(clearTimeout);
        }
    }, [state]);

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
                let errMsg = "Something went wrong";
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
                            throw new Error(event.error || "Something went wrong");
                        }
                    } catch (parseErr) {
                        if (parseErr instanceof Error && parseErr.message !== "Something went wrong" && parseErr.message !== cleaned) {
                            throw parseErr;
                        }
                    }
                }
            }
        } catch (err) {
            setErrorMessage(
                err instanceof Error ? err.message : "An unexpected error occurred"
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
        setRevealStage(0);
        setLoadingSteps([]);
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40 hidden sm:block" />
                <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30 hidden sm:block" />
                <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
            </div>

            <div className="container-custom relative z-10 px-4 sm:px-6 w-full max-w-4xl mx-auto">
                {/* Header */}
                <div
                    className={`text-center mb-8 sm:mb-12 transition-all duration-700 transform ${isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                        }`}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                        <span className="text-white">Free AI </span>
                        <span
                            className="bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                            style={{ textShadow: "0 0 40px rgba(176, 141, 87, 0.3)" }}
                        >
                            Automation Audit
                        </span>
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg text-[#B3B3B3] max-w-xl mx-auto px-4">
                        Tell us your business and location — we&apos;ll research your market and deliver your #1 quick win.
                    </p>
                </div>

                {/* Main Card */}
                <div
                    className={`transition-all duration-1000 delay-300 transform ${isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                        }`}
                >
                    <div
                        className="relative rounded-2xl backdrop-blur-xl border overflow-hidden"
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(176, 141, 87, 0.02) 100%)",
                            borderColor: "rgba(176, 141, 87, 0.2)",
                            boxShadow:
                                "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        }}
                    >
                        {/* Card Header */}
                        <div className="h-11 sm:h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4 sm:px-5">
                            <div className="flex items-center gap-2">
                                <div className="relative w-2.5 h-2.5">
                                    <div
                                        className={`absolute inset-0 rounded-full animate-pulse ${state === "loading"
                                            ? "bg-amber-400"
                                            : state === "result"
                                                ? "bg-green-400"
                                                : state === "error"
                                                    ? "bg-red-400"
                                                    : "bg-[#B08D57]"
                                            }`}
                                    />
                                    <div
                                        className={`absolute inset-0 rounded-full animate-ping opacity-75 ${state === "loading"
                                            ? "bg-amber-300"
                                            : state === "result"
                                                ? "bg-green-300"
                                                : state === "error"
                                                    ? "bg-red-300"
                                                    : "bg-[#F4E6C0]"
                                            }`}
                                    />
                                </div>
                                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                                    {state === "loading"
                                        ? "Analyzing..."
                                        : state === "result"
                                            ? "Audit Complete"
                                            : state === "error"
                                                ? "Error"
                                                : "Strategy Agent"}
                                </span>
                            </div>
                            <span className="text-xs text-white/50 font-mono">
                                nexfound.ai
                            </span>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 sm:p-6 md:p-8">
                            {/* INPUT STATE */}
                            {state === "input" && (
                                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                    {/* Agent message */}
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg
                                                className="w-4 h-4 text-black"
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
                                        </div>
                                        <div className="bg-white/5 rounded-2xl rounded-tl-sm px-4 sm:px-5 py-3 border border-white/10">
                                            <p className="text-[#E0E0E0] text-sm sm:text-base">
                                                What type of business do you run and where are you located?
                                                I&apos;ll research your local market and deliver a personalized audit.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Input fields */}
                                    <div className="space-y-4 pl-0 sm:pl-11">
                                        <div>
                                            <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                                                Business Type *
                                            </label>
                                            <input
                                                type="text"
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
                                                placeholder="e.g. Coffee shop, Dental clinic, Real estate agency..."
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300 text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                                                Location *
                                            </label>
                                            <input
                                                type="text"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                placeholder="e.g. Mumbai, Delhi, San Francisco..."
                                                required
                                                className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300 text-sm sm:text-base"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                Run AI Audit
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* LOADING STATE — Step-by-step progress */}
                            {state === "loading" && (
                                <div className="py-6 sm:py-8 space-y-6">
                                    {/* Audit header */}
                                    <div className="flex gap-3 items-center">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-black animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#B08D57] font-semibold uppercase tracking-wider">
                                                Auditing — {businessType}, {location}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Steps timeline */}
                                    <div className="space-y-0">
                                        {loadingSteps.map((step, idx) => (
                                            <div key={step.step} className={`flex items-start gap-3 sm:gap-4 transition-all duration-500 ${step.status === "pending" ? "opacity-30" : "opacity-100"}`}>
                                                {/* Timeline connector */}
                                                <div className="flex flex-col items-center">
                                                    {/* Step icon */}
                                                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${step.status === "done"
                                                            ? "bg-emerald-500/20 border-2 border-emerald-500"
                                                            : step.status === "active"
                                                                ? "bg-[#B08D57]/20 border-2 border-[#B08D57]"
                                                                : "bg-[#2E2E2E] border-2 border-[#3E3E3E]"
                                                        }`}>
                                                        {step.status === "done" ? (
                                                            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : step.status === "active" ? (
                                                            <svg className="w-4 h-4 text-[#F4E6C0] animate-spin" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                            </svg>
                                                        ) : (
                                                            <div className="w-2 h-2 rounded-full bg-[#4E4E4E]" />
                                                        )}
                                                    </div>
                                                    {/* Vertical line */}
                                                    {idx < loadingSteps.length - 1 && (
                                                        <div className={`w-0.5 h-8 sm:h-10 transition-all duration-500 ${step.status === "done" ? "bg-emerald-500/40" : "bg-[#2E2E2E]"
                                                            }`} />
                                                    )}
                                                </div>
                                                {/* Step content */}
                                                <div className="pt-1 sm:pt-1.5 pb-2 min-w-0">
                                                    <p className={`text-sm sm:text-base font-medium transition-colors duration-500 ${step.status === "done"
                                                            ? "text-emerald-400"
                                                            : step.status === "active"
                                                                ? "text-[#F4E6C0]"
                                                                : "text-[#5E5E5E]"
                                                        }`}>
                                                        {step.label}
                                                    </p>
                                                    <p className={`text-xs sm:text-sm mt-0.5 transition-colors duration-500 truncate ${step.status === "active" ? "text-[#9E9E9E]" : "text-[#5E5E5E]"
                                                        }`}>
                                                        {step.detail}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Subtle animated bar at the bottom */}
                                    <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] rounded-full"
                                            style={{
                                                animation: "loading-bar 2.5s ease-in-out infinite",
                                                width: "40%",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* RESULT STATE */}
                            {state === "result" && (
                                <div className="space-y-5 sm:space-y-6">
                                    {/* Audit header tag */}
                                    <div className="flex gap-3 items-center">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-4 h-4 text-black"
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
                                        </div>
                                        <p className="text-xs text-[#B08D57] font-semibold uppercase tracking-wider">
                                            AI Audit — {businessType}
                                            {location ? `, ${location}` : ""}
                                        </p>
                                    </div>

                                    {/* Structured result */}
                                    {auditResult ? (
                                        <div className="space-y-4 sm:space-y-5">
                                            {/* ===== SECTION 1: THE FIX ===== */}
                                            <div
                                                className={`transition-all duration-700 ease-out ${revealStage >= 1
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-6 opacity-0"
                                                    }`}
                                            >
                                                <div
                                                    className="rounded-xl overflow-hidden border"
                                                    style={{
                                                        borderColor: "rgba(34, 197, 94, 0.3)",
                                                        background:
                                                            "linear-gradient(135deg, rgba(34, 197, 94, 0.06) 0%, rgba(16, 185, 129, 0.03) 100%)",
                                                    }}
                                                >
                                                    {/* Section label */}
                                                    <div
                                                        className="px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2.5 border-b"
                                                        style={{
                                                            borderColor: "rgba(34, 197, 94, 0.15)",
                                                            background:
                                                                "linear-gradient(90deg, rgba(34, 197, 94, 0.12) 0%, transparent 100%)",
                                                        }}
                                                    >
                                                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-bold text-green-400 uppercase tracking-wider">
                                                            Your #1 Quick Win
                                                        </span>
                                                        <span className="ml-auto text-[10px] sm:text-xs text-green-500/60 font-mono hidden sm:inline">
                                                            ACTIONABLE FIX
                                                        </span>
                                                    </div>

                                                    {/* Content */}
                                                    <div className="p-4 sm:p-5 space-y-3 sm:space-y-4">
                                                        <h3 className="text-base sm:text-lg font-bold text-white">
                                                            {auditResult.the_fix.title}
                                                        </h3>
                                                        <p className="text-[#B3B3B3] text-sm sm:text-[0.9375rem] leading-relaxed">
                                                            {auditResult.the_fix.problem}
                                                        </p>

                                                        {/* Solution box */}
                                                        <div
                                                            className="rounded-lg p-3.5 sm:p-4 border"
                                                            style={{
                                                                borderColor: "rgba(34, 197, 94, 0.2)",
                                                                background: "rgba(34, 197, 94, 0.05)",
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                                </svg>
                                                                <span className="text-xs font-semibold text-green-400 uppercase tracking-wide">
                                                                    How to fix this now
                                                                </span>
                                                            </div>
                                                            <p className="text-[#E0E0E0] text-sm sm:text-[0.9375rem] leading-relaxed">
                                                                {auditResult.the_fix.solution}
                                                            </p>
                                                        </div>

                                                        {/* Impact badge */}
                                                        <div className="flex items-start gap-2 pt-1">
                                                            <svg className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                            </svg>
                                                            <p className="text-green-300/90 text-sm font-medium">
                                                                {auditResult.the_fix.impact}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ===== SECTION 2: THE GAPS ===== */}
                                            <div
                                                className={`transition-all duration-700 ease-out ${revealStage >= 2
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-6 opacity-0"
                                                    }`}
                                            >
                                                {/* Section label */}
                                                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                                                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
                                                        Revenue Gaps Found
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                                    {auditResult.the_gaps.map((gap, index) => (
                                                        <div
                                                            key={index}
                                                            className="rounded-xl p-4 sm:p-5 border relative overflow-hidden group"
                                                            style={{
                                                                borderColor: "rgba(245, 158, 11, 0.2)",
                                                                background:
                                                                    "linear-gradient(135deg, rgba(245, 158, 11, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%)",
                                                            }}
                                                        >
                                                            {/* Locked overlay hint */}
                                                            <div
                                                                className="absolute top-3 right-3 sm:top-4 sm:right-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center"
                                                                style={{ background: "rgba(245, 158, 11, 0.1)" }}
                                                            >
                                                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                                </svg>
                                                            </div>

                                                            {/* Category tag */}
                                                            <span
                                                                className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
                                                                style={{
                                                                    background: "rgba(245, 158, 11, 0.12)",
                                                                    color: "rgb(251, 191, 36)",
                                                                }}
                                                            >
                                                                {gap.category}
                                                            </span>

                                                            <h4 className="text-sm sm:text-[0.9375rem] font-bold text-white mb-2 pr-8">
                                                                {gap.title}
                                                            </h4>

                                                            <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-3">
                                                                {gap.problem}
                                                            </p>

                                                            {/* Cost callout */}
                                                            <div
                                                                className="rounded-lg px-3 sm:px-3.5 py-2.5 border"
                                                                style={{
                                                                    borderColor: "rgba(239, 68, 68, 0.2)",
                                                                    background: "rgba(239, 68, 68, 0.06)",
                                                                }}
                                                            >
                                                                <p className="text-red-300/90 text-xs sm:text-sm font-medium flex items-start gap-1.5">
                                                                    <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                                                    </svg>
                                                                    <span>{gap.cost}</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ===== SECTION 3: CTA ===== */}
                                            <div
                                                className={`transition-all duration-700 ease-out ${revealStage >= 3
                                                    ? "translate-y-0 opacity-100"
                                                    : "translate-y-6 opacity-0"
                                                    }`}
                                            >
                                                <div
                                                    className="rounded-xl p-4 sm:p-6 border text-center relative overflow-hidden"
                                                    style={{
                                                        borderColor: "rgba(176, 141, 87, 0.3)",
                                                        background:
                                                            "linear-gradient(135deg, rgba(176, 141, 87, 0.1) 0%, rgba(244, 230, 192, 0.04) 100%)",
                                                    }}
                                                >
                                                    {/* Decorative glow */}
                                                    <div
                                                        className="absolute inset-0 pointer-events-none"
                                                        style={{
                                                            background:
                                                                "radial-gradient(ellipse at center, rgba(176, 141, 87, 0.08) 0%, transparent 70%)",
                                                        }}
                                                    />

                                                    <div className="relative z-10 space-y-3 sm:space-y-4">
                                                        <p className="text-[#E0E0E0] text-sm sm:text-base">
                                                            We&apos;ve identified <span className="text-[#F4E6C0] font-semibold">2 more critical gaps</span> that
                                                            need expert remediation.
                                                        </p>
                                                        <p className="text-[#999] text-xs sm:text-sm">
                                                            Get the full plan — including step-by-step fixes, expected ROI, and a custom implementation timeline.
                                                        </p>

                                                        <div className="flex flex-col gap-3 pt-1 sm:pt-2">
                                                            <Link
                                                                href="/#contact"
                                                                className="w-full px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-[1.02] text-center block"
                                                            >
                                                                <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                                                                    Get Your Full Remediation Plan
                                                                    <svg
                                                                        className="w-4 h-4 sm:w-5 sm:h-5"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                            </Link>
                                                            <button
                                                                onClick={handleReset}
                                                                className="w-full px-6 py-3 border border-[#B08D57]/20 text-[#B3B3B3] font-medium rounded-xl transition-all duration-300 hover:bg-[#B08D57]/10 hover:border-[#B08D57]/40 hover:text-[#F4E6C0] text-center text-sm"
                                                            >
                                                                Run Another Audit
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Fallback for plain text response */
                                        <div className="space-y-5 sm:space-y-6">
                                            <div
                                                className="rounded-xl p-4 sm:p-6 border border-[#B08D57]/20"
                                                style={{
                                                    background:
                                                        "linear-gradient(135deg, rgba(176, 141, 87, 0.08) 0%, rgba(244, 230, 192, 0.04) 100%)",
                                                }}
                                            >
                                                <div className="text-[#E0E0E0] text-sm sm:text-base leading-relaxed whitespace-pre-line">
                                                    {plainResult}
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <Link
                                                    href="/#contact"
                                                    className="block w-full px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-[1.02] text-center"
                                                >
                                                    <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
                                                        Get Your Full Plan
                                                        <svg
                                                            className="w-4 h-4 sm:w-5 sm:h-5"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                            />
                                                        </svg>
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={handleReset}
                                                    className="w-full px-6 py-3 border border-[#B08D57]/30 text-[#F4E6C0] font-medium rounded-xl transition-all duration-300 hover:bg-[#B08D57]/10 hover:border-[#B08D57]/50 text-center text-sm"
                                                >
                                                    Run Another Audit
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ERROR STATE */}
                            {state === "error" && (
                                <div className="space-y-5 sm:space-y-6">
                                    <div className="flex gap-3 items-start">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="bg-red-500/10 rounded-2xl rounded-tl-sm px-4 sm:px-5 py-3 border border-red-500/20 flex-1">
                                            <p className="text-red-300 text-sm sm:text-base">
                                                {errorMessage}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-0 sm:ml-11">
                                        <button
                                            onClick={handleReset}
                                            className="px-6 py-3 border border-[#B08D57]/30 text-[#F4E6C0] font-medium rounded-xl transition-all duration-300 hover:bg-[#B08D57]/10 hover:border-[#B08D57]/50"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
