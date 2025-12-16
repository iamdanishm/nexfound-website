"use client";

import { useEffect, useState } from "react";
import { PortableTextBlock } from "@portabletext/react";

interface ArticleNavigationProps {
  content: PortableTextBlock[];
}

const ArticleNavigation = ({ content }: ArticleNavigationProps) => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeHeading, setActiveHeading] = useState<string>("");

  useEffect(() => {
    // Extract headings from content
    const extractedHeadings: { id: string; text: string; level: number }[] = [];

    const extractHeadings = (blocks: PortableTextBlock[]) => {
      blocks.forEach((block) => {
        if (block._type === "block" && block.children) {
          block.children.forEach((child) => {
            if (child._type === "span" && child.marks?.includes("strong")) {
              // Check if this looks like a heading (all caps, short, etc.)
              const text = child.text || "";
              if (text.length > 0 && text.length < 100) {
                const id = text
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-|-$/g, "");
                extractedHeadings.push({
                  id,
                  text,
                  level: 2, // Default to h2 level
                });
              }
            }
          });
        }
      });
    };

    if (content) {
      extractHeadings(content);
    }

    setHeadings(extractedHeadings);

    // Set up intersection observer for active heading detection
    const observerOptions = {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id);
        }
      });
    }, observerOptions);

    // Find the article content container and only get headings within it
    const articleContainer = document.querySelector("[data-article-content]");
    const allHeadings = articleContainer
      ? articleContainer.querySelectorAll("h1, h2, h3, h4, h5, h6")
      : document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const headingData: { id: string; text: string; level: number }[] = [];

    allHeadings.forEach((heading, index) => {
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const level = parseInt(heading.tagName.charAt(1)); // h1 -> 1, h2 -> 2, etc.
      const text = heading.textContent || "";

      // Only include H1 and H2 headings
      if (level <= 2 && text.trim()) {
        headingData.push({
          id: heading.id,
          text: text.trim(),
          level,
        });
      }

      observer.observe(heading);
    });

    // Override extracted headings with actual H1/H2 headings
    if (headingData.length > 0) {
      setHeadings(headingData);
    }

    return () => observer.disconnect();
  }, [content]);

  const smoothScrollTo = (element: HTMLElement) => {
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset - 100; // offset for header
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 500;
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      window.scrollTo(0, startPosition + distance * easeInOutCubic);
      if (progress < 1) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  };

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      // Don't set active heading manually - let intersection observer handle it
      smoothScrollTo(element);
    }
  };

  // Don't render if no headings found
  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 self-start w-72 bg-black/95 backdrop-blur-sm rounded-lg p-4 border border-white/5">
      <div className="space-y-1">
        <h3 className="text-xs font-medium text-text-muted mb-4 uppercase tracking-wider truncate">
          Table of Contents
        </h3>
        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <button
              key={`${heading.id}-${index}`}
              onClick={() => scrollToHeading(heading.id)}
              className={`group flex items-center w-full text-left text-sm leading-relaxed transition-all duration-200 hover:translate-x-1 ${
                activeHeading === heading.id
                  ? "text-brand-champagne font-medium"
                  : "text-text-primary hover:text-pearl"
              }`}
            >
              <span
                className={`inline-block w-1 h-4 mr-3 rounded-full transition-colors flex-shrink-0 ${
                  activeHeading === heading.id
                    ? "bg-brand-champagne"
                    : "bg-transparent group-hover:bg-brand-champagne/30"
                }`}
              />
              <span className="truncate">{heading.text}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ArticleNavigation;
