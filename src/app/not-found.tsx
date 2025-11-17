import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Nexfound",
  description:
    "Sorry, the page you're looking for doesn't exist. Let us help you find your way back.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        {/* 404 Number */}
        <div className="text-8xl md:text-9xl font-display text-transparent bg-clip-text bg-linear-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] leading-none mb-4">
          404
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-base text-[#B3B3B3] mb-8 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist. Let's get you back on
          track.
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="btn btn-primary px-8 py-3 text-base inline-block"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
