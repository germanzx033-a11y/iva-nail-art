"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Phone, Clock, Wand2, Heart, Check } from "lucide-react";
import { CONFIG } from "../constants";
import { LUXURY_OVERLAYS } from "../constants/handAssets";
import Image from "next/image";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================
interface VirtualNailStudioProps {
  lang: "en" | "es";
}

type NailShape = "almond" | "stiletto" | "square" | "coffin";
type Finish = "glossy" | "matte" | "chrome";
type FingerKey = "pinky" | "ring" | "middle" | "index" | "thumb";
type ColorCategory = "all" | "nudes" | "reds" | "darks" | "metallics";

const SHAPE_ASSETS: Record<string, string> = {
  almond: "/realistic_hand.jpg",
  stiletto: "/realistic_hand.jpg",
  square: "/realistic_hand.jpg",
  coffin: "/realistic_hand.jpg",
};

// ============================================================================
// COLOUR LIBRARY
// ============================================================================
interface NailColor {
  id: string;
  name: string;
  nameEs: string;
  hex: string;
  category: ColorCategory;
}

const COLOUR_LIBRARY: NailColor[] = [
  // Nudes
  { id: "vanilla", name: "Vanilla Dream", nameEs: "Sueño Vainilla", hex: "#F5E6D3", category: "nudes" },
  { id: "champagne", name: "Champagne Toast", nameEs: "Brindis Champagne", hex: "#F7E7CE", category: "nudes" },
  { id: "ballet", name: "Ballet Slipper", nameEs: "Zapatilla Ballet", hex: "#F2D4D7", category: "nudes" },
  { id: "caramel", name: "Salted Caramel", nameEs: "Caramelo Salado", hex: "#D4A574", category: "nudes" },
  { id: "latte", name: "Oat Milk Latte", nameEs: "Latte Avena", hex: "#C9B8A8", category: "nudes" },
  // Reds
  { id: "burgundy", name: "Midnight Burgundy", nameEs: "Burgundy Medianoche", hex: "#4A0404", category: "reds" },
  { id: "cherry", name: "Black Cherry", nameEs: "Cereza Negra", hex: "#6B0F1A", category: "reds" },
  { id: "scarlet", name: "Scarlet Passion", nameEs: "Pasión Escarlata", hex: "#DC143C", category: "reds" },
  { id: "wine", name: "Mulled Wine", nameEs: "Vino Caliente", hex: "#722F37", category: "reds" },
  { id: "coral", name: "Coral Sunset", nameEs: "Atardecer Coral", hex: "#FF6F61", category: "reds" },
  // Darks
  { id: "midnight", name: "Midnight Hour", nameEs: "Hora Medianoche", hex: "#1A1A2E", category: "darks" },
  { id: "obsidian", name: "Obsidian Glass", nameEs: "Cristal Obsidiana", hex: "#0D0D0D", category: "darks" },
  { id: "plum", name: "Dark Plum", nameEs: "Ciruela Oscura", hex: "#3D1C4F", category: "darks" },
  { id: "forest", name: "Enchanted Forest", nameEs: "Bosque Encantado", hex: "#1B3D2F", category: "darks" },
  { id: "navy", name: "Royal Navy", nameEs: "Azul Marino Real", hex: "#1B2838", category: "darks" },
  // Metallics
  { id: "gold", name: "Liquid Gold", nameEs: "Oro Líquido", hex: "#D4AF37", category: "metallics" },
  { id: "rosegold", name: "Rose Gold Glow", nameEs: "Brillo Oro Rosa", hex: "#B76E79", category: "metallics" },
  { id: "silver", name: "Sterling Silver", nameEs: "Plata Esterlina", hex: "#C0C0C0", category: "metallics" },
  { id: "bronze", name: "Antique Bronze", nameEs: "Bronce Antiguo", hex: "#CD7F32", category: "metallics" },
  { id: "copper", name: "Molten Copper", nameEs: "Cobre Fundido", hex: "#B87333", category: "metallics" },
];

const CATEGORY_LABELS: Record<ColorCategory, { en: string; es: string }> = {
  all: { en: "All", es: "Todos" },
  nudes: { en: "Nudes", es: "Nudes" },
  reds: { en: "Reds", es: "Rojos" },
  darks: { en: "Darks", es: "Oscuros" },
  metallics: { en: "Metallic", es: "Metálicos" },
};

