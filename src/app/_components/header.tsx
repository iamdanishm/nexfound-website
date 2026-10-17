"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { kinetics } from "@/lib/kinetics";

// Text constants
const TEXTS = {
  NAV_LINKS: [
    { href: "#work", label: "Work" },
    { href: "#process", label: "30-Day Sprint" },
    { href: "#pricing", label: "Sprint Pricing" },
    { href: "#approach", label: "Reality Check" },
  ],
  CTA_BUTTON: "Start Sprint",
  ALT_TEXT: "Nexfound Monogram",
  BRAND_NAME: "Nexfound",
} as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  // Smooth, jitter-free scroll listener with hysteresis
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled((prev) => {
            if (!prev && currentY > 50) return true;
            if (prev && currentY < 20) return false;
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);



  // Smooth scroll handler
  const smoothScrollTo = useCallback((target: string) => {
    const element = document.querySelector(target);
    if (!element) return;

    const navOffset = 90;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - navOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const target = e.currentTarget.getAttribute("href");
      if (!target) return;

      if (target.startsWith("#")) {
        e.preventDefault();
        const isNotHomePage = window.location.pathname !== "/";

        if (isNotHomePage) {
          sessionStorage.setItem("scrollToSection", target);
          window.location.href = "/";
        } else {
          smoothScrollTo(target);
          setIsMobileMenuOpen(false);
        }
      }
    },
    [smoothScrollTo]
  );

  // Check stored scroll target after page transitions
  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollToSection");
    if (scrollTarget) {
      const timer = setTimeout(() => {
        smoothScrollTo(scrollTarget);
        sessionStorage.removeItem("scrollToSection");
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [smoothScrollTo]);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 md:hidden pointer-events-auto"
            onClick={() => setIsMobileMenuOpen(false)}
            onTouchMove={(e) => e.preventDefault()}
          />
        )}
      </AnimatePresence>

      <header className="fixed top-0 inset-x-0 z-50 py-3 sm:py-4 pointer-events-none w-full">
        <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pointer-events-auto">
          {/* Header Capsule Bar */}
          <div
            className={`flex items-center justify-between px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-[background-color,border-color,box-shadow] duration-300 liquid-glass liquid-lens w-full ${
              isScrolled
                ? "shadow-[0_24px_56px_rgba(0,0,0,0.95)] border-white/[0.18]"
                : "shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
            }`}
          >
            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-transparent.png"
                  alt={TEXTS.ALT_TEXT}
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <span className="font-display italic font-bold text-xl sm:text-2xl tracking-tight text-white transition-colors duration-300">
                {TEXTS.BRAND_NAME}
                <span className="text-[#DFCA9F] ml-0.5">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links with Kinetic Magnetic Sliding Pill */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {TEXTS.NAV_LINKS.map((link) => {
                const isHovered = hoveredNav === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    onMouseEnter={() => setHoveredNav(link.href)}
                    className="relative px-3.5 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 group rounded-lg focus:outline-none"
                  >
                    {isHovered && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 bg-white/[0.08] rounded-lg -z-0 border border-white/[0.12] shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                        transition={kinetics.pill}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Desktop Right CTA Button with Kinetic Press */}
            <div className="hidden md:flex items-center gap-4">
              <motion.a
                href="#contact"
                onClick={handleNavClick}
                whileHover={kinetics.button.whileHover}
                whileTap={kinetics.button.whileTap}
                className="btn-primary text-xs tracking-wider uppercase font-semibold py-2.5 px-5 rounded-full kinetic-btn cursor-pointer inline-flex items-center justify-center"
              >
                <span>{TEXTS.CTA_BUTTON}</span>
              </motion.a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-spring md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1] transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Navigation Dropdown - Perfectly aligned in the same container */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="mt-2.5 md:hidden liquid-glass liquid-lens p-5 rounded-2xl shadow-2xl w-full border border-white/[0.14]"
              >
                <div className="flex flex-col gap-1.5">
                  {TEXTS.NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={handleNavClick}
                      className="tab-spring flex items-center justify-between p-3 rounded-xl text-base font-medium text-zinc-200 hover:bg-white/[0.06] hover:text-white transition-all"
                    >
                      <span>{link.label}</span>
                      <svg
                        className="w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}

                  <div className="pt-3.5 mt-1 border-t border-white/[0.08]">
                    <a
                      href="#contact"
                      onClick={handleNavClick}
                      className="btn-primary w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider block"
                    >
                      {TEXTS.CTA_BUTTON}
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
