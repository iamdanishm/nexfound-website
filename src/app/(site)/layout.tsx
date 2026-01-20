import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nexfound | Premium Tech Services for Startups & Businesses",
    template: "%s | Nexfound",
  },
  description:
    "Turn ambitious ideas into scalable digital products with Nexfound. We deliver premium web, mobile, and product solutions that drive real impact.",
  keywords: [
    "Nexfound",
    "nexfound",
    "nexfound.in",
    "nexfoundco",
    "Nexfoundco",
    "startup",
    "business",
    "premium digital services",
    "product development",
    "web design",
    "software development",
    "product design",
    "tech services",
    "technology services",
    "digital studio",
    "startup app development",
    "web development",
    "mobile app development",
    "UX/UI design",
    "product strategy",
    "digital product development",
    "MVP development",
    "scalable digital solutions",
  ],
  applicationName: "Nexfound",
  category: "Technology Services",
  metadataBase: new URL("https://nexfound.in"),
  alternates: {
    canonical: "https://nexfound.in",
    languages: {
      "en-US": "https://nexfound.in",
    },
  },
  openGraph: {
    siteName: "Nexfound",
    title: "Nexfound | Premium Tech Services for Startups & Businesses",
    description:
      "Turn ambitious ideas into scalable digital products with Nexfound. We deliver premium web, mobile, and product solutions that drive real impact.",
    type: "website",
    locale: "en_US",
    url: "https://nexfound.in",
    countryName: "India",
    emails: ["hello@nexfound.in"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1050,
        height: 600,
        alt: "Nexfound - Premium Technology Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexfound | Premium Tech Services for Startups & Businesses",
    description:
      "Turn ambitious ideas into scalable digital products with Nexfound. We deliver premium web, mobile, and product solutions that drive real impact.",
    images: ["/og-image.jpg"],
    creator: "@iam_danishm",
    site: "@iam_danishm",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  referrer: "origin-when-cross-origin",
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
