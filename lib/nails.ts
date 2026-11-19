/**
 * Virtual nail rendering shared by the AR try-on and the Nail Match previews.
 * A nail is drawn in a local frame: x across the nail (−w/2…w/2), y from the
 * cuticle (0) to the free edge (−len), then placed with translate/rotate.
 */

export type NailShape = "almond" | "coffin" | "square" | "stiletto" | "oval";
export type NailLength = "short" | "medium" | "long";
export type NailFinish = "gloss" | "matte" | "chrome" | "cateye" | "glitter";

export interface NailDesign {
  shape: NailShape;
  length: NailLength;
  finish: NailFinish;
  color: string;
}

export const SHAPES: { id: NailShape; en: string; es: string }[] = [
  { id: "almond", en: "Almond", es: "Almendra" },
  { id: "coffin", en: "Coffin", es: "Coffin" },
  { id: "square", en: "Square", es: "Cuadrada" },
  { id: "stiletto", en: "Stiletto", es: "Stiletto" },
  { id: "oval", en: "Oval", es: "Ovalada" },
];

export const LENGTHS: { id: NailLength; en: string; es: string; factor: number }[] = [
  { id: "short", en: "Short", es: "Corto", factor: 1.0 },
  { id: "medium", en: "Medium", es: "Medio", factor: 1.5 },
  { id: "long", en: "Long", es: "Largo", factor: 2.1 },
];

export const FINISHES: { id: NailFinish; en: string; es: string }[] = [
  { id: "gloss", en: "Gloss", es: "Brillo" },
  { id: "matte", en: "Matte", es: "Mate" },
  { id: "chrome", en: "Chrome", es: "Chrome" },
  { id: "cateye", en: "Cat-eye", es: "Ojo de gato" },
  { id: "glitter", en: "Glitter", es: "Glitter" },
];

export const COLORS: { hex: string; en: string; es: string }[] = [
  { hex: "#E8C4B8", en: "Soft nude", es: "Nude suave" },
  { hex: "#D9A6A0", en: "Dusty rose", es: "Rosa empolvado" },
  { hex: "#F3E6DC", en: "Milky white", es: "Blanco lechoso" },
  { hex: "#B2213A", en: "Cherry red", es: "Rojo cereza" },
  { hex: "#6B1F2E", en: "Wine", es: "Vino" },
  { hex: "#5A3A2E", en: "Chocolate", es: "Chocolate" },
  { hex: "#B9A6D6", en: "Lilac", es: "Lila" },
  { hex: "#1E1B1E", en: "Black", es: "Negro" },
  { hex: "#C9A15B", en: "Gold", es: "Dorado" },
  { hex: "#9FB8C9", en: "Baby blue", es: "Azul cielo" },
];

export interface NailPreset extends NailDesign {
  id: string;
  en: string;
  es: string;
  /** Gallery photo that shows a similar real set. */
  photo: string;
}

export const PRESETS: NailPreset[] = [
  { id: "clean-girl", en: "Clean girl nude", es: "Nude clean girl", shape: "oval", length: "short", finish: "gloss", color: "#E8C4B8", photo: "/gallery/milky-white-square.jpg" },
  { id: "milky-almond", en: "Milky almond", es: "Almendra lechosa", shape: "almond", length: "medium", finish: "gloss", color: "#F3E6DC", photo: "/gallery/milky-white-square.jpg" },
  { id: "rose-chrome", en: "Rose chrome", es: "Chrome rosado", shape: "almond", length: "medium", finish: "chrome", color: "#D9A6A0", photo: "/gallery/aurora-chrome-gold.jpg" },
  { id: "cherry-classic", en: "Cherry classic", es: "Cereza clásico", shape: "square", length: "short", finish: "gloss", color: "#B2213A", photo: "/gallery/blush-aura-french.jpg" },
  { id: "chocolate-cateye", en: "Chocolate cat-eye", es: "Ojo de gato chocolate", shape: "almond", length: "medium", finish: "cateye", color: "#5A3A2E", photo: "/gallery/chocolate-cat-eye.jpg" },
  { id: "wine-stiletto", en: "Wine stiletto", es: "Stiletto vino", shape: "stiletto", length: "long", finish: "gloss", color: "#6B1F2E", photo: "/gallery/plum-croc-tortoise.jpg" },
  { id: "gold-glitter", en: "Gold party glitter", es: "Glitter dorado de fiesta", shape: "coffin", length: "long", finish: "glitter", color: "#C9A15B", photo: "/gallery/amber-aura.jpg" },
  { id: "lilac-matte", en: "Lilac matte", es: "Lila mate", shape: "coffin", length: "medium", finish: "matte", color: "#B9A6D6", photo: "/gallery/lilac-3d-orchid.jpg" },
  { id: "noir-coffin", en: "Noir coffin", es: "Coffin negro", shape: "coffin", length: "long", finish: "gloss", color: "#1E1B1E", photo: "/gallery/jewel-tone-abstract.jpg" },
  { id: "sky-oval", en: "Sky blue oval", es: "Ovalada azul cielo", shape: "oval", length: "medium", finish: "gloss", color: "#9FB8C9", photo: "/gallery/blue-stone-gold-charms.jpg" },
];

