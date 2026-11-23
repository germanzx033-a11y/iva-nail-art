import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export interface PortalClient {
  id: string;
  name: string;
  phone: string;
  pin: string; // 4-digit PIN
  email?: string;
  preferredShape: "Almond" | "Coffin" | "Square" | "Oval" | "Stiletto";
  service: string;
  lastApptDate: string; // YYYY-MM-DD
  notes: string;
  totalVisits: number;
  referralCode: string;
  referralCredits: number;
}

// Default seed clients
const DEFAULT_CLIENTS: PortalClient[] = [
  {
    id: "c1",
    name: "Camila Ramos",
    phone: "9295550182",
    pin: "1234",
    email: "camila@example.com",
    preferredShape: "Almond",
    service: "Builder Gel Manicure (BIAB)",
    lastApptDate: "2026-11-01",
    notes: "Sensitive cuticles, loves glazed donut chrome and neutral sheer tones.",
    totalVisits: 4,
    referralCode: "IVA-CAMILA",
    referralCredits: 30,
  },
  {
    id: "c2",
    name: "Sarah Miller",
    phone: "9175550144",
    pin: "1234",
    email: "sarah.m@example.com",
    preferredShape: "Almond",
    service: "Bridal Nail Ritual",
    lastApptDate: "2026-10-25",
    notes: "Wedding set was stunning! Mentioned she wants a shorter refill for honeymoon.",
    totalVisits: 3,
    referralCode: "IVA-SARAH",
    referralCredits: 15,
  },
  {
    id: "c3",
    name: "Jessica Torres",
    phone: "9295550123",
    pin: "1234",
    email: "jess.t@example.com",
    preferredShape: "Coffin",
    service: "Gel-X Extensions",
    lastApptDate: "2026-11-05",
    notes: "Prefers velvet cat-eye or dark emerald tones. Fast grower.",
    totalVisits: 5,
    referralCode: "IVA-JESS",
    referralCredits: 45,
  },
  {
    id: "c4",
    name: "Emily Vance",
    phone: "7185550199",
    pin: "1234",
    email: "emily.v@example.com",
    preferredShape: "Square",
    service: "Russian Dry Manicure",
    lastApptDate: "2026-11-17",
    notes: "Natural short nails, delicate micro-French lines.",
    totalVisits: 2,
    referralCode: "IVA-EMILY",
    referralCredits: 0,
  },
  {
    id: "c5",
    name: "German",
    phone: "9296257273",
    pin: "1234",
    email: "germanzx033@gmail.com",
    preferredShape: "Almond",
    service: "Builder Gel Manicure (BIAB)",
    lastApptDate: new Date().toISOString().split("T")[0],
    notes: "VIP Client - Executive sanctuary testing",
    totalVisits: 6,
    referralCode: "IVA-GERMAN",
    referralCredits: 60,
  },
];

// Helper to calculate days between dates
function getDaysBetween(dateStr: string): number {
  const past = new Date(dateStr).getTime();
  const now = Date.now();
  return Math.max(0, Math.floor((now - past) / (1000 * 60 * 60 * 24)));
}

