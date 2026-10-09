"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: "01",
      period: "WEEK 1",
      title: "Scope & Prototype",
      desc: "We isolate your single revenue workflow and map it into clickable, high-fidelity UI and a locked architecture blueprint.",
      tag: "Design Spec",
    },
    {
      number: "02",
      period: "WEEKS 2 – 3",
      title: "Full-Stack Build",
      desc: "We engineer the frontend, relational database, user authentication, and live Stripe/Razorpay payment rails with live staging previews.",
      tag: "Production Code",
    },
    {
      number: "03",
      period: "WEEK 4",
      title: "Launch & IP Handover",
      desc: "We deploy to your custom domain, test real live transactions, and transfer 100% of the GitHub repo and accounts to you.",
      tag: "Day 30 Live",
    },
  ];

  // Fast, layout-thrash-free mouse spotlight handler
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.nativeEvent.offsetX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.nativeEvent.offsetY}px`);
  };

  useGSAP(
    () => {
      // Subtle pulse on the timeline connecting beam
      gsap.to(".process-laser-pulse", {
        x: "100%",
        duration: 3.5,
        repeat: -1,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-20 sm:py-28 overflow-hidden bg-transparent scroll-mt-24"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(223,202,159,0.06)_0%,rgba(223,202,159,0.01)_50%,transparent_70%)] pointer-events-none -z-10" />

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
                Predictable 30-Day Sprint
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white mb-4">
              From concept to live paying users in{" "}
              <span className="text-gold-gradient block sm:inline">30 days.</span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              No endless meetings or vanishing developers. Three clear milestones to get your product in front of real customers.
            </p>
          </div>

          {/* Connected Timeline Grid */}
          <div className="relative">
            {/* Desktop Timeline Connecting Laser Track */}
            <div className="hidden md:block absolute top-[4.5rem] left-[15%] right-[15%] h-[1px] bg-white/[0.08] -z-0 pointer-events-none overflow-hidden">
              <div className="process-laser-pulse w-1/3 h-full bg-gradient-to-r from-transparent via-[#DFCA9F] to-transparent opacity-80" />
            </div>

            {/* 3-Step Cards Grid with Mouse Spotlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch relative z-10">
              {steps.map((step) => (
                <div
                  key={step.number}
                  onMouseMove={handleSpotlight}
                  className="spotlight-card p-7 rounded-2xl bg-[#090A0E] border border-white/[0.08] hover:border-white/[0.22] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Number + Timeline Marker */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="relative">
                        <span className="text-3xl sm:text-4xl font-display font-bold text-[#DFCA9F] group-hover:drop-shadow-[0_0_12px_rgba(223,202,159,0.5)] transition-all">
                          {step.number}
                        </span>
                        {/* Connecting Step Dot Indicator */}
                        <span className="hidden md:inline-block absolute -top-1 -right-3 w-1.5 h-1.5 rounded-full bg-[#DFCA9F]/60" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        {step.period}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-white mb-2.5 group-hover:text-[#F5ECDA] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#DFCA9F] flex items-center gap-1.5">
                      <span>✓</span> {step.tag}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">100% On-Time</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
