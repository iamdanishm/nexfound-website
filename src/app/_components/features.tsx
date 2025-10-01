"use client";

import { useState } from "react";

const features = [
  {
    icon: "🎨",
    title: "Brand Identity",
    description:
      "Crafting distinctive visual identities that embody your brand's essence and resonate with your audience.",
    gradient: "from-[#B08D57] to-[#F4E6C0]",
  },
  {
    icon: "💻",
    title: "Web Development",
    description:
      "Building lightning-fast, scalable web experiences with cutting-edge technology and pristine code.",
    gradient: "from-[#1A7F6B] to-[#0D3B66]",
  },
  {
    icon: "📱",
    title: "Mobile Apps",
    description:
      "Creating intuitive mobile applications that users love, with seamless performance across all devices.",
    gradient: "from-[#F4E6C0] to-[#B08D57]",
  },
  {
    icon: "🚀",
    title: "Digital Strategy",
    description:
      "Developing data-driven strategies that accelerate growth and establish market dominance.",
    gradient: "from-[#0D3B66] to-[#1A7F6B]",
  },
  {
    icon: "⚡",
    title: "Performance",
    description:
      "Optimizing every millisecond to deliver blazing-fast experiences that convert visitors into customers.",
    gradient: "from-[#B08D57] via-[#F4E6C0] to-[#1A7F6B]",
  },
  {
    icon: "🎯",
    title: "Consulting",
    description:
      "Providing expert guidance to navigate complex digital challenges and unlock new opportunities.",
    gradient: "from-[#1A7F6B] via-[#0D3B66] to-[#B08D57]",
  },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden py-12 md:py-12 lg:py-12"
    >
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#B08D57] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#1A7F6B] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(176, 141, 87, 0.1) 0%, rgba(244, 230, 192, 0.05) 100%)",
              border: "1px solid rgba(176, 141, 87, 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-sm font-medium text-[#F4E6C0] tracking-wide">
              Our Expertise
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Elevate Your</span>
            <span className="block text-gold-gradient text-shadow-gold">
              Digital Excellence
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            From concept to launch, we deliver premium digital solutions that
            transform ambitious visions into market-leading realities.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="liquid-glass-hover group cursor-pointer p-8 md:p-10 relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon with Gradient Background */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${feature.gradient} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? "0 8px 32px rgba(176, 141, 87, 0.4)"
                        : "none",
                  }}
                >
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gold-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#B3B3B3] leading-relaxed group-hover:text-[#E0E0E0] transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`}
              />

              {/* Shine Effect on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)",
                  transform:
                    hoveredIndex === index
                      ? "translateX(100%)"
                      : "translateX(-100%)",
                  transition: "transform 1s ease-in-out",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="liquid-glass p-8 md:p-12 inline-block rounded-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to start your project?
            </h3>
            <p className="text-[#B3B3B3] mb-6 max-w-2xl">
              Let&apos;s discuss how we can help you achieve your digital goals
              and create something extraordinary.
            </p>
            <a
              href="#contact"
              className="btn btn-primary inline-flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span>Schedule a Consultation</span>
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
