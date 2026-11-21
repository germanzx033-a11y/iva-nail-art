/**
 * IVA Nail Art - Pre-Lock Atomic API
 * Golden Gate Protocol - Phase A
 *
 * Blocks a slot for 5 minutes using SET NX
 * Rate limit per IP is deliberately generous so several devices on the same
 * network (PC + phone) keep working, but it stops a client from re-locking
 * every slot in a loop.
 */

import { NextRequest, NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import {
  createPreLock,
  getAppStatus,
  getLock,
  isSlotBooked,
} from '@/lib/kv';
import {
  generateLockToken,
  generateClientId,
  getClientIP,
  isValidDateFormat,
  ERROR_MESSAGES,
} from '@/lib/utils';
import { getSlot, isBookableDate } from '@/lib/schedule';

// Best-effort per-IP limit on lock attempts (in-memory: per serverless instance).
// 10 attempts / 5 min is far above normal use and well below hoarding behaviour.
const lockLimiter = new RateLimiterMemory({ points: 10, duration: 300 });

// =============================================
// REQUEST TYPES
// =============================================

interface PreLockRequest {
  date: string;
  /** Slot id from lib/schedule (e.g. "1730"). */
  slot: string;
}

interface PreLockResponse {
  success: boolean;
  lockToken?: string;
  clientId?: string;
  expiresAt?: number;
  error?: string;
  errorCode?: string;
}

// =============================================
// POST /api/prelock
// =============================================

export async function POST(request: NextRequest): Promise<NextResponse<PreLockResponse>> {
  try {
    // 1. Check Maternity Ghost Mode
    const appStatus = await getAppStatus();
    if (appStatus === 'REST') {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.GHOST_MODE_ACTIVE,
          errorCode: 'GHOST_MODE_ACTIVE',
        },
        { status: 503 }
      );
    }

    // 2. Rate limit per IP (generous, see lockLimiter)
    const clientIP = getClientIP(request);
    try {
      await lockLimiter.consume(clientIP);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many attempts. Please wait a few minutes and try again.',
          errorCode: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    // 4. Parse request body
    const body: PreLockRequest = await request.json().catch(() => ({} as PreLockRequest));
    const { date, slot } = body;

    // 5. Validate date
    if (!date || !slot) {
      return NextResponse.json(
        {
          success: false,
          error: 'Date and slot are required',
          errorCode: 'INVALID_REQUEST',
        },
        { status: 400 }
      );
    }

    if (!isBookableDate(date)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid booking date',
          errorCode: 'INVALID_DATE',
        },
        { status: 400 }
      );
    }

    if (!getSlot(date, slot)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slot',
          errorCode: 'INVALID_SLOT',
        },
        { status: 400 }
      );
    }

    // 6. One client per slot
    if (await isSlotBooked(date, slot)) {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.CAPACITY_EXCEEDED,
          errorCode: 'CAPACITY_EXCEEDED',
        },
        { status: 409 }
      );
    }

    // 7. Check if slot is already locked
    const existingLock = await getLock(date, slot);
    if (existingLock) {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.SLOT_ALREADY_LOCKED,
          errorCode: 'SLOT_ALREADY_LOCKED',
        },
        { status: 409 }
      );
    }

    // 8. Generate tokens
    const lockToken = generateLockToken();
    const clientId = generateClientId();

    // 9. Atomic Pre-Lock (SET NX with 5-minute expiry)
    const lockResult = await createPreLock(date, slot, clientId, clientIP, lockToken);

    if (!lockResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: lockResult.error === 'SLOT_ALREADY_LOCKED'
            ? ERROR_MESSAGES.SLOT_ALREADY_LOCKED
            : ERROR_MESSAGES.KV_ERROR,
          errorCode: lockResult.error,
        },
        { status: 409 }
      );
    }

    // 10. Success response
    return NextResponse.json({
      success: true,
      lockToken,
      clientId,
      expiresAt: lockResult.lock!.expiresAt,
    });

  } catch (error) {
    console.error('Pre-lock error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
        errorCode: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

// =============================================
// GET /api/prelock (Check lock status)
// =============================================

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const slot = searchParams.get('slot');

    if (!date || !slot) {
      return NextResponse.json(
        { error: 'Date and slot are required' },
        { status: 400 }
      );
    }
    if (!isValidDateFormat(date) || !getSlot(date, slot)) {
      return NextResponse.json(
        { error: 'Invalid date or slot' },
        { status: 400 }
      );
    }

    const [lock, booked] = await Promise.all([getLock(date, slot), isSlotBooked(date, slot)]);

    return NextResponse.json({
      isLocked: lock !== null,
      isAvailable: !booked && lock === null,
    });

  } catch (error) {
    console.error('Pre-lock check error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
