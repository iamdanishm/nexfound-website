"use client";

interface ContentDividerProps {
  className?: string;
  style?: "subtle" | "elegant";
}

const ContentDivider = ({
  className = "",
  style = "subtle",
}: ContentDividerProps) => {
  if (style === "elegant") {
    return (
      <div className={`flex items-center justify-center my-16 ${className}`}>
        <div className="flex items-center space-x-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-bronze/30"></div>
          <div className="w-2 h-2 rounded-full bg-brand-bronze/40"></div>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-bronze/30"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center my-12 ${className}`}>
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-brand-bronze/20 to-transparent"></div>
    </div>
  );
};

export default ContentDivider;
