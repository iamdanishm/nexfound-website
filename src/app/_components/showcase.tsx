"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollReveal from "./scroll-reveal";

const CLIENT_PROJECTS = [
  {
    id: "dalalfree",
    clientLabel: "PRODUCTION PLATFORM",
    platformType: "Full-Stack Web Application",
    title: "DalalFree",
    tagline: "Direct Buyer-to-Seller Real Estate Platform",
    summary:
      "A complete property marketplace engineered to eliminate broker commission fees. Includes verified owner listings, real-time messaging, fast property search, and instant checkout workflows.",
    image: "/images/dalalfree_real_platform.jpg",
    imageAlt: "DalalFree Real Estate Web Platform",
    pills: [
      { label: "Platform", val: "Web First" },
      { label: "Core Feature", val: "Direct Owner Chat & Listings" },
      { label: "Business Model", val: "Zero Brokerage Direct" },
    ],
    verifiedOutcome: "Live in production with verified direct transactions.",
    badgeColor: "bg-[#DFCA9F]/10 border-[#DFCA9F]/30 text-[#DFCA9F]",
  },
  {
    id: "evdock",
    clientLabel: "MOBILE ENGINEERING",
    platformType: "Native Mobile Application",
    title: "EV Dock",
    tagline: "Smart EV Charging Mobile Application",
    summary:
      "Hardware-connected mobile app for electric vehicle charging stations. Built with custom Bluetooth communication so drivers can reserve slots and unlock chargers even in deep underground parking with zero cell reception.",
    image: "/images/ev-dock-showcase.jpg",
    imageAlt: "EV Dock Mobile Charging IoT System",
    pills: [
      { label: "Platform", val: "Native iOS & Android" },
      { label: "Core Feature", val: "1-Tap Offline Charger Unlock" },
      { label: "Hardware Link", val: "Bluetooth Low Energy" },
    ],
    verifiedOutcome: "Flawless offline charger unlock across underground parking basements.",
    badgeColor: "bg-[#DFCA9F]/10 border-[#DFCA9F]/30 text-[#DFCA9F]",
  },
];

