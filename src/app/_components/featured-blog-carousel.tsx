"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt?: string;
  featured?: boolean;
  author?: {
    _id: string;
    name: string;
    slug: { current: string };
  };
  tags?: string[];
  category?: {
    _id: string;
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

interface FeaturedBlogCarouselProps {
  posts: BlogPost[];
}

const FeaturedBlogCarousel = React.memo(function FeaturedBlogCarousel({
  posts,
}: FeaturedBlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const visiblePosts = 3; // Show 3 posts at a time on desktop, 1 on mobile
  const totalSlides = React.useMemo(
    () => Math.max(1, Math.ceil(posts.length - visiblePosts + 1)),
    [posts.length, visiblePosts]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && posts.length > visiblePosts) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, totalSlides, isHovered, posts.length, visiblePosts]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  if (posts.length === 0) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="liquid-glass p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-pearl mb-2">
                Coming Soon
              </h2>
              <p className="text-text-muted">
                We&apos;re working on exciting content. Check back soon for our
                latest posts.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-brand-bronze/10 border border-brand-bronze/20 rounded-full text-brand-champagne text-sm font-medium mb-4">
            Latest Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-pearl mb-4">
            From Our <span className="text-gold-gradient-animated">Blog</span>
          </h2>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Stay updated with our latest thoughts on design, technology, and
            digital experiences.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          {posts.length > visiblePosts && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 -translate-x-1/2 opacity-0 group-hover:opacity-100"
                aria-label="Previous posts"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 translate-x-1/2 opacity-0 group-hover:opacity-100"
                aria-label="Next posts"
              >
                <svg
                  className="w-5 h-5"
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
              </button>
            </>
          )}

          {/* Posts Grid */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visiblePosts)}%)`,
              }}
            >
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="shrink-0 w-full md:w-1/2 lg:w-1/3"
                >
                  <BlogCarouselCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {posts.length > visiblePosts && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-brand-bronze"
                      : "bg-brand-bronze/30 hover:bg-brand-bronze/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="btn btn-primary inline-flex items-center gap-2"
          >
            View All Posts
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
          </Link>
        </div>
      </div>
    </section>
  );
});

FeaturedBlogCarousel.displayName = "FeaturedBlogCarousel";

export default FeaturedBlogCarousel;

// Compact Blog Card for Carousel
const BlogCarouselCard = React.memo(function BlogCarouselCard({
  post,
}: {
  post: BlogPost;
}) {
  const formattedDate = React.useMemo(
    () => format(new Date(post.publishedAt), "MMM dd, yyyy"),
    [post.publishedAt]
  );

  return (
    <Link href={`/blog/${post.slug.current}`} className="block group">
      <article className="liquid-glass-hover p-6 h-full transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Featured Image */}
          {post.featuredImage?.asset && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                width={300}
                height={160}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                loading="lazy"
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          )}

          {/* Badges */}
          <div className="mb-3 flex flex-wrap gap-2">
            {post.featured && (
              <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-brand-bronze/20 text-brand-bronze">
                Featured
              </span>
            )}
            {post.category && (
              <span
                className="inline-block px-2 py-1 text-xs font-medium rounded-full text-black"
                style={{ backgroundColor: post.category.color || "#B08D57" }}
              >
                {post.category.title}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-pearl mb-2 group-hover:text-gold-gradient-animated transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-text-muted text-sm mb-3 line-clamp-2 flex-1">
              {post.excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-brand-bronze/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-transparent.png"
                  alt="Nexfound"
                  width={14}
                  height={14}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                  className="rounded-full"
                />
                <span className="text-xs text-text-muted">
                  {post.author?.name || "Nexfound"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <time>{formattedDate}</time>
                <span className="text-brand-champagne group-hover:text-brand-bronze transition-colors">
                  →
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
});

BlogCarouselCard.displayName = "BlogCarouselCard";
