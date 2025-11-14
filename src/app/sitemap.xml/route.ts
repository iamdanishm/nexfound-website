import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery } from "@/app/lib/queries";

export const runtime = "edge";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexfound.in";
  const staticRoutes = [
    "",         // homepage
    "work",
    "services",
    "about",
    "testimonials",
    "contact",
    "blog"
  ];

  // Fetch all blog posts
  const posts = await client.fetch(blogPostsQuery);

  // Generate static URLs
  const staticUrls = staticRoutes.map(
    (slug) =>
      `<url>
        <loc>${baseUrl}/${slug}</loc>
        <changefreq>weekly</changefreq>
        <priority>${slug ? "0.7" : "1.0"}</priority>
      </url>`
  );

  // Generate blog post URLs
  const blogUrls = posts.map(
    (post: { slug: { current: string }; publishedAt: string; lastUpdated?: string }) =>
      `<url>
        <loc>${baseUrl}/blog/${post.slug.current}</loc>
        <lastmod>${new Date(post.lastUpdated || post.publishedAt).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.6</priority>
      </url>`
  );

  const allUrls = [...staticUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allUrls.join("\n")}
  </urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=3600",
    },
  });
}
