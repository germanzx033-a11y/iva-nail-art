"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = pathname?.startsWith("/es") ? "es" : "en";
    }
  }, [pathname]);

  return null;
}
