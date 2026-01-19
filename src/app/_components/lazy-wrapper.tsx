"use client";

import { ReactNode, useEffect, useState } from "react";

interface LazyWrapperProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

export default function LazyWrapper({
  children,
  threshold = 0.1,
  rootMargin = "50px",
  fallback = null,
}: LazyWrapperProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const element = document.getElementById(
      `lazy-${Math.random().toString(36).substr(2, 9)}`
    );
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  if (!hasBeenVisible) {
    return (
      <div
        id={`lazy-${Math.random().toString(36).substr(2, 9)}`}
        style={{ minHeight: "100px" }}
      >
        {fallback}
      </div>
    );
  }

  return <>{children}</>;
}