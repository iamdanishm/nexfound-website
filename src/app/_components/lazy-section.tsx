import dynamic from "next/dynamic";
import LazyWrapper from "./lazy-wrapper";
import {
  Skeleton,
  ServiceCardSkeleton,
  ProjectCardSkeleton,
  TestimonialCardSkeleton,
  BlogCardSkeleton,
} from "./skeleton";

// Dynamically import components with loading states
const FeaturesLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <ServiceCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

const DynamicFeatures = dynamic(() => import("./features"), {
  loading: FeaturesLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyFeatures = (props: Record<string, any>) => (
  <LazyWrapper fallback={<FeaturesLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicFeatures {...(props as any)} />
  </LazyWrapper>
);

const ShowcaseLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

const DynamicShowcase = dynamic(() => import("./showcase"), {
  loading: ShowcaseLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyShowcase = (props: Record<string, any>) => (
  <LazyWrapper fallback={<ShowcaseLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicShowcase {...(props as any)} />
  </LazyWrapper>
);

const AboutLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="liquid-glass p-8">
        <Skeleton width="100%" height={32} className="mb-4" />
        <Skeleton width="100%" height={16} className="mb-2" />
        <Skeleton width="100%" height={16} />
      </div>
    </div>
  </div>
);

const DynamicAbout = dynamic(() => import("./about"), {
  loading: AboutLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyAbout = (props: Record<string, any>) => (
  <LazyWrapper fallback={<AboutLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicAbout {...(props as any)} />
  </LazyWrapper>
);

const TestimonialsLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <TestimonialCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

const DynamicTestimonials = dynamic(() => import("./testimonials"), {
  loading: TestimonialsLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyTestimonials = (props: Record<string, any>) => (
  <LazyWrapper fallback={<TestimonialsLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicTestimonials {...(props as any)} />
  </LazyWrapper>
);

const BlogCarouselLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="liquid-glass p-8">
        <Skeleton width="100%" height={32} className="mb-4" />
        <Skeleton width="100%" height={16} />
      </div>
    </div>
  </div>
);

const DynamicFeaturedBlogCarousel = dynamic(
  () => import("./featured-blog-carousel"),
  {
    loading: BlogCarouselLoading,
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyFeaturedBlogCarousel = (props: Record<string, any>) => (
  <LazyWrapper fallback={<BlogCarouselLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicFeaturedBlogCarousel {...(props as any)} />
  </LazyWrapper>
);

const ContactFooterLoading = () => (
  <div className="py-16">
    <div className="container-custom">
      <div className="liquid-glass p-8">
        <Skeleton width="100%" height={32} className="mb-4" />
        <Skeleton width="100%" height={16} />
      </div>
    </div>
  </div>
);

const DynamicContactFooter = dynamic(() => import("./contact-footer"), {
  loading: ContactFooterLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyContactFooter = (props: Record<string, any>) => (
  <LazyWrapper fallback={<ContactFooterLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicContactFooter {...(props as any)} />
  </LazyWrapper>
);

// Blog page lazy components
const BlogPageLoading = () => (
  <div className="min-h-screen bg-black">
    <div className="container-custom py-16">
      <div className="liquid-glass p-8">
        <Skeleton width="100%" height={32} className="mb-4" />
        <Skeleton width="100%" height={16} className="mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <BlogCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const DynamicBlogPage = dynamic(() => import("../(site)/blog/page"), {
  loading: BlogPageLoading,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyBlogPage = (props: Record<string, any>) => (
  <LazyWrapper fallback={<BlogPageLoading />}>
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    <DynamicBlogPage {...(props as any)} />
  </LazyWrapper>
);
