"use client";

import Image from "next/image";
import SanityImage from "./sanity-image";
import { SanityImage as SanityImageType } from "@/sanity/lib/image";

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
  teamImage?: SanityImageType;
  teamTagline?: string;
  foundedInfo?: string;
};

export default function About({ about }: { about?: AboutData }) {
  const badgeText = about?.badgeText ?? "Who We Are";
  const mainHeading = about?.mainHeading ?? "Meet";
  const highlightedText = about?.highlightedText ?? "Nexfound Studio";
  const description =
    about?.description ??
    "Nexfound is a premium digital studio obsessed with quality, outcomes, and timeless design. We're a cross-disciplinary team blending strategy, creativity, and engineering at every step to ensure our clients' digital presence stands above the rest.";

  const pillars: Pillar[] =
    about?.pillars && about.pillars.length > 0
      ? about.pillars
      : [
          {
            title: "Vision",
            desc: "To set the standard for digital excellence, elevating ambitious brands with experiences that inspire and convert.",
          },
          {
            title: "Method",
            desc: "From rapid discovery sprints to precision engineering, every project follows a proven, collaborative framework driven by results.",
          },
          {
            title: "Promise",
            desc: "Exclusivity, transparency, and an unwavering commitment to craft—no shortcuts, no outsourcing, always Nexfound quality.",
          },
        ];

  const teamTagline =
    about?.teamTagline ?? "Driven by Craft. Powered by People.";
  const foundedInfo =
    about?.foundedInfo ?? "Founded in 2023 · 10+ core members";

  return (
    <section id="about" className="relative overflow-hidden py-12 md:py-12">
      {/* Background accents */}
      <div className="absolute top-1/3 -left-24 w-96 h-96 bg-[#B08D57] rounded-full mix-blend-multiply filter blur-[120px] opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#1A7F6B] rounded-full mix-blend-multiply filter blur-[120px] opacity-10 pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(176, 141, 87, 0.12) 0%, rgba(244, 230, 192, 0.08) 100%)",
              border: "1px solid rgba(176, 141, 87, 0.2)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-sm font-medium text-[#F4E6C0] tracking-wide">
              {badgeText}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">{mainHeading}</span>
            <span className="block text-gold-gradient text-shadow-gold">
              {highlightedText}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20">
          {/* Left: Brand Pillars */}
          <div>
            <ul className="space-y-8">
              {pillars.map((pillar, idx) => (
                <li
                  key={`${pillar.title}-${idx}`}
                  className="liquid-glass p-6 md:p-8 rounded-2xl group transition-all duration-300 hover:scale-[1.025]"
                >
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[#B3B3B3]">{pillar.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Team/Firm Image or Signature */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:w-96 h-auto aspect-3/4 rounded-2xl overflow-hidden border-4 border-[#B08D57]/30 shadow-lg mb-6">
              {about?.teamImage ? (
                <SanityImage
                  image={about.teamImage}
                  width={400}
                  height={600}
                  alt="Founder photo"
                  className="w-full h-auto object-cover block"
                  priority
                />
              ) : (
                <Image
                  src="/logo-dark.png"
                  alt="Nexfound Team"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="text-center">
              <p className="text-gold-gradient text-shadow-gold text-lg font-semibold">
                {teamTagline}
              </p>
              <span className="block mt-2 text-[#B3B3B3]">{foundedInfo}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
