"use client";

import { useEffect, useState } from "react";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    // Custom smooth scroll with better easing
    const start = window.scrollY;
    const startTime = performance.now();
    const duration = 800; // 800ms for smooth scroll

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };

    const scrollStep = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);

      window.scrollTo(0, start * (1 - easedProgress));

      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    };

    window.requestAnimationFrame(scrollStep);
  };

  useEffect(() => {
    let animationFrameId: number;
    let lastScrollPosition = 0;
    let isScrolling = false;
    let scrollTimeout: number;

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      // Only update if scroll position changed significantly
      if (Math.abs(scrollTop - lastScrollPosition) > 5 || !isScrolling) {
        lastScrollPosition = scrollTop;
        setProgress(Math.min(scrollPercent, 100));
        setIsVisible(scrollTop > 100);
      }

      isScrolling = true;
    };

    const handleScroll = () => {
      // Cancel any pending animation frame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      // Use requestAnimationFrame for smooth updates
      animationFrameId = requestAnimationFrame(updateProgress);

      // Reset scrolling state after a short delay
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    // Initial check
    updateProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  // Calculate progress with optimized animation
  const circumference = 56.55; // 2 * π * 9 (radius)
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-10 z-60 w-12 h-12 rounded-full bg-black/80 backdrop-blur-md border border-white/15 shadow-lg transition-all duration-150 ease-in-out will-change-transform ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      } hover:bg-black/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#B08D57]/60`}
      aria-label="Scroll to top"
      type="button"
    >
      <div className="relative w-full h-full">
        {/* Optimized Circular Progress - Smooth animation */}
        <svg
          className="absolute inset-0 w-full h-full transform -rotate-90"
          viewBox="0 0 24 24"
        >
          {/* Background circle - subtle */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.5"
            className="transition-opacity duration-150"
          />
          {/* Progress circle - optimized */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-150 ease-out will-change-stroke"
            style={{
              transitionProperty: "stroke-dashoffset",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#B08D57" />
              <stop offset="100%" stopColor="#F4E6C0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Clean Up Arrow Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white"
          >
            <path
              d="M12 19V5M5 12L12 5L19 12"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
};

export default ReadingProgressBar;