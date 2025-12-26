/**
 * Photorealistic Hand Assets for Virtual Nail Studio
 * High-quality image URLs for luxury nail art visualization
 */

export interface HandImage {
  url: string;
  alt: string;
  skinTone: 'light' | 'medium' | 'tan' | 'deep' | 'rich';
  orientation: 'palm' | 'back';
  quality: 'ultra' | 'high';
}

/**
 * Curated collection of photorealistic hand images
 * Using professional photography from Unsplash
 */
export const HAND_IMAGES: Record<string, HandImage> = {
  // Light skin tones
  lightPalm: {
    url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=1200&q=95&fit=crop',
    alt: 'Light skin tone hand - palm view',
    skinTone: 'light',
    orientation: 'palm',
    quality: 'ultra'
  },
  lightBack: {
    url: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=1200&q=95&fit=crop',
    alt: 'Light skin tone hand - back view',
    skinTone: 'light',
    orientation: 'back',
    quality: 'ultra'
  },

  // Medium skin tones
  mediumPalm: {
    url: 'https://images.unsplash.com/photo-1586295166365-8b0024b01c45?w=1200&q=95&fit=crop',
    alt: 'Medium skin tone hand - palm view',
    skinTone: 'medium',
    orientation: 'palm',
    quality: 'ultra'
  },
  mediumBack: {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=95&fit=crop',
    alt: 'Medium skin tone hand - back view',
    skinTone: 'medium',
    orientation: 'back',
    quality: 'ultra'
  },

  // Tan skin tones
  tanPalm: {
    url: 'https://images.unsplash.com/photo-1615486511262-c52a2b5b0f2c?w=1200&q=95&fit=crop',
    alt: 'Tan skin tone hand - palm view',
    skinTone: 'tan',
    orientation: 'palm',
    quality: 'ultra'
  },
  tanBack: {
    url: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=1200&q=95&fit=crop',
    alt: 'Tan skin tone hand - back view',
    skinTone: 'tan',
    orientation: 'back',
    quality: 'ultra'
  },

  // Deep skin tones
  deepPalm: {
    url: 'https://images.unsplash.com/photo-1591601596750-65c9e2b9a2e6?w=1200&q=95&fit=crop',
    alt: 'Deep skin tone hand - palm view',
    skinTone: 'deep',
    orientation: 'palm',
    quality: 'ultra'
  },
  deepBack: {
    url: 'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=1200&q=95&fit=crop',
    alt: 'Deep skin tone hand - back view',
    skinTone: 'deep',
    orientation: 'back',
    quality: 'ultra'
  },

  // Rich skin tones
  richPalm: {
    url: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=1200&q=95&fit=crop',
    alt: 'Rich skin tone hand - palm view',
    skinTone: 'rich',
    orientation: 'palm',
    quality: 'ultra'
  },
  richBack: {
    url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=95&fit=crop',
    alt: 'Rich skin tone hand - back view',
    skinTone: 'rich',
    orientation: 'back',
    quality: 'ultra'
  }
};

/**
 * Get hand image by skin tone and orientation
 */
export const getHandImage = (
  skinTone: HandImage['skinTone'],
  orientation: HandImage['orientation'] = 'palm'
): HandImage => {
  const key = `${skinTone}${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`;
  return HAND_IMAGES[key] || HAND_IMAGES.lightPalm;
};

/**
 * Get all available skin tones
 */
export const getSkinTones = (): HandImage['skinTone'][] => {
  return ['light', 'medium', 'tan', 'deep', 'rich'];
};

/**
 * Luxury gradient overlays for editorial aesthetic
 */
export const LUXURY_OVERLAYS = {
  goldenHour: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(139, 69, 19, 0.05) 100%)',
  nudeBlush: 'linear-gradient(135deg, rgba(255, 228, 196, 0.08) 0%, rgba(188, 143, 143, 0.06) 100%)',
  burgundyGlow: 'linear-gradient(135deg, rgba(128, 0, 32, 0.05) 0%, rgba(85, 26, 139, 0.03) 100%)',
  meshGradient: `
    radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.15) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(128, 0, 32, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(85, 26, 139, 0.08) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(255, 228, 196, 0.12) 0px, transparent 50%)
  `
};
