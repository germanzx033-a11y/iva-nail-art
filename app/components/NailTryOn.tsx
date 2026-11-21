"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Camera, ImageUp, Loader2, RefreshCw, Share2, Instagram, Sparkles, SwitchCamera } from "lucide-react";
import type { HandLandmarker, NormalizedLandmark } from "@mediapipe/tasks-vision";
import {
  COLORS,
  FINISHES,
  LENGTHS,
  PRESETS,
  SHAPES,
  designLabel,
  drawNail,
  lengthFactor,
  type NailDesign,
} from "@/lib/nails";
import { track } from "@/lib/track";

const DM_URL = "https://ig.me/m/iva_nailart_nyc";

/** [dip, tip, width factor] for thumb → pinky. */
const FINGERS: [number, number, number][] = [
  [3, 4, 0.72],
  [7, 8, 0.62],
  [11, 12, 0.64],
  [15, 16, 0.6],
  [19, 20, 0.54],
];

const COPY = {
  en: {
    title: "Try nails on your hand",
    intro: "Show the back of your hand to the camera — the nails follow each finger in real time. Nothing is uploaded: it all runs on your phone.",
    start: "Turn on camera",
    photo: "Use a photo",
    loading: "Loading the try-on…",
    denied: "We could not open the camera. Allow camera access in your browser, or use a photo of your hand instead.",
    noHand: "Show the back of your hand, fingers spread, in good light.",
    shape: "Shape",
    length: "Length",
    finish: "Finish",
    color: "Color",
    looks: "Ready-made looks",
    switch: "Switch camera",
    share: "Save & share my design",
    book: "Book this design on Instagram",
    shared: "Image ready. Send it to Iva on Instagram with your booking message.",
    downloaded: "Image saved to your downloads. Send it to Iva on Instagram — your design is also copied, just paste it.",
    note: "Preview only: real nails are shaped by hand to your nail beds.",
    match: "Not sure? Take the Nail Match quiz",
    retry: "Try again",
    msg: (d: string) => `Hi Iva! I'd like to book this design: ${d}.`,
  },
  es: {
    title: "Prueba uñas en tu mano",
    intro: "Muestra el dorso de tu mano a la cámara: las uñas siguen cada dedo en tiempo real. No se sube nada: todo funciona en tu celular.",
    start: "Encender cámara",
    photo: "Usar una foto",
    loading: "Cargando el probador…",
    denied: "No pudimos abrir la cámara. Permite el acceso a la cámara en tu navegador o usa una foto de tu mano.",
    noHand: "Muestra el dorso de tu mano, con los dedos separados y buena luz.",
    shape: "Forma",
    length: "Largo",
    finish: "Acabado",
    color: "Color",
    looks: "Looks listos",
    switch: "Cambiar cámara",
    share: "Guardar y compartir mi diseño",
    book: "Reservar este diseño por Instagram",
    shared: "Imagen lista. Envíasela a Iva por Instagram con tu mensaje de reserva.",
    downloaded: "Imagen guardada en tus descargas. Envíasela a Iva por Instagram; tu diseño también quedó copiado, solo pégalo.",
    note: "Solo es una vista previa: las uñas reales se moldean a mano según tus uñas.",
    match: "¿No sabes cuál? Haz el quiz Nail Match",
    retry: "Intentar de nuevo",
    msg: (d: string) => `¡Hola Iva! Quiero reservar este diseño: ${d}.`,
  },
};

type Mode = "idle" | "loading" | "camera" | "photo" | "error";

function chip(active: boolean) {
  return `rounded-full border px-4 py-2.5 text-sm transition-colors ${
    active ? "border-[#E8C9A8] bg-[#E8C9A8] font-semibold text-[#0E0706]" : "border-[#F4EBE1]/25 text-[#F4EBE1] hover:border-[#E8C9A8]"
  }`;
}

