"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function Scroll3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.3, targetX: 0.5, targetY: 0.3 });
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [smoothProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isRunning = true;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Subtle micro-particles (White & Electric Indigo)
    const PARTICLE_COUNT = window.innerWidth < 768 ? 20 : 35;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * 2000 - 1000,
      y: Math.random() * 2000 - 1000,
      z: Math.random() * 800 + 200,
      size: Math.random() * 1.2 + 0.4,
      indigo: Math.random() > 0.6,
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      if (!isRunning) return;
      time += 0.005;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;
      const scroll = scrollRef.current;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Dynamic Studio Spotlights (Electric Indigo & Cyan)
      const spotlightX = width * mX;
      const spotlightY = height * (0.2 + scroll * 0.3) + (mY - 0.5) * 80;

      const grad1 = ctx.createRadialGradient(
        spotlightX,
        spotlightY,
        0,
        spotlightX,
        spotlightY,
        width * 0.55
      );
      grad1.addColorStop(0, "rgba(99, 102, 241, 0.08)");
      grad1.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
      grad1.addColorStop(1, "rgba(3, 3, 5, 0)");
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Secondary subtle cyan rim light
      const cyanX = width * (1 - mX * 0.5);
      const cyanY = height * (0.6 + scroll * 0.2);
      const grad2 = ctx.createRadialGradient(
        cyanX,
        cyanY,
        0,
        cyanX,
        cyanY,
        width * 0.45
      );
      grad2.addColorStop(0, "rgba(6, 182, 212, 0.04)");
      grad2.addColorStop(1, "rgba(3, 3, 5, 0)");
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Micro Particle Dust
      const centerX = width / 2;
      const centerY = height * 0.4;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const pulse = Math.sin(time * 2 + p.phase) * 0.3 + 0.7;
        const depth = p.z - scroll * 400;
        const safeDepth = depth <= 50 ? 50 : depth;
        const scale = 500 / safeDepth;

        const px = centerX + (p.x + (mX - 0.5) * 60) * scale;
        const py = centerY + (p.y + (mY - 0.5) * 60) * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale * pulse, 0, Math.PI * 2);
          ctx.fillStyle = p.indigo
            ? `rgba(165, 180, 252, ${0.4 * pulse})`
            : `rgba(255, 255, 255, ${0.25 * pulse})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isRunning = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      {/* Studio Hairline Grid (Linear style) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 40%, transparent 85%)",
        }}
      />

      {/* Retina Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(3, 3, 5, 0.6) 85%, #030305 100%)",
        }}
      />
    </div>
  );
}
