"use client";

import { useState } from "react";
import { Gift, Instagram, Share2 } from "lucide-react";
import { track } from "@/lib/track";

const COPY = {
  en: {
    eyebrow: "Gift card",
    titleA: "Give a set",
    titleB: "she will love",
    intro: "Design a digital gift card, send it by WhatsApp, Instagram or text, and Iva activates it once the payment is confirmed by message.",
    amount: "Amount (USD)",
    to: "For",
    from: "From",
    message: "Message (optional)",
    create: "Create & share the card",
    activate: "Activate it with Iva on Instagram",
    how: "How it works: create the card, then message Iva to pay and activate it. The card is valid for one appointment of that value.",
    ready: "Card ready — send it, then message Iva to activate it.",
    saved: "Card saved to your downloads — send it, then message Iva to activate it.",
    card: "Gift card",
    forL: "For",
    fromL: "From",
    valid: "Valid for services at IVA Nail Art · Bay Ridge, Brooklyn",
    placeholderTo: "Her name",
    placeholderFrom: "Your name",
    errAmount: "Enter an amount of at least $25.",
    errNames: "Add both names.",
  },
  es: {
    eyebrow: "Tarjeta de regalo",
    titleA: "Regala un set",
    titleB: "que le va a encantar",
    intro: "Diseña una tarjeta de regalo digital, envíala por WhatsApp, Instagram o mensaje de texto, e Iva la activa cuando confirma el pago por mensaje.",
    amount: "Monto (USD)",
    to: "Para",
    from: "De",
    message: "Mensaje (opcional)",
    create: "Crear y compartir la tarjeta",
    activate: "Actívala con Iva por Instagram",
    how: "Cómo funciona: crea la tarjeta y luego escríbele a Iva para pagarla y activarla. La tarjeta vale para una cita por ese monto.",
    ready: "Tarjeta lista: envíala y luego escríbele a Iva para activarla.",
    saved: "Tarjeta guardada en tus descargas: envíala y luego escríbele a Iva para activarla.",
    card: "Tarjeta de regalo",
    forL: "Para",
    fromL: "De",
    valid: "Válida para servicios en IVA Nail Art · Bay Ridge, Brooklyn",
    placeholderTo: "Su nombre",
    placeholderFrom: "Tu nombre",
    errAmount: "Escribe un monto de al menos $25.",
    errNames: "Escribe los dos nombres.",
  },
};

const input =
  "w-full rounded-xl border border-[#F4EBE1]/20 bg-[#0E0706] px-4 py-3 text-[#F4EBE1] placeholder:text-[#F4EBE1]/40 focus:border-[#E8C9A8] focus:outline-none";

