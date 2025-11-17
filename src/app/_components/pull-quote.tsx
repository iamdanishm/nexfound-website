"use client";

interface PullQuoteProps {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

const PullQuote = ({
  children,
  position = "right",
  className = "",
}: PullQuoteProps) => {
  return (
    <div
      className={`relative my-8 ${position === "left" ? "-ml-8 mr-8" : "-mr-8 ml-8"} ${className}`}
    >
      <div className="liquid-glass p-6 rounded-xl border-l-4 border-brand-bronze">
        <blockquote className="text-lg font-medium text-pearl italic leading-relaxed">
          {children}
        </blockquote>
        <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-bronze/20"></div>
      </div>
    </div>
  );
};

export default PullQuote;
