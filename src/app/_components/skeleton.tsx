import React from "react";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  animation?: boolean;
}

export const Skeleton = React.memo(function Skeleton({
  className = "",
  variant = "rectangular",
  width,
  height,
  animation = true,
}: SkeletonProps) {
  const variantClasses = {
    text: "h-4 rounded",
    rectangular: "rounded-lg",
    circular: "rounded-full",
  };

  const animationClasses = animation
    ? "animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
    : "bg-gray-700";

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={`${animationClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="presentation"
      aria-hidden="true"
    />
  );
});

Skeleton.displayName = "Skeleton";

// Pre-built skeleton components
export const BlogCardSkeleton = React.memo(function BlogCardSkeleton() {
  return (
    <article className="liquid-glass-hover p-6 h-full">
      <div className="flex flex-col h-full">
        {/* Featured Image Skeleton */}
        <div className="mb-4 overflow-hidden rounded-lg">
          <Skeleton width="100%" height={128} className="w-full h-32" />
        </div>

        {/* Badges Skeleton */}
        <div className="mb-3 flex gap-2">
          <Skeleton width={60} height={24} className="rounded-full" />
          <Skeleton width={80} height={24} className="rounded-full" />
        </div>

        {/* Title Skeleton */}
        <Skeleton width="100%" height={20} className="mb-2" />
        <Skeleton width="80%" height={20} className="mb-3" />

        {/* Excerpt Skeleton */}
        <Skeleton width="100%" height={16} className="mb-1" />
        <Skeleton width="100%" height={16} className="mb-1" />
        <Skeleton width="60%" height={16} className="mb-3" />

        {/* Footer Skeleton */}
        <div className="mt-auto pt-3 border-t border-brand-bronze/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton width={14} height={14} variant="circular" />
              <Skeleton width={60} height={12} />
            </div>
            <Skeleton width={60} height={12} />
          </div>
        </div>
      </div>
    </article>
  );
});

BlogCardSkeleton.displayName = "BlogCardSkeleton";

export const HeroSkeleton = React.memo(function HeroSkeleton() {
  return (
    <section className="pt-20 pb-16 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto">
          <Skeleton
            width={200}
            height={32}
            className="mb-6 mx-auto rounded-full"
          />
          <Skeleton width={400} height={48} className="mb-4 mx-auto" />
          <Skeleton width={300} height={56} className="mb-6 mx-auto" />
          <Skeleton width={600} height={24} className="mb-8 mx-auto" />

          {/* CTA Buttons Skeleton */}
          <div className="flex gap-4 justify-center">
            <Skeleton width={120} height={48} className="rounded-lg" />
            <Skeleton width={120} height={48} className="rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSkeleton.displayName = "HeroSkeleton";

export const ServiceCardSkeleton = React.memo(function ServiceCardSkeleton() {
  return (
    <div className="liquid-glass-hover p-6 text-center group">
      <Skeleton
        width={64}
        height={64}
        variant="circular"
        className="mb-4 mx-auto"
      />
      <Skeleton width={120} height={24} className="mb-3 mx-auto" />
      <Skeleton width={200} height={16} className="mb-2 mx-auto" />
      <Skeleton width={180} height={16} className="mx-auto" />
    </div>
  );
});

ServiceCardSkeleton.displayName = "ServiceCardSkeleton";

export const ProjectCardSkeleton = React.memo(function ProjectCardSkeleton() {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <Skeleton width="100%" height={240} />
      </div>
      <div className="liquid-glass-hover p-6">
        <Skeleton width={200} height={24} className="mb-3" />
        <Skeleton width={300} height={16} className="mb-4" />
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton width={80} height={24} className="rounded-full" />
          <Skeleton width={90} height={24} className="rounded-full" />
        </div>
        <Skeleton width={120} height={16} />
      </div>
    </div>
  );
});

ProjectCardSkeleton.displayName = "ProjectCardSkeleton";

export const TestimonialCardSkeleton = React.memo(
  function TestimonialCardSkeleton() {
    return (
      <div className="liquid-glass p-6">
        <div className="flex items-start gap-4">
          <Skeleton width={48} height={48} variant="circular" />
          <div className="flex-1">
            <Skeleton width={120} height={16} className="mb-1" />
            <Skeleton width={80} height={14} className="mb-3" />
            <Skeleton width="100%" height={16} className="mb-1" />
            <Skeleton width="100%" height={16} className="mb-1" />
            <Skeleton width={150} height={16} className="mb-4" />
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} width={16} height={16} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCardSkeleton.displayName = "TestimonialCardSkeleton";