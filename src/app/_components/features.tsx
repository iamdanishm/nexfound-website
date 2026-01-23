"use client";

import { useEffect, useRef, useState } from "react";
import SanityImage from "./sanity-image";

// Text constants
const TEXTS = {
  BADGE_TEXT: "High-Performance Engineering",
  TITLE_FIRST_LINE: "The Right Foundation",
  TITLE_SECOND_LINE: "For Every Stage",
  DESCRIPTION:
    "Building software in the AI era is easy; building a business that lasts is hard. Whether launching something new, modernizing legacy operations, or rescuing stalled projects, we bring the architectural precision and engineering rigor needed to turn code into a durable, high-value company asset.",
  CTA_HEADING: "One Partner. Total Clarity.",
  CTA_SUBHEADING:
    "Whether it's a new build or a rescue mission, you get a dedicated lead engineer.",
  CTA_BUTTON: "Discuss Your Project",
} as const;

type Service = {
  _id: string;
  title: string;
  icon: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  description: string;
  gradient: string;
};

export default function FeatFeatures({ services }: { services: Service[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getPreviewDescription = (
    description: string,
    maxLength: number = 100,
  ) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + "...";
  };

  useEffect(() => {
    // Add CSS animations for tech visuals
    const style = document.createElement("style");
    style.textContent = `
      @keyframes circuit-flow {
        0% { background-position: 0 0; }
        100% { background-position: 20px 20px; }
      }

      @keyframes data-stream {
        0% { transform: translateX(-100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }

      @keyframes data-stream-reverse {
        0% { transform: translateX(100%); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
      }

      @keyframes grid-shift {
        0%, 100% { background-position: 0 0; }
        25% { background-position: 5px 5px; }
        50% { background-position: -5px -5px; }
        75% { background-position: 5px -5px; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40" />
        <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30" />
        <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 border border-[#B08D57]/25 rotate-60 animate-float-slow opacity-35" />
      </div>

      <div className="container-custom relative z-10 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 md:mb-12 backdrop-blur-md border transition-all duration-300 transform ${
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
              <span className="block text-white mb-3">
                {TEXTS.TITLE_FIRST_LINE}
              </span>
              <span
                className="block bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
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

          {/* Eye-Catching Service Cards - Enhanced Design */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 transition-all duration-300 delay-300 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {services.map((service, index) => (
              <div
                key={service._id}
                className="group relative h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glass Morphism Card with Tech Visuals */}
                <div
                  className="relative h-full p-8 lg:p-10 rounded-3xl backdrop-blur-2xl border transition-all duration-700 hover:scale-[1.02] overflow-hidden cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(176, 141, 87, 0.08) 25%, rgba(244, 230, 192, 0.05) 50%, rgba(26, 127, 107, 0.04) 75%, rgba(0, 0, 0, 0.8) 100%)",
                    borderColor: "rgba(176, 141, 87, 0.6)",
                    borderWidth: "1.5px",
                    boxShadow:
                      hoveredIndex === index
                        ? "0 30px 100px rgba(176, 141, 87, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(176, 141, 87, 0.4), 0 0 40px rgba(176, 141, 87, 0.3), 0 0 80px rgba(244, 230, 192, 0.15)"
                        : "0 25px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 0 0 1px rgba(176, 141, 87, 0.3)",
                  }}
                >
                  {/* Tech Visuals Background Layers */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    {/* Circuit Pattern Overlay */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(176, 141, 87, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(176, 141, 87, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "20px 20px",
                        animation: "circuit-flow 3s linear infinite",
                      }}
                    />

                    {/* Data Stream Lines */}
                    <div className="absolute top-0 left-0 w-full h-full">
                      <div
                        className="absolute top-10 left-0 w-full h-px opacity-40 animate-pulse"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(244, 230, 192, 0.8), transparent)",
                          animation: "data-stream 2s ease-in-out infinite",
                        }}
                      />
                      <div
                        className="absolute top-20 right-0 w-full h-px opacity-30 animate-pulse"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(176, 141, 87, 0.6), transparent)",
                          animation:
                            "data-stream-reverse 2.5s ease-in-out infinite",
                          animationDelay: "0.5s",
                        }}
                      />
                      <div
                        className="absolute bottom-16 left-0 w-full h-px opacity-35 animate-pulse"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(26, 127, 107, 0.7), transparent)",
                          animation: "data-stream 3s ease-in-out infinite",
                          animationDelay: "1s",
                        }}
                      />
                    </div>

                    {/* Hexagonal Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 25px 25px, rgba(176, 141, 87, 0.4) 2px, transparent 2px),
                          radial-gradient(circle at 75px 75px, rgba(244, 230, 192, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: "50px 50px",
                        animation: "grid-shift 4s ease-in-out infinite",
                      }}
                    />

                    {/* Primary Gradient Wave */}
                    <div
                      className="absolute inset-0 animate-pulse"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient.replace("from-[", "rgba(").replace("] to-[", ", 0.12) 0%, rgba(").replace("]", ", 0.06) 100%")})`,
                      }}
                    />

                    {/* Secondary Animated Overlay */}
                    <div
                      className="absolute inset-0 animate-pulse opacity-70"
                      style={{
                        background: `radial-gradient(ellipse at 30% 20%, ${service.gradient.replace("from-[", "rgba(").replace("] to-[", ", 0.08) 0%, rgba(").replace("]", ", 0.03) 60%")}, transparent 80%)`,
                        animationDelay: "0.3s",
                      }}
                    />

                    {/* Tech Floating Elements */}
                    <div
                      className="absolute top-12 right-16 w-8 h-8 rounded-full opacity-30 animate-bounce"
                      style={{
                        background: `radial-gradient(circle, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")}, transparent)`,
                        animationDelay: "0.1s",
                        animationDuration: "3s",
                        boxShadow: "0 0 20px rgba(176, 141, 87, 0.6)",
                      }}
                    />
                    <div
                      className="absolute bottom-20 left-12 w-6 h-6 rounded-full opacity-40 animate-bounce"
                      style={{
                        background: `radial-gradient(circle, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")}, transparent)`,
                        animationDelay: "0.7s",
                        animationDuration: "4s",
                        boxShadow: "0 0 15px rgba(244, 230, 192, 0.5)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-8 w-4 h-4 rounded-full opacity-25 animate-bounce"
                      style={{
                        background: `radial-gradient(circle, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")}, transparent)`,
                        animationDelay: "1.2s",
                        animationDuration: "5s",
                        boxShadow: "0 0 10px rgba(26, 127, 107, 0.4)",
                      }}
                    />

                    {/* Binary/Data Particles */}
                    <div className="absolute top-8 left-8 text-[#B08D57] font-mono text-xs opacity-60 animate-pulse">
                      01
                    </div>
                    <div
                      className="absolute top-16 right-12 text-[#F4E6C0] font-mono text-xs opacity-40 animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    >
                      10
                    </div>
                    <div
                      className="absolute bottom-12 right-8 text-[#1A7F6B] font-mono text-xs opacity-50 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    >
                      11
                    </div>
                    <div
                      className="absolute bottom-8 left-16 text-[#B08D57] font-mono text-xs opacity-30 animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    >
                      00
                    </div>
                  </div>

                  {/* Enhanced Border Animation */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#B08D57]/20 via-[#F4E6C0]/10 to-[#1A7F6B]/15 animate-shimmer" />
                  </div>

                  {/* Floating Interactive Elements */}
                  <div className="absolute top-6 right-6 w-3 h-3 bg-[#B08D57] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                  <div
                    className="absolute top-12 right-12 w-2 h-2 bg-[#F4E6C0] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <div
                    className="absolute bottom-8 left-8 w-2.5 h-2.5 bg-[#1A7F6B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  />

                  {/* Premium Icon Display */}
                  <div className="relative mb-8 flex justify-center">
                    <div className="relative">
                      {/* Enhanced Icon Glow */}
                      <div
                        className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-70 transition-all duration-700 scale-150"
                        style={{
                          background: `conic-gradient(from 0deg, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")}, transparent, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                        }}
                      />

                      {/* Icon Container with Enhanced Effects */}
                      <div
                        className="relative w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center p-4 transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 overflow-hidden backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                          boxShadow:
                            hoveredIndex === index
                              ? "0 25px 80px rgba(176, 141, 87, 0.6), inset 0 3px 0 rgba(255, 255, 255, 0.4), 0 0 40px rgba(176, 141, 87, 0.3)"
                              : "0 15px 50px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {/* Icon Shine Animation */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm animate-ping" />
                          <div
                            className="absolute bottom-1 right-1 w-4 h-4 bg-white/20 rounded-full blur-sm animate-ping"
                            style={{ animationDelay: "0.3s" }}
                          />
                        </div>

                        <SanityImage
                          image={service.icon}
                          alt={service.title}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="w-full h-full object-contain filter brightness-0 invert drop-shadow-2xl relative z-10 transition-all duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Typography */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 transition-all duration-500 group-hover:text-[#F4E6C0] group-hover:scale-105 transform origin-center">
                      {service.title}
                    </h3>

                    <p className="text-[#B3B3B3] leading-relaxed text-base transition-all duration-500 group-hover:text-white/95 line-clamp-4 group-hover:line-clamp-none">
                      {service.description}
                    </p>
                  </div>

                  {/* Dynamic Bottom Accent */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0.5 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] group-hover:w-20 transition-all duration-700 rounded-full" />
                  </div>

                  {/* Enhanced Shine Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.08) 70%, transparent 100%)",
                      transform:
                        hoveredIndex === index
                          ? "translateX(100%)"
                          : "translateX(-100%)",
                      transition: "transform 1.8s ease-in-out",
                    }}
                  />

                  {/* Magnetic Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#B08D57]/5 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section - Matching Hero CTA */}
          <div
            className={`transition-all duration-300 delay-400 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <div
              className="p-8 md:p-12 rounded-2xl backdrop-blur-xl border relative overflow-hidden group"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(176, 141, 87, 0.02) 100%)",
                borderColor: "rgba(176, 141, 87, 0.2)",
                boxShadow:
                  "0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-transparent via-[#B08D57]/20 to-transparent animate-shimmer" />
              </div>

              <div className="flex flex-col lg:flex-row gap-8 items-center justify-between relative z-10">
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    {TEXTS.CTA_HEADING}
                  </h3>
                  <p className="text-[#B3B3B3] text-base md:text-lg">
                    {TEXTS.CTA_SUBHEADING}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
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
                    className="group relative px-8 py-4 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                  >
                    <span className="relative z-10">{TEXTS.CTA_BUTTON}</span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#F4E6C0] to-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
