"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keep server HTML and initial client HTML identical to avoid hydration mismatch.
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.085, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
