import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IVA Nail Art - Luxury Nails Brooklyn',
    short_name: 'IVA Nails',
    description: 'Premier luxury nail art studio in Bay Ridge, Brooklyn. Hospital-grade sterilization, premium 10-Free polishes, award-winning artistry. Book your exclusive appointment today!',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDF8F6',
    theme_color: '#4A0404',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    dir: 'ltr',
    categories: ['beauty', 'lifestyle'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/portada.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
    screenshots: [
      {
        src: '/portada.jpg',
        sizes: '1280x720',
        type: 'image/jpeg',
      },
    ],
    shortcuts: [
      {
        name: 'Book Appointment',
        short_name: 'Book',
        description: 'Schedule your luxury nail session',
        url: '/#booking',
      },
      {
        name: 'Virtual Studio',
        short_name: 'Try Colors',
        description: 'Try nail colors virtually',
        url: '/#virtual-studio',
      },
    ],
  }
}
