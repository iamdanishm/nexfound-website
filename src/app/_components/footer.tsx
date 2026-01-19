"use client";

import Image from "next/image";
import { SanityImage as SanityImageType } from "@/sanity/lib/image";
import toast from "react-hot-toast";

type FooterLink = {
  label: string;
  href: string;
};

type FooterLinkGroup = {
  category: string;
  links: FooterLink[];
};

type SocialLinks = {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
};

type FooterData = {
  description?: string;
  newsletterTitle?: string;
  newsletterDescription?: string;
  footerLinks?: FooterLinkGroup[];
};

type FooterProps = {
  footer?: FooterData;
  logo?: SanityImageType;
  socialLinks?: SocialLinks;
};

export default function Footer({ footer, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const description =
    footer?.description ??
    "Turn ambitious ideas into scalable digital products with Nexfound. We deliver premium web, mobile, and product solutions that drive real impact.";

  const newsletterTitle = footer?.newsletterTitle ?? "Stay Updated";
  const newsletterDescription =
    footer?.newsletterDescription ??
    "Subscribe to our newsletter for the latest insights and exclusive content.";

  const footerLinks: FooterLinkGroup[] =
    footer?.footerLinks && footer.footerLinks.length > 0
      ? footer.footerLinks
      : [
          {
            category: "Services",
            links: [
              { label: "Brand Identity", href: "#services" },
              { label: "Web Development", href: "#services" },
              { label: "Mobile Apps", href: "#services" },
              { label: "Digital Strategy", href: "#services" },
            ],
          },
          {
            category: "Company",
            links: [
              { label: "About Us", href: "#about" },
              { label: "Our Work", href: "#work" },
              { label: "Careers", href: "#careers" },
              { label: "Blog", href: "/blog" },
            ],
          },
          {
            category: "Resources",
            links: [
              { label: "Case Studies", href: "#work" },
              { label: "Testimonials", href: "#testimonials" },
              { label: "FAQ", href: "#faq" },
              { label: "Support", href: "#contact" },
            ],
          },
          {
            category: "Legal",
            links: [
              { label: "Privacy Policy", href: "#privacy" },
              { label: "Terms of Service", href: "#terms" },
              { label: "Cookie Policy", href: "#cookies" },
              { label: "Sitemap", href: "#sitemap" },
            ],
          },
        ];

  const socialLinksArray = [
    {
      name: "LinkedIn",
      href: socialLinks?.linkedin ?? "https://linkedin.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: socialLinks?.twitter ?? "https://twitter.com",
      icon: (
        <svg
          className="w-5 h-5"
          viewBox="0 0 1200 1227"
          fill="currentColor"
          aria-hidden
        >
          <path
            d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
            fill="white"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: socialLinks?.instagram ?? "https://instagram.com",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href === "#") {
      e.preventDefault();
      // Store scroll to top in sessionStorage
      sessionStorage.setItem("scrollToSection", "#");
      // Navigate to home page
      window.location.href = "/";
    } else if (href.startsWith("#")) {
      e.preventDefault();
      // Check if we're on a page with sections (not blog pages)
      const currentPath = window.location.pathname;
      if (currentPath === "/" || currentPath === "") {
        // We're on home page, use smooth scroll
        const element = document.querySelector(href);
        if (element) {
          const start = window.scrollY;
          const targetPosition =
            element.getBoundingClientRect().top + window.scrollY - 88;
          const startTime = performance.now();
          const duration = 800;

          const easeInOutQuad = (t: number) => {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
          };

          const scrollStep = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutQuad(progress);

            window.scrollTo(
              0,
              start + (targetPosition - start) * easedProgress,
            );

            if (progress < 1) {
              window.requestAnimationFrame(scrollStep);
            }
          };

          window.requestAnimationFrame(scrollStep);
        }
      } else {
        // We're on blog or other pages, store target and navigate to home
        sessionStorage.setItem("scrollToSection", href);
        window.location.href = "/";
      }
    } else {
      // Handle external routes (like /blog)
      window.location.href = href;
    }
  };

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const emailInput = e.currentTarget.elements[0] as HTMLInputElement;

    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput.value }),
    });
    const result = await response.json();

    if (result.success) {
      toast.success("Subscribed! You'll get our updates soon.");
      emailInput.value = "";
    } else {
      toast.error(result.error || "Subscription failed.");
    }
  };

  return (
    <footer className="relative bg-black border-t border-[#2E2E2E]/50">
      <div className="container-custom mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid gap-12 lg:gap-16 mb-12">
            {/* Top Section - Brand and Newsletter */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Brand Section */}
              <div className="space-y-6">
                <a
                  href="#"
                  onClick={(e) => handleLinkClick(e, "#")}
                  className="inline-flex items-center space-x-3 group"
                >
                  <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105 shrink-0">
                    <Image
                      src="/logo-transparent.png"
                      alt="Nexfound"
                      fill
                      sizes="48px"
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display text-transparent bg-clip-text bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] text-xl tracking-tight">
                    Nexfound
                  </h3>
                </a>

                <p className="text-[#B3B3B3] leading-relaxed max-w-md text-sm lg:text-base">
                  {description}
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinksArray.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] flex items-center justify-center text-[#B3B3B3] hover:text-gold-gradient hover:border-[#B08D57] transition-all duration-300 hover:scale-105"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Section */}
              <div className="lg:text-right space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {newsletterTitle}
                  </h3>
                  <p className="text-[#B3B3B3] text-sm">
                    {newsletterDescription}
                  </p>
                </div>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-sm lg:ml-auto"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 rounded-lg bg-[#1A1A1A] border border-[#2E2E2E] text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300 text-sm"
                    aria-label="Email address"
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="btn btn-primary px-6 py-3 text-sm whitespace-nowrap"
                    suppressHydrationWarning
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {footerLinks.map((group) => (
                <div key={group.category} className="space-y-4">
                  <h4 className="text-white font-medium text-sm uppercase tracking-wider">
                    {group.category}
                  </h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="text-[#B3B3B3] hover:text-white transition-colors duration-300 text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-[#2E2E2E]/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center md:text-left">
                <p className="text-[#737373] text-sm">
                  © {currentYear} Nexfound. All rights reserved.
                </p>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <a
                  href="#privacy"
                  onClick={(e) => handleLinkClick(e, "#privacy")}
                  className="text-[#737373] hover:text-white transition-colors duration-300"
                >
                  Privacy
                </a>
                <span className="text-[#2E2E2E]">•</span>
                <a
                  href="#terms"
                  onClick={(e) => handleLinkClick(e, "#terms")}
                  className="text-[#737373] hover:text-white transition-colors duration-300"
                >
                  Terms
                </a>
                <span className="text-[#2E2E2E]">•</span>
                <a
                  href="#cookies"
                  onClick={(e) => handleLinkClick(e, "#cookies")}
                  className="text-[#737373] hover:text-white transition-colors duration-300"
                >
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}