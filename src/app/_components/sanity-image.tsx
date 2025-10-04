import Image from "next/image";
import { urlFor, SanityImage as SanityImageType } from "@/sanity/lib/image";

type SanityImageProps = {
  image: SanityImageType | null | undefined;
  alt?: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
};

export default function SanityImageComp({
  image,
  alt = "",
  width,
  height,
  quality = 80,
  className = "",
  priority = false,
  fill = false,
  sizes,
}: SanityImageProps) {
  if (!image?.asset) {
    return null;
  }

  // Use provided alt text or fallback to image metadata
  const imageAlt = alt || image.alt || "";

  // Build optimized Sanity CDN URL
  const imageUrl = urlFor(image)
    .auto("format") // Automatically serve WebP/AVIF when supported
    .quality(quality)
    .url();

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        className={className}
        priority={priority}
        sizes={sizes || "100vw"}
      />
    );
  }

  if (!width || !height) {
    console.warn("SanityImage: width and height required when not using fill");
    return null;
  }

  return (
    <Image
      src={imageUrl}
      alt={imageAlt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
