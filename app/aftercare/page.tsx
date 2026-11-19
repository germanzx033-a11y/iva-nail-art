import type { Metadata } from "next";
import AftercarePage from "@/app/components/AftercarePage";

export const metadata: Metadata = {
  title: { absolute: "Nail Aftercare Guide | IVA Nail Art NY" },
  description: "How to make your gel, builder gel or acrylic set last longer: tips for the first 24 hours, daily care and when to book your fill.",
  alternates: { canonical: "/aftercare", languages: { en: "/aftercare", es: "/es/aftercare", "x-default": "/aftercare" } },
};

export default function Page() {
  return <AftercarePage lang="en" />;
}
