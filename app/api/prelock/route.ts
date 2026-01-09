/**
 * IVA Nail Art - Pre-Lock Atomic API
 * Golden Gate Protocol - Phase A
 *
 * Blocks a slot for 5 minutes using SET NX
 * RATE LIMITING DESACTIVADO: Permite múltiples dispositivos en la misma red
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createPreLock,
  getAppStatus,
  checkCapacity,
  getLock,
} from '@/lib/kv';
import {
  generateLockToken,
  generateClientId,
  getClientIP,
  isValidBookingDate,
  ERROR_MESSAGES,
} from '@/lib/utils';

// =============================================
// REQUEST TYPES
// =============================================

interface PreLockRequest {
  date: string;
  slot: 'morning' | 'afternoon';
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

    // 2. Get client IP (solo para logging, NO para rate limiting)
    // RATE LIMITING DESACTIVADO: No bloqueamos por IP para evitar problemas
    // cuando múltiples dispositivos comparten la misma red (PC + iPhone)
    const clientIP = getClientIP(request);
    console.log(`[PreLock] Request from IP: ${clientIP.substring(0, 15)}...`);

    // RATE LIMITING DESACTIVADO - Ya no bloqueamos por IP
    // Esto permite que múltiples dispositivos en la misma red funcionen correctamente

    // 4. Parse request body
    const body: PreLockRequest = await request.json();
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

    if (!isValidBookingDate(date)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid booking date',
          errorCode: 'INVALID_DATE',
        },
        { status: 400 }
      );
    }

    if (slot !== 'morning' && slot !== 'afternoon') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid slot',
          errorCode: 'INVALID_SLOT',
        },
        { status: 400 }
      );
    }

    // 6. Check capacity (Max 2 bookings per day)
    const capacity = await checkCapacity(date);
    if (!capacity.available) {
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

    const lock = await getLock(date, slot as 'morning' | 'afternoon');
    const capacity = await checkCapacity(date);

    return NextResponse.json({
      isLocked: lock !== null,
      isAvailable: capacity.available && lock === null,
      dailyCount: capacity.count,
      maxCapacity: 2,
    });

  } catch (error) {
    console.error('Pre-lock check error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
