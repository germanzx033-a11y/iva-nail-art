import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { createHmac, timingSafeEqual } from "crypto";
import { isAdminAuthorized, getAdminSecret } from "@/lib/auth";

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

/**
 * Generate a cryptographically signed client session token
 */
export function generateClientSessionToken(phone10: string, pin: string): string {
  const secret = getAdminSecret();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`client:${phone10}:${pin}:${timestamp}`).digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Verify a client session token against their normalized 10-digit phone and PIN
 */
export function verifyClientSessionToken(token: string | null | undefined, phone10: string, pin: string): boolean {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [timestampStr, signature] = token.split(".");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Max session age: 30 days
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > 30 * 24 * 3600 || timestamp > now + 300) {
    return false;
  }

  const secret = getAdminSecret();
  const expectedSignature = createHmac("sha256", secret).update(`client:${phone10}:${pin}:${timestamp}`).digest("hex");

  const expectedBuf = Buffer.from(expectedSignature);
  const receivedBuf = Buffer.from(signature);
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { action, phone, pin, token, name, preferredShape, service, notes } = body;

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

      // STRICT PIN CHECK: PIN is strictly required and non-empty
      const expectedPin = (existing.pin || "1234").trim();
      const providedPin = (typeof pin === "string" ? pin.trim() : "");

      if (!providedPin || providedPin !== expectedPin) {
        return NextResponse.json(
          { error: "PIN de seguridad incorrecto. (Si lo olvidaste, el PIN por defecto es 1234 o consulta a Ivannía)." },
          { status: 401 }
        );
      }

      const days = getDaysBetween(existing.lastApptDate);
      const refillWindow = getRefillWindow(existing.lastApptDate);
      const stamps = ((existing.totalVisits - 1) % 6) + 1;
      const tier = existing.totalVisits >= 6 ? "Obsidian VIP" : existing.totalVisits >= 3 ? "Champagne Gold" : "Alabaster";
      const sessionToken = generateClientSessionToken(normalizedTarget, expectedPin);

      // Sanitize client payload so PIN is never exposed over the wire
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _pin, ...safeExisting } = existing;

      return NextResponse.json({
        success: true,
        token: sessionToken,
        client: {
          ...safeExisting,
          token: sessionToken,
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

      const newPin = (pin && typeof pin === "string" ? pin.trim() : "1234");
      const firstName = (name || "Clienta VIP").split(" ")[0].toUpperCase();
      const newClient: PortalClient = {
        id: `c_${Date.now()}`,
        name: (name || "Clienta VIP").trim(),
        phone: cleanPhone,
        pin: newPin,
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
      const sessionToken = generateClientSessionToken(normalizedTarget, newPin);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _newPin, ...safeNewClient } = newClient;

      return NextResponse.json({
        success: true,
        token: sessionToken,
        client: {
          ...safeNewClient,
          token: sessionToken,
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

      // Verify caller authorization: session token, PIN, or admin
      const expectedPin = (existing.pin || "1234").trim();
      const providedPin = typeof pin === "string" ? pin.trim() : "";
      const isAuthorizedClient =
        (providedPin && providedPin === expectedPin) ||
        verifyClientSessionToken(token, normalizedTarget, expectedPin) ||
        verifyClientSessionToken(request.headers.get("x-client-session"), normalizedTarget, expectedPin) ||
        isAdminAuthorized(request);

      if (!isAuthorizedClient) {
        return NextResponse.json(
          { error: "No autorizado para modificar los datos de esta clienta. Se requiere PIN o sesión válida." },
          { status: 401 }
        );
      }

      const updatedClient: PortalClient = {
        ...existing,
        preferredShape: preferredShape || existing.preferredShape,
        service: service || existing.service,
        notes: notes !== undefined ? notes : existing.notes,
        pin: (pin && typeof pin === "string" && pin.trim().length >= 4) ? pin.trim() : existing.pin,
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
      const sessionToken = generateClientSessionToken(normalizedTarget, updatedClient.pin);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pin: _upPin, ...safeUpdatedClient } = updatedClient;

      return NextResponse.json({
        success: true,
        token: sessionToken,
        client: {
          ...safeUpdatedClient,
          token: sessionToken,
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
      // Non-identifying count summary only
      return NextResponse.json({ count: clients.length });
    }

    const clean = phone.replace(/\D/g, "").slice(-10);
    const found = clients.find((c) => c.phone.replace(/\D/g, "").slice(-10) === clean);

    if (!found) {
      return NextResponse.json({ error: "Clienta no encontrada" }, { status: 404 });
    }

    // AUTHENTICATION CHECK: Caller must provide valid PIN or Session Token or be Admin
    const expectedPin = (found.pin || "1234").trim();
    const providedPin = (searchParams.get("pin") || request.headers.get("x-client-pin") || "").trim();
    const sessionHeader = request.headers.get("x-client-session") || searchParams.get("token");

    const isAuthorized =
      (providedPin && providedPin === expectedPin) ||
      verifyClientSessionToken(sessionHeader, clean, expectedPin) ||
      isAdminAuthorized(request);

    if (!isAuthorized) {
      return NextResponse.json(
        { error: "Autenticación requerida para acceder al perfil de la clienta (PIN o sesión requerida)." },
        { status: 401 }
      );
    }

    const days = getDaysBetween(found.lastApptDate);
    const refillWindow = getRefillWindow(found.lastApptDate);
    const stamps = ((found.totalVisits - 1) % 6) + 1;
    const tier = found.totalVisits >= 6 ? "Obsidian VIP" : found.totalVisits >= 3 ? "Champagne Gold" : "Alabaster";
    const sessionToken = generateClientSessionToken(clean, expectedPin);

    return NextResponse.json({
      success: true,
      token: sessionToken,
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
