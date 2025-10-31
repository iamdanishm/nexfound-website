import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexfound.in";
    return new NextResponse(
        `User-Agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`
    );
}