export function getPreset(id: string | null | undefined): NailPreset | undefined {
  return PRESETS.find((p) => p.id === id);
}

export function lengthFactor(length: NailLength): number {
  return LENGTHS.find((l) => l.id === length)?.factor ?? 1;
}

export function designLabel(d: NailDesign, lang: "en" | "es"): string {
  const s = SHAPES.find((x) => x.id === d.shape)!;
  const l = LENGTHS.find((x) => x.id === d.length)!;
  const f = FINISHES.find((x) => x.id === d.finish)!;
  const c = COLORS.find((x) => x.hex.toLowerCase() === d.color.toLowerCase());
  const color = c ? c[lang] : d.color;
  return lang === "en"
    ? `${s.en} · ${l.en} · ${f.en} · ${color}`
    : `${s.es} · ${l.es} · ${f.es} · ${color}`;
}

// ---------------------------------------------------------------------------
// Drawing
// ---------------------------------------------------------------------------

function shade(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  return `rgb(${clamp(r + (t - r) * p)}, ${clamp(g + (t - g) * p)}, ${clamp(b + (t - b) * p)})`;
}

/** Path of the nail in the local frame (cuticle at y=0, free edge at y=-len). */
export function nailPath(shape: NailShape, w: number, len: number): Path2D {
  const p = new Path2D();
  const hw = w / 2;
  const cut = Math.min(w * 0.45, len * 0.3); // rounded cuticle depth
  p.moveTo(-hw, -cut);
  // cuticle arc
  p.quadraticCurveTo(-hw, 0, 0, 0);
  p.quadraticCurveTo(hw, 0, hw, -cut);
  switch (shape) {
    case "square":
      p.lineTo(hw * 0.98, -len + w * 0.08);
      p.quadraticCurveTo(hw * 0.98, -len, hw * 0.85, -len);
      p.lineTo(-hw * 0.85, -len);
      p.quadraticCurveTo(-hw * 0.98, -len, -hw * 0.98, -len + w * 0.08);
      break;
    case "coffin":
      p.lineTo(hw * 0.62, -len);
      p.lineTo(-hw * 0.62, -len);
      break;
    case "stiletto":
      p.quadraticCurveTo(hw * 0.95, -len * 0.62, 0, -len - w * 0.15);
      p.quadraticCurveTo(-hw * 0.95, -len * 0.62, -hw, -cut);
      p.closePath();
      return p;
    case "almond":
      p.bezierCurveTo(hw, -len * 0.75, hw * 0.45, -len, 0, -len - w * 0.05);
      p.bezierCurveTo(-hw * 0.45, -len, -hw, -len * 0.75, -hw, -cut);
      p.closePath();
      return p;
    case "oval":
    default:
      p.lineTo(hw, -len + hw);
      p.bezierCurveTo(hw, -len - hw * 0.25, -hw, -len - hw * 0.25, -hw, -len + hw);
      break;
  }
  p.closePath();
  return p;
}

function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/**
 * Draws one nail with curvature, highlight and shadow. (cx, cy) is the cuticle
 * point, `angle` points from cuticle to free edge (radians, canvas coords).
 */
