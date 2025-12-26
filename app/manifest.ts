import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IVA Nail Art - Luxury Nails Brooklyn',
    short_name: 'IVA Nail Art',
    description: 'Exclusive nail art studio in Brooklyn, NY. Book your appointment today!',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F6',
    theme_color: '#4A0404',
    orientation: 'portrait',
    icons: [
      {
        src: '/portada.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  }
}
