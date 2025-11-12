import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
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
