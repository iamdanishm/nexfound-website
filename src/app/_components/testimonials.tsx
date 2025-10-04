"use client";

import { useState } from "react";
import SanityImageComp from "./sanity-image";
import { SanityImage } from "@/sanity/lib/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
};

type Testimonial = {
  _id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar?: SanityImage;
  gradient: string;
  project?: Project;
};

type Stat = {
  value: string;
  label: string;
};

type TestimonialsProps = {
  testimonials: Testimonial[];
  stats?: Stat[];
};

export default function Testimonials({
  testimonials,
  stats,
}: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultStats: Stat[] = [
    { value: "500+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "99%", label: "Client Retention" },
    { value: "48h", label: "Response Time" },
  ];

  const testimonialStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-12 md:py-16 lg:py-20"
    >
      {/* Background Elements */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F4E6C0] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1A7F6B] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "4s" }}
      />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
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
              Client Success Stories
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Trusted by</span>
            <span className="block text-gold-gradient text-shadow-gold">
              Industry Leaders
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Hear from clients who&apos;ve
            transformed their businesses with Nexfound.
          </p>
        </div>

        {/* Testimonials Grid - Reduced padding for smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              className="liquid-glass group cursor-pointer p-6 md:p-8 relative overflow-hidden"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Quote Icon - Smaller */}
              <div className="relative mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${testimonial.gradient} transform group-hover:scale-110 transition-all duration-500`}
                  style={{
                    boxShadow:
                      hoveredIndex === index
                        ? "0 8px 32px rgba(176, 141, 87, 0.4)"
                        : "none",
                  }}
                >
                  <svg
                    className="w-5 h-5 text-black"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
              </div>

              {/* Quote Text - Smaller font */}
              <div className="relative z-10 mb-6">
                <p className="text-[#E0E0E0] text-base leading-relaxed group-hover:text-white transition-colors duration-300">
                  {testimonial.quote}
                </p>
              </div>

              {/* Star Rating - Smaller */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <defs>
                      <linearGradient
                        id={`star-gradient-${index}-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#B08D57" />
                        <stop offset="100%" stopColor="#F4E6C0" />
                      </linearGradient>
                    </defs>
                    <path
                      fill={`url(#star-gradient-${index}-${i})`}
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                ))}
              </div>

              {/* Project Badge - Show if linked */}
              {testimonial.project && (
                <div className="mb-4">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${testimonial.gradient} bg-opacity-10 border border-[#B08D57]/30`}
                  >
                    <svg
                      className="w-3.5 h-3.5 text-[#B08D57]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-[#F4E6C0]">
                      Project: {testimonial.project.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Author Info - Smaller avatar */}
              <div className="relative z-10 flex items-center gap-3">
                {/* Avatar with Gradient Border */}
                <div className="relative">
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${testimonial.gradient} blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#2E2E2E] to-[#1A1A1A] flex items-center justify-center">
                    {testimonial.avatar ? (
                      <SanityImageComp
                        image={testimonial.avatar}
                        alt={testimonial.avatar.alt || testimonial.name}
                        width={40}
                        height={40}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-lg font-bold text-gold-gradient">
                        {testimonial.name.charAt(0)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Name & Company - Smaller text */}
                <div>
                  <h4 className="text-white font-bold text-base group-hover:text-gold-gradient transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#B3B3B3] text-xs">
                    {testimonial.role} at{" "}
                    <span className="text-[#E0E0E0]">
                      {testimonial.company}
                    </span>
                  </p>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${testimonial.gradient} w-0 group-hover:w-full transition-all duration-700`}
              />

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
          ))}
        </div>

        {/* Stats Section - Dynamic */}
        <div className="mt-16 md:mt-20">
          <div className="liquid-glass p-8 md:p-12 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {testimonialStats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#B3B3B3]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