export default function NailTryOn({ lang, initial }: { lang: "en" | "es"; initial: NailDesign }) {
  const c = COPY[lang];
  const [design, setDesign] = useState<NailDesign>(initial);
  const [mode, setMode] = useState<Mode>("idle");
  const [facing, setFacing] = useState<"user" | "environment">("user");
  const [handSeen, setHandSeen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const landmarkerRef = useRef<HandLandmarker | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef(0);
  const smoothRef = useRef<NormalizedLandmark[][]>([]);
  const designRef = useRef(design);
  const photoRef = useRef<ImageBitmap | null>(null);
  const photoHandsRef = useRef<NormalizedLandmark[][]>([]);
  designRef.current = design;

  const loadLandmarker = useCallback(async (runningMode: "VIDEO" | "IMAGE") => {
    if (!landmarkerRef.current) {
      const { FilesetResolver, HandLandmarker } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks("/mediapipe/wasm");
      landmarkerRef.current = await HandLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task", delegate: "GPU" },
        runningMode,
        numHands: 2,
        minHandDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
    } else {
      await landmarkerRef.current.setOptions({ runningMode });
    }
    return landmarkerRef.current;
  }, []);

  /** Draws the nails for every detected hand onto ctx (frame size w×h). */
  const drawHands = useCallback((ctx: CanvasRenderingContext2D, hands: NormalizedLandmark[][], w: number, h: number) => {
    const d = designRef.current;
    const factor = lengthFactor(d.length);
    hands.forEach((lm, hi) => {
      FINGERS.forEach(([dipI, tipI, wf], fi) => {
        const dip = lm[dipI];
        const tip = lm[tipI];
        const dx = (tip.x - dip.x) * w;
        const dy = (tip.y - dip.y) * h;
        const seg = Math.hypot(dx, dy);
        if (seg < 4) return;
        const angle = Math.atan2(dy, dx);
        const cx = dip.x * w + dx * 0.5;
        const cy = dip.y * h + dy * 0.5;
        drawNail(ctx, d, cx, cy, angle, seg * wf, seg * 0.56 * factor, hi * 10 + fi + 1);
      });
    });
  }, []);

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const renderPhoto = useCallback(() => {
    const canvas = canvasRef.current;
    const img = photoRef.current;
    if (!canvas || !img) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    drawHands(ctx, photoHandsRef.current, img.width, img.height);
  }, [drawHands]);

  // Re-draw the photo when the design changes
  useEffect(() => {
    if (mode === "photo") renderPhoto();
  }, [design, mode, renderPhoto]);

  const startCamera = async (face = facing) => {
    setStatus(null);
    setMode("loading");
    stopCamera();
    try {
      const [landmarker, stream] = await Promise.all([
        loadLandmarker("VIDEO"),
        navigator.mediaDevices.getUserMedia({
          video: { facingMode: face, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        }),
      ]);
      streamRef.current = stream;
      const video = videoRef.current!;
      video.srcObject = stream;
      await video.play();
      setMode("camera");
      track("tryon_start", { source: "camera" });

      let lastTime = -1;
      const loop = () => {
        const canvas = canvasRef.current;
        if (!canvas || !streamRef.current) return;
        const w = video.videoWidth;
        const h = video.videoHeight;
        if (w && h) {
          if (canvas.width !== w) canvas.width = w;
          if (canvas.height !== h) canvas.height = h;
          const ctx = canvas.getContext("2d")!;
          if (video.currentTime !== lastTime) {
            lastTime = video.currentTime;
            const res = landmarker.detectForVideo(video, performance.now());
            const prev = smoothRef.current;
            smoothRef.current = res.landmarks.map((hand: any[], i: number) =>
              hand.map((p: any, j: number) => {
                const q = prev[i]?.[j];
                return q ? { ...p, x: q.x + (p.x - q.x) * 0.55, y: q.y + (p.y - q.y) * 0.55 } : p;
              })
            );
            setHandSeen(res.landmarks.length > 0);
          }
          ctx.save();
          if (face === "user") {
            ctx.translate(w, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(video, 0, 0, w, h);
          drawHands(ctx, smoothRef.current, w, h);
          ctx.restore();
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    } catch (err) {
      console.warn("Try-on camera error", err);
      stopCamera();
      setMode("error");
    }
  };

  const onPhoto = async (file: File | undefined) => {
    if (!file) return;
    stopCamera();
    setStatus(null);
    setMode("loading");
    try {
      const landmarker = await loadLandmarker("IMAGE");
      const bitmap = await createImageBitmap(file);
      // Keep large photos manageable
      const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
      const img =
        scale < 1
          ? await createImageBitmap(bitmap, { resizeWidth: Math.round(bitmap.width * scale), resizeHeight: Math.round(bitmap.height * scale) })
          : bitmap;
      photoRef.current = img;
      photoHandsRef.current = landmarker.detect(img).landmarks;
      setHandSeen(photoHandsRef.current.length > 0);
      setMode("photo");
      track("tryon_start", { source: "photo", hand: photoHandsRef.current.length > 0 });
    } catch (err) {
      console.warn("Try-on photo error", err);
      setMode("error");
    }
  };

  const share = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const label = designLabel(design, lang);
    const text = c.msg(label);
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/jpeg", 0.9));
    if (!blob) return;
    const file = new File([blob], "iva-nail-design.jpg", { type: "image/jpeg" });
    track("tryon_share", { ...design });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], text, title: "IVA Nail Art" });
        setStatus(c.shared);
        return;
      }
    } catch {
      // user cancelled the share sheet — fall back to download
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iva-nail-design.jpg";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    await navigator.clipboard?.writeText(text).catch(() => undefined);
    setStatus(c.downloaded);
  };

  const live = mode === "camera" || mode === "photo";

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-[#F4EBE1]">
        <span className="font-display block text-2xl font-bold md:text-4xl">{c.title.split(" ").slice(0, 2).join(" ")}</span>
        <span className="font-serif text-4xl italic text-[#E8C9A8] md:text-6xl">{c.title.split(" ").slice(2).join(" ")}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-[#F4EBE1]/75">{c.intro}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Stage */}
        <div className="min-w-0">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] md:aspect-[4/3] lg:aspect-[3/4]">
            <video ref={videoRef} playsInline muted className="hidden" />
            <canvas
              ref={canvasRef}
              aria-label={lang === "en" ? "Your hand with the virtual nails" : "Tu mano con las uñas virtuales"}
              role="img"
              className={`absolute inset-0 h-full w-full ${mode === "photo" ? "object-contain" : "object-cover"} ${live ? "" : "hidden"}`}
            />
            {!live && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                {mode === "loading" ? (
                  <p role="status" className="flex items-center gap-2 text-[#F4EBE1]/80">
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> {c.loading}
                  </p>
                ) : (
                  <>
                    <Sparkles className="h-8 w-8 text-[#E8C9A8]" aria-hidden />
                    {mode === "error" && <p role="alert" className="max-w-sm text-sm text-[#F4EBE1]/85">{c.denied}</p>}
                    <button type="button" onClick={() => startCamera()} className="glow-pill">
                      <Camera className="h-5 w-5" aria-hidden /> {mode === "error" ? c.retry : c.start}
                    </button>
                    <label className="inline-flex cursor-pointer items-center gap-2 py-2 text-[#E8C9A8] underline underline-offset-4">
                      <ImageUp className="h-4 w-4" aria-hidden /> {c.photo}
                      <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
                    </label>
                  </>
                )}
              </div>
            )}
            {live && !handSeen && (
              <p role="status" className="absolute inset-x-4 bottom-4 rounded-xl bg-[#0E0706]/80 px-4 py-3 text-center text-sm text-[#F4EBE1]">
                {c.noHand}
              </p>
            )}
          </div>

          {live && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" onClick={share} className="glow-pill">
                <Share2 className="h-5 w-5" aria-hidden /> {c.share}
              </button>
              {mode === "camera" ? (
                <button
                  type="button"
                  onClick={() => {
                    const next = facing === "user" ? "environment" : "user";
                    setFacing(next);
                    startCamera(next);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F4EBE1]/25 px-4 py-3 text-sm text-[#F4EBE1] hover:border-[#E8C9A8]"
                >
                  <SwitchCamera className="h-4 w-4" aria-hidden /> {c.switch}
                </button>
              ) : (
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#F4EBE1]/25 px-4 py-3 text-sm text-[#F4EBE1] hover:border-[#E8C9A8]">
                  <RefreshCw className="h-4 w-4" aria-hidden /> {c.photo}
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
                </label>
              )}
            </div>
          )}
          {status && <p role="status" className="mt-3 text-sm text-[#F4EBE1]/85">{status}</p>}
          <a
            href={DM_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("tryon_book", { ...design })}
            className="mt-4 inline-flex items-center gap-2 py-2 font-medium text-[#E8C9A8] underline underline-offset-4 hover:text-white"
          >
            <Instagram className="h-4 w-4" aria-hidden /> {c.book}
          </a>
          <p className="mt-2 text-xs text-[#F4EBE1]/60">{c.note}</p>
        </div>

        {/* Controls */}
        <div className="min-w-0 space-y-6">
          <p className="rounded-xl border border-[#D4A574]/30 bg-[#1A0F0D] px-4 py-3 text-sm text-[#F4EBE1]">{designLabel(design, lang)}</p>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.looks}</legend>
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={p.shape === design.shape && p.length === design.length && p.finish === design.finish && p.color === design.color}
                  onClick={() => setDesign({ shape: p.shape, length: p.length, finish: p.finish, color: p.color })}
                  className="flex shrink-0 items-center gap-2 rounded-full border border-[#F4EBE1]/25 py-2 pl-2 pr-4 text-sm text-[#F4EBE1] hover:border-[#E8C9A8] aria-pressed:border-[#E8C9A8]"
                >
                  <span aria-hidden className="h-6 w-6 rounded-full border border-white/30" style={{ background: p.color }} />
                  {p[lang]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.shape}</legend>
            <div className="flex flex-wrap gap-2">
              {SHAPES.map((s) => (
                <button key={s.id} type="button" aria-pressed={design.shape === s.id} onClick={() => setDesign({ ...design, shape: s.id })} className={chip(design.shape === s.id)}>
                  {s[lang]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.length}</legend>
            <div className="flex flex-wrap gap-2">
              {LENGTHS.map((l) => (
                <button key={l.id} type="button" aria-pressed={design.length === l.id} onClick={() => setDesign({ ...design, length: l.id })} className={chip(design.length === l.id)}>
                  {l[lang]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.finish}</legend>
            <div className="flex flex-wrap gap-2">
              {FINISHES.map((f) => (
                <button key={f.id} type="button" aria-pressed={design.finish === f.id} onClick={() => setDesign({ ...design, finish: f.id })} className={chip(design.finish === f.id)}>
                  {f[lang]}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.color}</legend>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((col) => (
                <button
                  key={col.hex}
                  type="button"
                  aria-pressed={design.color === col.hex}
                  aria-label={col[lang]}
                  title={col[lang]}
                  onClick={() => setDesign({ ...design, color: col.hex })}
                  className={`h-11 w-11 rounded-full border-2 transition-transform ${design.color === col.hex ? "scale-110 border-[#E8C9A8]" : "border-white/20"}`}
                  style={{ background: col.hex }}
                />
              ))}
            </div>
          </fieldset>
          <Link href={`/nail-match${lang === "es" ? "?lang=es" : ""}`} className="inline-block py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            {c.match}
          </Link>
        </div>
      </div>
    </div>
  );
}
