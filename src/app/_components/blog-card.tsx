import React from "react";
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
    slug?: { current: string };
    bio?: string;
  };
  tags?: string[];
  category?: {
    title: string;
    color?: string;
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

const BlogCard = React.memo(function BlogCard({
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
  const formattedDate = React.useMemo(() => {
    try {
      return format(new Date(publishedAt), "MMMM dd, yyyy");
    } catch {
      return "";
    }
  }, [publishedAt]);

  return (
    <Link href={`/blog/${slug.current}`} className="block group h-full">
      <article className="glass-card p-6 h-full flex flex-col justify-between transition-all duration-400">
        <div>
          {/* Featured Image */}
          <div className="mb-5 overflow-hidden rounded-xl relative h-48 bg-[#0E0E16] border border-white/[0.08]">
            {featuredImage?.asset?.url ? (
              <Image
                src={featuredImage.asset.url}
                alt={featuredImage.alt || title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#0C0C14] text-xs font-mono text-zinc-400">
                {category?.title || "ARTICLE"}
              </div>
            )}

            {/* Category Badge */}
            {category && (
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 text-xs font-medium font-mono rounded-full bg-[#050507]/80 backdrop-blur-md border border-white/10 text-zinc-200">
                  {category.title}
                </span>
              </div>
            )}

            {featured && (
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 text-xs font-medium font-mono rounded-full bg-white text-black font-semibold">
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h2 className="text-xl font-display font-bold text-white mb-2.5 group-hover:text-zinc-200 transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-zinc-400 mb-4 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 text-xs font-mono rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            {author?.name && <span className="text-zinc-300 font-medium">{author.name} ·</span>}
            <span>{formattedDate}</span>
          </div>
          <span className="text-indigo-400 group-hover:translate-x-1 transition-transform font-medium">
            Read Post →
          </span>
        </div>
      </article>
    </Link>
  );
});

BlogCard.displayName = "BlogCard";
export default BlogCard;
