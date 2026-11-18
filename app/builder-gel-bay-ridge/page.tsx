import type { Metadata } from "next";
import BuilderGelPage, { BUILDER_GEL_PATH } from "@/app/components/BuilderGelPage";

export const metadata: Metadata = {
  title: { absolute: "Builder Gel Manicure in Bay Ridge, Brooklyn | IVA Nail Art NY" },
  description:
    "Builder gel manicure in a private Bay Ridge studio: strong, natural-looking nails, any design on top and maintenance every 2–3 weeks. Book on Instagram.",
  alternates: {
    canonical: BUILDER_GEL_PATH.en,
    languages: { en: BUILDER_GEL_PATH.en, es: BUILDER_GEL_PATH.es, "x-default": BUILDER_GEL_PATH.en },
  },
  openGraph: {
    title: "Builder Gel Manicure in Bay Ridge, Brooklyn | IVA Nail Art NY",
    description: "Strong, natural-looking nails with builder gel — one-on-one in a private Bay Ridge studio.",
    url: BUILDER_GEL_PATH.en,
    locale: "en_US",
    type: "website",
    siteName: "IVA Nail Art NY",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IVA Nail Art — builder gel and nail art in Bay Ridge, Brooklyn" }],
  },
};

export default function Page() {
  return <BuilderGelPage lang="en" />;
}
