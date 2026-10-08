"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Safe SSR registration for Next.js App Router
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  
  // Set default animation easing and timing for consistent studio feel
  gsap.defaults({
    ease: "power3.out",
    duration: 0.6,
  });
}

/**
 * Standard studio animation easing curves (Linear & Apple style)
 */
export const GSAP_EASING = {
  snappy: "power3.out",
  smooth: "power2.out",
  expo: "expo.out",
  anticipate: "back.out(1.4)",
  gentle: "power1.inOut",
} as const;

export { gsap, ScrollTrigger, useGSAP };
