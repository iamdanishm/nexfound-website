"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Text constants
const TEXTS = {
  NAV_LINKS: [
    { href: "#services", label: "Services" },
    { href: "#architecture", label: "Tech Stack" },
    { href: "#work", label: "Our Work" },
    { href: "#standard", label: "Why Us" },
    { href: "#about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
  CTA_BUTTON: "Contact Us",
  ALT_TEXT: "Nexfound Monogram",
  BRAND_NAME: "Nexfound",
} as const;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Throttled scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-5 md:py-6"
        }`}
      >
        <div className="container-custom">
          <div
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl transition-all duration-500 ${
              isScrolled
                ? "bg-[#0A0A0F]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_20px_rgba(197,168,128,0.05)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* Brand Logo & Name */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-transparent.png"
                  alt={TEXTS.ALT_TEXT}
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-white group-hover:text-gold-gradient transition-colors duration-300">
                {TEXTS.BRAND_NAME}
                <span className="text-[#DFCA9F] ml-0.5">.</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {TEXTS.NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="relative px-3.5 py-2 text-sm font-medium text-[#A2A2B0] hover:text-white transition-colors duration-200 group rounded-lg focus:outline-none"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-white/[0.04] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFCA9F] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </a>
              ))}
            </nav>

            {/* Desktop Right CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="btn-gold text-xs tracking-tight uppercase font-bold py-2.5 px-5 rounded-xl shadow-[0_0_20px_rgba(223,202,159,0.35)]"
              >
                <span>{TEXTS.CTA_BUTTON}</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-[#DFCA9F] hover:bg-white/[0.08] transition-colors focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-full bg-[#DFCA9F] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[#DFCA9F] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-[#DFCA9F] rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Dropdown Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed top-20 left-4 right-4 z-40 md:hidden glass-panel p-6 rounded-2xl border border-white/[0.12]"
            >
              <div className="flex flex-col gap-2">
                {TEXTS.NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-[#F7F7F9] hover:bg-white/[0.06] hover:text-[#DFCA9F] transition-all"
                  >
                    <span>{link.label}</span>
                    <svg
                      className="w-4 h-4 text-[#A2A2B0]"
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

                <div className="pt-4 mt-2 border-t border-white/[0.08]">
                  <a
                    href="#contact"
                    onClick={handleNavClick}
                    className="btn-gold w-full text-center py-3 rounded-xl shadow-[0_0_20px_rgba(223,202,159,0.35)] font-bold text-xs uppercase tracking-tight"
                  >
                    {TEXTS.CTA_BUTTON}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
