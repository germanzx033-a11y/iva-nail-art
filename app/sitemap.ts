import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SERVICE_LANDINGS, landingPath } from '@/app/data/serviceLandings'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL
  const landingEntries: MetadataRoute.Sitemap = SERVICE_LANDINGS.flatMap((l) => {
    const languages = { en: `${baseUrl}${landingPath(l.slug, 'en')}`, es: `${baseUrl}${landingPath(l.slug, 'es')}` }
    return (['en', 'es'] as const).map((lang) => ({
      url: `${baseUrl}${landingPath(l.slug, lang)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: lang === 'en' ? 0.9 : 0.8,
      alternates: { languages },
    }))
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...landingEntries,
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
