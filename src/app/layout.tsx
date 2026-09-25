import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import "./(site)/globals.css";
import { Toaster } from "react-hot-toast";
import ServiceWorkerRegister from "./_components/sw-register";

// Text constants for metadata
const METADATA_TEXTS = {
  TITLE_DEFAULT: "Nexfound | Turn Your Product Idea Into a Focused MVP",
  TITLE_TEMPLATE: "%s | Nexfound",
  DESCRIPTION:
    "Nexfound helps founders and small businesses turn a clear product idea into a focused, usable MVP—starting with the web or mobile platform that proves it fastest.",
  KEYWORDS: [
    "Nexfound",
    "nexfound",
    "nexfound.in",
    "nexfoundco",
    "Nexfoundco",
    "MVP development",
    "web vs mobile first",
    "product scoping",
    "digital product development",
    "custom software development",
    "codebase rescue",
    "startup MVP",
    "founder technical partner",
  ],
  APPLICATION_NAME: "Nexfound",
  CATEGORY: "Technology Services",
  METADATA_BASE_URL: "https://nexfound.in",
  ALTERNATES_CANONICAL: "https://nexfound.in",
  OG_TITLE: "Nexfound | Turn Your Product Idea Into a Focused MVP",
  OG_DESCRIPTION:
    "Nexfound helps founders and small businesses turn a clear product idea into a focused, usable MVP—starting with the web or mobile platform that proves it fastest.",
  OG_TYPE: "website",
  OG_LOCALE: "en_US",
  OG_COUNTRY_NAME: "India",
  OG_EMAILS: ["hello@nexfound.in"],
  OG_IMAGES: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 633,
      alt: "Nexfound - Turn Your Product Idea Into a Focused MVP",
    },
  ],
  TWITTER_CARD: "summary_large_image",
  TWITTER_TITLE: "Nexfound | Turn Your Product Idea Into a Focused MVP",
  TWITTER_DESCRIPTION:
    "Nexfound helps founders and small businesses turn a clear product idea into a focused, usable MVP—starting with the web or mobile platform that proves it fastest.",
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

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
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
      className={`${outfit.variable} ${plusJakarta.variable} ${newsreader.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="relative min-h-screen bg-[#030305] text-[#F1F5F9] font-sans antialiased overflow-x-hidden selection:bg-indigo-500/30 selection:text-white bg-grain">
        {/* Atmospheric Studio Ambient Lighting */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Top Center Ambient Aura */}
          <div
            className="absolute -top-[25%] left-1/2 -translate-x-1/2 w-[1100px] h-[800px] rounded-full opacity-30 blur-[160px]"
            style={{
              background:
                "radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)",
            }}
          />

          {/* Secondary Subtle Ambient Glow */}
          <div
            className="absolute top-[40%] -right-[15%] w-[800px] h-[800px] rounded-full opacity-20 blur-[180px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)",
            }}
          />

          {/* Bottom Ambient Glow */}
          <div
            className="absolute -bottom-[10%] -left-[10%] w-[700px] h-[700px] rounded-full opacity-20 blur-[170px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
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
                  "rgba(10, 10, 16, 0.95)",
                color: "#FFFFFF",
                padding: "16px 22px",
                borderRadius: "14px",
                fontSize: "14px",
                fontWeight: "600",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(99, 102, 241, 0.2)",
              },
              iconTheme: {
                primary: "#10B981",
                secondary: "#030305",
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
