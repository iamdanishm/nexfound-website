"use client";

import { useRef, useState, useCallback, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  glareOpacity = 0.18,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const springConfig = { stiffness: 260, damping: 20, mass: 0.5 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normalizedX = (x / rect.width) * 2 - 1;
      const normalizedY = (y / rect.height) * 2 - 1;

      rotateX.set(-normalizedY * maxTilt);
      rotateY.set(normalizedX * maxTilt);

      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      });
    },
    [maxTilt, rotateX, rotateY]
  );

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-3xl overflow-hidden transition-shadow duration-300 ${className}`}
    >
      {/* Specular Glare Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? glareOpacity : 0,
          background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(223, 202, 159, 0.35) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%)`,
        }}
      />

      {/* Card Content with 3D Depth */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
