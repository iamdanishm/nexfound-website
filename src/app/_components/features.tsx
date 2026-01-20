"use client";

import { useEffect, useRef, useState } from "react";
import SanityImage from "./sanity-image";

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
                Unfair Advantage
              </span>
            </div>

            {/* Premium Title */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              <span className="block text-white mb-3">Engineering Your</span>
              <span
                className="block bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                Market Dominance
              </span>
            </h2>

            {/* Enhanced Description */}
            <p
              className={`text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              We don&apos;t just build apps; we build competitive moats. We
              deliver secure, scalable, and high-performance technical assets
              designed to increase your company&apos;s valuation.
            </p>
          </div>

          {/* Modern Premium Service Cards */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 transition-all duration-1000 delay-600 transform ${
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
                {/* Main Card Container - Modern Design */}
                <div
                  className="relative h-full p-8 lg:p-10 rounded-4xl backdrop-blur-2xl border border-[#B08D57]/30 hover:border-[#B08D57]/60 transition-all duration-700 hover:scale-y-105 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#B08D57]/20"
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(176, 141, 87, 0.05) 0%, rgba(244, 230, 192, 0.03) 25%, rgba(26, 127, 107, 0.02) 50%, rgba(0, 0, 0, 0.8) 100%)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(244, 230, 192, 0.15), 0 0 0 1px rgba(176, 141, 87, 0.1)",
                  }}
                >
                  {/* Animated Background Mesh */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div
                      className="absolute inset-0 animate-pulse"
                      style={{
                        background: `radial-gradient(circle at 20% 80%, ${service.gradient.replace("from-[", "rgba(").replace("] to-[", ", 0.15) 0%, rgba(").replace("]", ", 0.08) 50%")}, transparent 70%)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 animate-pulse"
                      style={{
                        background: `radial-gradient(circle at 80% 20%, ${service.gradient.replace("from-[", "rgba(").replace("] to-[", ", 0.1) 0%, rgba(").replace("]", ", 0.05) 50%")}, transparent 70%)`,
                        animationDelay: "1s",
                      }}
                    />
                  </div>

                  {/* Morphing Border Effect */}
                  <div className="absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="absolute inset-0 rounded-4xl bg-linear-to-r from-[#B08D57]/20 via-[#F4E6C0]/10 to-[#1A7F6B]/20 animate-shimmer" />
                  </div>

                  {/* Floating Particles */}
                  <div
                    className="absolute top-6 right-6 w-2 h-2 bg-[#B08D57] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="absolute top-12 right-12 w-1.5 h-1.5 bg-[#F4E6C0] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"
                    style={{ animationDelay: "0.3s" }}
                  />
                  <div
                    className="absolute bottom-8 left-8 w-1 h-1 bg-[#1A7F6B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce"
                    style={{ animationDelay: "0.5s" }}
                  />

                  {/* Premium Icon Display */}
                  <div className="relative mb-8 flex justify-center">
                    <div className="relative">
                      {/* Icon Background Glow */}
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-all duration-700 scale-150"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                        }}
                      />

                      {/* Icon Container */}
                      <div
                        className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center p-4 transition-all duration-700 group-hover:scale-110 overflow-hidden"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                          boxShadow:
                            hoveredIndex === index
                              ? "0 20px 60px rgba(176, 141, 87, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.2)"
                              : "0 12px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {/* Icon Shine Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-2 left-2 w-6 h-6 bg-white/30 rounded-full blur-sm animate-ping" />
                        </div>

                        <SanityImage
                          image={service.icon}
                          alt={service.title}
                          width={64}
                          height={64}
                          sizes="64px"
                          className="w-full h-full object-contain filter brightness-0 invert drop-shadow-2xl relative z-10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Content with Premium Typography */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 transition-all duration-500 group-hover:text-[#F4E6C0]">
                      {service.title}
                    </h3>

                    <p className="text-[#B3B3B3] leading-relaxed text-base lg:text-lg transition-all duration-500 group-hover:text-[#E0E0E0]">
                      {service.description}
                    </p>
                  </div>

                  {/* Interactive Bottom Element */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] group-hover:w-16 transition-all duration-700 rounded-full" />

                  {/* Corner Accent */}
                  <div className="absolute top-4 right-4 w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div
                      className="w-full h-full border-2 border-[#B08D57] rounded-full animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                  </div>

                  {/* Hover Reveal Effect */}
                  <div className="absolute inset-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-[#B08D57]/5 via-transparent to-[#1A7F6B]/5 animate-pulse" />
                    <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#F4E6C0]/50 to-transparent animate-shimmer" />
                    <div
                      className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#B08D57]/50 to-transparent animate-shimmer"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>

                  {/* Shine Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                      transform:
                        hoveredIndex === index
                          ? "translateX(100%)"
                          : "translateX(-100%)",
                      transition: "transform 1.2s ease-in-out",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div
            className={`text-center transition-all duration-1000 delay-800 transform ${
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
                  Stop Sitting on Your Idea.
                </h3>
                <p className="text-[#B3B3B3] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  Execution is the only thing that counts. Let&apos;s turn your
                  vision into a deployed, revenue-generating product.
                </p>

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
                  className="group relative px-10 py-5 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-2xl transition-all duration-300 hover:shadow-2xl hover:shadow-[#B08D57]/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Book Your Strategy Audit
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
                  <div className="absolute inset-0 bg-linear-to-r from-[#F4E6C0] to-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
