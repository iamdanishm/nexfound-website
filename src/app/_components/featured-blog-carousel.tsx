"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

// Text constants
const TEXTS = {
  EMPTY_STATE_TITLE: "Coming Soon",
  EMPTY_STATE_DESCRIPTION: "We're working on exciting content. Check back soon for our latest posts.",
  BADGE_TEXT: "Founder Intelligence",
  TITLE_FIRST_LINE: "The Scaling",
  TITLE_SECOND_LINE: "Playbook",
  DESCRIPTION: "Strategies, not 'thoughts.' We break down exactly how to build enterprise-grade tech that drives revenue and increases valuation.",
  PUBLISHED_STAMP: "PUBLISHED",
  DEFAULT_CATEGORY: "Article",
  DEFAULT_AUTHOR: "Nexfound"
} as const;

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
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const visiblePosts = 3; // Show 3 posts at a time on desktop, 1 on mobile
  const totalSlides = React.useMemo(
    () => Math.max(1, Math.ceil(posts.length - visiblePosts + 1)),
    [posts.length, visiblePosts],
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && posts.length > visiblePosts) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1,
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
      prevIndex >= totalSlides - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? totalSlides - 1 : prevIndex - 1,
    );
  };

  if (posts.length === 0) {
    return (
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center py-12">
            <div className="liquid-glass p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-pearl mb-2">
                {TEXTS.EMPTY_STATE_TITLE}
              </h2>
              <p className="text-text-muted">
                {TEXTS.EMPTY_STATE_DESCRIPTION}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-48 h-48 border-2 border-[#B08D57]/20 rotate-45 animate-float-slow opacity-40" />
        <div className="absolute bottom-32 left-20 w-36 h-36 border border-[#1A7F6B]/15 rotate-12 animate-float-medium opacity-30" />
        <div className="absolute top-1/3 left-10 w-28 h-28 bg-[#F4E6C0]/10 rounded-full animate-float-fast opacity-25" />
        <div className="absolute bottom-1/4 right-20 w-40 h-40 border border-[#B08D57]/25 rotate-60 animate-float-slow opacity-35" />
      </div>

      <div className="container-custom relative z-10 px-6 py-5">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <div className="text-center mb-20">
            {/* Premium Badge */}
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-12 backdrop-blur-md border transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
              style={{
                background:
                  "linear-gradient(135deg, rgba(176, 141, 87, 0.15) 0%, rgba(244, 230, 192, 0.08) 100%)",
                borderColor: "rgba(176, 141, 87, 0.4)",
                boxShadow: "0 8px 32px rgba(176, 141, 87, 0.1)",
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 bg-[#B08D57] rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-[#F4E6C0] rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-sm font-semibold text-[#F4E6C0] tracking-wide uppercase">
                {TEXTS.BADGE_TEXT}
              </span>
            </div>

            {/* Premium Title */}
            <h2
              className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1000 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              <span className="block text-white mb-3">{TEXTS.TITLE_FIRST_LINE}</span>
              <span
                className="block bg-gradient-to-r from-[#B08D57] via-[#F4E6C0] to-[#B08D57] bg-clip-text text-transparent"
                style={{
                  textShadow: "0 0 40px rgba(176, 141, 87, 0.3)",
                }}
              >
                {TEXTS.TITLE_SECOND_LINE}
              </span>
            </h2>

            {/* Enhanced Description */}
            <p
              className={`text-lg md:text-xl text-[#B3B3B3] max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 transform ${
                isVisible
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-8 opacity-0 scale-95"
              }`}
            >
              {TEXTS.DESCRIPTION}
            </p>
          </div>

          {/* Knowledge Archive Carousel */}
          <div
            className={`relative transition-all duration-1000 delay-600 transform ${
              isVisible
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-8 opacity-0 scale-95"
            }`}
          >
            {/* Premium Navigation Arrows */}
            {posts.length > visiblePosts && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-6 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 backdrop-blur-md border border-[#B08D57]/30 hover:border-[#B08D57]/60 text-[#F4E6C0] p-4 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/20 hover:scale-110 opacity-60 hover:opacity-100"
                  aria-label="Previous posts"
                >
                  <svg
                    className="w-6 h-6"
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
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-6 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 backdrop-blur-md border border-[#B08D57]/30 hover:border-[#B08D57]/60 text-[#F4E6C0] p-4 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/20 hover:scale-110 opacity-60 hover:opacity-100"
                  aria-label="Next posts"
                >
                  <svg
                    className="w-6 h-6"
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

            {/* Publication Documents Grid */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-in-out gap-6"
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

            {/* Premium Dots Indicator */}
            {posts.length > visiblePosts && (
              <div className="flex justify-center mt-12 space-x-3">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative transition-all duration-500 ${
                      index === currentIndex
                        ? "w-8 h-4 bg-gradient-to-r from-[#B08D57] to-[#F4E6C0] rounded-full shadow-lg shadow-[#B08D57]/30"
                        : "w-4 h-4 bg-[#B08D57]/20 hover:bg-[#B08D57]/40 rounded-full hover:shadow-md hover:shadow-[#B08D57]/20"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {index === currentIndex && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F4E6C0] to-[#B08D57] rounded-full opacity-50 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

FeaturedBlogCarousel.displayName = "FeaturedBlogCarousel";

export default FeaturedBlogCarousel;

// Publication-Style Blog Card for Carousel
const BlogCarouselCard = React.memo(function BlogCarouselCard({
  post,
}: {
  post: BlogPost;
}) {
  const formattedDate = React.useMemo(
    () => format(new Date(post.publishedAt), "MMM dd, yyyy"),
    [post.publishedAt],
  );

  return (
    <div className="group relative mb-6 break-inside-avoid transition-all duration-1000">
      <Link href={`/blog/${post.slug.current}`} className="block">
        {/* Publication Document - Archive Style */}
        <div
          className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#B08D57]/40 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#B08D57]/10 group-hover:-translate-y-1"
          style={{
            boxShadow:
              "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Featured Image - Document Preview Style */}
          {post.featuredImage?.asset && (
            <div className="relative h-32 overflow-hidden bg-gray-900/50">
              <Image
                src={post.featuredImage.asset.url}
                alt={post.featuredImage.alt || post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />

              {/* Subtle grid overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Publication stamp effect */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded border border-blue-500/30 font-mono">
                  {TEXTS.PUBLISHED_STAMP}
                </div>
              </div>
            </div>
          )}

          {/* Document Header - Publication Info Tab Style */}
          <div className="relative h-12 bg-gradient-to-r from-[#B08D57]/20 to-[#F4E6C0]/10 border-b border-white/10 flex items-center justify-between px-4">
            {/* Publication Status & Category */}
            <div className="flex items-center gap-2">
              {post.featured && (
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              )}
              <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                {post.category?.title || TEXTS.DEFAULT_CATEGORY}
              </span>
            </div>

            {/* Publication Date */}
            <div className="flex items-center gap-1">
              <span className="text-xs text-white/60">{formattedDate}</span>
            </div>
          </div>

          {/* Document Content - Article Body */}
          <div className="p-4 bg-gradient-to-b from-transparent to-black/20">
            {/* Title as Document Headline */}
            <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#F4E6C0] transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            {/* Excerpt as Document Summary */}
            {post.excerpt && (
              <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
            )}

            {/* Author Info - Publication Byline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-transparent.png"
                  alt={TEXTS.DEFAULT_AUTHOR}
                  width={20}
                  height={20}
                  sizes="20px"
                  className="rounded-full w-5 h-5"
                />
                <span className="text-xs text-white/60">
                  {post.author?.name || TEXTS.DEFAULT_AUTHOR}
                </span>
              </div>
              <div className="text-[#F4E6C0] group-hover:text-[#B08D57] transition-colors duration-300">
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

            {/* Archive Bookmark */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute -top-3 -right-2 text-xs font-bold text-black rotate-45">
                ★
              </div>
            </div>
          </div>

          {/* Page Curl Effect */}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-bl from-white/10 to-white/5 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Document Shadow Effect */}
          <div className="absolute -bottom-1 -right-1 w-full h-full bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-sm" />
        </div>
      </Link>
    </div>
  );
});

BlogCarouselCard.displayName = "BlogCarouselCard";
