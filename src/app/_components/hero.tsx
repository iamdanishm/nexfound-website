"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Text constants
const TEXTS = {
  BADGE_TEXT_DEFAULT: "Crafting Digital Excellence",
  MAIN_HEADING_DEFAULT: "Stop Worrying About Code.",
  HIGHLIGHTED_TEXT_DEFAULT: "Start Scaling Your Business.",
  SUBHEADING_DEFAULT:
    "Premium digital service studio crafting exceptional experiences for ambitious brands.",
  HIGHLIGHT_TEXTS: [
    "actually scales.",
    "investors trust.",
    "drives revenue.",
    "never breaks.",
  ],
  TRUST_INDICATORS_DEFAULT: [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Industry Awards" },
    { value: "24/7", label: "Support Available" },
  ],
  CTA_BUTTON_PRIMARY: "Get Your Roadmap Now!",
  CTA_BUTTON_SECONDARY: "View Our Work",
  SCROLL_INDICATOR_TEXT: "Discover More",
} as const;

type TrustItem = { value: string; label: string };

type HeroData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  subheading?: string;
  cta?: { ctaTitle?: string; ctaSubtitle?: string };
  trustIndicators?: TrustItem[];
};

export default function Hero({ hero }: { hero?: HeroData }) {
  const badgeText = hero?.badgeText ?? "Crafting Digital Excellence";
  const mainHeading = hero?.mainHeading ?? "Stop Worrying About Code.";
  const subheading =
    hero?.subheading ??
    "Premium digital service studio crafting exceptional experiences for ambitious brands.";

  const cta = {
    title: hero?.cta?.ctaTitle,
    subtitle: hero?.cta?.ctaSubtitle,
  };

  const trustIndicators: TrustItem[] = useMemo(
    () =>
      hero?.trustIndicators && hero.trustIndicators.length > 0
        ? hero.trustIndicators
        : [
            { value: "50+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "15+", label: "Industry Awards" },
            { value: "24/7", label: "Support Available" },
          ],
    [hero?.trustIndicators],
  );

  const heroRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);
  const [textOpacity, setTextOpacity] = useState(1);

  const highlightTexts = [
    "actually scales.",
    "investors trust.",
    "drives revenue.",
    "never breaks.",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setTextOpacity(0);
      setTimeout(() => {
        setCurrentHighlightIndex((prev) => (prev + 1) % highlightTexts.length);
        setTextOpacity(1);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(176, 141, 87, 0.08) 0%, transparent 40%)`,
        }}
      ></div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-20 h-20 border border-[#B08D57]/20 rounded-full animate-pulse"
          style={{
            top: `${mousePos.y * 80 + 10}%`,
            left: `${mousePos.x * 80 + 10}%`,
            transform: `translate(-50%, -50%) scale(${0.5 + mousePos.x * 0.5})`,
            animation: "float 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-16 h-16 bg-[#F4E6C0]/10 rounded-full blur-sm"
          style={{
            top: `${(1 - mousePos.y) * 70 + 15}%`,
            right: `${mousePos.x * 70 + 15}%`,
            transform: `translate(50%, -50%) scale(${0.3 + mousePos.y * 0.7})`,
            animation: "float 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute w-12 h-12 border-2 border-[#1A7F6B]/30 rotate-45"
          style={{
            bottom: `${mousePos.y * 60 + 20}%`,
            left: `${(1 - mousePos.x) * 60 + 20}%`,
            transform: `translate(-50%, 50%) rotate(${mousePos.x * 180}deg)`,
            animation: "float 10s ease-in-out infinite",
          }}
        />
      </div>
      {/* Main Content Container */}
      <div className="container-custom relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          {/* Enhanced Badge */}
          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-5 mt-8 backdrop-blur-md border transition-all duration-1000 transform ${
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

          {/* Refined Main Heading */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            <span className="block text-white">{mainHeading}</span>
            <span
              className="block bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent transition-all duration-500"
              style={{
                textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                opacity: textOpacity,
              }}
            >
              {highlightTexts[currentHighlightIndex]}
            </span>
          </h1>

          {/* Improved Subtitle */}
          <p
            className={`text-lg md:text-xl text-[#B3B3B3] mb-16 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-400 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {subheading}
          </p>

          {/* Enhanced CTA Section */}
          <div
            className={`mb-20 transition-all duration-1000 delay-600 transform ${
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
                    {cta.title}
                  </h3>
                  <p className="text-[#B3B3B3] text-base md:text-lg">
                    {cta.subtitle}
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
                    <span className="relative z-10">
                      {TEXTS.CTA_BUTTON_PRIMARY}
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-[#F4E6C0] to-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Trust Indicators */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-16 transition-all duration-1000 delay-800 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {trustIndicators.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="group text-center p-8 rounded-2xl backdrop-blur-md border border-[#B08D57]/20 hover:border-[#B08D57]/40 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#B08D57]/10 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(176, 141, 87, 0.08) 0%, rgba(244, 230, 192, 0.04) 100%)",
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(244, 230, 192, 0.1)",
                }}
              >
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-[#B08D57]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />

                <div className="relative z-10">
                  <div className="text-3xl md:text-4xl font-bold mb-4 transition-all duration-300 group-hover:scale-110">
                    <span className="text-white drop-shadow-lg">
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-xs md:text-sm text-[#B3B3B3] font-semibold uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>

                  {/* Decorative element */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refined Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button
          onClick={() => {
            const element = document.querySelector("#services");
            if (element) {
              const start = window.scrollY;
              const targetPosition =
                element.getBoundingClientRect().top + window.scrollY - 88;
              const startTime = performance.now();
              const duration = 800;

              const easeInOutQuad = (t: number) => {
                return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
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
          className="group flex flex-col items-center gap-3 text-[#B3B3B3] hover:text-[#F4E6C0] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B08D57] focus:ring-offset-2 focus:ring-offset-black rounded-lg p-2"
          aria-label="Scroll to services"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold opacity-70 group-hover:opacity-100 transition-opacity">
            Discover More
          </span>
          <div className="relative">
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <div className="absolute inset-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-full h-full border-2 border-[#B08D57] rounded-full animate-ping" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
}
