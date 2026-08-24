"use client";

import { motion } from "framer-motion";

export function MvpArchitectureSVG({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="goldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4E6C0" />
            <stop offset="50%" stopColor="#DFCA9F" />
            <stop offset="100%" stopColor="#AA895B" />
          </linearGradient>
          <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#DFCA9F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8C6A38" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Isometric Grid Foundation */}
        <path
          d="M100 30 L165 67.5 L165 142.5 L100 180 L35 142.5 L35 67.5 Z"
          stroke="rgba(223, 202, 159, 0.25)"
          strokeWidth="1.5"
          fill="rgba(10, 10, 15, 0.6)"
        />
        <path
          d="M100 30 L100 105 L165 142.5 M100 105 L35 142.5"
          stroke="rgba(223, 202, 159, 0.15)"
          strokeWidth="1.5"
        />

        {/* Floating Core Node */}
        <motion.rect
          x="82"
          y="87"
          width="36"
          height="36"
          rx="8"
          fill="url(#goldGrad1)"
          animate={{ y: [87, 83, 87], rotate: [0, 4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <rect
          x="88"
          y="93"
          width="24"
          height="24"
          rx="4"
          fill="#050507"
        />

        {/* Dynamic Connected Peripheral Blocks */}
        <motion.circle
          cx="50"
          cy="85"
          r="6"
          fill="#DFCA9F"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx="150"
          cy="85"
          r="6"
          fill="#C5A880"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.circle
          cx="100"
          cy="155"
          r="6"
          fill="#F4E6C0"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Connection Pulses */}
        <path
          d="M56 85 L82 100 M144 85 L118 100 M100 149 L100 123"
          stroke="url(#goldLineGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>
    </div>
  );
}

export function CodeRescueSVG({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="rescueGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#DFCA9F" />
            <stop offset="100%" stopColor="#8C6A38" />
          </linearGradient>
        </defs>

        {/* Outer Diagnostic Shield */}
        <motion.circle
          cx="100"
          cy="100"
          r="65"
          stroke="rgba(223, 202, 159, 0.2)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <circle
          cx="100"
          cy="100"
          r="48"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth="1"
        />

        {/* Center Precision Diamond & Shield */}
        <path
          d="M100 60 L135 85 L135 125 L100 145 L65 125 L65 85 Z"
          fill="rgba(16, 16, 24, 0.8)"
          stroke="url(#rescueGold)"
          strokeWidth="1.5"
        />

        {/* Check & Radar Line */}
        <motion.path
          d="M85 102 L96 113 L118 89"
          stroke="#F4E6C0"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>
    </div>
  );
}

export function ProcessAutomationSVG({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="streamGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA895B" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#F4E6C0" stopOpacity="1" />
            <stop offset="100%" stopColor="#DFCA9F" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Looping Infinity / Automation Pipeline */}
        <path
          d="M50 100 C50 70, 90 70, 100 100 C110 130, 150 130, 150 100 C150 70, 110 70, 100 100 C90 130, 50 130, 50 100 Z"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
        <motion.path
          d="M50 100 C50 70, 90 70, 100 100 C110 130, 150 130, 150 100 C150 70, 110 70, 100 100 C90 130, 50 130, 50 100 Z"
          stroke="url(#streamGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="40 160"
          animate={{ strokeDashoffset: [-200, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />

        {/* Pipeline Nodes */}
        <circle cx="50" cy="100" r="7" fill="#14141B" stroke="#DFCA9F" strokeWidth="2" />
        <circle cx="100" cy="100" r="9" fill="#050507" stroke="#F4E6C0" strokeWidth="2" />
        <circle cx="150" cy="100" r="7" fill="#14141B" stroke="#DFCA9F" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function FractionalCtoSVG({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="ctoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8C6A38" />
            <stop offset="50%" stopColor="#DFCA9F" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>

        {/* Growth Matrix Grid */}
        <line x1="40" y1="150" x2="160" y2="150" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />
        <line x1="40" y1="40" x2="40" y2="150" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1.5" />

        {/* Exponential Trajectory Curve */}
        <motion.path
          d="M40 140 Q90 135 120 90 T160 45"
          stroke="url(#ctoGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
        />

        {/* Strategic Target Points */}
        <circle cx="90" cy="120" r="4" fill="#C5A880" />
        <circle cx="125" cy="80" r="5" fill="#DFCA9F" />
        <motion.circle
          cx="160"
          cy="45"
          r="7"
          fill="#F4E6C0"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}

export function MarketRadar({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-28 h-28 ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        <circle cx="50" cy="50" r="45" stroke="rgba(223, 202, 159, 0.2)" strokeWidth="1" />
        <circle cx="50" cy="50" r="30" stroke="rgba(223, 202, 159, 0.25)" strokeWidth="1" />
        <circle cx="50" cy="50" r="15" stroke="rgba(223, 202, 159, 0.3)" strokeWidth="1" />
        <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
        <g className="animate-radar-sweep origin-center">
          <path
            d="M50 50 L50 5 A45 45 0 0 1 95 50 Z"
            fill="url(#radarSweepGrad)"
            opacity="0.5"
          />
        </g>
        <defs>
          <linearGradient id="radarSweepGrad" x1="50" y1="50" x2="85" y2="20">
            <stop offset="0%" stopColor="#DFCA9F" stopOpacity="0" />
            <stop offset="100%" stopColor="#DFCA9F" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="3" fill="#DFCA9F" />
      </svg>
    </div>
  );
}

export function DataFlux({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-[#DFCA9F] rounded-full"
          animate={{ height: ["8px", "24px", "8px"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
