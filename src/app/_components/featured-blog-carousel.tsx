"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { motion, Variants } from "framer-motion";

// Text constants
const TEXTS = {
  EMPTY_STATE_TITLE: "Coming Soon",
  EMPTY_STATE_DESCRIPTION:
    "We're preparing deep-dive engineering breakdowns. Check back shortly.",
  BADGE_TEXT: "Founder Intelligence",
  TITLE_FIRST_LINE: "The Scaling",
  TITLE_SECOND_LINE: "Playbook.",
  DESCRIPTION:
    "Tactical architectural breakdowns, tech stack comparisons, and engineering playbooks for founders building at scale.",
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
    slug?: { current: string };
  };
  tags?: string[];
  category?: {
    _id: string;
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

interface FeaturedBlogCarouselProps {
  posts: BlogPost[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

export default function FeaturedBlogCarousel({
  posts,
}: FeaturedBlogCarouselProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section id="blog" className="relative py-14 sm:py-18 overflow-hidden bg-transparent">
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12">
            <motion.div variants={itemVariants} className="mb-3">
              <div className="luxury-badge">
                <span className="w-2 h-2 rounded-full bg-[#DFCA9F]" />
                <span className="text-xs font-mono font-semibold tracking-wider text-[#DFCA9F] uppercase">
                  {TEXTS.BADGE_TEXT}
                </span>
              </div>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white mb-4"
            >
              <span>{TEXTS.TITLE_FIRST_LINE} </span>
              <span className="text-gold-foil block sm:inline">{TEXTS.TITLE_SECOND_LINE}</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#9E9EB0] max-w-2xl mx-auto leading-relaxed"
            >
              {TEXTS.DESCRIPTION}
            </motion.p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {posts.slice(0, 3).map((post) => {
              const formattedDate = format(
                new Date(post.publishedAt || new Date()),
                "MMMM dd, yyyy"
              );

              return (
                <motion.div key={post._id} variants={itemVariants}>
                  <Link href={`/blog/${post.slug.current}`} className="block group h-full">
                    <div className="glass-obsidian glass-obsidian-hover rounded-2xl h-full p-6 flex flex-col justify-between">
                      <div>
                        {/* Image Preview */}
                        <div className="relative h-44 w-full rounded-xl overflow-hidden mb-5 bg-[#0A0A10] border border-white/[0.08]">
                          {post.featuredImage?.asset?.url ? (
                            <Image
                              src={post.featuredImage.asset.url}
                              alt={post.featuredImage.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#181824] to-[#0A0A0F] text-xs font-mono text-[#DFCA9F]">
                              {post.category?.title || "ARTICLE"}
                            </div>
                          )}

                          {post.category && (
                            <div className="absolute top-3 left-3">
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#050507]/80 backdrop-blur-md border border-white/10 text-[#F7ECD5]">
                                {post.category.title}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-display font-bold text-white mb-2.5 group-hover:text-gold-foil transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <p className="text-xs sm:text-sm text-[#9E9EB0] leading-relaxed mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Footer Info */}
                      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#686878]">
                        <span>{formattedDate}</span>
                        <span className="text-[#DFCA9F] group-hover:translate-x-1 transition-transform">
                          Read Article →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* View All Insights Button */}
          <motion.div variants={itemVariants} className="text-center">
            <Link
              href="/blog"
              className="btn-luxury-secondary text-xs uppercase tracking-wider py-3 px-8 inline-flex items-center gap-2"
            >
              <span>Explore All Insights</span>
              <span>→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