// Compute dynamic refill window (3 to 4 weeks after last appt)
function getRefillWindow(lastApptStr: string) {
  const d = new Date(lastApptStr);
  const start = new Date(d);
  start.setDate(start.getDate() + 21); // 3 weeks
  const end = new Date(d);
  end.setDate(end.getDate() + 28); // 4 weeks

  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
    daysRemainingForIdealWindow: Math.max(0, Math.floor((end.getTime() - Date.now()) / (1000 * 60 * 60 * 24))),
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, phone, pin, name, preferredShape, service, notes } = body;

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ error: "Número de teléfono inválido (debe tener al menos 10 dígitos)" }, { status: 400 });
    }

    // Try reading from KV or fallback to default
    let clients: PortalClient[] = [];
    try {
      const kvData = await kv.get<PortalClient[]>("clients:list");
      if (kvData && Array.isArray(kvData) && kvData.length > 0) {
        clients = kvData;
      } else {
        clients = DEFAULT_CLIENTS;
      }
    } catch {
      clients = DEFAULT_CLIENTS;
    }

    const normalizedTarget = cleanPhone.slice(-10);
    const existingIndex = clients.findIndex((c) => c.phone.replace(/\D/g, "").slice(-10) === normalizedTarget);
    const existing = existingIndex !== -1 ? clients[existingIndex] : null;

    if (action === "login") {
      if (!existing) {
        return NextResponse.json(
          { error: "No encontramos una cuenta con este número. Por favor regístrate como nueva clienta." },
          { status: 404 }
        );
      }

      // If user passed a PIN, verify it (default to 1234 if not yet set)
      const expectedPin = existing.pin || "1234";
      if (pin && pin.trim() !== expectedPin) {
        return NextResponse.json(
          { error: "PIN incorrecto. (Si lo olvidaste, el PIN por defecto es 1234 o consulta a Ivannía)." },
          { status: 401 }
        );
      }

      const days = getDaysBetween(existing.lastApptDate);
      const refillWindow = getRefillWindow(existing.lastApptDate);
      const stamps = ((existing.totalVisits - 1) % 6) + 1;
      const tier = existing.totalVisits >= 6 ? "Obsidian VIP" : existing.totalVisits >= 3 ? "Champagne Gold" : "Alabaster";

      // Sanitize client payload so PIN is never sent over the wire
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _pin, ...safeExisting } = existing;

      return NextResponse.json({
        success: true,
        client: {
          ...safeExisting,
          daysSinceLastAppt: days,
          stamps,
          tier,
          refillWindow,
        },
      });
    }

    if (action === "register") {
      if (existing) {
        return NextResponse.json(
          { error: "Ya existe una cuenta con este teléfono. Por favor inicia sesión con tu PIN." },
          { status: 409 }
        );
      }

      const firstName = (name || "Clienta VIP").split(" ")[0].toUpperCase();
      const newClient: PortalClient = {
        id: `c_${Date.now()}`,
        name: (name || "Clienta VIP").trim(),
        phone: cleanPhone,
        pin: (pin || "1234").trim(),
        preferredShape: preferredShape || "Almond",
        service: service || "Builder Gel Manicure (BIAB)",
        lastApptDate: new Date().toISOString().split("T")[0],
        notes: (notes || "Clienta registrada desde el Portal VIP").trim(),
        totalVisits: 1,
        referralCode: `IVA-${firstName}`,
        referralCredits: 15,
      };

      const updatedList = [newClient, ...clients];
      try {
        await kv.set("clients:list", updatedList);
      } catch {
        // Continue with memory
      }

      const refillWindow = getRefillWindow(newClient.lastApptDate);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _newPin, ...safeNewClient } = newClient;

      return NextResponse.json({
        success: true,
        client: {
          ...safeNewClient,
          daysSinceLastAppt: 0,
          stamps: 1,
          tier: "Alabaster",
          refillWindow,
        },
      });
    }

    if (action === "update_preferences") {
      if (!existing) {
        return NextResponse.json({ error: "Clienta no encontrada" }, { status: 404 });
      }

      const updatedClient: PortalClient = {
        ...existing,
        preferredShape: preferredShape || existing.preferredShape,
        service: service || existing.service,
        notes: notes !== undefined ? notes : existing.notes,
        pin: pin || existing.pin,
      };

      clients[existingIndex] = updatedClient;
      try {
        await kv.set("clients:list", clients);
      } catch {
        // Continue
      }

      const days = getDaysBetween(updatedClient.lastApptDate);
      const refillWindow = getRefillWindow(updatedClient.lastApptDate);
      const stamps = ((updatedClient.totalVisits - 1) % 6) + 1;
      const tier = updatedClient.totalVisits >= 6 ? "Obsidian VIP" : updatedClient.totalVisits >= 3 ? "Champagne Gold" : "Alabaster";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _upPin, ...safeUpdatedClient } = updatedClient;

      return NextResponse.json({
        success: true,
        client: {
          ...safeUpdatedClient,
          daysSinceLastAppt: days,
          stamps,
          tier,
          refillWindow,
        },
      });
    }

    return NextResponse.json({ error: "Acción no reconocida" }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");

    let clients: PortalClient[] = [];
    try {
      const kvData = await kv.get<PortalClient[]>("clients:list");
      if (kvData && Array.isArray(kvData) && kvData.length > 0) {
        clients = kvData;
      } else {
        clients = DEFAULT_CLIENTS;
      }
    } catch {
      clients = DEFAULT_CLIENTS;
    }

    if (!phone) {
      // Return public list summary or 400
      return NextResponse.json({ count: clients.length });
    }

    const clean = phone.replace(/\D/g, "").slice(-10);
    const found = clients.find((c) => c.phone.replace(/\D/g, "").slice(-10) === clean);

    if (!found) {
      return NextResponse.json({ error: "Clienta no encontrada" }, { status: 404 });
    }

    const days = getDaysBetween(found.lastApptDate);
    const refillWindow = getRefillWindow(found.lastApptDate);
    const stamps = ((found.totalVisits - 1) % 6) + 1;
    const tier = found.totalVisits >= 6 ? "Obsidian VIP" : found.totalVisits >= 3 ? "Champagne Gold" : "Alabaster";

    return NextResponse.json({
      success: true,
      client: {
        id: found.id,
        name: found.name,
        phone: found.phone,
        preferredShape: found.preferredShape,
        service: found.service,
        lastApptDate: found.lastApptDate,
        totalVisits: found.totalVisits,
        notes: found.notes,
        stamps,
        tier,
        daysSinceLastAppt: days,
        refillWindow,
        referralCode: found.referralCode,
        referralCredits: found.referralCredits,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
