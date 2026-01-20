"use client";

import {
  ReactNode,
  useEffect,
  useState,
  Component,
  ErrorInfo,
  useId,
} from "react";

interface LazyWrapperProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
}

// Simple Error Boundary
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("LazyWrapper Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Error loading content</div>;
    }

    return this.props.children;
  }
}

export default function LazyWrapper({
  children,
  threshold = 0.1,
  rootMargin = "200px", // Preload earlier
  fallback = null,
}: LazyWrapperProps) {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const lazyId = `lazy-${useId()}`;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    const element = document.getElementById(lazyId);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, lazyId]);

  useEffect(() => {
    if (hasBeenVisible) {
      setIsLoaded(true);
    }
  }, [hasBeenVisible]);

  if (!hasBeenVisible) {
    return (
      <div id={lazyId} style={{ minHeight: "100px" }}>
        {fallback}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={fallback}>
      <div
        className={`transition-opacity duration-100 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </ErrorBoundary>
  );
}
