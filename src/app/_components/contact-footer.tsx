"use client";

import dynamic from "next/dynamic";

const CTA = dynamic(() => import("./cta"), { ssr: false });
const Footer = dynamic(() => import("./footer"), { ssr: false });

type CTAData = {
  badgeText?: string;
  mainHeading?: string;
  highlightedText?: string;
  description?: string;
  formTitle?: string;
  quickContactTitle?: string;
  whyChooseTitle?: string;
  whyChoosePoints?: string[];
};

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

type ContactFooterProps = {
  cta?: CTAData;
  contactEmail?: string;
  contactPhone?: string;
  footer?: FooterData;
  socialLinks?: SocialLinks;
};

export default function ContactFooter({
  cta,
  contactEmail,
  contactPhone,
  footer,
  socialLinks,
}: ContactFooterProps) {
  return (
    <>
      <section id="contact">
        <CTA
          cta={cta}
          contactEmail={contactEmail}
          contactPhone={contactPhone}
        />
      </section>
      <Footer footer={footer} socialLinks={socialLinks} />
    </>
  );
}
