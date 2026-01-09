/**
 * IVA Nail Art - Vercel KV Data Model & Utilities
 * Golden Gate Resilience Protocol
 */

import { kv } from '@vercel/kv';

// =============================================
// TYPE DEFINITIONS
// =============================================

export type AppStatus = 'ACTIVE' | 'REST';

export interface LockData {
  clientId: string;
  ip: string;
  token: string;
  expiresAt: number;
  createdAt: number;
}

export interface BookingData {
  email: string;
  name: string;
  phone: string;
  service: string;
  vibe: string;
  amount: number;
  deposit: number;
  sessionId: string;
  createdAt: number;
  confirmedAt?: number;
}

export interface WaitlistEntry {
  email: string;
  phone: string;
  name: string;
  vibe: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: number;
  lastNotifiedAt?: number;
}

export interface VIPToken {
  email: string;
  discount: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  reason: string;
  expires: number;
  createdAt: number;
}

export interface RateLimitData {
  count: number;
  resetAt: number;
}

// =============================================
// KV KEY GENERATORS
// =============================================

export const kvKeys = {
  appStatus: () => 'app:status',
  lock: (date: string, slot: string) => `lock:${date}:${slot}`,
  count: (date: string) => `count:${date}`,
  booking: (date: string, sessionId: string) => `booking:${date}:${sessionId}`,
  waitlist: (date: string) => `waitlist:${date}`,
  vipToken: (token: string) => `vip:token:${token}`,
  processed: (sessionId: string) => `processed:${sessionId}`,
  rateLimit: (ip: string) => `ratelimit:${ip}`,
  dailyBrief: (date: string) => `brief:${date}`,
};

// =============================================
// APP STATUS (Maternity Ghost Mode)
// =============================================

export async function getAppStatus(): Promise<AppStatus> {
  try {
    const status = await kv.get<AppStatus>(kvKeys.appStatus());
    return status || 'ACTIVE';
  } catch {
    return 'ACTIVE';
  }
}

export async function setAppStatus(status: AppStatus): Promise<boolean> {
  try {
    await kv.set(kvKeys.appStatus(), status);
    return true;
  } catch {
    return false;
  }
}

export async function toggleAppStatus(): Promise<AppStatus> {
  const current = await getAppStatus();
  const newStatus: AppStatus = current === 'ACTIVE' ? 'REST' : 'ACTIVE';
  await setAppStatus(newStatus);
  return newStatus;
}

// =============================================
// PRE-LOCK ATOMIC (SET NX)
// =============================================

export async function createPreLock(
  date: string,
  slot: string,
  clientId: string,
  ip: string,
  token: string
): Promise<{ success: boolean; error?: string; lock?: LockData }> {
  try {
    const key = kvKeys.lock(date, slot);
    const lockData: LockData = {
      clientId,
      ip,
      token,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      createdAt: Date.now(),
    };

    // Atomic SET NX with 5-minute expiry
    const result = await kv.set(key, lockData, { nx: true, ex: 300 });

    if (result === null) {
      return { success: false, error: 'SLOT_ALREADY_LOCKED' };
    }

    return { success: true, lock: lockData };
  } catch (error) {
    console.error('Pre-lock error:', error);
    return { success: false, error: 'KV_ERROR' };
  }
}

export async function getLock(date: string, slot: string): Promise<LockData | null> {
  try {
    return await kv.get<LockData>(kvKeys.lock(date, slot));
  } catch {
    return null;
  }
}

export async function validateLockToken(
  date: string,
  slot: string,
  token: string
): Promise<boolean> {
  const lock = await getLock(date, slot);
  return lock !== null && lock.token === token;
}

export async function releaseLock(date: string, slot: string): Promise<boolean> {
  try {
    await kv.del(kvKeys.lock(date, slot));
    return true;
  } catch {
    return false;
  }
}

// =============================================
// BOOKING COUNT & CAPACITY
// =============================================

const MAX_DAILY_BOOKINGS = 2;

export async function getDailyCount(date: string): Promise<number> {
  try {
    const count = await kv.get<number>(kvKeys.count(date));
    return count || 0;
  } catch {
    return 0;
  }
}

export async function incrementDailyCount(date: string): Promise<number> {
  try {
    return await kv.incr(kvKeys.count(date));
  } catch {
    return -1;
  }
}

export async function decrementDailyCount(date: string): Promise<number> {
  try {
    return await kv.decr(kvKeys.count(date));
  } catch {
    return -1;
  }
}

export async function checkCapacity(date: string): Promise<{ available: boolean; count: number }> {
  const count = await getDailyCount(date);
  return {
    available: count < MAX_DAILY_BOOKINGS,
    count,
  };
}

// =============================================
// BOOKINGS
// =============================================

export async function createBooking(
  date: string,
  sessionId: string,
  data: Omit<BookingData, 'createdAt'>
): Promise<boolean> {
  try {
    const booking: BookingData = {
      ...data,
      createdAt: Date.now(),
    };

    await kv.set(kvKeys.booking(date, sessionId), booking, { ex: 30 * 24 * 60 * 60 }); // 30 days
    return true;
  } catch {
    return false;
  }
}

