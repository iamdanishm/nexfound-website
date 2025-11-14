import {
  PortableText,
  PortableTextComponents,
  PortableTextBlock,
} from "@portabletext/react";
import Image from "next/image";

interface BlogContentProps {
  content: PortableTextBlock[];
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      console.log("Image value:", value); // Debug log

      if (!value || !value.asset) {
        return (
          <div className="my-8 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center text-gray-400">
            Image not available - Debug: {JSON.stringify(value)}
          </div>
        );
      }

      if (typeof value.asset === "string") {
        return (
          <div className="my-8 p-4 border-2 border-dashed border-gray-600 rounded-lg text-center text-gray-400">
            Image reference found but not expanded. Please update the Sanity
            query to include image assets.
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
          Unable to load image
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-pearl mt-8 mb-4 first:mt-0">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-pearl mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-pearl mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold text-pearl mt-4 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-text-primary leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="liquid-glass border-l-4 border-brand-bronze p-4 my-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-text-primary mb-4 space-y-2">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-text-primary mb-4 space-y-2">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-text-primary">{children}</li>,
    number: ({ children }) => <li className="text-text-primary">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-pearl">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-brand-champagne">{children}</em>
    ),
    code: ({ children }) => (
      <code className="liquid-glass px-2 py-1 rounded text-sm font-mono">
        {children}
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
    <div className="prose prose-lg max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
}
