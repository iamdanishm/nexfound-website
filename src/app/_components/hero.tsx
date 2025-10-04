"use client";

import { useEffect, useRef } from "react";

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
  const mainHeading = hero?.mainHeading ?? "Transform Your";
  const highlightedText = hero?.highlightedText ?? "Digital Presence";
  const subheading =
    hero?.subheading ??
    "Premium digital service studio crafting exceptional experiences for ambitious brands.";

  const cta = {
    title: hero?.cta?.ctaTitle,
    subtitle: hero?.cta?.ctaSubtitle,
  };

  const trustIndicators: TrustItem[] =
    hero?.trustIndicators && hero.trustIndicators.length > 0
      ? hero.trustIndicators
      : [
          { value: "50+", label: "Projects Delivered" },
          { value: "98%", label: "Client Satisfaction" },
          { value: "15+", label: "Industry Awards" },
          { value: "24/7", label: "Support Available" },
        ];

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = hero.getBoundingClientRect();

      const x = (clientX - left) / width;
      const y = (clientY - top) / height;

      hero.style.setProperty("--mouse-x", `${x * 100}%`);
      hero.style.setProperty("--mouse-y", `${y * 100}%`);
    };

    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-8 md:pt-0"
      style={
        {
          "--mouse-x": "50%",
          "--mouse-y": "50%",
        } as React.CSSProperties
      }
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0 animate-gradient-shift"
            style={{
              background:
                "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(176, 141, 87, 0.3) 10%, rgba(244, 230, 192, 0.15) 25%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 animate-gradient-pulse"
            style={{
              background:
                "radial-gradient(ellipse at 20% 30%, rgba(26, 127, 107, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(13, 59, 102, 0.12) 0%, transparent 50%)",
            }}
          />
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(176, 141, 87, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(176, 141, 87, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container-custom relative z-10 section-spacing">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-[slide-up_0.6s_ease-out]"
            style={{
              background:
                "linear-gradient(135deg, rgba(176, 141, 87, 0.1) 0%, rgba(244, 230, 192, 0.05) 100%)",
              border: "1px solid rgba(176, 141, 87, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B08D57] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F4E6C0]"></span>
            </span>
            <span className="text-sm font-medium text-[#F4E6C0] tracking-wide">
              {badgeText}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] animate-[slide-up_0.6s_ease-out_0.1s_both]">
            <span className="block text-white mb-2">{mainHeading}</span>
            <span className="block text-gold-gradient text-shadow-gold">
              {highlightedText}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#B3B3B3] mb-12 max-w-3xl leading-relaxed animate-[slide-up_0.6s_ease-out_0.2s_both]">
            {subheading}
          </p>

          {/* CTA Container with Liquid Glass */}
          <div className="liquid-glass--intense p-8 md:p-10 mb-12 animate-[slide-up_0.6s_ease-out_0.3s_both]">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between relative z-10">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {cta.title}
                </h3>
                <p className="text-[#B3B3B3]">{cta.subtitle}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href="#contact"
                  className="btn btn-primary whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start Your Project
                </a>
                <a
                  href="#work"
                  className="btn btn-secondary whitespace-nowrap"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#work")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-[fade-in_0.8s_ease-out_0.4s_both]">
            {trustIndicators.map((stat, index) => (
              <div
                key={`${stat.label}-${index}`}
                className="text-center group cursor-default"
              >
                <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2 transition-transform duration-300 group-hover:scale-110">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-[#B3B3B3]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => {
            document
              .querySelector("#services")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-2 text-[#B3B3B3] hover:text-[#F4E6C0] transition-colors duration-300 focus-gold"
          aria-label="Scroll to services"
        >
          <span className="text-xs uppercase tracking-widest font-medium">
            Scroll
          </span>
          <svg
            className="w-6 h-6"
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
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#B08D57] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-[#1A7F6B] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </section>
  );
}
