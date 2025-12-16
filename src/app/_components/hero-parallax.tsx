"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroParallaxProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  className?: string;
}

const HeroParallax = ({
  src,
  alt,
  width,
  height,
  sizes,
  placeholder,
  blurDataURL,
  loading = "eager",
  priority = true,
  className = "",
}: HeroParallaxProps) => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollY = () => {
      setScrollY(window.scrollY);
    };

    // Throttle scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScrollY();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate parallax and zoom effects based on scroll position
  const parallaxOffset = scrollY * 0.5; // Subtle vertical movement
  const zoomScale = 1 + scrollY * 0.0002; // Very subtle zoom (max ~1.1 at ~500px scroll)

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-xl">
      <div
        className="transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `translateY(${parallaxOffset}px) scale(${Math.min(zoomScale, 1.15)})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          loading={loading}
          priority={priority}
          className={`w-full h-auto object-cover transition-all duration-300 ${className}`}
        />
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};

export default HeroParallax;
