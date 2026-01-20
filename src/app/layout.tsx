import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./(site)/globals.css";
import { Toaster } from "react-hot-toast";
import ServiceWorkerRegister from "./_components/sw-register";
import PreloadLinks from "./_components/preload-links";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexfound | Premium Tech Service for Startups and Businesses",
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
    title: "Nexfound | Premium Tech Service for Startups and Businesses",
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
        width: 1200,
        height: 633,
        alt: "Nexfound - Premium Technology Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexfound | Premium Tech Service for Startups and Businesses",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="relative min-h-screen">
        {/* Unified Website Background */}
        <div className="fixed inset-0 -z-10">
          {/* Enhanced Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Dynamic gradient overlay */}
            <div className="absolute inset-0 opacity-40">
              <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(176, 141, 87, 0.4) 0%, rgba(244, 230, 192, 0.2) 20%, rgba(26, 127, 107, 0.15) 40%, transparent 70%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B08D57]/5 to-transparent animate-pulse" />
            </div>

            {/* Subtle animated grid */}
            <div
              className="absolute inset-0 opacity-[0.02] animate-pulse"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(176, 141, 87, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(176, 141, 87, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "100px 100px",
              }}
            />
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[#B08D57]/30 rotate-45 animate-float-slow opacity-60" />
            <div className="absolute top-40 right-20 w-24 h-24 border-2 border-[#1A7F6B]/25 rotate-12 animate-float-medium opacity-50" />
            <div className="absolute bottom-32 left-20 w-20 h-20 border-2 border-[#F4E6C0]/20 rotate-30 animate-float-fast opacity-40" />
            <div className="absolute bottom-40 right-32 w-16 h-16 bg-[#B08D57]/20 rotate-60 animate-float-slow opacity-70" />
            <div className="absolute top-1/3 right-1/4 w-28 h-28 border border-[#B08D57]/25 rotate-75 animate-float-medium opacity-45" />
            <div className="absolute bottom-1/3 left-1/3 w-22 h-22 bg-[#1A7F6B]/15 rotate-45 animate-float-fast opacity-55" />
          </div>

          {/* Enhanced decorative elements */}
          <div className="absolute top-1/4 left-16 w-64 h-64 bg-[#B08D57]/10 rounded-full blur-3xl animate-float-slow opacity-30" />
          <div className="absolute bottom-1/4 right-16 w-48 h-48 bg-[#1A7F6B]/8 rounded-full blur-3xl animate-float-medium opacity-20" />
          <div className="absolute top-1/2 right-8 w-32 h-32 bg-[#F4E6C0]/5 rounded-full blur-2xl animate-float-fast opacity-25" />
        </div>

        <PreloadLinks />
        <ServiceWorkerRegister />
        <Toaster
          position="top-right"
          toastOptions={{
            // Custom styling for success toast
            success: {
              duration: 5000,
              style: {
                background:
                  "linear-gradient(135deg, rgba(176, 141, 87, 0.95) 0%, rgba(244, 230, 192, 0.95) 100%)",
                color: "#000",
                padding: "16px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(176, 141, 87, 0.3)",
                boxShadow: "0 8px 32px rgba(176, 141, 87, 0.4)",
              },
              iconTheme: {
                primary: "#000",
                secondary: "#F4E6C0",
              },
            },
            // Custom styling for error toast
            error: {
              duration: 5000,
              style: {
                background:
                  "linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.95) 100%)",
                color: "#fff",
                padding: "16px 20px",
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: "600",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                boxShadow: "0 8px 32px rgba(239, 68, 68, 0.4)",
              },
              iconTheme: {
                primary: "#fff",
                secondary: "#ef4444",
              },
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
