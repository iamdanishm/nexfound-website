import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./(site)/globals.css";
import { Toaster } from "react-hot-toast";
import ServiceWorkerRegister from "./_components/sw-register";

// Text constants for metadata
const METADATA_TEXTS = {
  TITLE_DEFAULT: "Nexfound | Custom Web & Mobile Product Development",
  TITLE_TEMPLATE: "%s | Nexfound",
  DESCRIPTION:
    "We partner with ambitious founders to design, build, and scale custom web and mobile apps. Quality code, fast turnarounds, and transparent communication.",
  KEYWORDS: [
    "Nexfound",
    "nexfound",
    "nexfound.in",
    "nexfoundco",
    "Nexfoundco",
    "digital product development",
    "web development",
    "mobile apps",
    "MVP development",
    "custom software",
    "codebase rescue",
  ],
  APPLICATION_NAME: "Nexfound",
  CATEGORY: "Technology Services",
  METADATA_BASE_URL: "https://nexfound.in",
  ALTERNATES_CANONICAL: "https://nexfound.in",
  OG_TITLE: "Nexfound | Custom Web & Mobile Product Development",
  OG_DESCRIPTION:
    "We partner with ambitious founders to design, build, and scale custom web and mobile apps. Quality code, fast turnarounds, and transparent communication.",
  OG_TYPE: "website",
  OG_LOCALE: "en_US",
  OG_COUNTRY_NAME: "India",
  OG_EMAILS: ["hello@nexfound.in"],
  OG_IMAGES: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 633,
      alt: "Nexfound - Premium Technology Services",
    },
  ],
  TWITTER_CARD: "summary_large_image",
  TWITTER_TITLE: "Nexfound | Architecture-First Digital Engineering Studio",
  TWITTER_DESCRIPTION:
    "We architect and engineer scalable digital products for ambitious brands. From Day-1 MVP builds to enterprise scale engineering and codebase rescues.",
  TWITTER_CREATOR: "@iam_danishm",
  TWITTER_SITE: "@iam_danishm",
  ICONS: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  REFERRER: "origin-when-cross-origin",
} as const;

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: METADATA_TEXTS.TITLE_DEFAULT,
    template: METADATA_TEXTS.TITLE_TEMPLATE,
  },
  description: METADATA_TEXTS.DESCRIPTION,
  keywords: METADATA_TEXTS.KEYWORDS as unknown as string[],
  applicationName: METADATA_TEXTS.APPLICATION_NAME,
  category: METADATA_TEXTS.CATEGORY,
  metadataBase: new URL(METADATA_TEXTS.METADATA_BASE_URL),
  alternates: {
    canonical: METADATA_TEXTS.ALTERNATES_CANONICAL,
    languages: {
      "en-US": METADATA_TEXTS.ALTERNATES_CANONICAL,
    },
  },
  openGraph: {
    siteName: METADATA_TEXTS.APPLICATION_NAME,
    title: METADATA_TEXTS.OG_TITLE,
    description: METADATA_TEXTS.OG_DESCRIPTION,
    type: METADATA_TEXTS.OG_TYPE,
    locale: METADATA_TEXTS.OG_LOCALE,
    url: METADATA_TEXTS.METADATA_BASE_URL,
    countryName: METADATA_TEXTS.OG_COUNTRY_NAME,
    emails: METADATA_TEXTS.OG_EMAILS as unknown as string[],
    images: METADATA_TEXTS.OG_IMAGES as unknown as {
      url: string;
      width: number;
      height: number;
      alt: string;
    }[],
  },
  twitter: {
    card: METADATA_TEXTS.TWITTER_CARD,
    title: METADATA_TEXTS.TWITTER_TITLE,
    description: METADATA_TEXTS.TWITTER_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: METADATA_TEXTS.TWITTER_CREATOR,
    site: METADATA_TEXTS.TWITTER_SITE,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: METADATA_TEXTS.ICONS,
  referrer: METADATA_TEXTS.REFERRER,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="relative min-h-screen bg-[#050507] text-[#F7F7F9] font-sans antialiased overflow-x-hidden selection:bg-[#DFCA9F]/30 selection:text-white">
        {/* Luxury Ambient Lighting Canvas */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Top Center Radiant Champagne Aura */}
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full opacity-60 blur-[140px]"
            style={{
              background:
                "radial-gradient(circle, rgba(223, 202, 159, 0.18) 0%, rgba(197, 168, 128, 0.08) 40%, transparent 70%)",
            }}
          />

          {/* Secondary Ambient Side Glow */}
          <div
            className="absolute top-[40%] -right-[15%] w-[800px] h-[800px] rounded-full opacity-40 blur-[160px]"
            style={{
              background:
                "radial-gradient(circle, rgba(170, 137, 91, 0.12) 0%, rgba(140, 106, 56, 0.04) 50%, transparent 70%)",
            }}
          />

          {/* Bottom Ambient Glow */}
          <div
            className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] rounded-full opacity-35 blur-[150px]"
            style={{
              background:
                "radial-gradient(circle, rgba(223, 202, 159, 0.1) 0%, rgba(197, 168, 128, 0.03) 50%, transparent 70%)",
            }}
          />

          {/* Ultra-fine Architectural Grid with Radial Vignette */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.8) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)",
            }}
          />
        </div>

        <ServiceWorkerRegister />
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              duration: 5000,
              style: {
                background:
                  "linear-gradient(135deg, rgba(24, 24, 32, 0.95) 0%, rgba(12, 12, 18, 0.98) 100%)",
                color: "#F7ECD5",
                padding: "16px 22px",
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: "600",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(223, 202, 159, 0.35)",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 168, 128, 0.15)",
              },
              iconTheme: {
                primary: "#DFCA9F",
                secondary: "#050507",
              },
            },
            error: {
              duration: 5000,
              style: {
                background:
                  "linear-gradient(135deg, rgba(30, 15, 15, 0.95) 0%, rgba(15, 8, 8, 0.98) 100%)",
                color: "#ffc9c9",
                padding: "16px 22px",
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: "600",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(239, 68, 68, 0.35)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8)",
              },
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
