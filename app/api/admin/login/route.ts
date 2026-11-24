import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getAdminSecret, generateAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { password } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Clave secreta requerida" }, { status: 400 });
    }

    const secret = getAdminSecret();
    const expectedBuf = Buffer.from(secret);
    const receivedBuf = Buffer.from(password.trim());

    const isMatch =
      expectedBuf.length === receivedBuf.length &&
      timingSafeEqual(expectedBuf, receivedBuf);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Clave de acceso incorrecta. Verifica tus credenciales de administradora." },
        { status: 401 }
      );
    }

    const sessionToken = generateAdminSessionToken();

    const response = NextResponse.json({
      success: true,
      message: "Autenticación exitosa",
      token: sessionToken,
    });

    // Set secure HTTP-Only cookie for seamless server-side session propagation
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Error en el servidor de autenticación" }, { status: 500 });
  }
}
