import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SERVICE_LANDINGS, landingPath } from '@/app/data/serviceLandings'
import { HYPERLOCAL_LANDINGS, hyperlocalPath } from '@/app/data/hyperlocalLandings'

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

  const hyperlocalEntries: MetadataRoute.Sitemap = HYPERLOCAL_LANDINGS.flatMap((h) => {
    const languages = { en: `${baseUrl}${hyperlocalPath(h.slug, 'en')}`, es: `${baseUrl}${hyperlocalPath(h.slug, 'es')}` }
    return (['en', 'es'] as const).map((lang) => ({
      url: `${baseUrl}${hyperlocalPath(h.slug, lang)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: lang === 'en' ? 0.95 : 0.85,
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
    ...hyperlocalEntries,
    ...['/try-on', '/nail-match', '/gift-card', '/aftercare', '/es/aftercare'].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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
