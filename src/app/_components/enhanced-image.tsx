"use client";

import { useState } from "react";
import Image from "next/image";

// Progressive loading hook
const useProgressiveImage = (src: string) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return {
    loaded,
    error,
    handleLoad: () => setLoaded(true),
    handleError: () => setError(true),
  };
};

interface EnhancedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  className?: string;
  caption?: string;
  showTooltip?: boolean;
}

const EnhancedImage = ({
  src,
  alt,
  width,
  height,
  sizes,
  placeholder,
  blurDataURL,
  loading = "lazy",
  priority = false,
  className = "",
  caption,
  showTooltip = true,
}: EnhancedImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { loaded, handleLoad } = useProgressiveImage(src);

  return (
    <div className="relative group">
      {/* Blur placeholder */}
      {!loaded && blurDataURL && (
        <Image
          src={blurDataURL}
          alt=""
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-700 ${loaded ? "opacity-0" : "opacity-100"}`}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={loading}
        priority={priority}
        className={`transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 group-hover:saturate-110 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        onLoad={handleLoad}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />

      {/* Caption */}
      {caption && (
        <p className="text-sm text-text-muted mt-2 text-center italic">
          {caption}
        </p>
      )}

      {/* Tooltip Overlay */}
      {showTooltip && isHovered && caption && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-pearl text-sm rounded-lg border border-brand-bronze/30 whitespace-nowrap z-10 opacity-0 animate-[fade-in_0.2s_ease-out_forwards]">
          {caption}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
        </div>
      )}
    </div>
  );
};

export default EnhancedImage;
