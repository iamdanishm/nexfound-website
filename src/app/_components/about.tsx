"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SanityImage from "./sanity-image";

type Pillar = {
  title: string;
  desc: string;
};

type AboutData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
  pillars?: Pillar[];
  teamImage?: any;
  teamTagline?: string;
  foundedInfo?: string;
};

export default function About({ about }: { about?: AboutData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const badgeText = about?.badgeText ?? "Digital Craftsmanship";
  const mainHeading = about?.mainHeading ?? "Building";
  const highlightedText = about?.highlightedText ?? "Digital Excellence";
  const description =
    about?.description ??
    "Nexfound is a premium digital studio obsessed with quality, outcomes, and timeless design. We're a cross-disciplinary team blending strategy, creativity, and engineering at every step to ensure our clients' digital presence stands above the rest.";

  const pillars: Pillar[] =
    about?.pillars && about.pillars.length > 0
      ? about.pillars
      : [
          {
            title: "Strategy",
            desc: "We begin every project with deep strategic thinking, understanding your business goals and crafting digital solutions that drive measurable results.",
          },
          {
            title: "Design",
            desc: "Our design philosophy combines aesthetic excellence with functional brilliance, creating experiences that captivate and convert.",
          },
          {
            title: "Engineering",
            desc: "We build robust, scalable solutions using cutting-edge technologies, ensuring your digital presence performs flawlessly at any scale.",
          },
        ];

  const teamTagline =
    about?.teamTagline ?? "Master Builders of Digital Experiences";
  const foundedInfo =
    about?.foundedInfo ?? "Established 2023 · Expert Craftsmanship Team";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center overflow-hidden "
    >
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(176, 141, 87, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(176, 141, 87, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating Geometric Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-[#B08D57] rounded-full animate-pulse opacity-20" />
        <div className="absolute top-32 right-32 w-1 h-12 bg-[#1A7F6B]/20 rounded-full" />
        <div className="absolute bottom-32 left-24 w-8 h-1 bg-[#B08D57]/20 rounded-full" />
        <div className="absolute bottom-20 right-16 w-3 h-3 bg-[#F4E6C0]/10 rounded-full" />
      </div>

      <div className="container-custom relative z-10 px-6 py-5">
        <div className="max-w-7xl mx-auto">
          {/* Modern Header Section */}
          <div className="text-center mb-16">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 md:mb-12 backdrop-blur-md border transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(176, 141, 87, 0.15) 0%, rgba(244, 230, 192, 0.08) 100%)",
                borderColor: "rgba(176, 141, 87, 0.4)",
                boxShadow: "0 8px 32px rgba(176, 141, 87, 0.1)",
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-[#B08D57] rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-[#F4E6C0] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold text-[#F4E6C0] tracking-wide uppercase">
                {badgeText}
              </span>
            </div>

            {/* Modern Title */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight transition-all duration-1000 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              <span className="block text-white mb-2">{mainHeading}</span>
              <span
                className="block bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 60px rgba(176, 141, 87, 0.4)",
                }}
              >
                {highlightedText}
              </span>
            </h2>

            {/* Clean Description */}
            <p
              className={`text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              {description}
            </p>
          </div>

          {/* Modern Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Modern Pillar Cards Grid */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                {pillars.map((pillar, idx) => (
                  <div
                    key={`${pillar.title}-${idx}`}
                    className={`group transition-all duration-1000 delay-${600 + idx * 150} transform ${
                      isVisible
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-8 opacity-0 scale-95"
                    }`}
                    onMouseEnter={() => setHoveredPillar(idx)}
                    onMouseLeave={() => setHoveredPillar(null)}
                  >
                    {/* Modern Card Design */}
                    <div
                      className="relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(145deg, rgba(255, 255, 255, 0.03) 0%, rgba(176, 141, 87, 0.02) 50%, rgba(0, 0, 0, 0.8) 100%)",
                        borderColor:
                          hoveredPillar === idx
                            ? "rgba(176, 141, 87, 0.4)"
                            : "rgba(176, 141, 87, 0.15)",
                        boxShadow:
                          hoveredPillar === idx
                            ? "0 15px 30px rgba(176, 141, 87, 0.2), 0 0 30px rgba(176, 141, 87, 0.08), inset 0 2px 0 rgba(244, 230, 192, 0.1)"
                            : "0 10px 40px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {/* Ripple Effect */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:animate-ripple"
                        style={{
                          background:
                            "radial-gradient(circle at center, rgba(176, 141, 87, 0.15) 0%, rgba(176, 141, 87, 0.05) 40%, transparent 70%)",
                        }}
                      />

                      {/* Subtle Glow Overlay */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          boxShadow:
                            "inset 0 0 20px rgba(176, 141, 87, 0.08), 0 0 20px rgba(176, 141, 87, 0.06)",
                        }}
                      />

                      {/* Pillar Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#B08D57] to-[#1A7F6B] rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-base">
                              {idx + 1}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl lg:text-2xl font-bold text-white group-hover:text-[#F4E6C0] transition-colors duration-300">
                          {pillar.title}
                        </h3>
                      </div>

                      {/* Pillar Description */}
                      <p className="text-[#B3B3B3] leading-relaxed text-base group-hover:text-gray-300 transition-colors duration-300">
                        {pillar.desc}
                      </p>

                      {/* Hover Effect Elements */}
                      <div className="absolute top-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 border border-[#B08D57]/30 rotate-45" />
                        <div className="absolute inset-0.5 border border-[#1A7F6B]/30 rotate-45" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern Team Section */}
            <div className="lg:col-span-5">
              <div
                className={`transition-all duration-1000 delay-1000 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
              >
                {/* Modern Team Card */}
                <div className="relative max-w-lg mx-auto">
                  {/* Clean Image Container */}
                  <div
                    className="relative rounded-3xl overflow-hidden border border-[#B08D57]/20 shadow-2xl group"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(0, 0, 0, 0.9) 0%, rgba(176, 141, 87, 0.05) 100%)",
                      boxShadow:
                        "0 25px 60px rgba(0, 0, 0, 0.4), inset 0 2px 0 rgba(244, 230, 192, 0.05)",
                    }}
                  >
                    {/* Team Image */}
                    <div className="relative aspect-[5/3] overflow-hidden">
                      {about?.teamImage ? (
                        <SanityImage
                          image={about.teamImage}
                          width={400}
                          height={240}
                          alt="Nexfound Team"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          priority
                        />
                      ) : (
                        <Image
                          src="/logo-transparent.png"
                          alt="Nexfound Team"
                          fill
                          sizes="400px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Modern Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Clean Badge */}
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
                          Our Team
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modern Info Card */}
                  <div className="mt-6 text-center">
                    <div className="inline-block p-4 rounded-2xl bg-linear-to-br from-[#B08D57]/5 to-[#1A7F6B]/5 border border-[#B08D57]/10 backdrop-blur-xl">
                      {/* Team Tagline */}
                      <p className="text-[#F4E6C0] font-semibold text-lg mb-3 leading-relaxed">
                        &quot;{teamTagline}&quot;
                      </p>

                      {/* Modern Divider */}
                      <div className="flex justify-center items-center gap-3 mb-3">
                        <div className="h-px bg-linear-to-r from-transparent via-[#B08D57]/40 to-transparent flex-1" />
                        <div className="w-2 h-2 bg-[#B08D57] rounded-full" />
                        <div className="h-px bg-linear-to-r from-transparent via-[#B08D57]/40 to-transparent flex-1" />
                      </div>

                      {/* Founded Info */}
                      <span className="block text-[#B3B3B3] text-sm font-medium">
                        {foundedInfo}
                      </span>
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-[#B08D57]/30 rounded-tl-md" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-[#1A7F6B]/30 rounded-tr-md" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-[#B08D57]/30 rounded-bl-md" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-[#1A7F6B]/30 rounded-br-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}