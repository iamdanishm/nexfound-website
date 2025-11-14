import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface BlogCardProps {
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt?: string;
  featured?: boolean;
  author?: {
    _id: string;
    name: string;
    slug: { current: string };
    bio?: string;
  };
  tags?: string[];
  category?: {
    title: string;
    color: string;
  };
  featuredImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
    caption?: string;
  };
}

export default function BlogCard({
  title,
  slug,
  publishedAt,
  excerpt,
  featured,
  author,
  tags,
  category,
  featuredImage,
}: BlogCardProps) {
  const formattedDate = format(new Date(publishedAt), "MMMM dd, yyyy");

  // Calculate reading time (rough estimate: 200 words per minute)
  const readingTime = excerpt
    ? Math.max(1, Math.ceil(excerpt.split(" ").length / 200))
    : 1;

  return (
    <Link href={`/blog/${slug.current}`} className="block group">
      <article className="liquid-glass-hover p-6 h-full transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Featured Image */}
          {featuredImage?.asset && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={featuredImage.asset.url}
                alt={featuredImage.alt || title}
                width={400}
                height={192}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Badges Row */}
          <div className="mb-3 flex flex-wrap gap-2">
            {/* Featured Badge */}
            {featured && (
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-brand-bronze/20 text-brand-bronze">
                Featured
              </span>
            )}

            {/* Category Badge */}
            {category && (
              <span
                className="inline-block px-3 py-1 text-xs font-medium rounded-full text-black"
                style={{ backgroundColor: category.color || "#B08D57" }}
              >
                {category.title}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-pearl mb-3 group-hover:text-gold-gradient-animated transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-text-muted mb-4 line-clamp-3 flex-1">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-brand-charcoal border border-brand-onyx text-text-primary"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-md bg-brand-charcoal border border-brand-onyx text-text-primary">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto pt-4 border-t border-brand-bronze/20">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                {/* Author */}
                {author && (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/logo-transparent.png"
                      alt="Nexfound"
                      width={16}
                      height={16}
                      className="rounded-full"
                    />
                    <span className="text-xs text-text-muted">
                      {author.name}
                    </span>
                  </div>
                )}

                {/* Date and Reading Time */}
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <time>{formattedDate}</time>
                  <span>{readingTime} min read</span>
                </div>
              </div>

              <div className="text-brand-champagne group-hover:text-brand-bronze transition-colors">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
