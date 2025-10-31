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
  if (!image?.asset) return null;

  const imageAlt = alt || image.alt || "";
  const imageUrl = urlFor(image).auto("format").quality(quality).url();

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        className={className}
        fill
        sizes={sizes || "100vw"}
        priority={priority}
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
      className={className}
      width={width}
      height={height}
      sizes={sizes || "100vw"}
      priority={priority}
    />
  );
}
