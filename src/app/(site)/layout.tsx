import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexfound | Premium Digital Service Studio",
  description:
    "Transform your digital presence with Nexfound's premium design and development services. We craft exceptional digital experiences.",
  keywords: [
    "digital agency",
    "web design",
    "app development",
    "UI/UX design",
    "digital services",
  ],
  authors: [{ name: "Nexfound" }],
  openGraph: {
    title: "Nexfound | Premium Digital Service Studio",
    description:
      "Transform your digital presence with Nexfound's premium design and development services.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexfound | Premium Digital Service Studio",
    description:
      "Transform your digital presence with Nexfound's premium design and development services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
