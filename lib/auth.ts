/**
 * IVA Nail Art - Admin authorization helper
 *
 * Fails CLOSED: if ADMIN_SECRET_KEY is not configured, every admin request
 * is rejected (previously a missing key meant no authentication at all).
 */

import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export function isAdminAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_SECRET_KEY;
  if (!adminKey) return false;

  const header = request.headers.get('authorization') ?? '';
  const expected = Buffer.from(`Bearer ${adminKey}`);
  const received = Buffer.from(header);

  // timingSafeEqual requires equal lengths
  if (received.length !== expected.length) return false;
  return timingSafeEqual(received, expected);
}

/** Returns a 401 response when the request is not authorized, otherwise null. */
export function requireAdmin(request: NextRequest): NextResponse<{ error: string }> | null {
  if (isAdminAuthorized(request)) return null;
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
