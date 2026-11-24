import { NextRequest, NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "iva_admin_session";

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/admin/:path*",
    "/admin",
  ],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Allow public admin login/logout routes
  if (pathname === "/api/admin/login" || pathname === "/api/admin/logout") {
    return NextResponse.next();
  }

  // 2. Redirect alias /admin to /admin-iva
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin-iva";
    return NextResponse.redirect(url);
  }

  // 3. Early edge interception for /api/admin/* endpoints
  if (pathname.startsWith("/api/admin/")) {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const authHeader = request.headers.get("authorization") || "";

    // Reject immediately if neither cookie nor bearer authorization header is provided
    if (!cookie && !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized: Admin authentication required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}
