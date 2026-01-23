"use client";

import { useState, useEffect, createContext, useContext } from "react";

// Text constants
const TEXTS = {
  ARIA_ENTER_READING_MODE: "Enter reading mode",
  ARIA_EXIT_READING_MODE: "Exit reading mode"
} as const;

interface ReadingModeContextType {
  isReadingMode: boolean;
  toggleReadingMode: () => void;
}

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(
  undefined
);

export const useReadingMode = () => {
  const context = useContext(ReadingModeContext);
  if (!context) {
    throw new Error("useReadingMode must be used within a ReadingModeProvider");
  }
  return context;
};

interface ReadingModeProviderProps {
  children: React.ReactNode;
}

export const ReadingModeProvider = ({ children }: ReadingModeProviderProps) => {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleReadingMode = () => {
    setIsReadingMode(!isReadingMode);
  };

  useEffect(() => {
    // Apply reading mode styles to body
    if (isMounted && isReadingMode) {
      document.body.classList.add("reading-mode");
    } else if (isMounted && !isReadingMode) {
      document.body.classList.remove("reading-mode");
    }
  }, [isReadingMode, isMounted]);

  return (
    <ReadingModeContext.Provider value={{ isReadingMode, toggleReadingMode }}>
      {children}
    </ReadingModeContext.Provider>
  );
};

interface ReadingModeToggleProps {
  className?: string;
}

const ReadingModeToggle = ({ className = "" }: ReadingModeToggleProps) => {
  const { isReadingMode, toggleReadingMode } = useReadingMode();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        className={`fixed top-4 right-4 z-[60] p-3 rounded-full bg-black/80 border border-brand-bronze/30 hover:bg-black/90 hover:border-brand-bronze/50 transition-all duration-300 group ${className}`}
        aria-label={TEXTS.ARIA_ENTER_READING_MODE}
      >
        <svg
          className="w-5 h-5 text-brand-champagne group-hover:text-pearl transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggleReadingMode}
      className={`fixed top-4 right-4 z-[60] p-3 rounded-full bg-black/80 border border-brand-bronze/30 hover:bg-black/90 hover:border-brand-bronze/50 transition-all duration-300 group ${className}`}
      aria-label={isReadingMode ? TEXTS.ARIA_EXIT_READING_MODE : TEXTS.ARIA_ENTER_READING_MODE}
    >
      {isReadingMode ? (
        // Exit reading mode icon
        <svg
          className="w-5 h-5 text-brand-champagne group-hover:text-pearl transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        // Enter reading mode icon (book)
        <svg
          className="w-5 h-5 text-brand-champagne group-hover:text-pearl transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      )}
    </button>
  );
};

export default ReadingModeToggle;