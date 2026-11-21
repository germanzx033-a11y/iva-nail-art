import type { Metadata } from "next";
import { getLanding, landingPath, type Lang } from "./serviceLandings";

export function serviceLandingMetadata(slug: string, lang: Lang): Metadata {
  const c = getLanding(slug).copy[lang];
  const en = landingPath(slug, "en");
  const es = landingPath(slug, "es");
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: landingPath(slug, lang), languages: { en, es, "x-default": en } },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: landingPath(slug, lang),
      locale: lang === "en" ? "en_US" : "es_US",
      type: "website",
      siteName: "IVA Nail Art NY",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IVA Nail Art — nail studio in Bay Ridge, Brooklyn" }],
    },
  };
}