function drawCard(c: (typeof COPY)["en"], amount: number, to: string, from: string, message: string): HTMLCanvasElement {
  const W = 1200;
  const H = 750;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#F3E3DA");
  bg.addColorStop(0.55, "#E7C3B8");
  bg.addColorStop(1, "#C98E86");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  // Accent arc
  ctx.fillStyle = "rgba(107, 31, 46, 0.9)";
  ctx.beginPath();
  ctx.arc(W - 90, 90, 210, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.lineWidth = 3;
  ctx.strokeRect(36, 36, W - 72, H - 72);

  ctx.fillStyle = "#2A1714";
  ctx.font = "600 34px Georgia, serif";
  ctx.fillText("IVA NAIL ART NY", 90, 130);
  ctx.font = "italic 72px Georgia, serif";
  ctx.fillText(c.card, 90, 240);

  ctx.fillStyle = "#FFF6F1";
  ctx.font = "700 84px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText(`$${amount}`, W - 175, 175);
  ctx.textAlign = "left";

  ctx.fillStyle = "#2A1714";
  ctx.font = "32px Georgia, serif";
  ctx.fillText(`${c.forL}: ${to}`, 90, 360);
  ctx.fillText(`${c.fromL}: ${from}`, 90, 415);
  if (message) {
    ctx.font = "italic 30px Georgia, serif";
    const lines: string[] = [];
    let line = "";
    for (const w of message.split(/\s+/)) {
      const test = line ? `${line} ${w}` : w;
      if (ctx.measureText(test).width > W - 200 && line) {
        lines.push(line);
        line = w;
      } else line = test;
    }
    if (line) lines.push(line);
    lines.slice(0, 3).forEach((l, i, arr) => {
      ctx.fillText(`${i === 0 ? "“" : ""}${l}${i === arr.length - 1 ? "”" : ""}`, 90, 500 + i * 42);
    });
  }
  ctx.font = "24px Georgia, serif";
  ctx.fillStyle = "rgba(42,23,20,0.8)";
  ctx.fillText(c.valid, 90, H - 80);
  return canvas;
}

export default function GiftCard({ lang }: { lang: "en" | "es" }) {
  const c = COPY[lang];
  const [amount, setAmount] = useState("75");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const value = Math.round(Number(amount));
    if (!Number.isFinite(value) || value < 25) return setError(c.errAmount);
    if (!to.trim() || !from.trim()) return setError(c.errNames);
    setError(null);
    const canvas = drawCard(c, value, to.trim(), from.trim(), message.trim());
    const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/png"));
    if (!blob) return;
    const file = new File([blob], "iva-gift-card.png", { type: "image/png" });
    track("giftcard_create", { amount: value });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "IVA Nail Art", text: `${c.card} · $${value}` });
        return setStatus(c.ready);
      }
    } catch {
      // share cancelled → fall back to download
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "iva-gift-card.png";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    setStatus(c.saved);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="font-display mb-4 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
      <h1 className="text-[#F4EBE1]">
        <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleA}</span>
        <span className="font-serif text-4xl italic text-[#E8C9A8] md:text-6xl">{c.titleB}</span>
      </h1>
      <p className="mt-5 max-w-2xl text-lg text-[#F4EBE1]/80">{c.intro}</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        {/* Live preview */}
        <div
          aria-hidden
          className="relative aspect-[8/5] overflow-hidden rounded-[1.5rem] p-6 text-[#2A1714] shadow-2xl"
          style={{ background: "linear-gradient(135deg,#F3E3DA 0%,#E7C3B8 55%,#C98E86 100%)" }}
        >
          <div className="absolute -right-10 -top-10 flex h-36 w-36 items-end justify-start rounded-full bg-[#6B1F2E]/90 p-8 pb-10 pl-10">
            <span className="font-serif text-3xl font-bold text-[#FFF6F1]">${Math.max(0, Math.round(Number(amount) || 0))}</span>
          </div>
          <p className="font-display text-xs tracking-[0.3em]">IVA NAIL ART NY</p>
          <p className="mt-2 font-serif text-4xl italic">{c.card}</p>
          <p className="mt-6">{c.forL}: {to || "—"}</p>
          <p>{c.fromL}: {from || "—"}</p>
          {message && <p className="mt-3 line-clamp-2 font-serif italic">“{message}”</p>}
          <p className="absolute bottom-5 left-6 right-6 text-xs opacity-80">{c.valid}</p>
        </div>

        <form onSubmit={create} className="space-y-5" noValidate>
          <div>
            <label htmlFor="gc-amount" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.amount}</label>
            <input id="gc-amount" type="number" inputMode="numeric" min={25} step={5} value={amount} onChange={(e) => setAmount(e.target.value)} className={input} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="gc-to" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.to}</label>
              <input id="gc-to" maxLength={40} placeholder={c.placeholderTo} value={to} onChange={(e) => setTo(e.target.value)} className={input} />
            </div>
            <div>
              <label htmlFor="gc-from" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.from}</label>
              <input id="gc-from" maxLength={40} placeholder={c.placeholderFrom} value={from} onChange={(e) => setFrom(e.target.value)} className={input} />
            </div>
          </div>
          <div>
            <label htmlFor="gc-msg" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.message}</label>
            <textarea id="gc-msg" maxLength={140} rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={input} />
          </div>
          {error && <p role="alert" className="rounded-xl border border-[#E8C9A8]/40 bg-[#5C1A1B]/40 px-4 py-3 text-sm">{error}</p>}
          <button type="submit" className="glow-pill w-full justify-center sm:w-auto">
            <Gift className="h-5 w-5" aria-hidden /> {c.create}
            <Share2 className="h-4 w-4" aria-hidden />
          </button>
          {status && <p role="status" className="text-sm text-[#F4EBE1]/85">{status}</p>}
          <p className="text-sm text-[#F4EBE1]/65">{c.how}</p>
          <a href="https://ig.me/m/iva_nailart_nyc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            <Instagram className="h-4 w-4" aria-hidden /> {c.activate}
          </a>
        </form>
      </div>
    </div>
  );
}
