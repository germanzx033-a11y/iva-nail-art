/**
 * Photorealistic Hand Assets for Virtual Nail Studio
 * Using Unsplash photography for luxury nail art visualization
 */

// New photorealistic approach with Unsplash images
export const HAND_ASSETS = {
  fair: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
  medium: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
  tan: "https://images.unsplash.com/photo-1632733711679-529806f195d5?q=80&w=2070&auto=format&fit=crop",
  deep: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1664&auto=format&fit=crop"
};

// Nail zone paths for future overlay positioning
export const NAIL_ZONES = {
  thumb: "M 20,50 C 20,40 25,30 35,30 C 45,30 50,40 50,50 L 50,80 C 50,90 45,100 35,100 C 25,100 20,90 20,80 Z",
  index: "M 120,30 C 120,20 125,10 135,10 C 145,10 150,20 150,30 L 150,60 C 150,70 145,80 135,80 C 125,80 120,70 120,60 Z",
  middle: "M 220,20 C 220,10 225,0 235,0 C 245,0 250,10 250,20 L 250,55 C 250,65 245,75 235,75 C 225,75 220,65 220,55 Z",
  ring: "M 320,35 C 320,25 325,15 335,15 C 345,15 350,25 350,35 L 350,65 C 350,75 345,85 335,85 C 325,85 320,75 320,65 Z",
  pinky: "M 410,60 C 410,50 415,40 425,40 C 435,40 440,50 440,60 L 440,85 C 440,95 435,105 425,105 C 415,105 410,95 410,85 Z"
};

export type SkinToneKey = keyof typeof HAND_ASSETS;

// Legacy interface for backward compatibility
export interface HandImage {
  url: string;
  alt: string;
  skinTone: 'light' | 'medium' | 'tan' | 'deep' | 'rich';
  orientation: 'palm' | 'back';
  quality: 'ultra' | 'high';
}

// Map new skin tone keys to legacy system
const SKIN_TONE_MAP: Record<SkinToneKey, HandImage['skinTone']> = {
  fair: 'light',
  medium: 'medium',
  tan: 'tan',
  deep: 'deep'
};

/**
 * Get hand image by skin tone (uses new HAND_ASSETS)
 */
export const getHandImage = (
  skinTone: HandImage['skinTone'],
  orientation: HandImage['orientation'] = 'palm'
): HandImage => {
  // Map legacy skin tone to new key
  const newKey = Object.entries(SKIN_TONE_MAP).find(([_, v]) => v === skinTone)?.[0] as SkinToneKey | undefined;
  const url = newKey ? HAND_ASSETS[newKey] : HAND_ASSETS.medium;

  return {
    url,
    alt: `${skinTone} skin tone hand - ${orientation} view`,
    skinTone,
    orientation,
    quality: 'ultra'
  };
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
  `,
  cozyWarm: 'linear-gradient(180deg, rgba(255, 245, 235, 0.15) 0%, rgba(255, 228, 196, 0.08) 100%)'
};

/**
 * Color palettes for the Virtual Nail Studio
 */
export const NAIL_COLOR_PALETTES = {
  luxury: [
    { name: "Nude Champagne", hex: "#F5D7C8" },
    { name: "Deep Burgundy", hex: "#4A0404" },
    { name: "Rose Gold", hex: "#B76E79" },
    { name: "Midnight Black", hex: "#1A1A1A" },
    { name: "Pearl White", hex: "#FDFBF7" },
    { name: "Mauve Dream", hex: "#C8A2C8" }
  ],
  seasonal: [
    { name: "Coral Sunset", hex: "#FF6F61" },
    { name: "Lavender Mist", hex: "#B19CD9" },
    { name: "Forest Green", hex: "#228B22" },
    { name: "Autumn Maple", hex: "#C45911" }
  ]
};