// ============================================================================
// FIXED NAIL GEOMETRY - CALIBRATED VALUES
// ============================================================================
interface FingerTransform {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
  rotate: number;
}

const NAIL_CONFIG: Record<FingerKey, FingerTransform> = {
  pinky:  { x: 42,  y: -180, scaleX: 0.23, scaleY: 0.55, rotate: 5 },
  ring:   { x: 13,  y: -120, scaleX: 0.29, scaleY: 0.40, rotate: 2 },
  middle: { x: -34, y: -95,  scaleX: 0.25, scaleY: 0.45, rotate: -3 },
  index:  { x: -74, y: -106, scaleX: 0.31, scaleY: 0.53, rotate: -7 },
  thumb:  { x: -88, y: -178, scaleX: 0.24, scaleY: 0.21, rotate: 23 },
};

// Base nail paths with center coordinates
const NAIL_PATHS: Record<FingerKey, { path: string; cx: number; cy: number }> = {
  pinky:  { path: "M175 320 C 175 305, 185 295, 200 295 C 215 295, 225 310, 225 330 C 220 350, 190 350, 175 320 Z", cx: 200, cy: 322 },
  ring:   { path: "M235 220 C 235 200, 245 180, 265 180 C 285 180, 295 200, 290 230 C 285 250, 250 250, 235 220 Z", cx: 265, cy: 215 },
  middle: { path: "M305 170 C 305 150, 315 130, 335 130 C 355 130, 365 150, 360 180 C 355 200, 320 200, 305 170 Z", cx: 335, cy: 165 },
  index:  { path: "M375 200 C 375 180, 385 170, 405 170 C 425 170, 435 190, 430 220 C 425 240, 390 240, 375 200 Z", cx: 405, cy: 205 },
  thumb:  { path: "M450 380 C 450 360, 470 350, 490 360 C 510 370, 510 400, 490 410 C 470 410, 450 390, 450 380 Z", cx: 480, cy: 385 },
};

// ============================================================================
// NAIL POLISH OVERLAY - Uses fixed NAIL_CONFIG
// ============================================================================
interface NailPolishOverlayProps {
  color: string;
  finish: Finish;
}

