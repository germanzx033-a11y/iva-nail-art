import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin-iva", "/api/", "/booking/"],
    },
    sitemap: "https://iva-nail-art.vercel.app/sitemap.xml",
  };
}
