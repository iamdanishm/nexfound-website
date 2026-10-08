import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexfound.in";
  const staticRoutes = [
    "",         // homepage
    "work",
    "services",
    "about",
    "testimonials",
    "contact",
  ];

  // Generate static URLs
  const staticUrls = staticRoutes.map(
    (slug) =>
      `<url>
        <loc>${baseUrl}/${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>${slug ? "0.7" : "1.0"}</priority>
      </url>`
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticUrls.join("\n")}
  </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
