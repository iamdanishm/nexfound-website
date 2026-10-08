"use client";

import CTA from "./cta";
import Footer from "./footer";

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
      <CTA
        cta={cta}
        contactEmail={contactEmail}
        contactPhone={contactPhone}
      />
      <Footer footer={footer} socialLinks={socialLinks} />
    </>
  );
}
