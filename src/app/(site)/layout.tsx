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
  title: "Nexfound | Premium Technology Services for Startups & Businesses",
  description:
    "Turn ambitious ideas into scalable digital products with Nexfound. We deliver premium web, mobile, and product solutions that drive real impact.",
  keywords: [
    "Nexfound",
    "technology services",
    "startup app development",
    "web development",
    "mobile app development",
    "UX/UI design",
    "product strategy",
    "digital product development",
    "MVP development",
    "scalable digital solutions",
  ],
  authors: [{ name: "Nexfound" }],
  alternates: {
    canonical: "https://www.nexfound.in",
  },
  applicationName: "Nexfound",
  category: "Technology Services",
  creator: "Nexfound",
  publisher: "Nexfound",
  classification: "Business",
  metadataBase: new URL("https://www.nexfound.in"),
  referrer: "origin-when-cross-origin",
  openGraph: {
    siteName: "Nexfound",
    title: "Nexfound | Premium Technology Services for Startups & Businesses",
    description:
      "Turn ambitious ideas into scalable digital products with Nexfound. Premium web, mobile, and product solutions built for startups and ambitious businesses.",
    type: "website",
    locale: "en_US",
    url: "https://www.nexfound.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexfound | Premium Technology Services for Startups & Businesses",
    description:
      "Turn ambitious ideas into scalable digital products with Nexfound. Premium web, mobile, and product solutions built for startups and ambitious businesses.",
  },
  pinterest: {
    richPin: true,
  },
  robots: {
    index: true,
    follow: true,
  },
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
