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

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts;
    return posts.filter((post) => post.category?._id === selectedCategory);
  }, [posts, selectedCategory]);

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="liquid-glass p-8">
            <div className="animate-pulse text-pearl">
              Loading blog posts...
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-bronze/10 via-transparent to-transparent" />

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

      {/* Category Filter */}
      {categories.length > 0 && (
        <section className="py-8">
          <div className="container-custom">
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
          </div>
        </section>
      )}

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container-custom">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="liquid-glass p-8 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-pearl mb-2">
                  {selectedCategory
                    ? "No posts in this category"
                    : "Coming Soon"}
                </h2>
                <p className="text-text-muted">
                  {selectedCategory
                    ? "Check back later for more content in this category."
                    : "We're working on exciting content. Check back soon for our latest posts."}
                </p>
                {selectedCategory && (
                  <button
                    onClick={() => handleCategoryFilter(null)}
                    className="mt-4 btn btn-primary"
                  >
                    View All Posts
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Post - only show if no category filter or if featured post matches filter */}
              {filteredPosts.length > 0 && !selectedCategory && (
                <div className="mb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <BlogCard
                      title={filteredPosts[0].title}
                      slug={filteredPosts[0].slug}
                      publishedAt={filteredPosts[0].publishedAt}
                      excerpt={filteredPosts[0].excerpt}
                      category={filteredPosts[0].category}
                      featuredImage={filteredPosts[0].featuredImage}
                    />
                    <div className="space-y-8">
                      {filteredPosts.slice(1, 3).map((post) => (
                        <BlogCard
                          key={post._id}
                          title={post.title}
                          slug={post.slug}
                          publishedAt={post.publishedAt}
                          excerpt={post.excerpt}
                          category={post.category}
                          featuredImage={post.featuredImage}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Remaining Posts */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedCategory
                  ? filteredPosts.map((post) => (
                      <BlogCard
                        key={post._id}
                        title={post.title}
                        slug={post.slug}
                        publishedAt={post.publishedAt}
                        excerpt={post.excerpt}
                        category={post.category}
                        featuredImage={post.featuredImage}
                      />
                    ))
                  : filteredPosts
                      .slice(selectedCategory ? 0 : 3)
                      .map((post) => (
                        <BlogCard
                          key={post._id}
                          title={post.title}
                          slug={post.slug}
                          publishedAt={post.publishedAt}
                          excerpt={post.excerpt}
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
