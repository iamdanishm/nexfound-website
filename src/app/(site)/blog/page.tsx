"use client";

import { useState, useMemo, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { blogPostsQuery, blogCategoriesQuery } from "@/app/lib/queries";
import BlogCard from "@/app/_components/blog-card";
import Header from "@/app/_components/header";
import Footer from "@/app/_components/footer";

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
    bio?: string;
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

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  color: string;
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
        setPosts(postsData);
        setCategories(categoriesData);
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

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.category?._id === selectedCategory
      );
    }

    // Search filter
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

    // Sort posts by date (newest first)
    filtered.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return filtered;
  }, [posts, selectedCategory, searchQuery]);

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-brand-bronze/10 via-transparent to-transparent" />

        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-brand-bronze/10 border border-brand-bronze/20 rounded-full text-brand-champagne text-sm font-medium mb-4">
                Our Thoughts & Insights
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-pearl mb-6 leading-tight">
              The Nexfound
              <span className="block text-gold-gradient-animated">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Discover our latest insights on design, technology, and the future
              of digital experiences. Stories from our team, industry trends,
              and behind-the-scenes looks at what drives us.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts by title, content, author, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-[#1A1A1A] border border-[#2E2E2E] rounded-xl text-white placeholder-[#737373] focus:outline-none focus:border-[#B08D57] focus:ring-2 focus:ring-[#B08D57]/20 transition-all duration-300"
                suppressHydrationWarning
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#737373]"
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

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`px-6 py-3 font-medium rounded-full transition-all ${
                  selectedCategory === null
                    ? "bg-brand-bronze text-black"
                    : "border border-brand-bronze/20 text-text-primary hover:border-brand-bronze hover:text-brand-champagne"
                }`}
              >
                All Posts
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryFilter(category._id)}
                  className={`px-6 py-3 font-medium rounded-full transition-all ${
                    selectedCategory === category._id
                      ? "bg-brand-bronze text-black"
                      : "border border-brand-bronze/20 text-text-primary hover:border-brand-bronze hover:text-brand-champagne"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container-custom">
          {loading && posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="liquid-glass p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-pearl mb-2">
                  Coming Soon
                </h2>
                <p className="text-text-muted">
                  We&apos;re working on exciting content. Check back soon for
                  our latest posts.
                </p>
              </div>
            </div>
          ) : filteredPosts.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="liquid-glass p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-pearl mb-2">
                  No posts found
                </h2>
                <p className="text-text-muted mb-4">
                  {searchQuery
                    ? `No posts match "${searchQuery}". Try adjusting your search.`
                    : "No posts available in this category."}
                </p>
                <div className="flex gap-2 justify-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="btn btn-secondary"
                    >
                      Clear Search
                    </button>
                  )}
                  {selectedCategory && (
                    <button
                      onClick={() => handleCategoryFilter(null)}
                      className="btn btn-primary"
                    >
                      View All Posts
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* All Posts in Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    slug={post.slug}
                    publishedAt={post.publishedAt}
                    excerpt={post.excerpt}
                    featured={post.featured}
                    author={post.author}
                    tags={post.tags}
                    category={post.category}
                    featuredImage={post.featuredImage}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
