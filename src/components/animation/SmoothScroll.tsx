"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [mounted, setMounted] = useState(false);
  const [allowSmoothScroll, setAllowSmoothScroll] = useState(true);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onChange = () => {
      setAllowSmoothScroll(!mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
    };
  }, []);

  if (!mounted || !allowSmoothScroll) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.085, duration: 1.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
