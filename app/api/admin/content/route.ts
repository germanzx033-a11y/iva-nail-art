import { NextResponse } from "next/server";
import { DEFAULT_SITE_CONTENT, SiteContent, sanitizeSiteContent } from "@/lib/contentStore";

// In-memory runtime cache for server persistence
let currentServerContent: SiteContent = { ...DEFAULT_SITE_CONTENT };

export async function GET() {
  return NextResponse.json({
    success: true,
    content: currentServerContent,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    currentServerContent = sanitizeSiteContent({
      ...currentServerContent,
      ...body,
    });

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
