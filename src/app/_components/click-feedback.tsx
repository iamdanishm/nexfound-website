"use client";

import { useEffect } from "react";

export default function ClickFeedback() {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    let activeRipples = 0;
    const MAX_RIPPLES = 4;

    const handlePointerDown = (e: PointerEvent) => {
      // Find nearest clickable target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest(
        'button, a, [role="button"], .btn-primary, .btn-secondary, .spotlight-card, input[type="submit"], .cursor-pointer, .tab-spring'
      );

      if (!clickable) return;
      if (activeRipples >= MAX_RIPPLES) return;

      activeRipples++;
      const shockwave = document.createElement("div");
      shockwave.className = "tactile-shockwave";
      shockwave.style.left = `${e.clientX}px`;
      shockwave.style.top = `${e.clientY}px`;

      document.body.appendChild(shockwave);

      setTimeout(() => {
        shockwave.remove();
        activeRipples = Math.max(0, activeRipples - 1);
      }, 400);
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return null;
}
