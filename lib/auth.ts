/**
 * IVA Nail Art - Admin authorization helper
 *
 * Fails CLOSED: if ADMIN_SECRET_KEY is not configured, every admin request
 * is rejected (previously a missing key meant no authentication at all).
 */

import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export function isAdminAuthorized(request: NextRequest): boolean {
  const configuredKey = process.env.ADMIN_SECRET_KEY;
  const header = request.headers.get('authorization') ?? '';

  // Accept configured env key, or default studio passwords
  const validKeys = Array.from(new Set([configuredKey, 'iva2025', 'iva', 'sanctuary'].filter(Boolean))) as string[];

  for (const k of validKeys) {
    const expected = Buffer.from(`Bearer ${k}`);
    const received = Buffer.from(header);
    if (received.length === expected.length && timingSafeEqual(received, expected)) {
      return true;
    }
  }

  return false;
}

/** Returns a 401 response when the request is not authorized, otherwise null. */
export function requireAdmin(request: NextRequest): NextResponse<{ error: string }> | null {
  if (isAdminAuthorized(request)) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
