import dynamic from "next/dynamic";
import { client } from "@/sanity/lib/client";
import {
  blogPostQuery,
  relatedBlogPostsQuery,
  otherBlogPostsQuery,
  blogPostsQuery,
} from "@/app/lib/queries";
import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

// Dynamic imports for code splitting
const Header = dynamic(() => import("@/app/_components/header"));
const Footer = dynamic(() => import("@/app/_components/footer"));
const BlogContent = dynamic(() => import("@/app/_components/blog-content"));
const BlogCard = dynamic(() => import("@/app/_components/blog-card"));
const ReadingProgressBar = dynamic(
  () => import("@/app/_components/reading-progress-bar")
);
const HeroParallax = dynamic(() => import("@/app/_components/hero-parallax"));
const ContentWaypoint = dynamic(
  () => import("@/app/_components/content-waypoint")
);
const ShareButtons = dynamic(() => import("@/app/_components/share-buttons"));
const ArticleNavigation = dynamic(
  () => import("@/app/_components/article-navigation")
);

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface SimpleBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  publishedAt: string;
  featuredImage?: { asset: { _id: string; url: string }; alt?: string };
  category?: { _id: string; title: string; color: string };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  if (!post) {
    return {
      title: "Post Not Found | Nexfound",
      description: "The blog post you're looking for could not be found.",
    };
  }

  // Use custom SEO fields if available, otherwise fall back to defaults
  const title = post.seo?.metaTitle || `${post.title} | Nexfound Blog`;
  const description =
    post.seo?.metaDescription ||
    post.excerpt ||
    post.content?.[0]?.children?.[0]?.text?.slice(0, 160) ||
    "Read our latest insights on design, technology, and digital experiences.";

  const keywords = [
    "Nexfound",
    "blog",
    "insights",
    post.seo?.focusKeyword,
    post.category?.title,
    "digital",
    "technology",
    "design",
    ...(post.tags || []),
  ].filter(Boolean);

  const imageUrl = post.featuredImage?.asset?.url || "/og-image.jpg";

  return {
    title,
    description,
    keywords,
    authors: post.author
      ? [{ name: post.author.name }]
      : [{ name: "Nexfound Team" }],
    openGraph: {
      title,
      description,
      url: `https://nexfound.in/blog/${slug}`,
      siteName: "Nexfound",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.featuredImage?.alt || post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : ["Nexfound Team"],
      tags: [post.category?.title, ...(post.tags || [])].filter(Boolean),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      creator: "@iam_danishm",
      site: "@iam_danishm",
    },
    alternates: {
      canonical: `https://nexfound.in/blog/${slug}`,
    },
    robots: {
      index: post.seo?.noindex ? false : true,
      follow: true,
      googleBot: {
        index: post.seo?.noindex ? false : true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await client.fetch(blogPostQuery, { slug });

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const [relatedPosts, otherPosts] = await Promise.all([
    post.category
      ? client.fetch(relatedBlogPostsQuery, {
          categoryId: post.category._id,
          currentPostId: post._id,
        })
      : [],
    post.category
      ? client.fetch(otherBlogPostsQuery, {
          categoryId: post.category._id,
          currentPostId: post._id,
        })
      : client
          .fetch(blogPostsQuery)
          .then((posts: SimpleBlogPost[]) =>
            posts.filter((p: SimpleBlogPost) => p._id !== post._id).slice(0, 5)
          ),
  ]);

  const formattedDate = format(new Date(post.publishedAt), "MMMM dd, yyyy");
  const readingTime = post.excerpt
    ? Math.max(1, Math.ceil(post.excerpt.split(" ").length / 200))
    : 1;

  const displayTags = post.tags || [];

  // Determine which related posts to show
  const displayPosts = relatedPosts.length > 0 ? relatedPosts : otherPosts;

  return (
    <div className="min-h-screen bg-black">
      <ReadingProgressBar />
      <Header />

      <div className="pt-24 pb-8">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-text-muted">
              <Link
                href="/blog"
                className="hover:text-brand-champagne transition-colors"
              >
                Blog
              </Link>
              <span>/</span>
              <span className="text-pearl">{post.title}</span>
            </div>
          </nav>

          {/* Article Header */}
          <ContentWaypoint animation="slide-up" delay={200}>
            <article className="max-w-5xl mx-auto mb-16">
              <header>
                {/* Prominent Title First (Centered, Bold) */}
                <h1 className="text-5xl md:text-6xl font-bold text-pearl text-center mb-12 leading-tight tracking-tight">
                  {post.title}
                </h1>

                {/* Hero Image with Gradient Overlay & Floating Category Badge */}
                {post.featuredImage && (
                  <div className="relative mb-12 overflow-hidden rounded-2xl">
                    <HeroParallax
                      src={post.featuredImage.asset.url}
                      alt={post.featuredImage.alt || post.title}
                      width={800}
                      height={320}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                      loading="eager"
                      priority
                      className="w-full h-auto object-cover"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    {/* Floating Category Badge (Top-Right, High Contrast) */}
                    {post.category && (
                      <div className="absolute top-6 right-6 z-10">
                        <span
                          className="inline-block px-4 py-2 text-sm font-semibold rounded-full text-black shadow-lg"
                          style={{
                            backgroundColor: post.category.color || "#B08D57",
                          }}
                        >
                          {post.category.title}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Meta Row (Flex: Author Left | Date+Read Center | Featured Right) */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-text-muted mb-8">
                  {/* Author Info Left */}
                  {post.author && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center p-1">
                        <Image
                          src="/logo-transparent.png"
                          alt="Nexfound"
                          width={48}
                          height={48}
                          sizes="48px"
                          className="object-contain"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-text-muted">Written by</p>
                        <p className="text-sm font-medium text-pearl">
                          {post.author.name}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Date & Read Time Center */}
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
                    <time>{formattedDate}</time>
                    {post.lastUpdated &&
                      post.lastUpdated !== post.publishedAt && (
                        <time className="text-xs text-text-muted">
                          Updated{" "}
                          {format(new Date(post.lastUpdated), "MMMM dd, yyyy")}
                        </time>
                      )}
                    <span>{readingTime} min read</span>
                  </div>

                  {/* Featured Badge Right */}
                  {post.featured && (
                    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-brand-bronze/20 text-brand-bronze">
                      Featured
                    </span>
                  )}
                </div>

                {/* Excerpt as Brief Description */}
                {post.excerpt && (
                  <div className="mb-8">
                    <p className="text-lg md:text-xl text-pearl font-light leading-relaxed text-center max-w-4xl mx-auto">
                      {post.excerpt}
                    </p>
                  </div>
                )}

                {/* Tags Below Excerpt */}
                {displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {displayTags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-brand-charcoal border border-brand-onyx text-text-primary hover:bg-brand-bronze/10 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>
            </article>
          </ContentWaypoint>

          {/* Article Content */}
          <div className="relative flex gap-6">
            <div className="relative">
              <ArticleNavigation content={post.content} />
            </div>
            <article className="max-w-4xl flex-1" data-article-content>
              <div className="liquid-glass-subtle px-16 py-6 md:px-20 md:py-8 rounded-3xl min-h-screen">
                <div className="prose prose-xl prose-invert max-w-none">
                  <BlogContent content={post.content} />
                </div>
              </div>
            </article>
          </div>

          {/* Share Section */}
          <ContentWaypoint animation="slide-up" delay={500}>
            <div className="text-center mt-20 mb-12">
              <h3 className="text-2xl md:text-3xl font-light text-pearl mb-3">
                Spread the word
              </h3>
              <p className="text-lg text-text-muted max-w-md mx-auto mb-8">
                Help others discover this insightful content
              </p>
              <div className="max-w-2xl mx-auto">
                <ShareButtons
                  title={post.title}
                  url={`https://nexfound.in/blog/${slug}`}
                  description={
                    post.excerpt ||
                    post.content?.[0]?.children?.[0]?.text?.slice(0, 160)
                  }
                />
              </div>
            </div>
          </ContentWaypoint>

          {/* Related Posts Section */}
          {displayPosts.length > 0 && (
            <ContentWaypoint animation="slide-up" delay={300}>
              <section className="mt-16 mb-16">
                <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-light text-pearl mb-6 leading-relaxed">
                    {relatedPosts.length > 0
                      ? "More in this category"
                      : "You might also like"}
                  </h2>
                  <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
                    {relatedPosts.length > 0
                      ? "Continue exploring articles from this category."
                      : "Discover more insights and stories from our blog."}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayPosts.map(
                    (relatedPost: SimpleBlogPost, index: number) => (
                      <ContentWaypoint
                        key={relatedPost._id}
                        animation="scale-in"
                        delay={300 + index * 50}
                      >
                        <BlogCard
                          title={relatedPost.title}
                          slug={relatedPost.slug}
                          publishedAt={relatedPost.publishedAt}
                          excerpt={relatedPost.excerpt}
                          category={relatedPost.category}
                          featuredImage={relatedPost.featuredImage}
                        />
                      </ContentWaypoint>
                    )
                  )}
                </div>
              </section>
            </ContentWaypoint>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
