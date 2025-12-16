"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ContextualSuggestionsProps {
  currentPostId: string;
  categoryId?: string;
  tags?: string[];
  className?: string;
}

interface SuggestedPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  featuredImage?: { asset: { _id: string; url: string } };
}

const ContextualSuggestions = ({
  currentPostId,
  categoryId,
  tags,
  className = "",
}: ContextualSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<SuggestedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // This would normally call an API endpoint
        // For now, we'll use a placeholder implementation
        const response = await fetch(
          `/api/suggestions?category=${categoryId}&tags=${tags?.join(",")}&exclude=${currentPostId}`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.slice(0, 2)); // Show max 2 suggestions
        }
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId || tags?.length) {
      fetchSuggestions();
    } else {
      setLoading(false);
    }
  }, [currentPostId, categoryId, tags]);

  if (loading || suggestions.length === 0) {
    return null;
  }

  return (
    <div className={`mt-12 p-6 liquid-glass rounded-xl ${className}`}>
      <h3 className="text-lg font-semibold text-pearl mb-4">
        While you&apos;re here&hellip;
      </h3>
      <div className="space-y-4">
        {suggestions.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="block group"
          >
            <div className="flex gap-4 p-3 rounded-lg hover:bg-black/20 transition-colors">
              {post.featuredImage && (
                <div className="shrink-0">
                  <Image
                    src={post.featuredImage.asset.url}
                    alt={post.title}
                    width={80}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-pearl group-hover:text-brand-champagne transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-text-muted mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ContextualSuggestions;
