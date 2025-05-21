// components/HydrationGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";

export default function HydrationGuard({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return <>{children}</>;
}
