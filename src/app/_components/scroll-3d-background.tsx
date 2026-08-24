"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring } from "framer-motion";

export default function Scroll3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const scrollRef = useRef(0);
  const { scrollYProgress } = useScroll();

  // Smooth scroll spring for silky motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  });

  // Keep scrollRef updated without triggering useEffect re-runs
  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [smoothProgress]);

  // Track mouse coordinates directly in ref (Zero Re-renders, Zero Resets)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Apple-Grade Procedural 3D Holographic & Kinetic Canvas Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 1. Initialize 3D Constellation Particles
    const PARTICLE_COUNT = 55;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: (Math.random() - 0.5) * 1400,
      y: (Math.random() - 0.5) * 1400,
      z: (Math.random() - 0.5) * 1000,
      baseRadius: Math.random() * 1.6 + 0.6,
      gold: Math.random() > 0.35,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    // 2. Initialize 3D Gyroscope Ring Points (3 Nested Orthogonal Rings)
    const RING_POINTS = 48;
    const rings = [
      { radius: 180, plane: "xy", speed: 0.004, tilt: 0.3 },
      { radius: 240, plane: "yz", speed: -0.003, tilt: 0.6 },
      { radius: 300, plane: "xz", speed: 0.005, tilt: 0.2 },
    ];

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse lerp in ref
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;
      const scroll = scrollRef.current;

      ctx.clearRect(0, 0, width, height);

      const fov = 450;
      const centerX = width / 2 + (mX - 0.5) * 100;
      const centerY = height * (0.35 + scroll * 0.25) + (mY - 0.5) * 60;

      // Global 3D Rotations linked to time, scroll, and mouse
      const rotY = time * 0.3 + scroll * Math.PI * 2.5 + (mX - 0.5) * 0.8;
      const rotX = (mY - 0.5) * 0.6 + Math.sin(time * 0.5) * 0.15;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Helper function to project 3D (x,y,z) to 2D (px, py, scale, alpha)
      const project = (x: number, y: number, z: number) => {
        // Y-axis rotation
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        // X-axis rotation
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const depth = z2 + 800;
        if (depth <= 20) return null;

        const scale = fov / depth;
        return {
          px: centerX + x1 * scale,
          py: centerY + y2 * scale,
          scale,
          depth,
          alpha: Math.min(Math.max((1 - depth / 1600), 0.05), 0.9),
        };
      };

      // ==========================================
      // A. Render 3D Holographic Gyroscope Rings
      // ==========================================
      rings.forEach((ring, ringIdx) => {
        const ringTime = time * ring.speed * 100;
        const ringCos = Math.cos(ringTime);
        const ringSin = Math.sin(ringTime);

        ctx.beginPath();
        let firstPoint: { px: number; py: number } | null = null;

        for (let i = 0; i <= RING_POINTS; i++) {
          const theta = (i / RING_POINTS) * Math.PI * 2;
          let rx = 0;
          let ry = 0;
          let rz = 0;

          if (ring.plane === "xy") {
            rx = Math.cos(theta) * ring.radius;
            ry = Math.sin(theta) * ring.radius;
            rz = (rx * ringCos - ry * ringSin) * ring.tilt;
          } else if (ring.plane === "yz") {
            ry = Math.cos(theta) * ring.radius;
            rz = Math.sin(theta) * ring.radius;
            rx = (ry * ringSin - rz * ringCos) * ring.tilt;
          } else {
            rx = Math.cos(theta) * ring.radius;
            rz = Math.sin(theta) * ring.radius;
            ry = (rx * ringSin - rz * ringCos) * ring.tilt;
          }

          const proj = project(rx, ry, rz);
          if (proj) {
            if (!firstPoint) {
              ctx.moveTo(proj.px, proj.py);
              firstPoint = proj;
            } else {
              ctx.lineTo(proj.px, proj.py);
            }
          }
        }

        ctx.strokeStyle =
          ringIdx === 0
            ? "rgba(223, 202, 159, 0.18)"
            : ringIdx === 1
            ? "rgba(247, 236, 213, 0.12)"
            : "rgba(197, 168, 128, 0.14)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ==========================================
      // B. Render 3D Constellation Nodes & Connectors
      // ==========================================
      const projectedNodes: ({ px: number; py: number; alpha: number; scale: number; gold: boolean; r: number } | null)[] = [];

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = particles[i];
        const proj = project(p.x, p.y, p.z);
        if (proj) {
          const pulse = 0.85 + Math.sin(time * 2.5 + p.pulseOffset) * 0.15;
          const r = Math.max(p.baseRadius * proj.scale * pulse, 0.6);
          projectedNodes.push({ ...proj, gold: p.gold, r });

          // Render Particle
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, r, 0, Math.PI * 2);
          ctx.fillStyle = p.gold
            ? `rgba(223, 202, 159, ${proj.alpha * 0.75})`
            : `rgba(255, 255, 255, ${proj.alpha * 0.5})`;
          ctx.fill();
        } else {
          projectedNodes.push(null);
        }
      }

      // Render Inter-Node Constellation Lines (when distance is close)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const n1 = projectedNodes[i];
        if (!n1) continue;
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const n2 = projectedNodes[j];
          if (!n2) continue;

          const dx = n1.px - n2.px;
          const dy = n1.py - n2.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < 14000) {
            const lineAlpha = (1 - distSq / 14000) * 0.12 * Math.min(n1.alpha, n2.alpha);
            ctx.beginPath();
            ctx.moveTo(n1.px, n1.py);
            ctx.lineTo(n2.px, n2.py);
            ctx.strokeStyle = `rgba(223, 202, 159, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      // ==========================================
      // C. Render Kinetic Harmonic Wave Ribbons
      // ==========================================
      const ribbonCount = 4;
      const points = 40;

      for (let r = 0; r < ribbonCount; r++) {
        const offset = (r / ribbonCount) * Math.PI * 2;
        const scrollDisplacement = scroll * 5 + r * 0.5;
        const yBase = height * 0.5 + (r - ribbonCount / 2) * 65;

        ctx.beginPath();
        let started = false;

        for (let i = 0; i <= points; i++) {
          const u = i / points;
          const px = u * width;

          // Continuous harmonic wave formula (never jumps on mouse move)
          const wave1 = Math.sin(u * 5.2 + time * 1.2 + offset + scrollDisplacement) * 40;
          const wave2 = Math.cos(u * 2.8 - time * 0.7 + offset * 0.4) * 28;
          const mouseInfluence = Math.sin(u * Math.PI) * (mY - 0.5) * 45;

          const py = yBase + wave1 + wave2 + mouseInfluence;

          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }

        const ribbonGrad = ctx.createLinearGradient(0, 0, width, 0);
        ribbonGrad.addColorStop(0, "rgba(223, 202, 159, 0)");
        ribbonGrad.addColorStop(0.3, "rgba(223, 202, 159, 0.12)");
        ribbonGrad.addColorStop(0.5, "rgba(247, 236, 213, 0.2)");
        ribbonGrad.addColorStop(0.7, "rgba(197, 168, 128, 0.14)");
        ribbonGrad.addColorStop(1, "rgba(223, 202, 159, 0)");

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = r === 0 || r === 2 ? 1.2 : 0.8;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030305]">
      {/* Top Ambient Subtle Radiance */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(223, 202, 159, 0.25) 0%, rgba(197, 168, 128, 0.05) 50%, transparent 75%)",
        }}
      />

      {/* Pure Procedural 3D Retina Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Modern Vignette Layer to keep typography razor-sharp */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(3, 3, 5, 0.5) 80%, #030305 100%)",
        }}
      />
    </div>
  );
}
