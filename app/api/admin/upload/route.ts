import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/auth";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB strictly enforced
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

export async function POST(req: NextRequest) {
  // 1. Strict Authentication Guard
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const contentType = req.headers.get("content-type") || "";

    // 2. Handle multipart/form-data (direct file upload from mobile camera or gallery)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
      }

      // Strict Size Limit Check
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `El archivo supera el límite máximo permitido de 5 MB (Tamaño recibido: ${(file.size / 1024 / 1024).toFixed(2)} MB).` },
          { status: 413 }
        );
      }

      // Strict MIME Type Check
      const rawMime = (file.type || "image/jpeg").toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(rawMime)) {
        return NextResponse.json(
          { error: "Tipo de archivo no permitido. Solo se admiten imágenes (JPG, PNG, WEBP, AVIF)." },
          { status: 415 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "El archivo supera el límite máximo permitido de 5 MB." },
          { status: 413 }
        );
      }

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const extension = safeName.endsWith(".png") ? "png" : safeName.endsWith(".webp") ? "webp" : "jpg";
      const fileName = `${timestamp}-${safeName.replace(/\.[^/.]+$/, "")}.${extension}`;

      // Convert buffer to dataUrl for instant client preview and offline resilience
      const base64Data = buffer.toString("base64");
      const dataUrl = `data:${rawMime};base64,${base64Data}`;

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

    // 3. Handle application/json (base64 string upload)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const { dataUrl, name } = body;

      if (!dataUrl || typeof dataUrl !== "string") {
        return NextResponse.json({ error: "Cadena dataUrl inválida" }, { status: 400 });
      }

      const matches = dataUrl.match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/);
      if (!matches || !matches[1] || !matches[2]) {
        return NextResponse.json({ error: "Formato de imagen Base64 inválido" }, { status: 400 });
      }

      const mimeType = matches[1].toLowerCase();
      if (!ALLOWED_MIME_TYPES.has(mimeType)) {
        return NextResponse.json(
          { error: "Tipo de imagen no permitido. Solo se admiten JPG, PNG, WEBP, AVIF." },
          { status: 415 }
        );
      }

      const base64Payload = matches[2];
      // Estimate byte length from base64 string
      const estimatedBytes = (base64Payload.length * 3) / 4;
      if (estimatedBytes > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "La imagen Base64 supera el límite máximo permitido de 5 MB." },
          { status: 413 }
        );
      }

      const buffer = Buffer.from(base64Payload, "base64");
      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: "El archivo supera el límite máximo permitido de 5 MB." },
          { status: 413 }
        );
      }

      const timestamp = Date.now();
      const rawName = (name || "photo").replace(/[^a-zA-Z0-9.-]/g, "_").toLowerCase();
      const extension = mimeType === "image/png" ? "png" : mimeType === "image/webp" ? "webp" : "jpg";
      const fileName = `${timestamp}-${rawName.replace(/\.[^/.]+$/, "")}.${extension}`;

      let fileUrl = dataUrl;

      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);
        fileUrl = `/uploads/${fileName}`;
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

    return NextResponse.json({ error: "Content-Type no soportado (esperado multipart/form-data o application/json)" }, { status: 400 });
  } catch (err: unknown) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err instanceof Error ? err.message : "Error al procesar la subida" }, { status: 500 });
  }
}
