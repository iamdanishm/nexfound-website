"use client";

import { useState } from "react";
import SanityImageComp from "./sanity-image";
import { SanityImage } from "@/sanity/lib/image";

type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  description: string;
  mainImage?: SanityImage;
  metrics: {
    conversion: string;
    users: string;
    rating: string;
  };
  gradient: string;
};

export default function Showcase({ projects }: { projects: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="work"
      className="relative overflow-hidden py-12 md:py-12 lg:py-12"
    >
      {/* Background Elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0D3B66] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse" />
      <div
        className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#B08D57] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse"
        style={{ animationDelay: "3s" }}
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
              Featured Projects
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-white mb-2">Transforming</span>
            <span className="block text-gold-gradient text-shadow-gold">
              Visions Into Reality
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto">
            Discover our portfolio of projects where ambitious ideas became
            scalable, high-impact digital products. Each project reflects our
            commitment to strategy, design, and engineering excellence across
            industries.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="liquid-glass-hover group cursor-pointer overflow-hidden relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Image Container */}
              <div className="relative h-[280px] md:h-[360px] overflow-hidden rounded-t-xl">
                {/* Placeholder gradient (replace with actual images) */}
                {project.mainImage ? (
                  <SanityImageComp
                    image={project.mainImage}
                    alt={project.mainImage.alt || project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  />
                ) : (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`}
                  />
                )}
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center space-y-4 px-6">
                    <p className="text-white text-lg font-medium max-w-md">
                      {project.description}
                    </p>
                    {/* <button className="btn btn-secondary text-sm inline-flex items-center gap-2">
                      <span>View Case Study</span>
                      <svg
                        className="w-4 h-4"
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
                    </button> */}
                  </div>
                </div>

                {/* Image Zoom Effect */}
                {/* <div
                  className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#1A1A1A] transform transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                /> */}
              </div>

              {/* Project Info */}
              <div className="p-6 md:p-8 relative">
                {/* Category Badge */}
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-gradient-to-r ${project.gradient} text-black`}
                >
                  {project.category}
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-gold-gradient transition-all duration-300">
                  {project.title}
                </h3>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gold-gradient">
                      {project.metrics.conversion}
                    </div>
                    <div className="text-xs text-[#B3B3B3]">Conversion</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gold-gradient">
                      {project.metrics.users}
                    </div>
                    <div className="text-xs text-[#B3B3B3]">Active Users</div>
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-bold text-gold-gradient">
                      {project.metrics.rating}
                    </div>
                    <div className="text-xs text-[#B3B3B3]">User Rating</div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${project.gradient} w-0 group-hover:w-full transition-all duration-700`}
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
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <a
            href="#contact"
            className="btn btn-secondary inline-flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span>View All Projects</span>
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
    </section>
  );
}
