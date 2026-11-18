import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/builder-gel-bay-ridge`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages: { en: `${baseUrl}/builder-gel-bay-ridge`, es: `${baseUrl}/es/builder-gel-bay-ridge` } },
    },
    {
      url: `${baseUrl}/es/builder-gel-bay-ridge`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/builder-gel-bay-ridge`, es: `${baseUrl}/es/builder-gel-bay-ridge` } },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2026-11-16'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-11-16'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
