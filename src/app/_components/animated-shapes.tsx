"use client";

import { motion } from "framer-motion";

export function TechNodeNetwork({ className = "" }: { className?: string }) {
    return (
        <div className={`relative w-full h-full ${className}`}>
            <svg
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full origin-center"
            >
                {/* Animated paths simulating data flow or connections */}
                <motion.path
                    d="M 50 150 C 100 50, 200 250, 350 150"
                    stroke="url(#grad1)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.path
                    d="M 50 200 C 150 200, 250 100, 350 100"
                    stroke="url(#grad2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="4 8"
                    initial={{ pathOffset: 0, opacity: 0 }}
                    animate={{ pathOffset: -20, opacity: 0.5 }}
                    transition={{
                        duration: 2,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                />

                {/* Pulsing Nodes */}
                <motion.circle
                    cx="50"
                    cy="150"
                    r="4"
                    fill="#B08D57"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle
                    cx="200"
                    cy="150"
                    r="6"
                    fill="#F4E6C0"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
                <motion.circle
                    cx="350"
                    cy="150"
                    r="4"
                    fill="#1A7F6B"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />

                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#B08D57" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#F4E6C0" stopOpacity="1" />
                        <stop offset="100%" stopColor="#1A7F6B" stopOpacity="0.2" />
                    </linearGradient>
                    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1A7F6B" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#E0E0E0" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0D3B66" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export function CyberHexagons({ className = "" }: { className?: string }) {
    const hexPath =
        "M 50 0 L 100 25 L 100 75 L 50 100 L 0 75 L 0 25 Z";

    return (
        <div className={`relative w-full h-full ${className}`}>
            <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <motion.g
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "100px 100px" }}
                >
                    {/* Inner Hex */}
                    <motion.path
                        d={hexPath}
                        stroke="#B08D57"
                        strokeWidth="0.5"
                        strokeOpacity="0.6"
                        fill="rgba(176, 141, 87, 0.05)"
                        transform="translate(50, 50)"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1.1 }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                    />
                    {/* Outer Ring of Hexagons */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                        const angle = (i * Math.PI) / 3;
                        const x = 50 + 75 * Math.cos(angle);
                        const y = 50 + 75 * Math.sin(angle);
                        return (
                            <motion.path
                                key={i}
                                d={hexPath}
                                stroke="#1A7F6B"
                                strokeWidth="1"
                                strokeOpacity="0.3"
                                transform={`translate(${x}, ${y}) scale(0.3)`}
                                animate={{
                                    opacity: [0.1, 0.5, 0.1],
                                    scale: [0.3, 0.35, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    delay: i * 0.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        );
                    })}
                </motion.g>
            </svg>
        </div>
    );
}

export function MvpArchitectureSVG({ className = "" }: { className?: string }) {
    // A glowing, building-up rocket/architecture symbol
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <motion.path
                d="M100 20 L130 60 L130 140 L70 140 L70 60 Z"
                stroke="white"
                strokeWidth="6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
                d="M100 20 L100 140"
                stroke="white"
                strokeWidth="4"
                strokeDasharray="4 4"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
                d="M70 140 L40 180 M130 140 L160 180 M100 140 L100 180"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.circle cx="100" cy="80" r="16" stroke="white" strokeWidth="3" fill="none" animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.line x1="100" y1="20" x2="100" y2="0" stroke="white" strokeWidth="2" animate={{ opacity: [0, 1, 0], y: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </svg>
    );
}

export function CodeRescueSVG({ className = "" }: { className?: string }) {
    // A shield with a pulse line/code brackets inside
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <motion.path
                d="M100 10 L170 40 L170 100 C170 150 100 190 100 190 C100 190 30 150 30 100 L30 40 Z"
                stroke="white"
                strokeWidth="8"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Pulse line */}
            <motion.path
                d="M60 100 L80 100 L90 70 L110 130 L120 100 L140 100"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
            />
            {/* Code Brackets */}
            <motion.path d="M50 70 L30 100 L50 130" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, -5, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.path d="M150 70 L170 100 L150 130" stroke="rgba(255,255,255,0.4)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" animate={{ x: [0, 5, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
        </svg>
    );
}

export function ProcessAutomationSVG({ className = "" }: { className?: string }) {
    // Interlocking gears and connection nodes
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Left Gear */}
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "70px 70px" }}>
                <circle cx="70" cy="70" r="30" stroke="white" strokeWidth="8" strokeDasharray="15 10" />
                <circle cx="70" cy="70" r="15" fill="none" stroke="white" strokeWidth="6" />
            </motion.g>
            {/* Right Gear */}
            <motion.g animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "135px 120px" }}>
                <circle cx="135" cy="120" r="25" stroke="white" strokeWidth="8" strokeDasharray="12 8" />
                <circle cx="135" cy="120" r="10" fill="none" stroke="white" strokeWidth="6" />
            </motion.g>
            {/* Infinity path / connections */}
            <motion.path
                d="M70 70 C 150 -10, 50 180, 135 120"
                stroke="rgba(255,255,255,0.6)"
                strokeWidth="3"
                strokeDasharray="4 4"
                initial={{ pathOffset: 0 }}
                animate={{ pathOffset: -20 }}
                transition={{ duration: 1, ease: "linear", repeat: Infinity }}
            />
        </svg>
    );
}

export function FractionalCtoSVG({ className = "" }: { className?: string }) {
    // A glowing node/brain or strategy chess piece
    return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            {/* Strategy crown/head */}
            <motion.path
                d="M50 150 L50 90 L70 120 L100 60 L130 120 L150 90 L150 150 Z"
                stroke="white"
                strokeWidth="8"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
                d="M50 160 L150 160"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Central glowing node (strategy/brain) */}
            <motion.circle cx="100" cy="60" r="8" fill="white" animate={{ scale: [1, 1.5, 1], filter: ["blur(0px)", "blur(4px)", "blur(0px)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            <motion.circle cx="70" cy="120" r="5" fill="white" animate={{ scale: [1, 1.5, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
            <motion.circle cx="130" cy="120" r="5" fill="white" animate={{ scale: [1, 1.5, 1], filter: ["blur(0px)", "blur(2px)", "blur(0px)"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
            {/* Connection lines */}
            <motion.path d="M100 60 L70 120 M100 60 L130 120 M70 120 L130 120" stroke="rgba(255,255,255,0.4)" strokeWidth="2" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} />
        </svg>
    );
}
