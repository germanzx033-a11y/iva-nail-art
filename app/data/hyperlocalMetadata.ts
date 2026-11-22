import type { Metadata } from "next";
import { getHyperlocal, hyperlocalPath, type Lang } from "./hyperlocalLandings";

export function hyperlocalMetadata(slug: string, lang: Lang): Metadata {
  const landing = getHyperlocal(slug);
  const c = landing.copy[lang];
  const en = hyperlocalPath(slug, "en");
  const es = hyperlocalPath(slug, "es");

  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: {
      canonical: hyperlocalPath(slug, lang),
      languages: { en, es, "x-default": en },
    },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: hyperlocalPath(slug, lang),
      locale: lang === "en" ? "en_US" : "es_US",
      type: "website",
      siteName: "IVA Nail Art NY",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `IVA Nail Art — luxury nail studio near ${landing.neighborhoodEn}, Brooklyn`,
        },
      ],
    },
  };
}
