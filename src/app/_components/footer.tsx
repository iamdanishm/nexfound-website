"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Text constants
const TEXTS = {
  DESCRIPTION_DEFAULT:
    "We partner with ambitious founders and teams to design, build, and scale modern web apps, mobile apps, and custom digital products.",
  NEWSLETTER_TITLE_DEFAULT: "Founder Dispatch",
  NEWSLETTER_DESCRIPTION_DEFAULT:
    "Get practical product insights, tech breakdowns, and updates directly in your inbox.",
  FOOTER_LINKS_DEFAULT: [
    {
      category: "Services",
      links: [
        { label: "MVP & Web Apps", href: "#services" },
        { label: "Codebase Fixes", href: "#services" },
        { label: "AI Automation", href: "#services" },
        { label: "Technical Advisory", href: "#services" },
      ],
    },
    {
      category: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Work", href: "#work" },
        { label: "Why Us", href: "#standard" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      category: "Get in Touch",
      links: [
        { label: "Start a Project", href: "#contact" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  ],
  COPYRIGHT_TEXT: "© {year} Nexfound. All rights reserved.",
} as const;

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
  socialLinks?: SocialLinks;
};

export default function Footer({ footer, socialLinks }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const description = footer?.description ?? TEXTS.DESCRIPTION_DEFAULT;
  const newsletterTitle =
    footer?.newsletterTitle ?? TEXTS.NEWSLETTER_TITLE_DEFAULT;
  const newsletterDescription =
    footer?.newsletterDescription ?? TEXTS.NEWSLETTER_DESCRIPTION_DEFAULT;

  const footerLinks: FooterLinkGroup[] =
    footer?.footerLinks && footer.footerLinks.length > 0
      ? footer.footerLinks
      : (TEXTS.FOOTER_LINKS_DEFAULT as unknown as FooterLinkGroup[]);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterEmail("");
      toast.success("Subscribed to the Nexfound Studio Dispatch.", {
        icon: "✨",
      });
    }, 600);
  };

  return (
    <footer className="relative pt-20 pb-12 border-t border-white/[0.08] bg-[#050507] overflow-hidden">
      {/* Background Watermark Monogram */}
      <div className="absolute -bottom-20 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none select-none">
        <Image
          src="/logo-transparent.png"
          alt="Watermark"
          fill
          className="object-contain"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/[0.08]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <Image
                  src="/logo-transparent.png"
                  alt="Nexfound"
                  fill
                  sizes="36px"
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white group-hover:text-gold-gradient transition-colors">
                Nexfound<span className="text-[#DFCA9F]">.</span>
              </span>
            </Link>

            <p className="text-sm text-[#A2A2B0] leading-relaxed max-w-sm">
              {description}
            </p>

            {/* Live Studio Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-[#D4D4DF]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-6">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-[#DFCA9F] uppercase">
                  {group.category}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-[#A2A2B0] hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-[#DFCA9F] uppercase">
              {newsletterTitle}
            </h4>
            <p className="text-xs text-[#A2A2B0] leading-relaxed">
              {newsletterDescription}
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="architect@domain.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#0A0A10] border border-white/[0.1] text-xs text-white placeholder:text-[#525260] focus:outline-none focus:border-[#DFCA9F] transition-colors"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#DFCA9F] text-[#050507] flex items-center justify-center hover:bg-white transition-colors font-bold"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#686878]">
          <div>
            {TEXTS.COPYRIGHT_TEXT.replace("{year}", currentYear.toString())}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-[#A2A2B0]">
            <a
              href={socialLinks?.twitter ?? "https://twitter.com/iam_danishm"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DFCA9F] transition-colors"
            >
              Twitter / X
            </a>
            <a
              href={socialLinks?.linkedin ?? "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#DFCA9F] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@nexfound.in"
              className="hover:text-[#DFCA9F] transition-colors"
            >
              hello@nexfound.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}