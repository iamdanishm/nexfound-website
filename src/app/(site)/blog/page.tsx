"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery, blogCategoriesQuery } from "@/app/lib/queries";

// Dynamic imports for code splitting
const BlogCard = dynamic(() => import("@/app/_components/blog-card"));
const Header = dynamic(() => import("@/app/_components/header"));
const Footer = dynamic(() => import("@/app/_components/footer"));

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
    bio?: string;
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

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  color?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          client.fetch(blogPostsQuery),
          client.fetch(blogCategoriesQuery),
        ]);
        setPosts(postsData || []);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category?._id === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.author?.name.toLowerCase().includes(query) ||
          post.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          post.category?.title.toLowerCase().includes(query)
      );
    }

    filtered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#F7F7F9]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-4 inline-block">
              <div className="studio-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Founder Intelligence</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
              The Nexfound <span className="text-titanium">Dispatch.</span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Tactical engineering breakdowns, technical strategy, and architectural playbooks for founders building at scale.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Category Filters */}
      <section className="pb-12">
        <div className="container-custom px-4 sm:px-6">
          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles by title, topic, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-3.5 pr-12 bg-[#0A0A10] border border-white/[0.1] rounded-2xl text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-indigo-400 transition-colors"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 text-xs font-mono rounded-full transition-all ${
                  selectedCategory === null
                    ? "bg-white text-black font-bold shadow-lg"
                    : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                ALL ARTICLES
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`px-4 py-2 text-xs font-mono rounded-full transition-all ${
                    selectedCategory === category._id
                      ? "bg-white text-black font-bold shadow-lg"
                      : "bg-white/[0.03] text-zinc-400 border border-white/[0.08] hover:border-white/20 hover:text-white"
                  }`}
                >
                  {category.title.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-24">
        <div className="container-custom px-4 sm:px-6">
          {loading ? (
            <div className="text-center py-16">
              <div className="p-8 max-w-sm mx-auto rounded-2xl bg-[#08080C] border border-white/[0.08]">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin mx-auto mb-4" />
                <p className="text-xs font-mono text-zinc-400">Loading articles...</p>
              </div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="p-8 max-w-md mx-auto rounded-2xl bg-[#08080C] border border-white/[0.08]">
                <h3 className="text-lg font-display font-bold text-white mb-2">
                  No Articles Found
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  {searchQuery
                    ? `No articles matched "${searchQuery}". Try a different keyword.`
                    : "Articles are currently in editorial review."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="btn-secondary py-2 px-4 text-xs font-mono"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post._id} {...post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
