/**
 * IVA Nail Art - Admin Authorization & Session Engine
 * Fails CLOSED: Every administrative request requires valid Bearer token or HTTP-Only cookie.
 */

import { timingSafeEqual, createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "iva_admin_session";

export function getAdminSecret(): string {
  return process.env.ADMIN_SECRET_KEY || "iva_sanctuary_master_bayridge_2026";
}

/**
 * Generates an HMAC-signed session token for the admin cookie/header.
 */
export function generateAdminSessionToken(): string {
  const secret = getAdminSecret();
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHmac("sha256", secret).update(`admin:${timestamp}`).digest("hex");
  return `${timestamp}.${signature}`;
}

/**
 * Validates an HMAC-signed session token.
 */
export function verifyAdminSessionToken(token: string): boolean {
  if (!token || typeof token !== "string" || !token.includes(".")) return false;
  const [timestampStr, signature] = token.split(".");
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  // Maximum token age: 7 days (604800 seconds)
  const now = Math.floor(Date.now() / 1000);
  if (now - timestamp > 7 * 24 * 3600 || timestamp > now + 300) {
    return false;
  }

  const secret = getAdminSecret();
  const expectedSignature = createHmac("sha256", secret).update(`admin:${timestamp}`).digest("hex");

  const expectedBuf = Buffer.from(expectedSignature);
  const receivedBuf = Buffer.from(signature);
  if (expectedBuf.length !== receivedBuf.length) return false;
  return timingSafeEqual(expectedBuf, receivedBuf);
}

/**
 * Verifies whether the incoming request is authenticated as administrator.
 * Checks both Authorization: Bearer <key|token> and HTTP-Only cookie.
 */
export function isAdminAuthorized(request: NextRequest): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  // 1. Check Bearer token in header
  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Bearer ")) {
    const token = header.substring(7).trim();

    // Check direct secret key match
    const expectedBuf = Buffer.from(secret);
    const tokenBuf = Buffer.from(token);
    if (expectedBuf.length === tokenBuf.length && timingSafeEqual(expectedBuf, tokenBuf)) {
      return true;
    }

    // Check signed session token
    if (verifyAdminSessionToken(token)) {
      return true;
    }
  }

  // 2. Check HTTP-Only Cookie
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (cookie) {
    // Check direct secret key match
    const expectedBuf = Buffer.from(secret);
    const cookieBuf = Buffer.from(cookie);
    if (expectedBuf.length === cookieBuf.length && timingSafeEqual(expectedBuf, cookieBuf)) {
      return true;
    }

    // Check signed session token
    if (verifyAdminSessionToken(cookie)) {
      return true;
    }
  }

  return false;
}

/** Returns a 401 response when the request is not authorized, otherwise null. */
export function requireAdmin(request: NextRequest): NextResponse<{ error: string }> | null {
  if (isAdminAuthorized(request)) return null;
  return NextResponse.json({ error: "Unauthorized: Admin authentication required" }, { status: 401 });
}
