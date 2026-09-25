"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

// Text constants
const TEXTS = {
  DESCRIPTION_DEFAULT:
    "Nexfound turns raw product concepts into live, payment-ready web and mobile MVPs in 30 days.",
  NEWSLETTER_TITLE_DEFAULT: "Founder Dispatch",
  NEWSLETTER_DESCRIPTION_DEFAULT:
    "Practical product insights, launch strategies, and direct lessons from building in public.",
  FOOTER_LINKS_DEFAULT: [
    {
      category: "Navigation",
      links: [
        { label: "Reality Check", href: "#comparison" },
        { label: "30-Day Sprint", href: "#process" },
        { label: "Web vs Mobile", href: "#platform-strategy" },
        { label: "What You Get", href: "#services" },
        { label: "Live Proof", href: "#work" },
      ],
    },
    {
      category: "Specialized",
      links: [
        { label: "Codebase Rescues", href: "#contact" },
        { label: "Technical Advisory", href: "#contact" },
        { label: "The Dispatch", href: "/blog" },
      ],
    },
    {
      category: "Direct Contact",
      links: [
        { label: "Discuss Your Idea", href: "#contact" },
        { label: "WhatsApp Founder Chat", href: "https://wa.me/919321456661" },
        { label: "Email: hello@nexfound.in", href: "mailto:hello@nexfound.in" },
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

      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-5">
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
              <span className="font-display font-bold text-2xl tracking-tight text-white transition-colors">
                Nexfound<span className="text-indigo-400">.</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              {description}
            </p>

            {/* Live Studio Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {footerLinks.map((group, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
                  {group.category}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a
                        href={link.href}
                        className="text-xs sm:text-sm text-zinc-400 hover:text-white transition-colors"
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
            <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-200 uppercase">
              {newsletterTitle}
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {newsletterDescription}
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                placeholder="architect@domain.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-[#0A0A10] border border-white/[0.1] text-xs text-white placeholder:text-[#525260] focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors font-bold"
                aria-label="Subscribe"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Social Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            {TEXTS.COPYRIGHT_TEXT.replace("{year}", currentYear.toString())}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 text-zinc-400">
            <a
              href={socialLinks?.twitter ?? "https://twitter.com/iam_danishm"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Twitter / X
            </a>
            <a
              href={socialLinks?.linkedin ?? "https://linkedin.com"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hello@nexfound.in"
              className="hover:text-white transition-colors"
            >
              hello@nexfound.in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}