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
  if (!configuredKey) {
    return false;
  }
  const header = request.headers.get('authorization') ?? '';

  const expected = Buffer.from(`Bearer ${configuredKey}`);
  const received = Buffer.from(header);
  if (received.length === expected.length && timingSafeEqual(received, expected)) {
    return true;
  }

  return false;
}

/** Returns a 401 response when the request is not authorized, otherwise null. */
export function requireAdmin(request: NextRequest): NextResponse<{ error: string }> | null {
  if (isAdminAuthorized(request)) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
