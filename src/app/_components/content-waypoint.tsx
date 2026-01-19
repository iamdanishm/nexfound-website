"use client";

import { useEffect, useRef, useState } from "react";

interface ContentWaypointProps {
  children: React.ReactNode;
  animation?:
    | "fade-in"
    | "slide-up"
    | "slide-left"
    | "slide-right"
    | "scale-in";
  delay?: number;
  threshold?: number;
  className?: string;
}

const ContentWaypoint = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  className = "",
}: ContentWaypointProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold]);

  const animationClasses = {
    "fade-in": "opacity-0 animate-[fade-in_0.6s_ease-out_forwards]",
    "slide-up":
      "opacity-0 translate-y-4 animate-[slide-up_0.6s_ease-out_forwards]",
    "slide-left":
      "opacity-0 -translate-x-4 animate-[slide-left_0.6s_ease-out_forwards]",
    "slide-right":
      "opacity-0 translate-x-4 animate-[slide-right_0.6s_ease-out_forwards]",
    "scale-in": "opacity-0 scale-95 animate-[scale-in_0.6s_ease-out_forwards]",
  };

  return (
    <div
      ref={elementRef}
      className={`${isVisible ? animationClasses[animation] : "opacity-0"} ${className}`}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
};

export default ContentWaypoint;