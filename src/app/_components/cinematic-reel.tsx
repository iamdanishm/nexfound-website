"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = [
  { id: "slide-1", number: "01", label: "The Question", color: "indigo" },
  { id: "slide-2", number: "02", label: "The Trap", color: "crimson" },
  { id: "slide-3", number: "03", label: "The 30-Day Fix", color: "emerald" },
  { id: "slide-4", number: "04", label: "What You Get", color: "cyan" },
  { id: "slide-5", number: "05", label: "Proof & Pricing", color: "gold" },
  { id: "slide-6", number: "06", label: "The Launch", color: "finale" },
] as const;

export default function CinematicReel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [webOrMobile, setWebOrMobile] = useState<"web" | "mobile">("web");
  const [activeProject, setActiveProject] = useState<"dalalfree" | "evdock">("dalalfree");

  // Form states for Slide 6
  const [ideaText, setIdeaText] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("Web First");
  const [contactText, setContactText] = useState("");
  const [nameText, setNameText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic label width measurement for fluid spring-animated width transitions
  const [labelWidths, setLabelWidths] = useState<number[]>([76, 52, 84, 72, 82, 66]);
  const labelMeasureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (labelMeasureRefs.current.length === SLIDES.length) {
      const measured = labelMeasureRefs.current.map((el) =>
        el ? Math.ceil(el.getBoundingClientRect().width) : 75
      );
      setLabelWidths(measured);
    }
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to a specific slide index
  const goToSlide = (idx: number) => {
    if (idx < 0 || idx >= SLIDES.length) return;
    const targetEl = document.getElementById(SLIDES[idx].id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(idx);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goToSlide(Math.min(currentSlide + 1, SLIDES.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToSlide(Math.max(currentSlide - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  // Observer to track which slide is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
            const index = SLIDES.findIndex((s) => s.id === entry.target.id);
            if (index !== -1) {
              setCurrentSlide(index);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameText || "Founder",
          email: contactText.includes("@") ? contactText : "contact-via-phone@nexfound.in",
          message: `[PLATFORM]: ${selectedPlatform}\n[CONTACT]: ${contactText}\n[IDEA]:\n${ideaText}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      setIdeaText("");
      setContactText("");
      setNameText("");
      toast.success("Idea received! Danish and the Nexfound team will review your scope and reply within 24 hours.", {
        duration: 6000,
        icon: "🚀",
      });
    } catch {
      toast.error("Message could not be sent. Please chat directly on WhatsApp!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/919321456661?text=${encodeURIComponent(
    "Hi Danish! I saw Nexfound and have a product idea I want to launch. Let's discuss scope and timeline."
  )}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#030305] text-white selection:bg-[#DFCA9F]/30"
    >
      {/* ============================================================ */}
      {/* FLOATING HEADER                                              */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50 px-5 sm:px-8 pt-4 pb-3 sm:py-4 flex items-center justify-between pointer-events-none bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => goToSlide(0)}
            className="group flex items-center gap-2 sm:gap-2.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl hover:border-[#DFCA9F]/40 transition-all shadow-lg cursor-pointer"
          >
            <div className="relative w-5 h-5 sm:w-7 sm:h-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo-transparent.png"
                alt="Nexfound Logo"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-xs sm:text-base font-display font-extrabold tracking-tight text-white">
              Nexfound<span className="inline-block text-[#DFCA9F] transition-transform duration-300 group-hover:scale-125">.</span>
            </span>
            <span className="text-[10px] font-mono text-[#DFCA9F] bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 px-2 py-0.5 rounded-full hidden sm:inline-flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFCA9F] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#DFCA9F]" />
              </span>
              <span>30-Day Sprint</span>
            </span>
          </button>
        </div>

        {/* Desktop Slide Shortcuts Pill */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/80 border border-white/10 backdrop-blur-xl pointer-events-auto shadow-lg">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                currentSlide === idx
                  ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold shadow-md shadow-[#DFCA9F]/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        {/* Right Action Button */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => goToSlide(5)}
            className="group px-3 py-1 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-lg shadow-[#DFCA9F]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Discuss Idea</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* DESKTOP VERTICAL PROGRESS BAR                                */}
      {/* ============================================================ */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3">
        <div className="text-[11px] font-mono font-bold text-[#DFCA9F] mb-1">
          {SLIDES[currentSlide].number} / 06
        </div>
        <div className="flex flex-col gap-1">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              aria-label={`Jump to slide ${s.number}: ${s.label}`}
              className="w-6 h-6 flex items-center justify-center cursor-pointer group"
            >
              <span
                className={`w-2 transition-all rounded-full ${
                  currentSlide === idx
                    ? "h-8 bg-[#DFCA9F] shadow-[0_0_12px_rgba(223,202,159,0.8)]"
                    : "h-2 bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
        {currentSlide < SLIDES.length - 1 && (
          <button
            onClick={() => goToSlide(currentSlide + 1)}
            aria-label="Next slide"
            className="mt-1 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-xs text-[#DFCA9F] transition-all animate-bounce cursor-pointer"
          >
            ↓
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* MOBILE BOTTOM CENTER HORIZONTAL PROGRESS BAR                 */}
      {/* ============================================================ */}
      <nav
        aria-label="Mobile slide pagination"
        className="lg:hidden fixed bottom-3.5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <motion.div
          animate={{
            width: labelWidths[currentSlide] ? 214 + labelWidths[currentSlide] : "auto",
          }}
          transition={{
            type: "spring",
            stiffness: 340,
            damping: 28,
          }}
          className="max-w-[calc(100vw-24px)] flex items-center justify-between px-3.5 py-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/90 pointer-events-auto"
        >
          {/* Slide Counter & Label Badge (Fluid Spring Animated Width) */}
          <button
            onClick={() => goToSlide(currentSlide)}
            className="h-8 flex items-center gap-1 text-left cursor-pointer shrink-0 py-1"
            aria-label={`Current slide ${SLIDES[currentSlide].number}: ${SLIDES[currentSlide].label}`}
          >
            <span className="font-mono font-bold text-xs text-[#DFCA9F] tabular-nums shrink-0">
              {SLIDES[currentSlide].number}/06
            </span>
            <motion.div
              animate={{ width: labelWidths[currentSlide] || "auto" }}
              transition={{ type: "spring", stiffness: 340, damping: 28 }}
              className="overflow-hidden whitespace-nowrap flex items-center"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={SLIDES[currentSlide].label}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.16 }}
                  className="text-[10px] text-zinc-300 font-normal whitespace-nowrap block"
                >
                  · {SLIDES[currentSlide].label}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-3.5 bg-white/20 shrink-0 mx-1.5" />

          {/* Horizontal Progress Indicator Track (Direct motion buttons, spring-animated width & centered baseline) */}
          <div className="flex items-center gap-2 shrink-0">
            {SLIDES.map((s, idx) => (
              <button
                key={`m-dot-${s.id}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${s.number}: ${s.label}`}
                className="h-8 w-6 flex items-center justify-center cursor-pointer"
              >
                <motion.span
                  animate={{
                    width: currentSlide === idx ? 20 : 6,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 28,
                  }}
                  className={`h-2 rounded-full block ${
                    currentSlide === idx
                      ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_0_10px_rgba(223,202,159,0.85)]"
                      : "bg-white/25 hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Next Slide Arrow Button */}
          <div className="shrink-0 flex items-center ml-2.5">
            {currentSlide < SLIDES.length - 1 ? (
              <button
                onClick={() => goToSlide(currentSlide + 1)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-xs text-[#DFCA9F] active:scale-90 transition-transform cursor-pointer"
                aria-label="Next slide"
              >
                ↓
              </button>
            ) : (
              <button
                onClick={() => goToSlide(0)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-xs text-[#DFCA9F] active:scale-90 transition-transform cursor-pointer"
                aria-label="Back to top"
              >
                ↑
              </button>
            )}
          </div>
        </motion.div>
      </nav>

      {/* ============================================================ */}
      {/* SLIDE 01: THE QUESTION                                       */}
      {/* ============================================================ */}
      <section
        id="slide-1"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#05060F] to-[#080918]"
      >
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-indigo-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[400px] rounded-full bg-[#DFCA9F]/15 blur-[130px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>30-Day Sprint · Napkin Note to First Customer</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Still letting your app idea collect dust in your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                notes app?
              </span>
            </h1>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              Agencies quote 6 months and ₹15L. Freelancers vanish halfway through. Building alone feels overwhelming. Nexfound turns your raw concept into a live, payment-ready app in 30 days—starting from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup>.
            </p>

            <div className="grid grid-cols-4 gap-2.5 pt-1 max-w-xl">
              <div className="group p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-indigo-400/40 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-center cursor-default">
                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 group-hover:scale-110 group-hover:bg-indigo-500/20 group-hover:border-indigo-400/40 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 6 12 12 15 15" className="origin-center group-hover:rotate-45 transition-transform duration-500" />
                  </svg>
                </div>
                <div className="text-lg font-bold font-display text-white">30 Days</div>
                <div className="text-[10px] text-zinc-400 font-mono">To Live Launch</div>
              </div>
              <div className="group p-3 rounded-2xl bg-white/[0.04] border border-[#DFCA9F]/30 hover:border-[#DFCA9F]/60 hover:-translate-y-1 hover:bg-[#DFCA9F]/[0.08] transition-all duration-300 text-center cursor-default shadow-[0_0_15px_rgba(223,202,159,0.08)]">
                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-[#DFCA9F]/15 border border-[#DFCA9F]/30 flex items-center justify-center text-[#DFCA9F] group-hover:scale-110 group-hover:bg-[#DFCA9F]/25 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3h12M6 8h12M6 13l6 8M6 13h4a4 4 0 0 0 0-8" />
                  </svg>
                </div>
                <div className="text-lg font-bold font-display text-[#DFCA9F]">
                  From ₹50k<sup className="text-[9px] text-[#DFCA9F]/70 font-normal">*</sup>
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">Starting Floor</div>
              </div>
              <div className="group p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-center cursor-default">
                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:border-emerald-400/40 transition-all duration-300">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="text-lg font-bold font-display text-white">100% Yours</div>
                <div className="text-[10px] text-zinc-400 font-mono">Full Ownership</div>
              </div>
              <div className="group p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 hover:-translate-y-1 hover:bg-white/[0.07] transition-all duration-300 text-center cursor-default">
                <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300">
                  <svg className="w-3.5 h-3.5 origin-bottom-left group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  </svg>
                </div>
                <div className="text-lg font-bold font-display text-white">1 Platform</div>
                <div className="text-[10px] text-zinc-400 font-mono">Prove It Fast</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => goToSlide(5)}
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#DFCA9F]/20 hover:scale-105 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
              >
                <span>Discuss Your Idea (Takes 60s)</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
              <button
                onClick={() => goToSlide(1)}
                className="group px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>See What Happens Next</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
              </button>
            </div>

            <div className="text-xs text-zinc-500 font-mono pt-1">
              *Starting baseline for a focused single-platform MVP with core workflows.
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#12131F] border-2 border-white/15 p-5 shadow-2xl relative shadow-indigo-500/10 text-left hover:border-white/25 transition-colors">
              <div className="w-12 h-1 bg-black/60 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                  <span>📁 Notes &gt; 2:14 AM</span>
                </span>
                <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                  <span>Sitting for 8 months</span>
                </span>
              </div>
              <div className="space-y-3 text-xs text-zinc-300">
                <p className="text-sm font-bold text-white font-display">
                  Startup Idea: 1-Click Direct Booking &amp; Payments
                  <span className="inline-block w-[2px] h-3.5 ml-1 bg-amber-400 animate-pulse align-middle" />
                </p>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                  <span className="font-bold text-amber-400 block mb-0.5">🚨 The Problem:</span>
                  Local businesses waste 15+ hours weekly chasing clients manually on WhatsApp.
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="text-[10px] font-mono uppercase text-zinc-400">What users actually need:</div>
                  <div className="flex items-center gap-2 group/chk">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>1-Click booking link</span>
                  </div>
                  <div className="flex items-center gap-2 group/chk">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>Direct UPI/Card payment to bank</span>
                  </div>
                  <div className="flex items-center gap-2 group/chk">
                    <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                      ✓
                    </span>
                    <span>Instant confirmation WhatsApp</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-white/10 text-[11px] flex justify-between items-center">
                  <span className="text-red-400 line-through">Agency: ₹12L &middot; 7 Mo</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 rounded flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                    </span>
                    <span>Nexfound: 30 Days</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          {/* Top text block */}
          <div className="text-center mb-4 sm:mb-6 min-h-[128px] flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-zinc-300 mb-1 mx-auto">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>30-Day Sprint · Notes to Launch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              Still letting your app idea collect dust in your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                notes app?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed max-w-sm mx-auto">
              Nexfound turns your concept into a live app in 30 days—starting from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup>.
            </p>
          </div>

          {/* Center Visual: The Note Card (Bold, readable & full width) */}
          <div className="w-full rounded-2xl bg-[#12131F] border border-white/20 p-4 sm:p-5 shadow-2xl relative text-left space-y-2.5 mb-4 sm:mb-5 min-h-[250px]">
            <div className="w-12 h-1 bg-black/60 rounded-full mx-auto mb-2" />
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="text-xs sm:text-sm font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <span>📁 Notes &gt; 2:14 AM</span>
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                <span>Sitting for 8 months</span>
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-white font-display leading-snug">
              Startup Idea: 1-Click Direct Booking &amp; Payments
              <span className="inline-block w-[2px] h-3.5 ml-1 bg-amber-400 animate-pulse align-middle" />
            </p>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm leading-relaxed">
              <span className="font-bold text-amber-400 block mb-0.5">🚨 The Problem:</span>
              Businesses waste 15+ hrs weekly chasing clients on WhatsApp.
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm text-zinc-200">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0">
                  ✓
                </span>
                <span>1-Click direct booking link</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0">
                  ✓
                </span>
                <span>Direct UPI/Card payments to bank</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0">
                  ✓
                </span>
                <span>Instant confirmation WhatsApp</span>
              </div>
            </div>
            <div className="pt-2.5 border-t border-white/10 text-xs sm:text-sm flex justify-between items-center">
              <span className="text-red-400 line-through">Agency: ₹12L &middot; 7 Mo</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>Nexfound: 30 Days</span>
              </span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="text-center flex flex-col items-center gap-1.5 w-full">
            <button
              onClick={() => goToSlide(5)}
              className="group w-full py-3 rounded-xl bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#DFCA9F]/20 hover:scale-102 active:scale-98 transition-transform text-center flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Discuss Idea (Takes 60s)</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
            <button
              onClick={() => goToSlide(1)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Swipe up to see the trap</span>
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SLIDE 02: THE TRAP                                           */}
      {/* ============================================================ */}
      <section
        id="slide-2"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#0D0406] to-[#120508]"
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-red-600/15 blur-[140px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              <span>The Costly Reality Check</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              Are you about to burn ₹15L and 6 months on a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-[#DFCA9F]">
                bloated agency?
              </span>
            </h2>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              Or get trapped in fragile AI code demos? 90% of first-time founders blow their entire budget before getting a single customer. Here is why the old way drains you.
            </p>

            <div className="space-y-3 pt-1 max-w-xl">
              <div className="group p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 group-hover:bg-red-500/25 group-hover:border-red-400/50 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-red-200 transition-colors">Mistake 01: Building iOS, Android, and Web on Day 1</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Burning 3x the budget and 9 months before finding out if a single person wants to use it.
                  </div>
                </div>
              </div>

              <div className="group p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 group-hover:bg-red-500/25 group-hover:border-red-400/50 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-red-200 transition-colors">Mistake 02: Paying Retainers for Wireframes &amp; Meetings</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Endless discovery calls while junior coders get assigned to your product.
                  </div>
                </div>
              </div>

              <div className="group p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 hover:bg-white/[0.06] hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0 group-hover:scale-110 group-hover:bg-red-500/25 group-hover:border-red-400/50 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white group-hover:text-red-200 transition-colors">Mistake 03: The Fragile AI Code Maze</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Looks slick in a Twitter demo, but crashes the second a real customer tries to pay via UPI.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-[#140608]/90 border border-red-500/25 p-7 shadow-2xl space-y-5 text-left hover:border-red-500/40 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-red-400 font-bold flex items-center gap-1.5">
                  <span>Traditional Agency Retainer</span>
                </span>
                <span className="text-xs font-mono text-zinc-500">6–9 Months</span>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex justify-between py-1 border-b border-white/5 items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                    <span>Scoping workshops &amp; Figma decks:</span>
                  </span>
                  <span className="text-red-400 font-mono font-bold">₹4,00,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5 items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                    <span>Junior developer hourly retainers:</span>
                  </span>
                  <span className="text-red-400 font-mono font-bold">₹8,50,000</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5 items-center">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                    <span>Vendor lock-in &amp; server fees:</span>
                  </span>
                  <span className="text-red-400 font-mono font-bold">₹2,50,000</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-white items-center">
                  <span>Customers paying you on Day 180:</span>
                  <span className="text-red-400 font-mono inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 px-2 py-0.5 rounded">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
                    </span>
                    <span>0 Users</span>
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.12)]">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-300">✓</span>
                  <span>The Nexfound Alternative:</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Fixed 30-Day Sprint starting from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup>.
                </div>
                <div className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  1 Core workflow. 1 Platform first. Live in customers&apos; hands. 100% code transferred to your GitHub.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-[11px] font-mono text-red-400 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
              </span>
              <span>The Costly Trap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              Are you about to burn ₹15L on a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-[#DFCA9F]">
                bloated agency?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed max-w-sm mx-auto">
              90% of first-time founders blow their budget before getting 1 paying customer.
            </p>
          </div>

          <div className="w-full rounded-2xl bg-[#140608]/95 border border-red-500/30 p-4 sm:p-5 shadow-2xl space-y-3 mb-4 sm:mb-5 text-left">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs sm:text-sm font-mono uppercase text-red-400 font-bold">Traditional Agency Retainer</span>
              <span className="text-xs font-mono text-zinc-400">6–9 Months</span>
            </div>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-200">
              <div className="flex justify-between py-1 border-b border-white/5 items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                  <span>Scoping &amp; Figma decks:</span>
                </span>
                <span className="text-red-400 font-mono font-bold">₹4,00,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                  <span>Developer hourly retainers:</span>
                </span>
                <span className="text-red-400 font-mono font-bold">₹8,50,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5 items-center">
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500/15 text-red-400 text-[10px] flex items-center justify-center font-bold">−</span>
                  <span>Server &amp; lock-in fees:</span>
                </span>
                <span className="text-red-400 font-mono font-bold">₹2,50,000</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-white items-center">
                <span>Paying users on Day 180:</span>
                <span className="text-red-400 font-mono inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/25 px-2 py-0.5 rounded">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400" />
                  </span>
                  <span>0 Users</span>
                </span>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-1 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-300">✓</span>
                <span>The Nexfound Alternative:</span>
              </div>
              <div className="text-sm sm:text-base font-bold text-white">
                Fixed 30-Day Sprint from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup>.
              </div>
              <div className="text-xs sm:text-sm text-zinc-200 mt-1 leading-relaxed">
                1 Core workflow. 1 Platform first. Live in customers&apos; hands. 100% code transferred to your GitHub.
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-1.5 w-full">
            <button
              onClick={() => goToSlide(2)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Swipe up for the 30-day fix</span>
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SLIDE 03: THE 30-DAY FIX                                     */}
      {/* ============================================================ */}
      <section
        id="slide-3"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#030C08] to-[#05140D]"
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-emerald-600/15 blur-[140px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>The 30-Day Lean Strategy</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              What if you cut 80% of the noise and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#DFCA9F] to-cyan-300">
                launched in 30 days?
              </span>
            </h2>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              You don&apos;t need 20 features to make money. You only need ONE platform that customers will open their wallets for. Launch one first, then expand once you have revenue.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setWebOrMobile("web")}
                className={`group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  webOrMobile === "web"
                    ? "bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                <svg className={`w-3.5 h-3.5 ${webOrMobile === "web" ? "animate-[spin_10s_linear_infinite]" : "group-hover:rotate-45 transition-transform"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
                </svg>
                <span>Option A: Web First</span>
              </button>
              <button
                onClick={() => setWebOrMobile("mobile")}
                className={`group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  webOrMobile === "mobile"
                    ? "bg-emerald-400 text-black shadow-lg shadow-emerald-500/20"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span>Option B: Mobile First</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 max-w-xl">
              <span className="font-bold text-white">Founder Golden Rule:</span> Pick the single fastest platform to test willingness to pay. Expand only when paying customers demand it.
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-[#091510] border border-emerald-500/25 p-6 shadow-2xl text-left space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <span>{webOrMobile === "web" ? "Web First Architecture" : "Mobile First Architecture"}</span>
                </span>
                <span className="text-xs font-mono text-zinc-400">Day 30 Live</span>
              </div>

              <AnimatePresence mode="wait">
                {webOrMobile === "web" ? (
                  <motion.div
                    key="web-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs text-zinc-300"
                  >
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-amber-400/15 text-amber-300 flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform">⚡</span>
                        <span>Zero App Store Barrier</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">Customers tap a link on WhatsApp and use it instantly.</div>
                    </div>
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-xs font-bold group-hover/item:scale-110 transition-transform">₹</span>
                        <span>100% Revenue Retention</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">No 30% Apple/Google tax. Direct UPI &amp; card payouts to your bank.</div>
                    </div>
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-cyan-400/15 text-cyan-300 flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform">🚀</span>
                        <span>Instant Updates</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">Update prices, copy, and features in seconds with zero review delays.</div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="mobile-panel"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3 text-xs text-zinc-300"
                  >
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-indigo-400/15 text-indigo-300 flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform">📲</span>
                        <span>Permanent Pocket Real Estate</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">Lives on their home screen for daily recurring habits.</div>
                    </div>
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-amber-400/15 text-amber-300 flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform">🔔</span>
                        <span>Free Push Notifications</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">Re-engage customers instantly without spending a rupee on ads.</div>
                    </div>
                    <div className="group/item p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all duration-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <span className="w-5 h-5 rounded-md bg-cyan-400/15 text-cyan-300 flex items-center justify-center text-xs group-hover/item:scale-110 transition-transform">📡</span>
                        <span>Hardware Integration</span>
                      </div>
                      <div className="text-zinc-400 mt-1 pl-7">Seamless offline Bluetooth, GPS location, and camera access.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs shadow-[0_0_15px_rgba(16,185,129,0.08)]">
                <div>
                  <div className="text-[10px] font-mono text-emerald-400 uppercase">30-Day Revenue Validation:</div>
                  <div className="text-base font-bold text-white mt-0.5">₹1,48,500 Deposited</div>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                  </span>
                  <span>VERIFIED</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>The 30-Day Lean Strategy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              Cut 80% of noise and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-[#DFCA9F] to-cyan-300">
                launch in 30 days.
              </span>
            </h2>
          </div>

          {/* Dedicated Toggle Buttons Between Title & Card with Generous Spacing */}
          <div className="flex justify-center items-center gap-2.5 mb-4 w-full">
            <button
              onClick={() => setWebOrMobile("web")}
              className={`flex-1 max-w-[170px] py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                webOrMobile === "web"
                  ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              <svg className={`w-3.5 h-3.5 ${webOrMobile === "web" ? "animate-[spin_10s_linear_infinite]" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
              </svg>
              <span>Option A: Web</span>
            </button>
            <button
              onClick={() => setWebOrMobile("mobile")}
              className={`flex-1 max-w-[170px] py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                webOrMobile === "mobile"
                  ? "bg-emerald-400 text-black shadow-md shadow-emerald-500/20"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span>Option B: Mobile</span>
            </button>
          </div>

          <div className="w-full rounded-2xl bg-[#091510] border border-emerald-500/30 p-4 sm:p-5 shadow-2xl text-left space-y-3 mb-4 sm:mb-5">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs sm:text-sm font-mono uppercase text-emerald-400 font-bold">
                {webOrMobile === "web" ? "Web First Architecture" : "Mobile First Architecture"}
              </span>
              <span className="text-xs font-mono text-zinc-400">Day 30 Live</span>
            </div>
            <AnimatePresence mode="wait">
              {webOrMobile === "web" ? (
                <motion.div
                  key="web-m"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5 text-xs sm:text-sm text-zinc-200"
                >
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-amber-400/15 text-amber-300 flex items-center justify-center text-[10px]">⚡</span>
                      <span>Zero App Store Barrier</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">Customers tap a link on WhatsApp and use it instantly.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-emerald-400/15 text-emerald-300 flex items-center justify-center text-[10px] font-bold">₹</span>
                      <span>100% Revenue Retention</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">No 30% Apple tax. Direct UPI &amp; card payouts to your bank.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-cyan-400/15 text-cyan-300 flex items-center justify-center text-[10px]">🚀</span>
                      <span>Instant Updates</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">Deploy code and pricing updates in seconds with zero delays.</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mob-m"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5 text-xs sm:text-sm text-zinc-200"
                >
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-indigo-400/15 text-indigo-300 flex items-center justify-center text-[10px]">📲</span>
                      <span>Permanent Home Screen Real Estate</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">Lives on customer home screens for daily recurring habits.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-amber-400/15 text-amber-300 flex items-center justify-center text-[10px]">🔔</span>
                      <span>Free Push Notifications</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">Re-engage customers anytime with zero ad spend.</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                    <div className="flex items-center gap-2 font-bold text-white text-xs sm:text-sm">
                      <span className="w-4 h-4 rounded bg-cyan-400/15 text-cyan-300 flex items-center justify-center text-[10px]">📡</span>
                      <span>Hardware Integration</span>
                    </div>
                    <div className="text-zinc-300 text-xs mt-1 pl-6">Offline Bluetooth, GPS location, and camera sensors.</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-between text-xs sm:text-sm">
              <div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase">30-Day Revenue:</div>
                <div className="text-sm sm:text-base font-bold text-white">₹1,48,500 Deposited</div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span>VERIFIED</span>
              </span>
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-1.5 w-full">
            <button
              onClick={() => goToSlide(3)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Swipe up to see what you get</span>
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SLIDE 04: WHAT YOU GET                                       */}
      {/* ============================================================ */}
      <section
        id="slide-4"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#02090F] to-[#04121A]"
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-cyan-600/15 blur-[140px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span>Zero Jargon · 100% Tangible Assets</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              What do you actually get when we{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#DFCA9F] to-indigo-300">
                hand you the keys?
              </span>
            </h2>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              No developer mumbo-jumbo. No vendor lock-in. Just 4 tangible deliverables ready to sign up users and accept money from Day 30.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 max-w-xl">
              <span className="font-bold text-white">Full Transparency:</span> Every project begins with an agreed scope document. You know the exact deliverables and price before development starts.
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3.5 text-left">
            <div className="group p-5 rounded-2xl bg-[#091820] border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-[#0c202a] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 space-y-2 cursor-default">
              <div className="relative w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                </span>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-200 transition-colors">Live App on Your Domain</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Loads in under 1 second. Built to look gorgeous on iPhones, Androids, and laptops.
              </p>
              <div className="text-[10px] font-mono text-cyan-300 font-bold pt-1 flex items-center gap-1">
                <span>OUTCOME: INSTANT TRUST</span>
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-[#091820] border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-[#0c202a] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 space-y-2 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" strokeLinecap="round" />
                  <path d="M6 15h2M12 15h4" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-200 transition-colors">Instant Customer Checkout</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Connected to Stripe &amp; UPI. Payments deposit directly into your bank account.
              </p>
              <div className="text-[10px] font-mono text-cyan-300 font-bold pt-1 flex items-center gap-1">
                <span>OUTCOME: DIRECT REVENUE</span>
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-[#091820] border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-[#0c202a] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 space-y-2 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" x2="18" y1="20" y2="10" className="group-hover:stroke-cyan-200 transition-colors" />
                  <line x1="12" x2="12" y1="20" y2="4" className="group-hover:stroke-cyan-200 transition-colors" />
                  <line x1="6" x2="6" y1="20" y2="14" className="group-hover:stroke-cyan-200 transition-colors" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-200 transition-colors">Founder Control Panel</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Clean admin screen to track sales, view users, and export customer data without code.
              </p>
              <div className="text-[10px] font-mono text-cyan-300 font-bold pt-1 flex items-center gap-1">
                <span>OUTCOME: ZERO CODE NEEDED</span>
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-[#091820] border border-cyan-500/20 hover:border-cyan-400/40 hover:bg-[#0c202a] hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 space-y-2 cursor-default">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:bg-cyan-500/25 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" x2="6" y1="3" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-200 transition-colors">100% Code Ownership</h3>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Transferred to your GitHub and cloud accounts. Zero hostage retainers or lock-in.
              </p>
              <div className="text-[10px] font-mono text-cyan-300 font-bold pt-1 flex items-center gap-1">
                <span>OUTCOME: 100% ASSET FREEDOM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-400 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              <span>4 Tangible Assets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              What do you get when we{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-[#DFCA9F] to-indigo-300">
                hand you the keys?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 leading-relaxed max-w-sm mx-auto">
              No developer mumbo-jumbo. 4 tangible assets ready to accept payments from Day 30.
            </p>
          </div>

          <div className="w-full space-y-2.5 mb-4 sm:mb-5 text-left">
            <div className="group p-2.5 sm:p-3 rounded-xl bg-[#091820] border border-cyan-500/25 hover:border-cyan-400/40 shadow-lg flex items-center gap-3 transition-colors">
              <div className="relative w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-display">Live App on Domain</h3>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-1.5 py-0.5 rounded">INSTANT TRUST</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 leading-tight">Loads &lt;1s on iPhones &amp; laptops.</p>
              </div>
            </div>

            <div className="group p-2.5 sm:p-3 rounded-xl bg-[#091820] border border-cyan-500/25 hover:border-cyan-400/40 shadow-lg flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" strokeLinecap="round" />
                  <path d="M6 15h2M12 15h4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-display">Direct Customer Checkout</h3>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-1.5 py-0.5 rounded">DIRECT CASH</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 leading-tight">Connected to Stripe &amp; UPI to your bank account.</p>
              </div>
            </div>

            <div className="group p-2.5 sm:p-3 rounded-xl bg-[#091820] border border-cyan-500/25 hover:border-cyan-400/40 shadow-lg flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" x2="18" y1="20" y2="10" />
                  <line x1="12" x2="12" y1="20" y2="4" />
                  <line x1="6" x2="6" y1="20" y2="14" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-display">Founder Control Panel</h3>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-1.5 py-0.5 rounded">ZERO CODE</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 leading-tight">Track sales &amp; export users with zero code.</p>
              </div>
            </div>

            <div className="group p-2.5 sm:p-3 rounded-xl bg-[#091820] border border-cyan-500/25 hover:border-cyan-400/40 shadow-lg flex items-center gap-3 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-300 flex-shrink-0 group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="6" x2="6" y1="3" y2="15" />
                  <circle cx="18" cy="6" r="3" />
                  <circle cx="6" cy="18" r="3" />
                  <path d="M18 9a9 9 0 0 1-9 9" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-white font-display">100% Code Ownership</h3>
                  <span className="text-[9px] font-mono text-cyan-300 font-bold bg-cyan-500/20 px-1.5 py-0.5 rounded">YOUR ASSET</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-300 mt-0.5 leading-tight">Transferred to your GitHub &amp; cloud accounts.</p>
              </div>
            </div>
          </div>

          <div className="text-center flex flex-col items-center gap-1.5 w-full">
            <button
              onClick={() => goToSlide(4)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Swipe up for proof &amp; pricing</span>
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SLIDE 05: PROOF & PRICING                                    */}
      {/* ============================================================ */}
      <section
        id="slide-5"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#0A0804] to-[#120F08]"
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-[#DFCA9F]/15 blur-[140px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-xs font-mono text-[#DFCA9F]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFCA9F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DFCA9F]" />
              </span>
              <span>Honest Pricing &amp; Scope Clarity</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              How much does it cost, and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                how is it built?
              </span>
            </h2>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              Transparent scopes, clear milestones, and zero surprise invoices. Focused MVPs start from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup> on a 30-day sprint. Architecture and product direction are overseen directly by Danish, built and shipped by our dedicated engineering team.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-[#DFCA9F]/30 space-y-2 max-w-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#DFCA9F] font-bold uppercase tracking-wider">
                  Baseline MVP Starting Scope:
                </span>
                <span className="text-xs font-mono font-bold text-white bg-[#DFCA9F]/20 px-2 py-0.5 rounded">
                  From ₹50,000<sup className="text-[9px] text-[#DFCA9F]/70 font-normal">*</sup>
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-white">What ₹50,000 Covers:</strong> A focused, single-platform MVP (Web or Mobile) with 1 core customer workflow, user auth, direct payments (Stripe/UPI), and an admin dashboard.
              </p>
              <div className="pt-2 border-t border-white/10 text-[11px] text-zinc-400 leading-relaxed">
                <strong className="text-amber-300">What if your product is larger?</strong> If your product needs multi-sided marketplaces, custom AI models, or complex IoT backends, ₹50k won&apos;t cut it—and we won&apos;t mislead you. We give you a clear, honest custom scope &amp; milestone estimate upfront after a discovery call.
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setActiveProject("dalalfree")}
                className={`group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeProject === "dalalfree"
                    ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-lg shadow-[#DFCA9F]/20"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
                </svg>
                <span>Proof 01: DalalFree</span>
              </button>
              <button
                onClick={() => setActiveProject("evdock")}
                className={`group px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  activeProject === "evdock"
                    ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-lg shadow-[#DFCA9F]/20"
                    : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
                }`}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span>Proof 02: EV Dock</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg rounded-3xl bg-[#14120A] border border-[#DFCA9F]/25 overflow-hidden shadow-2xl text-left hover:border-[#DFCA9F]/40 transition-colors">
              <AnimatePresence mode="wait">
                {activeProject === "dalalfree" ? (
                  <motion.div
                    key="dalalfree"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#DFCA9F] font-bold">Client Web Platform</div>
                        <div className="text-base font-bold text-white font-display">DalalFree</div>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                        </span>
                        <span>LIVE IN PRODUCTION</span>
                      </span>
                    </div>

                    <div className="group/img relative aspect-video w-full overflow-hidden bg-black">
                      <Image
                        src="/images/dalalfree_real_platform.jpg"
                        alt="DalalFree Direct Property Platform"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>

                    <div className="p-4 space-y-1.5 text-xs text-zinc-300">
                      <div className="font-semibold text-white">Direct Buyer-to-Seller Real Estate Platform</div>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        Eliminates broker commissions with direct owner chat, verified listings, and automated workflow.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="evdock"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Client Mobile App</div>
                        <div className="text-base font-bold text-white font-display">EV Dock</div>
                      </div>
                      <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold inline-flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                        </span>
                        <span>HARDWARE PAIRED</span>
                      </span>
                    </div>

                    <div className="group/img relative aspect-video w-full overflow-hidden bg-black">
                      <Image
                        src="/images/ev-dock-showcase.jpg"
                        alt="EV Dock Mobile Smart Charger System"
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/img:scale-105"
                        priority
                      />
                      <div className="absolute inset-0 -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>

                    <div className="p-4 space-y-1.5 text-xs text-zinc-300">
                      <div className="font-semibold text-white">Smart EV Charging IoT Mobile Application</div>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        1-Tap Bluetooth charger reserve and unlock in deep underground parking with zero cell signal.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DFCA9F]/10 border border-[#DFCA9F]/20 text-[11px] font-mono text-[#DFCA9F] mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFCA9F] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#DFCA9F]" />
              </span>
              <span>Scope &amp; Live Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              From ₹50,000<sup className="text-[10px] text-[#DFCA9F]/70 font-normal">*</sup> &amp;{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                real live proof.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed max-w-sm mx-auto">
              Transparent scopes, clear milestones, and zero surprise invoices.
            </p>
          </div>

          {/* Scope Highlight Card */}
          <div className="w-full p-2.5 sm:p-3 rounded-2xl bg-white/[0.04] border border-[#DFCA9F]/30 text-left mb-3">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[11px] font-mono text-[#DFCA9F] font-bold uppercase">MVP Starting Scope:</span>
              <span className="text-xs font-mono font-bold text-white bg-[#DFCA9F]/20 px-2 py-0.5 rounded">From ₹50,000*</span>
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-300 leading-snug">
              1 Focused workflow, 1 platform (Web or Mobile), auth, direct payments &amp; admin. Larger apps quoted transparently upfront.
            </p>
          </div>

          {/* Dedicated Proof Toggle Buttons in between with Generous Spacing */}
          <div className="flex justify-center items-center gap-2.5 mb-3.5 w-full">
            <button
              onClick={() => setActiveProject("dalalfree")}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeProject === "dalalfree"
                  ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-md"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20" />
              </svg>
              <span>DalalFree (Web)</span>
            </button>
            <button
              onClick={() => setActiveProject("evdock")}
              className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeProject === "evdock"
                  ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black shadow-md"
                  : "bg-white/5 text-zinc-400 border border-white/10 hover:text-white"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span>EV Dock (Mobile)</span>
            </button>
          </div>

          <div className="w-full rounded-2xl bg-[#14120A] border border-[#DFCA9F]/30 overflow-hidden shadow-2xl text-left mb-4 sm:mb-5">
            <AnimatePresence mode="wait">
              {activeProject === "dalalfree" ? (
                <motion.div
                  key="dal-m"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2.5 border-b border-white/10 flex justify-between items-center bg-black/40">
                    <div>
                      <div className="text-[9px] font-mono uppercase text-[#DFCA9F] font-bold">Client Web Platform</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-display">DalalFree</div>
                    </div>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                      <span>LIVE</span>
                    </span>
                  </div>
                  <div className="group/m-img relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <Image
                      src="/images/dalalfree_real_platform.jpg"
                      alt="DalalFree Direct Property Platform"
                      fill
                      sizes="(max-width: 640px) 393px, 450px"
                      className="object-cover transition-transform duration-700 group-hover/m-img:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-2.5 space-y-0.5 text-xs text-zinc-300">
                    <div className="font-semibold text-white text-xs">Direct Buyer-to-Seller Real Estate</div>
                    <p className="text-zinc-400 text-[11px] leading-tight">
                      Eliminates broker commissions with direct owner chat &amp; verified listings.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="ev-m"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-2.5 border-b border-white/10 flex justify-between items-center bg-black/40">
                    <div>
                      <div className="text-[9px] font-mono uppercase text-cyan-400 font-bold">Client Mobile App</div>
                      <div className="text-xs sm:text-sm font-bold text-white font-display">EV Dock</div>
                    </div>
                    <span className="text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                      </span>
                      <span>PAIRED</span>
                    </span>
                  </div>
                  <div className="group/m-img relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <Image
                      src="/images/ev-dock-showcase.jpg"
                      alt="EV Dock Mobile Smart Charger System"
                      fill
                      sizes="(max-width: 640px) 393px, 450px"
                      className="object-cover transition-transform duration-700 group-hover/m-img:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-2.5 space-y-0.5 text-xs text-zinc-300">
                    <div className="font-semibold text-white text-xs">Smart EV Charging IoT Mobile App</div>
                    <p className="text-zinc-400 text-[11px] leading-tight">
                      1-Tap Bluetooth charger reserve and unlock in underground parking.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="text-center flex flex-col items-center gap-1.5 w-full">
            <button
              onClick={() => goToSlide(5)}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <span>Swipe up to launch your idea</span>
              <span className="animate-bounce">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SLIDE 06: THE LAUNCH                                         */}
      {/* ============================================================ */}
      <section
        id="slide-6"
        className="relative w-full h-[100dvh] max-h-[100dvh] snap-start snap-always overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-16 bg-gradient-to-b from-[#06060A] to-[#0D0E1A]"
      >
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[500px] rounded-full bg-emerald-600/15 blur-[140px] pointer-events-none" />

        {/* ----------------- DESKTOP 12-COLUMN SPLIT VIEW ----------------- */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center max-w-7xl w-full mx-auto my-auto z-10">
          <div className="lg:col-span-6 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>The Final Decision</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
              So... what are you going to do with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                your idea?
              </span>
            </h2>

            <p className="text-base lg:text-lg text-zinc-300 max-w-xl leading-relaxed font-normal">
              Leave it in your notes app for another year, or have a live product in customers&apos; hands in 30 days?
            </p>

            <div className="p-5 rounded-2xl bg-emerald-500/[0.08] border border-emerald-500/30 space-y-3 max-w-xl shadow-[0_0_25px_rgba(16,185,129,0.08)]">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>Hate filling forms? Chat directly</span>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-all cursor-pointer text-center"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-black" />
                </span>
                <span>Discuss Idea with Danish on WhatsApp</span>
                <span className="inline-block transition-transform duration-200 group-hover:scale-125">💬</span>
              </a>
              <div className="text-[11px] text-zinc-400 text-center font-mono">
                Direct phone: +91 9321456661 &middot; hello@nexfound.in
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2 group/chk">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                  ✓
                </span>
                <span>100% honest feasibility &amp; ruthless scope cut</span>
              </div>
              <div className="flex items-center gap-2 group/chk">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                  ✓
                </span>
                <span>Starting baseline from ₹50,000<sup className="text-[10px] text-zinc-400 font-normal">*</sup></span>
              </div>
              <div className="flex items-center gap-2 group/chk">
                <span className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] flex-shrink-0 group-hover/chk:scale-110 transition-transform">
                  ✓
                </span>
                <span>Founder-led architecture &amp; quality oversight backed by our engineering team</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md rounded-3xl bg-[#0C0D18]/95 border border-white/15 p-7 shadow-2xl text-left space-y-4 hover:border-white/25 transition-colors">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-white font-bold tracking-wider">
                  60-Second Fast Idea Drop
                </span>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Takes 1 Min</span>
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1 font-semibold">
                    1. What do you want to build? *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g. A direct booking link for fitness trainers with instant UPI payments..."
                    value={ideaText}
                    onChange={(e) => setIdeaText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-zinc-300 mb-1 font-semibold">
                    2. Preferred Platform
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["Web First", "Mobile First", "Need Advice"].map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setSelectedPlatform(p)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          selectedPlatform === p
                            ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold shadow"
                            : "bg-white/5 text-zinc-400 border border-white/5 hover:text-white"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={nameText}
                      onChange={(e) => setNameText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-1 font-semibold">
                      WhatsApp or Email *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Phone / email"
                      value={contactText}
                      onChange={(e) => setContactText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full py-3.5 rounded-xl bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#DFCA9F]/20 hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer mt-1 flex items-center justify-center gap-1.5"
                >
                  <span>{isSubmitting ? "Sending Your Idea..." : "Send My Idea for 30-Day Launch"}</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </button>

                <div className="text-[10px] text-zinc-400 text-center font-mono pt-1 leading-relaxed">
                  *₹50k &amp; 30 days are the starting baseline for a focused MVP. Clear proposal sent within 24 hours.
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* ----------------- MOBILE 100VH REEL VIEW (Cohesive & Spacious) ----------------- */}
        <div className="lg:hidden flex flex-col justify-center items-center h-full w-full max-w-[420px] mx-auto z-10 pt-12 pb-14 px-3.5">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 mb-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span>The Final Decision</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-white leading-tight">
              So... what are you going to do with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A]">
                your idea?
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed max-w-sm mx-auto">
              Leave it in your notes, or have a live product in customers&apos; hands in 30 days?
            </p>
          </div>

          <div className="w-full rounded-2xl bg-[#0C0D18]/95 border border-white/20 p-4 sm:p-5 shadow-2xl text-left space-y-2.5 mb-3 sm:mb-4">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:opacity-95 transition-opacity cursor-pointer text-center"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
              </span>
              <span>Chat with Danish on WhatsApp</span>
              <span className="inline-block transition-transform duration-200 group-hover:scale-125">💬</span>
            </a>

            <div className="relative flex py-0.5 items-center">
              <div className="flex-grow border-t border-white/10" />
              <span className="flex-shrink mx-2 text-[10px] font-mono text-zinc-500 uppercase">Or drop idea in 60s</span>
              <div className="flex-grow border-t border-white/10" />
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-2">
              <div>
                <textarea
                  required
                  rows={2}
                  placeholder="e.g. A direct booking link with UPI payments..."
                  value={ideaText}
                  onChange={(e) => setIdeaText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-1">
                {["Web First", "Mobile First", "Need Advice"].map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setSelectedPlatform(p)}
                    className={`py-1.5 px-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                      selectedPlatform === p
                        ? "bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold shadow"
                        : "bg-white/5 text-zinc-400 border border-white/5 hover:text-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={nameText}
                  onChange={(e) => setNameText(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Phone / Email *"
                  value={contactText}
                  onChange={(e) => setContactText(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#121324] border border-white/10 text-white placeholder:text-zinc-600 text-xs focus:outline-none focus:border-[#DFCA9F]/40 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative overflow-hidden w-full py-2.5 rounded-xl bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#DFCA9F]/20 hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer mt-0.5 flex items-center justify-center gap-1.5"
              >
                <span>{isSubmitting ? "Sending..." : "Send My Idea for 30-Day Launch"}</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </form>
          </div>

          <div className="text-center w-full">
            <div className="text-[10px] text-zinc-400 font-mono leading-tight">
              *Starting baseline for focused MVP. Clear proposal sent in 24h.
            </div>
          </div>
        </div>
      </section>

      {/* Invisible measurement spans for dynamic label width calculation */}
      <div
        aria-hidden="true"
        className="fixed -top-[9999px] left-0 pointer-events-none opacity-0 flex"
      >
        {SLIDES.map((s, idx) => (
          <span
            key={`measure-${s.id}`}
            ref={(el) => {
              labelMeasureRefs.current[idx] = el;
            }}
            className="text-[10px] whitespace-nowrap"
          >
            · {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}
