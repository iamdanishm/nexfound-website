"use client";

import { useEffect, useRef, useState, ReactNode, createElement, ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-lift" | "clip" | "stagger";
  className?: string;
  delay?: number; // ms
  staggerStep?: number; // ms
  threshold?: number;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  variant = "fade-lift",
  className = "",
  delay = 0,
  threshold = 0.1,
  as: Component = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style = delay > 0 ? { transitionDelay: `${delay}ms` } : undefined;

  if (variant === "clip") {
    return createElement(
      Component,
      {
        ref,
        className: `reveal-clip ${className} ${isRevealed ? "is-revealed" : ""}`,
      },
      <span className="reveal-clip-item" style={style}>
        {children}
      </span>
    );
  }

  return createElement(
    Component,
    {
      ref,
      style,
      className: `reveal-fade-lift ${className} ${isRevealed ? "is-revealed" : ""}`,
    },
    children
  );
}
