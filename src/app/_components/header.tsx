"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = e.currentTarget.getAttribute("href");
    if (target) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <div
        ref={sentinelRef}
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        aria-hidden="true"
      />

      <header
        className={`header  ${isScrolled ? "animate-header-glow" : "animate-header-pulse"}  h-20 md:h-[88px] px-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 drop-shadow-xl`}
        // className={`header ${isScrolled ? "animate-header-glow" : "animate-header-pulse"}`}
        data-scrolled={isScrolled ? "true" : "false"}
      >
        <div className="container-custom h-full">
          <div className="flex items-center justify-between h-full gap-4 md:gap-6 lg:gap-10">
            {/* Logo with Animated Gradient */}
            <a
              href="#"
              className="flex items-center space-x-3 focus-gold group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
            >
              <div className="relative w-11 h-11 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo-transparent.png"
                  alt="Nexfound"
                  fill
                  className="object-contain"
                  suppressHydrationWarning
                  priority
                />
              </div>
              <h1 className="font-display text-transparent bg-clip-text bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight whitespace-nowrap">
                Nexfound
              </h1>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-10 xl:space-x-12">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="link text-base font-medium tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="btn btn-primary text-xs sm:text-sm md:text-base text-center relative overflow-hidden group px-3 sm:px-4 md:px-5 lg:px-6 shrink-0"
              >
                <span className="relative z-10">Let&apos;s Talk</span>
                <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-11 h-11 flex items-center justify-center focus-gold rounded-xl transition-transform duration-200 active:scale-95 group"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  style={{
                    background: "linear-gradient(90deg, #B08D57, #F4E6C0)",
                  }}
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  style={{
                    background: "linear-gradient(90deg, #B08D57, #F4E6C0)",
                  }}
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  style={{
                    background: "linear-gradient(90deg, #B08D57, #F4E6C0)",
                  }}
                  className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden animate-[fade-in_0.2s_ease-out]"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-20 left-0 right-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="liquid-glass-header mx-4 p-8 flex flex-col space-y-6">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              style={{ animationDelay: `${index * 50}ms` }}
              className="text-xl font-semibold text-white hover:text-gold-gradient transition-all duration-300 py-2 focus-gold rounded-lg animate-[slide-up_0.4s_ease-out_both] relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-[#B08D57] to-[#F4E6C0] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <div className="pt-6 border-t border-[#B08D57]/20">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="btn btn-primary text-sm relative overflow-hidden group w-full"
            >
              <span className="relative z-10">Let&apos;s Talk</span>
              <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
