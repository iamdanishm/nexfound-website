import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    '192.168.0.101',
    '192.168.0.*',
    '192.168.1.*',
    '*.local',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
        port: '',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    taint: true,
  },
  // Bundle optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Compression
  compress: true,
  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
