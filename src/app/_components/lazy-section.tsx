import dynamic from "next/dynamic";
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

export const LazyFeatures = dynamic(() => import("./features"), {
  loading: FeaturesLoading,
});

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

export const LazyShowcase = dynamic(() => import("./showcase"), {
  loading: ShowcaseLoading,
});

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

export const LazyAbout = dynamic(() => import("./about"), {
  loading: AboutLoading,
});

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

export const LazyTestimonials = dynamic(() => import("./testimonials"), {
  loading: TestimonialsLoading,
});

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

export const LazyFeaturedBlogCarousel = dynamic(
  () => import("./featured-blog-carousel"),
  {
    loading: BlogCarouselLoading,
  }
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

export const LazyContactFooter = dynamic(() => import("./contact-footer"), {
  loading: ContactFooterLoading,
});

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

export const LazyBlogPage = dynamic(() => import("../(site)/blog/page"), {
  loading: BlogPageLoading,
});
