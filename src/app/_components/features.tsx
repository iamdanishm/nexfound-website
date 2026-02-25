"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import SanityImage from "./sanity-image";
import {
  MvpArchitectureSVG,
  CodeRescueSVG,
  ProcessAutomationSVG,
  FractionalCtoSVG,
} from "./animated-shapes";

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

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export default function FeatFeatures({ services }: { services: Service[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  return (
    <section
      id="services"
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      {/* Enhanced Background Elements with Framer Motion */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
        {/* Tech Connectivity Nodes SVG */}
        <motion.svg
          className="absolute top-0 right-0 w-[800px] h-[800px] text-[#B08D57]"
          viewBox="0 0 800 800"
          fill="none"
          initial={{ opacity: 0, scale: 1.1, rotate: -5 }}
          whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          <g stroke="currentColor" strokeWidth="1" strokeDasharray="4 8">
            <path d="M 800 0 L 400 400 L 800 800" />
            <path d="M 600 0 L 200 600" />
            <path d="M 1000 200 L 500 500" />
          </g>
          <g fill="currentColor" fillOpacity="0.5">
            <circle cx="400" cy="400" r="4">
              <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="600" r="3">
              <animate attributeName="r" values="3;6;3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="500" cy="500" r="5">
              <animate attributeName="r" values="5;10;5" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </motion.svg>

        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [45, 50, 45],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 opacity-40"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [12, -5, 12],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 opacity-30"
        />
      </div>

      <motion.div
        className="container-custom relative z-10 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <motion.div
              variants={badgeVariants}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 md:mb-12 backdrop-blur-md border border-[#B08D57]/40 shadow-[0_8px_32px_rgba(176,141,87,0.1)] bg-gradient-to-br from-[#B08D57]/15 to-[#F4E6C0]/5"
            >
              <div className="relative flex items-center justify-center w-3 h-3">
                <motion.div
                  className="w-2 h-2 bg-[#B08D57] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 bg-[#F4E6C0] rounded-full opacity-50"
                  animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-semibold text-[#F4E6C0] tracking-wide uppercase">
                {TEXTS.BADGE_TEXT}
              </span>
            </motion.div>

            {/* Premium Title */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="block text-white mb-3">
                {TEXTS.TITLE_FIRST_LINE}
              </span>
              <span
                className="block bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                {TEXTS.TITLE_SECOND_LINE}
              </span>
            </motion.h2>

            {/* Enhanced Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed"
            >
              {TEXTS.DESCRIPTION}
            </motion.p>
          </div>

          {/* Eye-Catching Service Cards - Enhanced Design */}
          <motion.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20"
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                variants={itemVariants}
                className="group relative h-full"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Glass Morphism Card with Tech Visuals */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-8 lg:p-10 rounded-3xl backdrop-blur-2xl border overflow-hidden cursor-pointer"
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
                  {/* Extraneous background animations have been removed to preserve a clean, professional aesthetic */}

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
                        className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full flex items-center justify-center p-4 transition-transform duration-700 group-hover:scale-105 overflow-hidden backdrop-blur-sm"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.replace("from-[", "").replace("] to-[", ", ").replace("]", "")})`,
                          boxShadow:
                            hoveredIndex === index
                              ? "0 25px 80px rgba(176, 141, 87, 0.3), inset 0 3px 0 rgba(255, 255, 255, 0.4), 0 0 40px rgba(176, 141, 87, 0.3)"
                              : "0 15px 50px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {/* Dark Overlay for SVG Contrast */}
                        <div className="absolute inset-0 bg-black/50 rounded-full" />

                        {/* Icon Shine Animation */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500">
                          <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm animate-ping" />
                          <div
                            className="absolute bottom-1 right-1 w-4 h-4 bg-white/20 rounded-full blur-sm animate-ping"
                            style={{ animationDelay: "0.3s" }}
                          />
                        </div>

                        {service.title.toLowerCase().includes("mvp") ? (
                          <MvpArchitectureSVG className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                        ) : service.title.toLowerCase().includes("rescue") ? (
                          <CodeRescueSVG className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                        ) : service.title.toLowerCase().includes("automation") ? (
                          <ProcessAutomationSVG className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                        ) : service.title.toLowerCase().includes("cto") ? (
                          <FractionalCtoSVG className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                        ) : (
                          <SanityImage
                            image={service.icon}
                            alt={service.title}
                            width={96}
                            height={96}
                            sizes="96px"
                            className="w-full h-full object-contain filter brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] relative z-10 transition-transform duration-700 group-hover:scale-[1.05]"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Typography */}
                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 transition-all duration-500 group-hover:text-[#F4E6C0] group-hover:scale-105 transform origin-center">
                      {service.title}
                    </h3>

                    <p className="text-[#B3B3B3] leading-relaxed text-base transition-colors duration-500 group-hover:text-white/95 line-clamp-4 group-hover:line-clamp-none">
                      {service.description}
                    </p>
                  </div>

                  {/* Dynamic Bottom Accent */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <div className="w-0 h-0.5 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] group-hover:w-20 transition-all duration-700 rounded-full" />
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
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section - Matching Hero CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={itemVariants}
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
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#B08D57]/20 to-transparent animate-shimmer" />
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
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(176,141,87,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const element = document.querySelector("#contact");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="relative px-8 py-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] text-black font-semibold rounded-xl overflow-hidden"
                  >
                    <span className="relative z-10">{TEXTS.CTA_BUTTON}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#F4E6C0] to-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