export default function Showcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CLIENT_PROJECTS[activeIdx];
  const tiltCardRef = useRef<HTMLDivElement>(null);

  // Fast, layout-thrash-free mouse spotlight handler
  const handleSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--mouse-x", `${e.nativeEvent.offsetX}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.nativeEvent.offsetY}px`);
  };

  // 3D Perspective Tilt on Preview Card
  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current) return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    const rotateX = (-y / (rect.height / 2)) * 6; // max 6deg
    const rotateY = (x / (rect.width / 2)) * 6;

    gsap.to(tiltCardRef.current, {
      rotateX,
      rotateY,
      transformPerspective: 1200,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleTiltLeave = () => {
    if (!tiltCardRef.current) return;
    gsap.to(tiltCardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  };

  return (
    <section id="work" className="relative py-20 sm:py-28 overflow-hidden bg-transparent scroll-mt-24">
      {/* Background Accent Halo */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(223,202,159,0.06)_0%,transparent_70%)] blur-[80px] pointer-events-none -z-10" />

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-14">
            <ScrollReveal variant="fade-lift">
              <div className="studio-badge mb-3.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DFCA9F]" />
                <span>Verified Production Proof</span>
              </div>
            </ScrollReveal>

            <ScrollReveal variant="clip" as="h2" className="mb-3">
              <span className="text-3xl sm:text-5xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white">
                Production products shipped{" "}
              </span>
              <span className="text-3xl sm:text-5xl font-display font-bold tracking-normal [word-spacing:0.24em] text-gold-gradient block sm:inline">
                for real founders.
              </span>
            </ScrollReveal>

            <ScrollReveal variant="fade-lift" delay={120}>
              <p className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-xl mx-auto leading-relaxed">
                Explore real Web and Mobile products engineered in 30-day hard sprints—with live verified transactions, offline hardware connectivity, and full founder IP ownership.
              </p>
            </ScrollReveal>

            {/* Project Selector */}
            <ScrollReveal variant="fade-lift" delay={200}>
              <div className="flex justify-center mt-7">
                <div className="p-1 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md flex items-center gap-1 relative">
                  {CLIENT_PROJECTS.map((proj, idx) => (
                    <button
                      key={proj.id}
                      onClick={() => setActiveIdx(idx)}
                      className={`relative px-4 sm:px-6 py-2.5 rounded-lg text-xs sm:text-sm font-mono font-semibold transition-colors duration-200 z-10 flex items-center gap-2 cursor-pointer tab-spring ${
                        activeIdx === idx ? "text-black font-bold" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {activeIdx === idx && (
                        <motion.div
                          layoutId="clientWorkTabPill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F5ECDA] via-[#DFCA9F] to-[#CBB58A] shadow-[0_4px_15px_rgba(223,202,159,0.35)]"
                          transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="text-[10px] font-mono">[{proj.id === "dalalfree" ? "WEB" : "APP"}]</span>
                        <span>{proj.title}</span>
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            activeIdx === idx
                              ? "bg-black/15 text-zinc-900 font-bold"
                              : "bg-white/[0.06] text-zinc-400"
                          }`}
                        >
                          Proof
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* MAIN SHOWCASE FRAME WITH SPOTLIGHT ILLUMINATION */}
          <ScrollReveal variant="fade-lift" delay={260}>
            <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onMouseMove={handleSpotlight}
              className="spotlight-card rounded-2xl sm:rounded-3xl bg-[#08080E]/95 border border-white/[0.1] p-5 sm:p-8 lg:p-10 shadow-2xl overflow-hidden mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
                {/* Left Column: Project Brief */}
                <div className="lg:col-span-5 space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider border ${active.badgeColor}`}>
                      {active.clientLabel}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {active.platformType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-normal [word-spacing:0.24em] text-white mb-1">
                      {active.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#DFCA9F]">
                      {active.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                    {active.summary}
                  </p>

                  {/* Fact Pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {active.pills.map((pill, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs hover:border-white/15 transition-colors"
                      >
                        <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                          {pill.label}
                        </div>
                        <div className="font-semibold text-white mt-0.5 text-xs truncate">
                          {pill.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verified Result Banner */}
                  <div className="p-3 rounded-xl bg-[#DFCA9F]/[0.06] border border-[#DFCA9F]/25 text-xs text-[#F5ECDA] flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#DFCA9F] shadow-[0_0_8px_rgba(223,202,159,0.6)] shrink-0" />
                    <span>{active.verifiedOutcome}</span>
                  </div>
                </div>

                {/* Right Column: Visual Mockup with 3D Tilt */}
                <div
                  className="lg:col-span-7 perspective-[1200px]"
                  onMouseMove={handleTiltMove}
                  onMouseLeave={handleTiltLeave}
                >
                  <div
                    ref={tiltCardRef}
                    className="will-change-transform transition-shadow duration-300"
                  >
                    {active.id === "dalalfree" ? (
                      <div className="w-full rounded-2xl bg-[#0B0B14] border border-white/[0.12] overflow-hidden shadow-2xl group hover:border-[#DFCA9F]/30 transition-colors">
                        {/* Browser Header Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E18] border-b border-white/[0.08]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-white/25" />
                            <span className="w-2 h-2 rounded-full bg-white/10" />
                            <span className="w-2 h-2 rounded-full bg-white/10" />
                            <span className="text-[11px] font-mono text-zinc-400 ml-2">
                              dalalfree.com
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#DFCA9F]/15 text-[#DFCA9F] font-bold border border-[#DFCA9F]/20">
                            LIVE IN PRODUCTION
                          </span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                          <Image
                            src={active.image}
                            alt={active.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            className="object-cover group-hover:scale-102 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/40 to-transparent" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-full rounded-2xl bg-[#0B0B14] border border-white/[0.12] overflow-hidden shadow-2xl group hover:border-[#DFCA9F]/30 transition-colors">
                        {/* Mobile Header Bar */}
                        <div className="flex items-center justify-between px-4 py-2.5 bg-[#0E0E18] border-b border-white/[0.08]">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#DFCA9F] animate-pulse" />
                            <span className="text-[10px] font-mono text-zinc-300 font-bold">
                              EV DOCK MOBILE APPLICATION
                            </span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-[#DFCA9F]/15 text-[#DFCA9F] font-bold border border-[#DFCA9F]/20">
                            HARDWARE PAIRED
                          </span>
                        </div>

                        {/* Image Preview */}
                        <div className="relative aspect-video w-full overflow-hidden bg-black">
                          <Image
                            src={active.image}
                            alt={active.imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            className="object-cover group-hover:scale-102 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0B0B14] via-[#0B0B14]/60 to-transparent" />

                          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-zinc-300">
                            <div className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                              <span className="text-[#DFCA9F] font-bold">Offline Bluetooth:</span>
                              <span>Basement Signal</span>
                            </div>
                            <div className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#DFCA9F]/30 text-[#DFCA9F] flex items-center gap-1.5">
                              <span>✓ Zero Connection Drops</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
