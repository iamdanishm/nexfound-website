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
      <Header />

      <div className="pt-20">
        <div className="container-custom section-spacing">
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
          <article className="max-w-4xl mx-auto mb-8">
            <header>
              {/* Featured Image */}
              {post.featuredImage && (
                <div className="mb-8 overflow-hidden rounded-xl">
                  <Image
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
                </div>
              )}

              {/* Category Badge */}
              {post.category && (
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-medium rounded-full text-black"
                    style={{
                      backgroundColor: post.category.color || "#B08D57",
                    }}
                  >
                    {post.category.title}
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pearl mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-text-muted border-b border-brand-bronze/20 pb-6">
                <time className="text-sm">{formattedDate}</time>
                {post.lastUpdated && post.lastUpdated !== post.publishedAt && (
                  <time className="text-xs text-text-muted">
                    Updated{" "}
                    {format(new Date(post.lastUpdated), "MMMM dd, yyyy")}
                  </time>
                )}
                <span className="text-sm">{readingTime} min read</span>
                {post.category && (
                  <span className="text-sm text-brand-champagne">
                    {post.category.title}
                  </span>
                )}
                {post.featured && (
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-brand-bronze/20 text-brand-bronze">
                    Featured
                  </span>
                )}
              </div>

              {/* Excerpt */}
              {post.excerpt && (
                <div className="mt-6">
                  <p className="text-lg text-text-primary leading-relaxed italic">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Author and Tags */}
              <div className="mt-6 flex flex-col gap-4">
                {/* Author Info */}
                {post.author && (
                  <div className="flex items-center gap-3">
                    <Image
                      src="/logo-transparent.png"
                      alt="Nexfound"
                      width={40}
                      height={40}
                      sizes="40px"
                      className="rounded-full object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm text-text-muted">Written by</p>
                      <p className="text-sm font-medium text-pearl">
                        {post.author.name}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {displayTags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-brand-charcoal border border-brand-onyx text-text-primary"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </header>
          </article>

          {/* Article Content */}
          <article className="max-w-4xl mx-auto">
            <div className="liquid-glass p-8 md:p-12 rounded-2xl">
              <div className="prose prose-lg prose-invert max-w-none">
                <BlogContent content={post.content} />
              </div>
            </div>
          </article>

          {/* Related Posts Section */}
          {displayPosts.length > 0 && (
            <section className="mt-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-pearl mb-4">
                  {relatedPosts.length > 0
                    ? "More in this category"
                    : "You might also like"}
                </h2>
                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                  {relatedPosts.length > 0
                    ? "Continue exploring articles from this category."
                    : "Discover more insights and stories from our blog."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((relatedPost: SimpleBlogPost) => (
                  <BlogCard
                    key={relatedPost._id}
                    title={relatedPost.title}
                    slug={relatedPost.slug}
                    publishedAt={relatedPost.publishedAt}
                    excerpt={relatedPost.excerpt}
                    category={relatedPost.category}
                    featuredImage={relatedPost.featuredImage}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
