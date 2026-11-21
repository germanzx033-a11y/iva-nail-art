import { NextResponse } from "next/server";
import { BookingRequestSchema } from "@/lib/validations/booking";

// In-memory or Edge Rate Limiter baseline (IP based)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitRecord = rateLimitMap.get(ip);

  if (!limitRecord || now > limitRecord.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 1000 }); // 1 minute window
    return true;
  }

  if (limitRecord.count >= 10) {
    return false; // Exceeded 10 requests per minute
  }

  limitRecord.count += 1;
  return true;
}

const SERVICE_PRICES: Record<string, { name: string; price: number; duration: number }> = {
  "russian-mani": { name: "The Signature Russian Dry Mani", price: 110, duration: 90 },
  "builder-gel-biab": { name: "Aureate Structured Gel (BIAB)", price: 130, duration: 105 },
  "gel-x-extensions": { name: "Apothecary Full Set Gel-X", price: 150, duration: 120 },
};

const ADDON_PRICES: Record<string, { name: string; price: number; duration: number }> = {
  "art-tier-1": { name: "Nail Art Tier 1 (Minimalist)", price: 30, duration: 20 },
  "art-tier-2": { name: "Nail Art Tier 2 (Artisan Hand-Painted)", price: 65, duration: 45 },
  "art-tier-3": { name: "Nail Art Tier 3 (Haute Couture 3D)", price: 95, duration: 60 },
  "safe-removal": { name: "Safe E-File Removal & Care", price: 35, duration: 30 },
};

export async function POST(request: Request) {
  try {
    // 1. Rate limiting check
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: "Too many booking attempts. Please wait a minute before retrying." },
        { status: 429 }
      );
    }

    // 2. Parse & Zod Validate
    const body = await request.json();
    const validationResult = BookingRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 3. Calculate authoritative pricing & duration
    const baseService = SERVICE_PRICES[data.serviceId];
    const addonsTotal = (data.addons || []).reduce(
      (sum, addonKey) => sum + (ADDON_PRICES[addonKey]?.price || 0),
      0
    );
    const addonsDuration = (data.addons || []).reduce(
      (sum, addonKey) => sum + (ADDON_PRICES[addonKey]?.duration || 0),
      0
    );

    const totalPrice = baseService.price + addonsTotal;
    const totalDurationMin = baseService.duration + addonsDuration;
    const depositAmount = 35.0; // Standard non-refundable salon deposit

    const bookingId = `bk_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;

    const bookingRecord = {
      id: bookingId,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      instagramHandle: data.instagramHandle || null,
      serviceId: data.serviceId,
      serviceName: baseService.name,
      addons: data.addons,
      appointmentDate: data.appointmentDate,
      startTime: data.startTime,
      totalPrice,
      totalDurationMin,
      depositAmount,
      depositStatus: "pending",
      status: "pending_deposit",
      notes: data.notes || "",
      createdAt: new Date().toISOString(),
    };

    // 4. Trigger n8n Automation Webhook if configured
    const n8nWebhookUrl = process.env.N8N_BOOKING_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-signature": process.env.N8N_WEBHOOK_SECRET || "default-secret",
          },
          body: JSON.stringify({
            event: "booking.created",
            data: bookingRecord,
          }),
        });
      } catch (err) {
        console.warn("Could not dispatch n8n booking event, proceeding with internal flow:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        booking: bookingRecord,
        checkoutUrl: `/booking/checkout?bookingId=${bookingId}`,
        message: "Booking initialized successfully. Deposit required to confirm slot.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal server error while processing booking" },
      { status: 500 }
    );
  }
}
