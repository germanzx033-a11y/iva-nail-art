import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_SITE_CONTENT, SiteContent, sanitizeSiteContent } from "@/lib/contentStore";
import { requireAdmin } from "@/lib/auth";
import { kv } from "@vercel/kv";

// In-memory runtime cache for server persistence
let currentServerContent: SiteContent = { ...DEFAULT_SITE_CONTENT };

export async function GET(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const kvData = await kv.get<SiteContent>("site:content");
    if (kvData && typeof kvData === "object") {
      currentServerContent = sanitizeSiteContent(kvData);
    }
  } catch {
    // Fall back to currentServerContent
  }

  return NextResponse.json({
    success: true,
    content: currentServerContent,
  });
}

export async function POST(req: NextRequest) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    currentServerContent = sanitizeSiteContent({
      ...currentServerContent,
      ...body,
    });

    try {
      await kv.set("site:content", currentServerContent);
    } catch {
      // Continue with in-memory persistence
    }

    return NextResponse.json({
      success: true,
      message: "Content updated successfully",
      content: currentServerContent,
    });
  } catch (err) {
    console.error("API admin content error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
