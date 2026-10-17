"use client";

import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId: number | null = null;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Kinetic spring parameters for fluid, weighted tracking
    let targetX = width / 2;
    let targetY = height / 3;
    let currentX = targetX;
    let currentY = targetY;
    let vx = 0;
    let vy = 0;
    const stiffness = 0.12;
    const damping = 0.82;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }
    };

    const SPACING = 28;
    const LENS_RADIUS = 280;
    const LENS_RADIUS_SQ = LENS_RADIUS * LENS_RADIUS;

    const render = () => {
      // Kinetic Mass-Spring-Damper Physics
      const ax = (targetX - currentX) * stiffness;
      const ay = (targetY - currentY) * stiffness;
      vx = (vx + ax) * damping;
      vy = (vy + ay) * damping;
      currentX += vx;
      currentY += vy;

      ctx.clearRect(0, 0, width, height);

      // 1. Batch draw ambient rest dots outside lens radius (ultra performant 0.1ms)
      ctx.fillStyle = "rgba(255, 255, 255, 0.055)";
      ctx.beginPath();
      for (let x = 0; x <= width + SPACING; x += SPACING) {
        for (let y = 0; y <= height + SPACING; y += SPACING) {
          const dx = x - currentX;
          const dy = y - currentY;
          if (dx * dx + dy * dy >= LENS_RADIUS_SQ) {
            ctx.moveTo(x + 0.75, y);
            ctx.arc(x, y, 0.75, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();

      // 2. Draw 3D Bulge & Radial Stretch dots inside hover lens
      const minX = Math.max(0, Math.floor((currentX - LENS_RADIUS) / SPACING) * SPACING);
      const maxX = Math.min(width, Math.ceil((currentX + LENS_RADIUS) / SPACING) * SPACING);
      const minY = Math.max(0, Math.floor((currentY - LENS_RADIUS) / SPACING) * SPACING);
      const maxY = Math.min(height, Math.ceil((currentY + LENS_RADIUS) / SPACING) * SPACING);

      for (let x = minX; x <= maxX; x += SPACING) {
        for (let y = minY; y <= maxY; y += SPACING) {
          const dx = x - currentX;
          const dy = y - currentY;
          const distSq = dx * dx + dy * dy;

          if (distSq < LENS_RADIUS_SQ) {
            const dist = Math.sqrt(distSq);
            const norm = dist / LENS_RADIUS; // 0 at center, 1 at boundary

            // 3D Dome elevation: spherical curve (peak at center, 0 at edge)
            const elevation = Math.cos(norm * (Math.PI / 2));

            // Outward radial grid displacement (the grid spacing stretches apart like a 3D lens)
            const push = Math.sin(norm * Math.PI) * 10;
            const angle = Math.atan2(dy, dx);

            const drawX = x + Math.cos(angle) * push;
            const drawY = y + Math.sin(angle) * push;

            // Always a perfect circle: big in the middle (~2.25px), tapering smoothly to ambient (0.75px)
            const dotRadius = 0.75 + elevation * 1.5;

            // Luminous champagne-white at center, softly tapering to edge
            const opacity = 0.06 + elevation * 0.70;

            ctx.beginPath();
            ctx.arc(drawX, drawY, dotRadius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 236, 218, ${opacity.toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      // Continue animating while there's kinetic momentum
      if (
        Math.abs(targetX - currentX) > 0.2 ||
        Math.abs(targetY - currentY) > 0.2 ||
        Math.abs(vx) > 0.04 ||
        Math.abs(vy) > 0.04
      ) {
        rafId = requestAnimationFrame(render);
      } else {
        rafId = null;
      }
    };

    // Initial render
    render();

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      {/* 1. Subtle Top Champagne Feather Halo */}
      <div
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[650px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(223, 202, 159, 0.08) 0%, rgba(223, 202, 159, 0.015) 50%, transparent 72%)",
        }}
      />

      {/* 2. Interactive 3D Bulge & Radial Stretch Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      />

      {/* 3. Reading Clarity Vignette (Pristine typography contrast) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(3, 3, 5, 0.25) 0%, transparent 75%)",
        }}
      />
    </div>
  );
}
