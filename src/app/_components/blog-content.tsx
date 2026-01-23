"use client";
import {
  PortableText,
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

// Text constants
const TEXTS = {
  IMAGE_NOT_AVAILABLE: "Image not available",
  IMAGE_DEBUG_PREFIX: "Image not available - Debug: ",
  IMAGE_REFERENCE_NOT_EXPANDED: "Image reference found but not expanded. Please update the Sanity query to include image assets.",
  UNABLE_TO_LOAD_IMAGE: "Unable to load image"
} as const;

interface BlogContentProps {
  content: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value || !value.asset) {
        return (
          <div className="my-8 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center text-gray-400">
            {TEXTS.IMAGE_DEBUG_PREFIX}{JSON.stringify(value)}
          </div>
        );
      }

      if (typeof value.asset === "string") {
        return (
          <div className="my-8 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center text-gray-400">
            {TEXTS.IMAGE_REFERENCE_NOT_EXPANDED}
          </div>
        );
      }

      if (value.asset && value.asset.url) {
        const position = value.position || "full";

        const containerClasses: Record<string, string> = {
          full: "my-8 w-full",
          left: "my-4 mr-6 mb-4 float-left w-1/2 md:w-1/3",
          right: "my-4 ml-6 mb-4 float-right w-1/2 md:w-1/3",
          center: "my-8 mx-auto w-full max-w-2xl",
        };

        return (
          <div className={containerClasses[position]}>
            <div className="liquid-glass p-4 rounded-lg">
              <Image
                src={value.asset.url}
                alt={value.alt || ""}
                width={800}
                height={600}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 800px"
                className={`w-full h-auto rounded-lg brightness-110 contrast-105 saturate-110 ${
                  position === "left" || position === "right"
                    ? "max-w-none"
                    : ""
                }`}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                loading="lazy"
              />
              {value.caption && (
                <p className="text-sm text-text-muted mt-2 text-center">
                  {value.caption}
                </p>
              )}
            </div>
            {position !== "full" && <div className="clear-both"></div>}
          </div>
        );
      }

      return (
        <div className="my-8 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center text-gray-400">
          {TEXTS.UNABLE_TO_LOAD_IMAGE}
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-semibold text-pearl mt-12 mb-6 first:mt-0 transition-all duration-500 hover:scale-[1.02] hover:text-brand-champagne/90 cursor-pointer leading-relaxed tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-medium text-pearl mt-10 mb-5 transition-all duration-500 hover:scale-[1.02] hover:text-brand-champagne/90 cursor-pointer leading-relaxed tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium text-pearl mt-8 mb-4 transition-all duration-500 hover:scale-[1.02] hover:text-brand-champagne/90 cursor-pointer leading-relaxed tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-medium text-pearl mt-6 mb-3 transition-all duration-500 hover:scale-[1.02] hover:text-brand-champagne/90 cursor-pointer leading-relaxed tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-primary leading-relaxed mb-8 text-lg max-w-3xl">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative bg-black/20 border-l-4 border-brand-bronze p-6 my-8 rounded-r-lg shadow-lg backdrop-blur-sm">
        <div className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-bronze to-brand-champagne opacity-50"></div>
        <div className="relative italic text-brand-champagne leading-relaxed text-lg">
          <span className="absolute -top-1 -left-3 text-3xl text-brand-bronze/30 font-serif">
            &ldquo;
          </span>
          {children}
          <span className="inline text-3xl text-brand-bronze/30 font-serif ml-1">
            &rdquo;
          </span>
        </div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="text-text-primary mb-6 space-y-3">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="text-text-primary mb-6 space-y-3 list-decimal list-inside">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-text-primary leading-loose text-lg flex items-start gap-3 mb-3">
        <span className="flex-shrink-0 w-2 h-2 bg-brand-champagne/60 rounded-full mt-3"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="text-text-primary leading-loose text-lg mb-3">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-pearl">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-brand-champagne">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-slate-900 px-3 py-3 rounded-md text-sm font-mono text-slate-50 border border-slate-700 inline-block whitespace-pre-wrap break-words max-w-full overflow-x-auto relative">
        <div className="absolute top-0 left-0 right-0 h-6 bg-slate-800 border-b border-slate-700 rounded-t-md flex items-center px-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="pt-6">
          <pre className="font-mono text-sm text-slate-50 leading-relaxed whitespace-pre-wrap break-words overflow-x-auto m-0 p-0">
            <code className="block">{children}</code>
          </pre>
        </div>
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        className="link text-brand-champagne hover:text-pearl"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="prose prose-lg max-w-none space-y-2">
      <PortableText value={content} components={components} />
    </div>
  );
}
