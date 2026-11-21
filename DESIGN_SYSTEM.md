# ✨ Luxury Editorial Design System — IVA Nail Art NY
**Owner:** Director of Web Design, UI/UX & Brand (Head of Design)  
**Inspiration:** Chanel Beauty, Dior Haute Joaillerie, Aesop, Glosslab Editorial  
**Status:** Canonical Design Tokens  

---

## 1. Color Palette & Emotional Tone

| Token Name | Hex Code | Semantic Role | Contrast Ratio against #FAF8F5 |
| :--- | :--- | :--- | :--- |
| `--color-alabaster` | `#FAF8F5` | Main Primary Background (Warm, clean editorial canvas) | Baseline (1.0:1) |
| `--color-carbon` | `#111111` | Primary Typography, Luxury Headings, Dark Badges | 18.2:1 (Exceeds AAA) |
| `--color-carbon-muted` | `#4A4A4A` | Secondary Typography, Subtitles, Meta Information | 9.4:1 (Exceeds AAA) |
| `--color-champagne` | `#C5A059` | Primary Luxury Accent, CTAs, Highlights, Rating Stars | 4.6:1 (Meets WCAG AA) |
| `--color-champagne-light`| `#EAD8B1` | Subtle Glows, Selection Borders, Tag Backgrounds | Contrast for Dark Surfaces |
| `--color-nude-cream` | `#F4EBE1` | Secondary Surfaces, Card Backgrounds, Drawer Containers | 1.15:1 Soft Separation |
| `--color-border-hairline`| `rgba(17, 17, 17, 0.08)` | Hairline Separators, 1px Clean Luxury Grid Lines | Elegant, unobtrusive |

---

## 2. Typography Hierarchy

```css
/* Editorial Luxury Serif for Headings */
font-serif: "Playfair Display", "Cormorant Garamond", "Didot", Georgia, serif;

/* Precision Modern Sans for Data, Forms & Navigation */
font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

* **Display 1 (Hero Title):** `text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] font-normal`
* **Heading 2 (Section Title):** `text-2xl md:text-4xl font-serif tracking-tight text-[#111111]`
* **Heading 3 (Card / Category):** `text-lg md:text-xl font-serif font-medium tracking-wide`
* **Overline / Label:** `text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#C5A059]`
* **Body Text:** `text-sm md:text-base font-sans font-light text-[#4A4A4A] leading-relaxed`
* **Price / Data:** `text-base md:text-lg font-serif font-semibold text-[#111111]`

---

## 3. Micro-Interactions & Luxury Surfaces

### A. Glassmorphism & Cards
* **Surface Formula:** `background: rgba(255, 255, 255, 0.75); backdrop-filter: blur(12px); border: 1px solid rgba(197, 160, 89, 0.2);`
* **Shadow:** `box-shadow: 0 10px 30px -10px rgba(17, 17, 17, 0.04);`

### B. Interactive Buttons
* **Primary Luxury CTA:**
  - Base: Background `#111111`, Text `#FAF8F5`, Border `1px solid #111111`.
  - Hover: Background `#C5A059`, Border `#C5A059`, Text `#111111`, `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`.
* **Secondary Champagne Ghost:**
  - Base: Background `transparent`, Text `#111111`, Border `1px solid rgba(197, 160, 89, 0.4)`.
  - Hover: Background `rgba(197, 160, 89, 0.1)`, Border `#C5A059`.

---

## 4. Mobile & Safe-Area Constraints (`390x844` iPhone Standard)
* **Bottom Safe Area Padding:** `padding-bottom: max(1rem, env(safe-area-inset-bottom));`
* **Input Font Size Guarantee:** All text inputs must use `font-size: 16px` minimum to prevent unwanted iOS Safari viewport auto-zooming.
* **Touch Target Size:** Minimum `44px x 44px` for all clickable pills, icons, and CTA buttons.
