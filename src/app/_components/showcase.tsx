"use client";

import { useEffect, useRef, useState } from "react";
import SanityImageComp from "./sanity-image";
import { SanityImage } from "@/sanity/lib/image";

// Text constants
const TEXTS = {
  BADGE_TEXT: "Engineering Case Studies",
  TITLE_FIRST_LINE: "Complexity",
  TITLE_SECOND_LINE: "Simplified",
  DESCRIPTION: "Discover our portfolio of projects where ambitious ideas became scalable, high-impact digital products. Each project reflects our commitment to strategy, design, and engineering excellence across industries.",
  ARCHIVE_STAMP: "ARCHIVED",
  CTA_HEADING: "Need this level of engineering?",
  CTA_BUTTON: "Discuss Your Architecture"
} as const;

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    color?: string;
  };
  description: string;
  mainImage?: SanityImage;
  gradient: string;
  tags?: string[];
  status: string;
};

export default function Showcase({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40" />
        <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30" />
        <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 border border-[#B08D57]/25 rotate-60 animate-float-slow opacity-35" />
      </div>

      <div className="container-custom relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 backdrop-blur-md border transition-all duration-300 transform ${
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
                {TEXTS.BADGE_TEXT}
              </span>
            </div>

            {/* Premium Title */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-300 delay-100 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              <span className="block text-white mb-3">{TEXTS.TITLE_FIRST_LINE}</span>
              <span
                className="block bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                {TEXTS.TITLE_SECOND_LINE}
              </span>
            </h2>

            {/* Enhanced Description */}
            <p
              className={`text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed transition-all duration-300 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              {TEXTS.DESCRIPTION}
            </p>
          </div>

          {/* Digital Archive Cards - Unique Masonry Layout */}
          <div
            className={`columns-1 lg:columns-2 xl:columns-3 gap-6 mb-20 transition-all duration-300 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
            style={{ columnFill: "balance" }}
          >
            {projects.map((project, index) => (
              <div
                key={project._id}
                className={`group relative mb-6 break-inside-avoid transition-all duration-300 delay-${200 + index * 50} transform ${
                  isVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95"
                }`}
                style={{
                  transform:
                    index % 3 === 1
                      ? "rotate(-0.5deg)"
                      : index % 3 === 2
                        ? "rotate(0.5deg)"
                        : "rotate(0deg)",
                }}
              >
                {/* Archive Card - Digital Document Style */}
                <div
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10 group-hover:-translate-y-1"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Archive Header - File Tab Style */}
                  <div className="relative h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
                    {/* File Type Icon */}
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full opacity-80"
                        style={{
                          background: `linear-gradient(135deg, ${project.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                        }}
                      />
                      <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                        {project.category.title}
                      </span>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.status === "completed"
                            ? "bg-green-400"
                            : project.status === "in-progress"
                              ? "bg-yellow-400"
                              : "bg-blue-400"
                        } animate-pulse`}
                      />
                      <span className="text-xs text-white/60 capitalize">
                        {formatStatus(project.status)}
                      </span>
                    </div>
                  </div>

                  {/* Project Image - Document Preview Style */}
                  <div className="relative h-32 overflow-hidden bg-gray-900/50">
                    {project.mainImage ? (
                      <SanityImageComp
                        image={project.mainImage}
                        alt={project.mainImage.alt || project.title}
                        fill
                        quality={80}
                        priority={index < 3}
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 ${project.gradient} opacity-30`}
                      />
                    )}

                    {/* Subtle grid overlay */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Archive stamp effect */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-500/30 font-mono">
                        {TEXTS.ARCHIVE_STAMP}
                      </div>
                    </div>
                  </div>

                  {/* Document Content - File Properties Style */}
                  <div className="p-4 bg-gradient-to-b from-transparent to-black/20">
                    {/* Title as Document Name */}
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#F4E6C0] transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description as File Summary */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technology Tags - File Extensions Style */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block px-2 py-1 text-xs bg-[#B08D57]/20 text-[#F4E6C0] rounded border border-[#B08D57]/30 font-mono hover:bg-[#B08D57]/30 transition-colors duration-200"
                          >
                            .{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Archive Bookmark */}
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute -top-3 -right-2 text-xs font-bold text-black rotate-45">
                        
                      </div>
                    </div>
                  </div>

                  {/* Page Curl Effect */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-white/5 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* File Shadow Effect */}
                  <div className="absolute -bottom-1 -right-1 w-full h-full bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div
            className={`text-center transition-all duration-300 delay-400 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <div
              className="p-12 md:p-16 rounded-3xl backdrop-blur-xl border relative overflow-hidden group max-w-4xl mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(176, 141, 87, 0.02) 100%)",
                borderColor: "rgba(176, 141, 87, 0.2)",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-transparent via-[#B08D57]/20 to-transparent animate-shimmer" />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  {TEXTS.CTA_HEADING}
                </h3>

                <button
                  onClick={() => {
                    const element = document.querySelector("#contact");
                    if (element) {
                      const start = window.scrollY;
                      const targetPosition =
                        element.getBoundingClientRect().top +
                        window.scrollY -
                        88;
                      const startTime = performance.now();
                      const duration = 800;

                      const easeInOutQuad = (t: number) => {
                        return t < 0.5
                          ? 2 * t * t
                          : 1 - Math.pow(-2 * t + 2, 2) / 2;
                      };

                      const scrollStep = (timestamp: number) => {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeInOutQuad(progress);

                        window.scrollTo(
                          0,
                          start + (targetPosition - start) * easedProgress,
                        );

                        if (progress < 1) {
                          window.requestAnimationFrame(scrollStep);
                        }
                      };

                      window.requestAnimationFrame(scrollStep);
                    }
                  }}
                  className="group relative px-10 py-5 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {TEXTS.CTA_BUTTON}
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F4E6C0] to-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
