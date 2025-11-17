"use client";

import { useEffect } from "react";

export default function PreloadLinks() {
  useEffect(() => {
    // Preload critical resources
    const preloadResources = [{ href: "/blog", rel: "prefetch" }];

    preloadResources.forEach(({ href, rel }) => {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const fontLinks = [
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiJ-Ek-_EeA.woff2",
      "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiJ-Ek-_EeA.woff2",
    ];

    fontLinks.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = href;
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }, []);

  return null;
}