export function drawNail(
  ctx: CanvasRenderingContext2D,
  design: NailDesign,
  cx: number,
  cy: number,
  angle: number,
  width: number,
  length: number,
  seed = 1
) {
  const path = nailPath(design.shape, width, length);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle + Math.PI / 2); // local −y → direction of `angle`

  // Soft shadow under the nail
  ctx.save();
  ctx.shadowColor = "rgba(40, 15, 10, 0.35)";
  ctx.shadowBlur = width * 0.35;
  ctx.shadowOffsetY = width * 0.06;
  ctx.fillStyle = design.color;
  ctx.fill(path);
  ctx.restore();

  ctx.save();
  ctx.clip(path);
  const hw = width / 2;
  const top = -length - width * 0.2;

  // Base color with curvature (darker at the sides)
  const across = ctx.createLinearGradient(-hw, 0, hw, 0);
  if (design.finish === "chrome") {
    across.addColorStop(0, shade(design.color, -0.45));
    across.addColorStop(0.3, shade(design.color, 0.55));
    across.addColorStop(0.5, shade(design.color, 0.9));
    across.addColorStop(0.7, shade(design.color, 0.35));
    across.addColorStop(1, shade(design.color, -0.4));
  } else if (design.finish === "cateye") {
    across.addColorStop(0, shade(design.color, -0.55));
    across.addColorStop(0.5, shade(design.color, -0.25));
    across.addColorStop(1, shade(design.color, -0.55));
  } else {
    across.addColorStop(0, shade(design.color, -0.28));
    across.addColorStop(0.5, design.color);
    across.addColorStop(1, shade(design.color, -0.28));
  }
  ctx.fillStyle = across;
  ctx.fillRect(-hw - 2, top, width + 4, length + width);

  if (design.finish === "cateye") {
    // Magnetic shimmer band
    const band = ctx.createLinearGradient(-hw, top, hw, 0);
    band.addColorStop(0.32, "rgba(255,255,255,0)");
    band.addColorStop(0.47, shade(design.color, 0.75));
    band.addColorStop(0.5, "rgba(255,255,255,0.95)");
    band.addColorStop(0.53, shade(design.color, 0.75));
    band.addColorStop(0.68, "rgba(255,255,255,0)");
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = band;
    ctx.fillRect(-hw - 2, top, width + 4, length + width);
    ctx.globalAlpha = 1;
  }

  if (design.finish === "glitter") {
    const rnd = seeded(seed * 97 + 13);
    const count = Math.round((width * length) / 18);
    for (let i = 0; i < count; i++) {
      const x = -hw + rnd() * width;
      const y = top + rnd() * (length + width * 0.4);
      const r = Math.max(0.6, rnd() * width * 0.05);
      ctx.fillStyle = rnd() > 0.5 ? "rgba(255,248,225,0.95)" : shade(design.color, 0.6);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Lengthwise depth: slightly darker near the cuticle
  const along = ctx.createLinearGradient(0, 0, 0, top);
  along.addColorStop(0, "rgba(0,0,0,0.18)");
  along.addColorStop(0.25, "rgba(0,0,0,0)");
  ctx.fillStyle = along;
  ctx.fillRect(-hw - 2, top, width + 4, length + width);

  // Specular highlight (not on matte)
  if (design.finish !== "matte" && design.finish !== "cateye") {
    const strength = design.finish === "chrome" ? 0.75 : 0.55;
    const hl = ctx.createLinearGradient(-hw * 0.5, 0, -hw * 0.05, 0);
    hl.addColorStop(0, "rgba(255,255,255,0)");
    hl.addColorStop(0.5, `rgba(255,255,255,${strength})`);
    hl.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = hl;
    ctx.beginPath();
    ctx.ellipse(-hw * 0.28, -length * 0.5, hw * 0.16, length * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (design.finish === "matte") {
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(-hw - 2, top, width + 4, length + width);
  }

  ctx.restore();

  // Thin edge for definition
  ctx.lineWidth = Math.max(0.6, width * 0.025);
  ctx.strokeStyle = "rgba(60, 25, 20, 0.25)";
  ctx.stroke(path);
  ctx.restore();
}

/** Static row of five nails, used for design previews. */
export function drawPreview(canvas: HTMLCanvasElement, design: NailDesign) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const widths = [0.9, 1, 1.05, 0.95, 0.75];
  const base = w / 7.2;
  const factor = lengthFactor(design.length);
  let x = w * 0.1;
  widths.forEach((k, i) => {
    const nw = base * k;
    const nl = nw * 0.95 * factor;
    const tilt = (i - 2) * 0.06;
    drawNail(ctx, design, x + nw / 2, h * 0.88 - (i === 4 ? 0 : 0), -Math.PI / 2 + tilt, nw, Math.min(nl, h * 0.8), i + 1);
    x += nw + base * 0.28;
  });
}
