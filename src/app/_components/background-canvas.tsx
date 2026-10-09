"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = 300;
    let currentX = targetX;
    let currentY = targetY;

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    const updateCursor = () => {
      // Smooth interpolation for fluid cinematic tracking
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      if (container) {
        container.style.setProperty("--cursor-x", `${currentX.toFixed(1)}px`);
        container.style.setProperty("--cursor-y", `${currentY.toFixed(1)}px`);
      }

      if (Math.abs(targetX - currentX) > 0.5 || Math.abs(targetY - currentY) > 0.5) {
        rafId = requestAnimationFrame(updateCursor);
      } else {
        rafId = null;
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Precision CAD Grid SVG: 64x64px cell with visible titanium lines and champagne gold (+) crosshair intersections
  const svgGrid = `data:image/svg+xml;utf8,<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="64" y2="0" stroke="rgba(255,255,255,0.075)" stroke-width="1"/><line x1="0" y1="0" x2="0" y2="64" stroke="rgba(255,255,255,0.075)" stroke-width="1"/><path d="M 0 -3.5 L 0 3.5 M -3.5 0 L 3.5 0" stroke="rgba(223,202,159,0.6)" stroke-width="1.2"/><path d="M 64 -3.5 L 64 3.5 M 60.5 0 L 67.5 0" stroke="rgba(223,202,159,0.6)" stroke-width="1.2"/><circle cx="32" cy="32" r="0.8" fill="rgba(255,255,255,0.12)"/></svg>`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none will-change-transform"
      style={
        {
          "--cursor-x": "50%",
          "--cursor-y": "320px",
        } as React.CSSProperties
      }
    >
      {/* 1. Top Cinematic Studio Champagne Halo (Zero-lag pure CSS gradient) */}
      <div
        className="absolute -top-[16%] left-1/2 -translate-x-1/2 w-[1350px] h-[780px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(223, 202, 159, 0.20) 0%, rgba(223, 202, 159, 0.04) 48%, transparent 75%)",
        }}
      />

      {/* 2. Interactive Cursor Flashlight Spotlight (Follows cursor smoothly across grid) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(circle 520px at var(--cursor-x) var(--cursor-y), rgba(223, 202, 159, 0.12) 0%, rgba(223, 202, 159, 0.025) 50%, transparent 70%)",
        }}
      />

      {/* 3. Mid-Page Subtle Warmth Halos for Showcase, Process & Pricing */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[1150px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(223, 202, 159, 0.075) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute top-[70%] left-1/2 -translate-x-1/2 w-[1150px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(223, 202, 159, 0.065) 0%, transparent 65%)",
        }}
      />

      {/* 4. Precision CAD Architectural Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('${svgGrid}')`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* 5. Soft Center Reading Vignette (Keeps headline typography punchy & high-contrast) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 32%, rgba(3, 3, 5, 0.4) 0%, transparent 75%)",
        }}
      />

      {/* 6. Vertical Architectural Guideline Hairlines (Framing container like technical drafting) */}
      <div className="absolute top-0 bottom-0 left-[max(1rem,calc(50%-640px))] w-[1px] bg-gradient-to-b from-transparent via-[#DFCA9F]/30 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-[max(1rem,calc(50%-640px))] w-[1px] bg-gradient-to-b from-transparent via-[#DFCA9F]/30 to-transparent pointer-events-none" />
    </div>
  );
}