function NailPolishOverlay({ color, finish }: NailPolishOverlayProps) {
  const opacity = finish === "glossy" ? 0.75 : finish === "matte" ? 0.85 : 0.7;
  const fingers: FingerKey[] = ["pinky", "ring", "middle", "index", "thumb"];

  return (
    <svg
      viewBox="0 0 600 500"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {finish === 'chrome' && (
          <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5" />
            <stop offset="50%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0.5" />
          </linearGradient>
        )}
      </defs>

      {fingers.map((finger) => {
        const config = NAIL_CONFIG[finger];
        const { path, cx, cy } = NAIL_PATHS[finger];

        const transform = `
          translate(${cx}, ${cy})
          translate(${config.x}, ${config.y})
          rotate(${config.rotate})
          scale(${config.scaleX}, ${config.scaleY})
          translate(${-cx}, ${-cy})
        `;

        return (
          <g key={finger} transform={transform}>
            <path
              d={path}
              fill={color}
              style={{ mixBlendMode: 'multiply', opacity }}
            />
            {finish === 'glossy' && (
              <ellipse cx={cx} cy={cy - 15} rx={8} ry={12} fill="white" opacity="0.35" />
            )}
            {finish === 'chrome' && (
              <ellipse cx={cx} cy={cy - 10} rx={10} ry={15} fill="url(#chromeGradient)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ============================================================================
// COLOUR SWATCH COMPONENT
// ============================================================================
function ColourSwatch({
  color,
  isSelected,
  onClick,
  lang
}: {
  color: NailColor;
  isSelected: boolean;
  onClick: () => void;
  lang: "en" | "es";
}) {
  const isDark = parseInt(color.hex.slice(1), 16) < 0x808080;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center gap-1.5"
    >
      <div
        className={`relative w-10 h-10 rounded-full shadow-lg transition-all duration-200 ${
          isSelected ? "ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-black scale-110" : ""
        }`}
        style={{ backgroundColor: color.hex }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className={`w-4 h-4 ${isDark ? 'text-white' : 'text-black'}`} strokeWidth={3} />
          </div>
        )}
      </div>
      <span className={`text-[9px] text-center leading-tight max-w-[50px] ${
        isSelected ? "text-[#D4AF37] font-medium" : "text-[#F7E7CE]/60"
      }`}>
        {lang === "es" ? color.nameEs : color.name}
      </span>
    </motion.button>
  );
}

// ============================================================================
// MAIN COMPONENT - PRODUCTION READY
// ============================================================================
export default function VirtualNailStudio({ lang }: VirtualNailStudioProps) {
  const [nailShape, setNailShape] = useState<NailShape>("almond");
  const [selectedColor, setSelectedColor] = useState<NailColor>(COLOUR_LIBRARY[5]); // Burgundy
  const [finish, setFinish] = useState<Finish>("glossy");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [favoriteColors, setFavoriteColors] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<ColorCategory>("all");

  const filteredColors = useMemo(() => {
    if (activeCategory === "all") return COLOUR_LIBRARY;
    return COLOUR_LIBRARY.filter(c => c.category === activeCategory);
  }, [activeCategory]);

  const handleBooking = () => {
    const message = lang === "en"
      ? `Hi! I'd love to book:\n💅 Shape: ${nailShape}\n🎨 Color: ${selectedColor.name}\n✨ Finish: ${finish}`
      : `¡Hola! Quiero reservar:\n💅 Forma: ${nailShape}\n🎨 Color: ${selectedColor.nameEs}\n✨ Acabado: ${finish}`;
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const getNailShapePath = (shape: NailShape) => {
    const paths: Record<NailShape, string> = {
      almond: "M 8 50 Q 8 25 16 10 Q 24 0 32 0 Q 40 0 48 10 Q 56 25 56 50 L 56 80 L 8 80 Z",
      stiletto: "M 12 50 L 32 0 L 52 50 L 52 80 L 12 80 Z",
      square: "M 8 10 L 56 10 L 56 80 L 8 80 Z",
      coffin: "M 8 50 Q 8 20 18 10 L 46 10 Q 56 20 56 50 L 56 80 L 8 80 Z",
    };
    return paths[shape];
  };

  const t = {
    en: {
      title: "Virtual Nail Studio",
      subtitle: "Try our luxury colors in real-time",
      colourLibrary: "Colour Library",
      nailShape: "Nail Shape",
      finish: "Finish",
      glossy: "Glossy", matte: "Matte", chrome: "Chrome",
      bookNow: "Book This Look",
      studioLocation: "Visit Our Studio",
      visitUs: "Get Directions",
    },
    es: {
      title: "Estudio Virtual",
      subtitle: "Prueba nuestros colores de lujo en tiempo real",
      colourLibrary: "Librería de Colores",
      nailShape: "Forma de Uña",
      finish: "Acabado",
      glossy: "Brillante", matte: "Mate", chrome: "Cromado",
      bookNow: "Reservar Este Look",
      studioLocation: "Visita Nuestro Estudio",
      visitUs: "Ver Direcciones",
    },
  };
  const text = t[lang];

  const categories: ColorCategory[] = ["all", "nudes", "reds", "darks", "metallics"];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#1A0F0A] to-[#0D0D0D]" />
      <div className="absolute inset-0" style={{ background: LUXURY_OVERLAYS.meshGradient }} />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#F7E7CE] text-xs mb-4"
          >
            <Wand2 className="w-4 h-4 text-[#D4AF37]" />
            <span className="uppercase tracking-wider">Virtual Try-On</span>
          </motion.div>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#F7E7CE] mb-2">{text.title}</h2>
          <p className="text-[#F7E7CE]/50 text-sm sm:text-base">{text.subtitle}</p>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* LEFT: Hand Preview (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="relative bg-gradient-to-br from-white/[0.05] to-transparent rounded-3xl p-4 border border-white/10">
              {/* Hand Image Container */}
              <div className="relative w-full aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#1A0F0A]">
                <AnimatePresence>
                  {!isImageLoaded && (
                    <motion.div
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-30 bg-[#1A0F0A] flex items-center justify-center"
                    >
                      <Sparkles className="w-8 h-8 text-[#D4AF37]/50 animate-spin" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <Image
                  src={SHAPE_ASSETS[nailShape]}
                  alt="Hand preview"
                  fill
                  className={`object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />

                <NailPolishOverlay color={selectedColor.hex} finish={finish} />

                <div className="absolute inset-0 pointer-events-none" style={{ background: LUXURY_OVERLAYS.goldenHour }} />
              </div>

              {/* Selected Look Info */}
              <div className="mt-4 bg-black/40 rounded-xl p-3 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white/20" style={{ backgroundColor: selectedColor.hex }} />
                    <div>
                      <p className="text-[#F7E7CE] text-sm font-medium">
                        {lang === "es" ? selectedColor.nameEs : selectedColor.name}
                      </p>
                      <p className="text-[#F7E7CE]/40 text-xs">
                        {nailShape} • {text[finish]}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setFavoriteColors(prev =>
                      prev.includes(selectedColor.id) ? prev.filter(id => id !== selectedColor.id) : [...prev, selectedColor.id]
                    )}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${favoriteColors.includes(selectedColor.id) ? 'fill-red-500 text-red-500' : 'text-white/40'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Controls */}
          <div className="space-y-6">

            {/* Colour Library */}
            <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-5 border border-white/10">
              <h3 className="font-serif text-lg text-[#F7E7CE] mb-4">{text.colourLibrary}</h3>

              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-[#D4AF37] text-black"
                        : "bg-white/5 text-[#F7E7CE]/60 hover:bg-white/10 border border-white/10"
                    }`}
                  >
                    {CATEGORY_LABELS[cat][lang]}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
                {filteredColors.map((color) => (
                  <ColourSwatch
                    key={color.id}
                    color={color}
                    isSelected={selectedColor.id === color.id}
                    onClick={() => setSelectedColor(color)}
                    lang={lang}
                  />
                ))}
              </div>
            </div>

            {/* Nail Shape & Finish */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-4 border border-white/10">
                <h3 className="text-sm text-[#F7E7CE] mb-3">{text.nailShape}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(["almond", "stiletto", "square", "coffin"] as NailShape[]).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => setNailShape(shape)}
                      className={`p-2 rounded-lg border transition-all ${
                        nailShape === shape
                          ? "border-[#D4AF37] bg-[#D4AF37]/10"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <svg width="20" height="32" viewBox="0 0 64 90" className="mx-auto">
                        <path d={getNailShapePath(shape)} fill={nailShape === shape ? "#D4AF37" : "#F7E7CE"} />
                      </svg>
                      <p className="text-[9px] text-[#F7E7CE]/60 text-center mt-1 capitalize">{shape}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl p-4 border border-white/10">
                <h3 className="text-sm text-[#F7E7CE] mb-3">{text.finish}</h3>
                <div className="space-y-2">
                  {(["glossy", "matte", "chrome"] as Finish[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setFinish(f)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                        finish === f
                          ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                          : "border-white/10 text-[#F7E7CE]/60 hover:border-white/30"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          background: f === 'glossy'
                            ? 'linear-gradient(135deg, white 0%, #888 100%)'
                            : f === 'matte'
                            ? '#666'
                            : 'linear-gradient(135deg, #FFD700 0%, #C0C0C0 50%, #FFD700 100%)'
                        }}
                      />
                      {text[f]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Book Button */}
            <motion.button
              onClick={handleBooking}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] text-black font-semibold text-lg shadow-2xl shadow-[#D4AF37]/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {text.bookNow}
            </motion.button>

            {/* Studio Info */}
            <div className="bg-gradient-to-br from-[#4A0404]/30 to-transparent rounded-2xl p-5 border border-white/10">
              <h3 className="text-sm text-[#F7E7CE] mb-3">{text.studioLocation}</h3>
              <div className="space-y-2 text-xs text-[#F7E7CE]/60 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>{CONFIG.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#D4AF37]" />
                  <span>{CONFIG.hours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{CONFIG.phone}</span>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-[#F7E7CE] rounded-lg text-xs transition-all border border-white/10"
              >
                <MapPin className="w-3 h-3" />
                {text.visitUs}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
