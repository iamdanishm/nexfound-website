"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type AuditState = "input" | "loading" | "result" | "error";

export default function AuditChat() {
    const [state, setState] = useState<AuditState>("input");
    const [businessType, setBusinessType] = useState("");
    const [location, setLocation] = useState("");
    const [auditResult, setAuditResult] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
        if (!businessType.trim()) return;

        setState("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/audit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    businessType: businessType.trim(),
                    location: location.trim() || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setAuditResult(data.audit);
            setState("result");
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
        setAuditResult("");
        setErrorMessage("");
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-16"
        >
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40" />
                <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30" />
                <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
            </div>

            <div className="container-custom relative z-10 px-6 w-full max-w-3xl mx-auto">
                {/* Header */}
                <div
                    className={`text-center mb-12 transition-all duration-700 transform ${isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                        }`}
                >


                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="text-white">Free AI </span>
                        <span
                            className="bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                            style={{ textShadow: "0 0 40px rgba(176, 141, 87, 0.3)" }}
                        >
                            Automation Audit
                        </span>
                    </h1>
                    <p className="text-lg text-[#B3B3B3] max-w-xl mx-auto">
                        Get a personalized AI automation strategy for your business in seconds.
                    </p>
                </div>

                {/* Chat Card */}
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
                        <div className="h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-5">
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
                        <div className="p-6 md:p-8">
                            {/* INPUT STATE */}
                            {state === "input" && (
                                <form onSubmit={handleSubmit} className="space-y-6">
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
                                        <div className="bg-white/5 rounded-2xl rounded-tl-sm px-5 py-3 border border-white/10">
                                            <p className="text-[#E0E0E0] text-sm md:text-base">
                                                What type of business do you run? I&apos;ll analyze your
                                                operations and deliver a personalized AI automation
                                                audit.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Input fields */}
                                    <div className="space-y-4 pl-11">
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
                                                className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[#E0E0E0] mb-2">
                                                Location{" "}
                                                <span className="text-[#737373]">(optional)</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}
                                                placeholder="e.g. Mumbai, Delhi, Bangalore..."
                                                className="w-full px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full px-6 py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black"
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

                            {/* LOADING STATE */}
                            {state === "loading" && (
                                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                    {/* Animated brain icon */}
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B08D57] to-[#F4E6C0] flex items-center justify-center animate-pulse">
                                            <svg
                                                className="w-8 h-8 text-black"
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
                                        <div className="absolute inset-0 w-16 h-16 rounded-2xl border-2 border-[#B08D57] animate-ping opacity-30" />
                                    </div>

                                    <div className="text-center space-y-2">
                                        <p className="text-[#F4E6C0] font-semibold text-lg">
                                            Analyzing your operations...
                                        </p>
                                        <p className="text-[#737373] text-sm">
                                            Our AI agent is crafting your personalized automation
                                            audit
                                        </p>
                                    </div>

                                    {/* Progress dots */}
                                    <div className="flex gap-2">
                                        <div
                                            className="w-2 h-2 bg-[#B08D57] rounded-full animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-[#B08D57] rounded-full animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        />
                                        <div
                                            className="w-2 h-2 bg-[#B08D57] rounded-full animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* RESULT STATE */}
                            {state === "result" && (
                                <div className="space-y-6">
                                    {/* Agent response */}
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
                                        <div className="flex-1">
                                            <p className="text-xs text-[#B08D57] font-semibold uppercase tracking-wider mb-2">
                                                AI Automation Audit — {businessType}
                                                {location ? `, ${location}` : ""}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Audit result card */}
                                    <div
                                        className="rounded-xl p-6 border border-[#B08D57]/20 ml-11"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(176, 141, 87, 0.08) 0%, rgba(244, 230, 192, 0.04) 100%)",
                                        }}
                                    >
                                        <div className="text-[#E0E0E0] text-sm md:text-base leading-relaxed whitespace-pre-line">
                                            {auditResult}
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="ml-11 space-y-3">
                                        <Link
                                            href="/#contact"
                                            className="block w-full px-6 py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-[1.02] text-center"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                Book a Free Setup Call
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
                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                    />
                                                </svg>
                                            </span>
                                        </Link>
                                        <button
                                            onClick={handleReset}
                                            className="w-full px-6 py-3 border border-[#B08D57]/30 text-[#F4E6C0] font-medium rounded-xl transition-all duration-300 hover:bg-[#B08D57]/10 hover:border-[#B08D57]/50 text-center"
                                        >
                                            Run Another Audit
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ERROR STATE */}
                            {state === "error" && (
                                <div className="space-y-6">
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
                                        <div className="bg-red-500/10 rounded-2xl rounded-tl-sm px-5 py-3 border border-red-500/20 flex-1">
                                            <p className="text-red-300 text-sm md:text-base">
                                                {errorMessage}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ml-11">
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
