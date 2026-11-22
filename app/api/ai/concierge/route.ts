import { NextResponse } from "next/server";
import { z } from "zod";

const ConciergeQuerySchema = z.object({
  occasion: z.string().min(2).max(100),
  preferredLength: z.enum(["short", "medium", "long", "any"]).optional().default("any"),
  aestheticVibe: z.string().max(100).optional().default("luxury"),
  notes: z.string().max(500).optional(),
});

interface RecommendationResult {
  serviceId: string;
  serviceName: string;
  artTierId: string;
  artTierName: string;
  designConcept: string;
  colorPalette: string[];
  estimatedPrice: number;
  estimatedDuration: string;
  curatorEditorialNote: string;
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = ConciergeQuerySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid consultation parameters", details: result.error.format() },
        { status: 400 }
      );
    }

    const { occasion, preferredLength } = result.data;
    const lowerOccasion = occasion.toLowerCase();

    // High-Fashion Editorial Decision Matrix
    let recommendation: RecommendationResult;

    if (lowerOccasion.includes("bridal") || lowerOccasion.includes("wedding") || lowerOccasion.includes("novia")) {
      recommendation = {
        serviceId: "builder-gel-biab",
        serviceName: "Aureate Structured Gel (BIAB)",
        artTierId: "art-tier-1",
        artTierName: "Nail Art Tier 1 (Minimalist)",
        designConcept: "Porcelain Soft Blush with Micro-Pearl French Arc",
        colorPalette: ["#F9F6F0", "#EAD8B1", "#FFFFFF"],
        estimatedPrice: 160,
        estimatedDuration: "2h 05m",
        curatorEditorialNote: "For weddings, we prioritize impeccable cuticle contouring and chip-free strength that photographs flawlessly under macro flash photography."
      };
    } else if (lowerOccasion.includes("gala") || lowerOccasion.includes("fashion") || lowerOccasion.includes("party") || lowerOccasion.includes("black tie")) {
      recommendation = {
        serviceId: "gel-x-extensions",
        serviceName: "Apothecary Full Set Gel-X",
        artTierId: "art-tier-3",
        artTierName: "Nail Art Tier 3 (Haute Couture 3D)",
        designConcept: "Sculpted Molten Gold Drops with Liquid Chrome Inlay",
        colorPalette: ["#111111", "#C5A059", "#D4AF37"],
        estimatedPrice: 245,
        estimatedDuration: "3h 00m",
        curatorEditorialNote: "Command the room with architectural stiletto or soft-almond extensions accented by light-reflecting metallic textures."
      };
    } else if (preferredLength === "short" || lowerOccasion.includes("minimal") || lowerOccasion.includes("work") || lowerOccasion.includes("executive")) {
      recommendation = {
        serviceId: "russian-mani",
        serviceName: "The Signature Russian Dry Mani",
        artTierId: "art-tier-1",
        artTierName: "Nail Art Tier 1 (Minimalist)",
        designConcept: "Clean Girl High-Gloss Buff with Bare Negative Space Accent",
        colorPalette: ["#FAF8F5", "#F4EBE1", "#4A4A4A"],
        estimatedPrice: 140,
        estimatedDuration: "1h 50m",
        curatorEditorialNote: "Subtle, immaculate, and timeless. Complements bespoke tailoring and fine jewelry without distraction."
      };
    } else {
      // Default Haute Selection
      recommendation = {
        serviceId: "builder-gel-biab",
        serviceName: "Aureate Structured Gel (BIAB)",
        artTierId: "art-tier-2",
        artTierName: "Nail Art Tier 2 (Artisan Hand-Painted)",
        designConcept: "Bespoke Glazed Chrome Aura with Fine Line Geometry",
        colorPalette: ["#EAD8B1", "#FAF8F5", "#C5A059"],
        estimatedPrice: 195,
        estimatedDuration: "2h 30m",
        curatorEditorialNote: "Our most coveted salon formula: reinforced natural nail architecture with subtle light-catching dimension."
      };
    }

    return NextResponse.json({
      success: true,
      recommendation,
      atelier: "IVA Nail Art Brooklyn, NY",
    });
  } catch (error) {
    console.error("AI Concierge consultation error:", error);
    return NextResponse.json(
      { error: "Internal concierge processing failed" },
      { status: 500 }
    );
  }
}
