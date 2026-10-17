/**
 * Kinetics Physics Presets
 * Inspired by kinetics.colorion.co & Apple fluid interface design
 * True mass-spring-damper physics for Framer Motion & CSS
 */

export const kinetics = {
  // Tactile button click with physical inertia: slight resistance down, snappy overshoot release
  button: {
    whileHover: {
      scale: 1.02,
      y: -1.5,
      transition: { type: "spring", stiffness: 420, damping: 26, mass: 0.8 },
    },
    whileTap: {
      scale: 0.96,
      y: 1.5,
      transition: { type: "spring", stiffness: 650, damping: 18, mass: 0.6 },
    },
  },

  // Magnetic capsule slider for tabs and floating navigation indicators
  pill: {
    type: "spring" as const,
    stiffness: 400,
    damping: 32,
    mass: 0.8,
  },

  // Card hover lift and 3D tilt snap-back
  card: {
    type: "spring" as const,
    stiffness: 260,
    damping: 24,
    mass: 1.0,
  },

  // Rubber-band tension for drag and toggle interactions
  rubber: {
    type: "spring" as const,
    stiffness: 520,
    damping: 18,
    mass: 0.5,
  },
} as const;
