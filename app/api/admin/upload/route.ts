import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. Handle multipart/form-data (direct file upload from mobile camera or gallery)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const fileName = `${timestamp}-${safeName.endsWith(".jpg") || safeName.endsWith(".png") || safeName.endsWith(".jpeg") || safeName.endsWith(".webp") ? safeName : `${safeName}.jpg`}`;

      // Convert buffer to dataUrl for instant client storage and preview
      const mimeType = file.type || "image/jpeg";
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64Data}`;

      let fileUrl = dataUrl;

      // Try writing to public/uploads on disk
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        fileUrl = `/uploads/${fileName}`;
      } catch (fsErr) {
        // In read-only serverless environments, fallback safely to base64 dataUrl
        console.warn("Disk write fallback to dataUrl:", fsErr);
      }

      return NextResponse.json({
        success: true,
        url: fileUrl,
        dataUrl,
        name: file.name,
        timestamp,
      });
    }

    // 2. Handle application/json (base64 string upload)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { dataUrl, name } = body;

      if (!dataUrl || typeof dataUrl !== "string") {
        return NextResponse.json({ error: "Invalid dataUrl" }, { status: 400 });
      }

      const timestamp = Date.now();
      const safeName = (name || "photo").replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const fileName = `${timestamp}-${safeName.endsWith(".jpg") || safeName.endsWith(".png") ? safeName : `${safeName}.jpg`}`;

      let fileUrl = dataUrl;

      try {
        const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (matches && matches[2]) {
          const buffer = Buffer.from(matches[2], "base64");
          const uploadDir = path.join(process.cwd(), "public", "uploads");
          const filePath = path.join(uploadDir, fileName);
          await writeFile(filePath, buffer);
          fileUrl = `/uploads/${fileName}`;
        }
      } catch (fsErr) {
        console.warn("Disk write fallback to dataUrl:", fsErr);
      }

      return NextResponse.json({
        success: true,
        url: fileUrl,
        dataUrl,
        name: name || fileName,
        timestamp,
      });
    }

    return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err?.message || "Upload failed" }, { status: 500 });
  }
}
