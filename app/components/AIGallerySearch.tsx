"use client";

/**
 * IVA Nail Art - AI Gallery Search
 * Search by color, style, mood with smart suggestions
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  X,
  Wand2,
  Palette,
  Heart,
  TrendingUp,
  Clock,
  Filter,
  ChevronDown,
} from "lucide-react";

interface GalleryItem {
  id: string;
  image: string;
  name: string;
  category: string;
  colors: string[];
  mood: string[];
  style: string[];
  season?: string;
  occasion?: string;
  trending?: boolean;
}

// Enhanced gallery data with AI-searchable attributes
const GALLERY_DATA: GalleryItem[] = [
  {
    id: "1",
    image: "/gallery/nail1.jpg",
    name: "Rose Gold Chrome",
    category: "Chrome",
    colors: ["rose gold", "pink", "metallic", "champagne"],
    mood: ["elegant", "luxurious", "romantic"],
    style: ["minimalist", "modern", "chic"],
    season: "all",
    occasion: "wedding",
    trending: true,
  },
  {
    id: "2",
    image: "/gallery/nail2.jpg",
    name: "3D White Florals",
    category: "3D Art",
    colors: ["white", "cream", "pearl"],
    mood: ["romantic", "dreamy", "soft"],
    style: ["bridal", "artistic", "delicate"],
    season: "spring",
    occasion: "wedding",
    trending: true,
  },
  {
    id: "3",
    image: "/gallery/nail3.jpg",
    name: "Classic French Ombre",
    category: "French",
    colors: ["nude", "white", "pink", "natural"],
    mood: ["classic", "elegant", "timeless"],
    style: ["traditional", "clean", "sophisticated"],
    season: "all",
    occasion: "everyday",
  },
  {
    id: "4",
    image: "/gallery/nail4.jpg",
    name: "Glazed Donut",
    category: "Trendy",
    colors: ["pearl", "iridescent", "nude", "holographic"],
    mood: ["trendy", "fresh", "modern"],
    style: ["minimalist", "sheer", "natural"],
    season: "all",
    occasion: "everyday",
    trending: true,
  },
  {
    id: "5",
    image: "/gallery/nail5.jpg",
    name: "Burgundy Velvet",
    category: "Solid",
    colors: ["burgundy", "red", "wine", "dark"],
    mood: ["bold", "sophisticated", "dramatic"],
    style: ["classic", "elegant", "statement"],
    season: "winter",
    occasion: "party",
  },
  {
    id: "6",
    image: "/gallery/nail6.jpg",
    name: "Holographic Fantasy",
    category: "Chrome",
    colors: ["holographic", "rainbow", "silver", "iridescent"],
    mood: ["playful", "fun", "eye-catching"],
    style: ["trendy", "bold", "artistic"],
    season: "summer",
    occasion: "party",
    trending: true,
  },
  {
    id: "7",
    image: "/gallery/nail7.jpg",
    name: "Emerald Jewel",
    category: "Solid",
    colors: ["green", "emerald", "jewel tones", "dark"],
    mood: ["luxurious", "rich", "sophisticated"],
    style: ["elegant", "bold", "statement"],
    season: "winter",
    occasion: "holiday",
  },
  {
    id: "8",
    image: "/gallery/nail8.jpg",
    name: "Lavender Dreams",
    category: "Pastel",
    colors: ["lavender", "purple", "lilac", "pastel"],
    mood: ["soft", "dreamy", "calming"],
    style: ["delicate", "feminine", "gentle"],
    season: "spring",
    occasion: "everyday",
  },
];

// AI search suggestions based on context
const QUICK_SEARCHES = [
  { label: "Trending Now", icon: TrendingUp, query: "trending" },
  { label: "Wedding Ready", icon: Heart, query: "wedding elegant white" },
  { label: "Bold & Dramatic", icon: Sparkles, query: "bold dramatic statement" },
  { label: "Everyday Chic", icon: Clock, query: "everyday minimalist natural" },
];

const COLOR_CHIPS = [
  { name: "Nude", color: "#E8D5C4" },
  { name: "Pink", color: "#FFB6C1" },
  { name: "Red", color: "#DC143C" },
  { name: "Burgundy", color: "#722F37" },
  { name: "White", color: "#FFFFFF" },
  { name: "Black", color: "#1A1A1A" },
  { name: "Gold", color: "#FFD700" },
  { name: "Silver", color: "#C0C0C0" },
  { name: "Green", color: "#228B22" },
  { name: "Blue", color: "#4169E1" },
  { name: "Purple", color: "#9370DB" },
  { name: "Chrome", color: "linear-gradient(135deg, #C0C0C0, #808080, #C0C0C0)" },
];

interface AIGallerySearchProps {
  onSearch?: (results: GalleryItem[]) => void;
  onSelectDesign?: (design: GalleryItem) => void;
  language?: "en" | "es";
}

export default function AIGallerySearch({ onSearch, onSelectDesign, language = "en" }: AIGallerySearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<GalleryItem[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const isSpanish = language === "es";

  // AI-powered search function
  const performSearch = (searchQuery: string, colors: string[] = []) => {
    const terms = searchQuery.toLowerCase().split(" ").filter(Boolean);
    const allTerms = [...terms, ...colors.map(c => c.toLowerCase())];

    if (allTerms.length === 0) {
      setResults([]);
      return;
    }

    // Handle special queries
    if (searchQuery.toLowerCase().includes("trending")) {
      const trendingResults = GALLERY_DATA.filter(item => item.trending);
      setResults(trendingResults);
      setAiSuggestion(isSpanish ? "Mostrando diseños en tendencia" : "Showing trending designs");
      return;
    }

    // Score-based matching for AI-like relevance
    const scoredResults = GALLERY_DATA.map(item => {
      let score = 0;

      allTerms.forEach(term => {
        // Color matching (high weight)
        if (item.colors.some(c => c.includes(term))) score += 3;
        // Mood matching (medium weight)
        if (item.mood.some(m => m.includes(term))) score += 2;
        // Style matching (medium weight)
        if (item.style.some(s => s.includes(term))) score += 2;
        // Category matching (high weight)
        if (item.category.toLowerCase().includes(term)) score += 3;
        // Name matching (highest weight)
        if (item.name.toLowerCase().includes(term)) score += 4;
        // Season matching
        if (item.season?.includes(term)) score += 1;
        // Occasion matching
        if (item.occasion?.includes(term)) score += 2;
      });

      return { item, score };
    });

    const filtered = scoredResults
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item);

    setResults(filtered);

    // Generate AI suggestion
    if (filtered.length > 0) {
      const topMatch = filtered[0];
      setAiSuggestion(
        isSpanish
          ? `${filtered.length} diseños encontrados. "${topMatch.name}" es tu mejor coincidencia.`
          : `Found ${filtered.length} designs. "${topMatch.name}" is your best match.`
      );
    } else {
      setAiSuggestion(
        isSpanish
          ? "No encontré coincidencias exactas. Intenta con otros términos."
          : "No exact matches found. Try different terms."
      );
    }

    onSearch?.(filtered);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query || selectedColors.length > 0) {
        performSearch(query, selectedColors);
      } else {
        setResults([]);
        setAiSuggestion("");
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, selectedColors]);

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const clearSearch = () => {
    setQuery("");
    setSelectedColors([]);
    setResults([]);
    setAiSuggestion("");
  };

  return (
    <div className="relative">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="flex items-center gap-2 bg-white border border-[#EBE8E2] rounded-full px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#B76E79]/30 focus-within:border-[#B76E79]">
          <Wand2 className="w-5 h-5 text-[#B76E79]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={isSpanish ? "Buscar por color, estilo o ambiente..." : "Search by color, style, or mood..."}
            className="flex-1 bg-transparent focus:outline-none text-sm text-[#1A1A1A] placeholder:text-[#7A7A7A]"
          />
          {(query || selectedColors.length > 0) && (
            <button onClick={clearSearch} className="p-1 hover:bg-[#F9F8F6] rounded-full">
              <X className="w-4 h-4 text-[#7A7A7A]" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-full transition-colors ${
              showFilters || selectedColors.length > 0
                ? "bg-[#722F37] text-white"
                : "hover:bg-[#F9F8F6]"
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Colors Tags */}
        {selectedColors.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedColors.map((color) => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className="flex items-center gap-1.5 px-3 py-1 bg-[#722F37] text-white rounded-full text-xs"
              >
                <span
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ background: COLOR_CHIPS.find(c => c.name === color)?.color }}
                />
                {color}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Search Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#EBE8E2] z-50 overflow-hidden"
          >
            {/* Color Filters */}
            {showFilters && (
              <div className="p-4 border-b border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-4 h-4 text-[#722F37]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {isSpanish ? "Filtrar por color" : "Filter by color"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {COLOR_CHIPS.map((chip) => (
                    <button
                      key={chip.name}
                      onClick={() => toggleColor(chip.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border transition-all ${
                        selectedColors.includes(chip.name)
                          ? "border-[#722F37] bg-[#722F37]/5"
                          : "border-[#EBE8E2] hover:border-[#D4D0C8]"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-[#EBE8E2]"
                        style={{ background: chip.color }}
                      />
                      {chip.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Searches */}
            {!query && selectedColors.length === 0 && (
              <div className="p-4 border-b border-[#EBE8E2]">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#722F37]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {isSpanish ? "Búsquedas rápidas" : "Quick searches"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map((search) => (
                    <button
                      key={search.query}
                      onClick={() => {
                        setQuery(search.query);
                        inputRef.current?.focus();
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#F9F8F6] rounded-full text-sm text-[#1A1A1A] hover:bg-[#EBE8E2] transition-colors"
                    >
                      <search.icon className="w-4 h-4 text-[#722F37]" />
                      {search.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Suggestion */}
            {aiSuggestion && (
              <div className="px-4 py-3 bg-gradient-to-r from-[#B76E79]/10 to-[#722F37]/10 flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-[#722F37]" />
                <span className="text-sm text-[#722F37]">{aiSuggestion}</span>
              </div>
            )}

            {/* Results */}
            {results.length > 0 && (
              <div className="p-4 max-h-80 overflow-y-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {results.slice(0, 8).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectDesign?.(item);
                        setIsOpen(false);
                      }}
                      className="group relative aspect-square rounded-xl overflow-hidden"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-white text-xs font-medium truncate">{item.name}</p>
                          <p className="text-white/70 text-[10px]">{item.category}</p>
                        </div>
                      </div>
                      {item.trending && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#722F37] rounded-full">
                          <TrendingUp className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                {results.length > 8 && (
                  <p className="text-center text-sm text-[#7A7A7A] mt-3">
                    +{results.length - 8} {isSpanish ? "más" : "more"}
                  </p>
                )}
              </div>
            )}

            {/* Close Button */}
            <div className="p-3 border-t border-[#EBE8E2] text-center">
              <button
                onClick={() => setIsOpen(false)}
                className="text-sm text-[#7A7A7A] hover:text-[#1A1A1A]"
              >
                {isSpanish ? "Cerrar" : "Close"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
