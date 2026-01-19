"use client";

import { useEffect, useRef, useState } from "react";
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

  const defaultStats: Stat[] = [
    { value: "500+", label: "Happy Clients" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "99%", label: "Client Retention" },
    { value: "48h", label: "Response Time" },
  ];

  const testimonialStats = stats && stats.length > 0 ? stats : defaultStats;

  return (
    <section
      ref={sectionRef}
      id="testimonials"
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
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 backdrop-blur-md border transition-all duration-1000 transform ${
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
                The Verdict
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
              <span className="block text-white mb-3">
                Don&apos;t Trust Us.
              </span>
              <span
                className="block bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                Trust Them.
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
              We don&apos;t hide behind NDAs. We build public wins. Just
              non-technical founders who turned napkin sketches into
              revenue-generating assets.
            </p>
          </div>

          {/* Client Endorsement Documents - Archive Layout */}
          <div
            className={`columns-1 lg:columns-2 xl:columns-3 gap-6 mb-20 transition-all duration-1000 delay-600 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
            style={{ columnFill: "balance" }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial._id}
                className={`group relative mb-6 break-inside-avoid transition-all duration-1000 delay-${700 + index * 100} transform ${
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
                {/* Client Endorsement Document - Archive Style */}
                <div
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10 group-hover:-translate-y-1"
                  style={{
                    boxShadow:
                      "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Document Header - Client Info Tab Style */}
                  <div className="relative h-12 bg-linear-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
                    {/* Client Avatar & Info */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden bg-linear-to-br from-[#2E2E2E] to-[#1A1A1A] flex items-center justify-center">
                        {testimonial.avatar ? (
                          <SanityImageComp
                            image={testimonial.avatar}
                            alt={testimonial.avatar.alt || testimonial.name}
                            width={24}
                            height={24}
                            className="object-cover rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-bold text-[#F4E6C0]">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                          {testimonial.name}
                        </span>
                        <div className="text-xs text-white/60">
                          {testimonial.company}
                        </div>
                      </div>
                    </div>

                    {/* Rating Status */}
                    <div className="flex items-center gap-1">
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 fill-current text-[#F4E6C0]"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-white/60 ml-1">
                        {testimonial.rating}/5
                      </span>
                    </div>
                  </div>

                  {/* Document Content - Testimonial Body */}
                  <div className="p-4 bg-linear-to-b from-transparent to-black/20">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-[#B08D57]/20 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#F4E6C0]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <div className="text-center mb-4">
                      <p className="text-white/80 text-sm leading-relaxed italic">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Client Role */}
                    <div className="text-center mb-4">
                      <div className="text-xs text-white/60 uppercase tracking-wider">
                        {testimonial.role}
                      </div>
                    </div>

                    {/* Project Association */}
                    {testimonial.project && (
                      <div className="flex justify-center mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#B08D57]/10 border border-[#B08D57]/30">
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
                            {testimonial.project.title}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Page Curl Effect */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 bg-linear-to-bl from-white/10 to-white/5 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Document Shadow Effect */}
                  <div className="absolute -bottom-1 -right-1 w-full h-full bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Stats Section - Client Success Metrics */}
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
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
                  A Track Record of Wins
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {testimonialStats.map((stat, idx) => (
                    <div key={idx} className="text-center group">
                      <div className="text-3xl md:text-4xl font-bold text-gold-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#B3B3B3] group-hover:text-white transition-colors duration-300">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
