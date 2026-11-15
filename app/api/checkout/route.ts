/**
 * IVA Nail Art - Stripe Checkout API
 * Golden Gate Protocol - Phase B (Lock-to-Stripe Bridge)
 *
 * Creates a Stripe Checkout Session with the client's lock token
 * Only the client who locked the slot can proceed to payment
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateLockToken, getAppStatus, checkCapacity } from '@/lib/kv';
import { createCheckoutSession, STRIPE_CONFIG } from '@/lib/stripe';
import { isValidEmail, isValidPhone, isValidBookingDate, ERROR_MESSAGES } from '@/lib/utils';
import { SERVICES } from '@/app/constants/data';

// =============================================
// REQUEST TYPES
// =============================================

interface CheckoutRequest {
  lockToken: string;
  date: string;
  slot: 'morning' | 'afternoon';
  /** Service id (e.g. "gel-mani") or its English/Spanish name from the catalog. */
  serviceName: string;
  /** Ignored: the price always comes from the server-side catalog. */
  servicePrice?: number;
  customerEmail: string;
  customerName: string;
  customerPhone: string;
}

interface CheckoutResponse {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
  errorCode?: string;
}

const MAX_NAME_LENGTH = 100;

function findService(idOrName: unknown) {
  if (typeof idOrName !== 'string') return undefined;
  const wanted = idOrName.trim().toLowerCase();
  return SERVICES.find(
    (s) => s.id === wanted || s.name.toLowerCase() === wanted || s.nameEs.toLowerCase() === wanted
  );
}

// =============================================
// POST /api/checkout
// =============================================

export async function POST(request: NextRequest): Promise<NextResponse<CheckoutResponse>> {
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

    // 2. Parse request body
    const body: CheckoutRequest = await request.json();
    const {
      lockToken,
      date,
      slot,
      serviceName,
      customerEmail,
      customerName,
      customerPhone,
    } = body;

    // 3. Validate required fields
    if (!lockToken || !date || !slot || !serviceName || !customerEmail || !customerName || !customerPhone) {
      return NextResponse.json(
        {
          success: false,
          error: 'All fields are required',
          errorCode: 'INVALID_REQUEST',
        },
        { status: 400 }
      );
    }

    // 3b. Validate types, date, slot, service and text lengths (all client input is untrusted)
    if (
      typeof lockToken !== 'string' ||
      typeof customerEmail !== 'string' ||
      typeof customerName !== 'string' ||
      typeof customerPhone !== 'string' ||
      customerName.length > MAX_NAME_LENGTH ||
      !isValidBookingDate(date) ||
      (slot !== 'morning' && slot !== 'afternoon')
    ) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', errorCode: 'INVALID_REQUEST' },
        { status: 400 }
      );
    }

    const service = findService(serviceName);
    if (!service) {
      return NextResponse.json(
        { success: false, error: 'Unknown service', errorCode: 'INVALID_SERVICE' },
        { status: 400 }
      );
    }

    // 4. Validate email and phone
    if (!isValidEmail(customerEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email address',
          errorCode: 'INVALID_EMAIL',
        },
        { status: 400 }
      );
    }

    if (!isValidPhone(customerPhone)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid phone number',
          errorCode: 'INVALID_PHONE',
        },
        { status: 400 }
      );
    }

    // 5. Validate lock token (Lock-to-Stripe Bridge)
    const isValidLock = await validateLockToken(date, slot, lockToken);
    if (!isValidLock) {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.INVALID_TOKEN,
          errorCode: 'INVALID_TOKEN',
        },
        { status: 403 }
      );
    }

    // 6. Double-check capacity
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

    // 7. Create Stripe Checkout Session
    const session = await createCheckoutSession({
      clientLockToken: lockToken,
      date,
      slot,
      serviceName: service.name,
      servicePrice: service.price, // from the catalog, never from the client
      customerEmail,
      customerName,
      customerPhone,
    });

    // 8. Success response
    return NextResponse.json({
      success: true,
      checkoutUrl: session.url!,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create checkout session',
        errorCode: 'CHECKOUT_ERROR',
      },
      { status: 500 }
    );
  }
}

// =============================================
// GET /api/checkout (Get deposit amount)
// =============================================

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    deposit: STRIPE_CONFIG.deposit / 100,
    currency: STRIPE_CONFIG.currency,
  });
}
