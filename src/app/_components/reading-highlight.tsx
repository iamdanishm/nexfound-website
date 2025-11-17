"use client";

import { useEffect, useState } from "react";

const ReadingHighlight = () => {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const observerOptions = {
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all headings
    const headings = document.querySelectorAll("h1, h2, h3, h4");
    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
      }
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  if (!currentSection) return null;

  return (
    <div className="fixed top-32 right-8 z-40 hidden lg:block">
      <div className="liquid-glass-subtle px-4 py-2 rounded-xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-brand-bronze animate-pulse"></div>
          <span className="text-sm text-text-primary font-light">
            Reading:{" "}
            {document.getElementById(currentSection)?.textContent?.slice(0, 30)}
            ...
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReadingHighlight;