export async function getBooking(date: string, sessionId: string): Promise<BookingData | null> {
  try {
    return await kv.get<BookingData>(kvKeys.booking(date, sessionId));
  } catch {
    return null;
  }
}

export async function confirmBooking(date: string, sessionId: string): Promise<boolean> {
  try {
    const booking = await getBooking(date, sessionId);
    if (!booking) return false;

    booking.confirmedAt = Date.now();
    await kv.set(kvKeys.booking(date, sessionId), booking, { ex: 30 * 24 * 60 * 60 });
    return true;
  } catch {
    return false;
  }
}

// =============================================
// WAITLIST
// =============================================

export async function addToWaitlist(date: string, entry: Omit<WaitlistEntry, 'createdAt'>): Promise<boolean> {
  try {
    const key = kvKeys.waitlist(date);
    const existing = await kv.get<WaitlistEntry[]>(key) || [];

    const newEntry: WaitlistEntry = {
      ...entry,
      createdAt: Date.now(),
    };

    // Sort by priority (HIGH first)
    const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
    existing.push(newEntry);
    existing.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    await kv.set(key, existing, { ex: 7 * 24 * 60 * 60 }); // 7 days
    return true;
  } catch {
    return false;
  }
}

export async function getWaitlist(date: string): Promise<WaitlistEntry[]> {
  try {
    return await kv.get<WaitlistEntry[]>(kvKeys.waitlist(date)) || [];
  } catch {
    return [];
  }
}

export async function updateWaitlistNotified(date: string, email: string): Promise<boolean> {
  try {
    const key = kvKeys.waitlist(date);
    const waitlist = await getWaitlist(date);

    const updated = waitlist.map(entry =>
      entry.email === email
        ? { ...entry, lastNotifiedAt: Date.now() }
        : entry
    );

    await kv.set(key, updated, { ex: 7 * 24 * 60 * 60 });
    return true;
  } catch {
    return false;
  }
}

// =============================================
// VIP TOKENS
// =============================================

export async function createVIPToken(
  token: string,
  data: Omit<VIPToken, 'createdAt'>
): Promise<boolean> {
  try {
    const vipData: VIPToken = {
      ...data,
      createdAt: Date.now(),
    };

    // Calculate TTL based on expires timestamp
    const ttl = Math.floor((data.expires - Date.now()) / 1000);
    if (ttl <= 0) return false;

    await kv.set(kvKeys.vipToken(token), vipData, { ex: ttl });
    return true;
  } catch {
    return false;
  }
}

export async function getVIPToken(token: string): Promise<VIPToken | null> {
  try {
    return await kv.get<VIPToken>(kvKeys.vipToken(token));
  } catch {
    return null;
  }
}

export async function deleteVIPToken(token: string): Promise<boolean> {
  try {
    await kv.del(kvKeys.vipToken(token));
    return true;
  } catch {
    return false;
  }
}

// =============================================
// IDEMPOTENCY (Processed Sessions)
// =============================================

export async function markProcessed(sessionId: string): Promise<boolean> {
  try {
    // Check if already processed (SET NX)
    const result = await kv.set(kvKeys.processed(sessionId), Date.now(), { nx: true, ex: 24 * 60 * 60 });
    return result !== null;
  } catch {
    return false;
  }
}

export async function isProcessed(sessionId: string): Promise<boolean> {
  try {
    const processed = await kv.get(kvKeys.processed(sessionId));
    return processed !== null;
  } catch {
    return false;
  }
}

// =============================================
// RATE LIMITING
// =============================================

// RATE LIMITING DESACTIVADO PERMANENTEMENTE
// Esto evita bloqueos cuando múltiples dispositivos (PC + iPhone) 
// comparten la misma IP pública en la misma red WiFi
// La protección contra abusos se maneja a nivel de capacidad diaria (2 reservas/día)

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  // SIEMPRE permitir - Rate limiting desactivado
  // La protección real viene del límite de capacidad (2 reservas por día)
  return { allowed: true, remaining: 999 };
}

// =============================================
// SAFE-GUARD BUFFER (2h before/after)
// =============================================

export async function getBlockedSlots(date: string): Promise<string[]> {
  try {
    // Get all locks for the date
    const slots = ['morning', 'afternoon'];
    const blocked: string[] = [];

    for (const slot of slots) {
      const lock = await getLock(date, slot);
      if (lock) {
        blocked.push(slot);
      }
    }

    return blocked;
  } catch {
    return [];
  }
}

// =============================================
// DAILY BRIEF
// =============================================

export interface DailyBrief {
  date: string;
  bookings: BookingData[];
  totalRevenue: number;
  waitlistCount: number;
  updatedAt: number;
}

export async function getDailyBrief(date: string): Promise<DailyBrief | null> {
  try {
    return await kv.get<DailyBrief>(kvKeys.dailyBrief(date));
  } catch {
    return null;
  }
}

export async function updateDailyBrief(date: string, data: Omit<DailyBrief, 'updatedAt'>): Promise<boolean> {
  try {
    const brief: DailyBrief = {
      ...data,
      updatedAt: Date.now(),
    };
    await kv.set(kvKeys.dailyBrief(date), brief, { ex: 7 * 24 * 60 * 60 });
    return true;
  } catch {
    return false;
  }
}
