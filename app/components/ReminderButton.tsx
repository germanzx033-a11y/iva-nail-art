"use client";

import { CalendarPlus } from "lucide-react";
import { track } from "@/lib/track";

function icsDate(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
}

/** Downloads an .ics event 3 weeks from today: "time for your fill". */
export default function ReminderButton({ lang, className = "" }: { lang: "en" | "es"; className?: string }) {
  const label = lang === "en" ? "Remind me in 3 weeks" : "Recuérdame en 3 semanas";
  const onClick = () => {
    const start = new Date();
    start.setDate(start.getDate() + 21);
    start.setHours(18, 0, 0, 0);
    const end = new Date(start.getTime() + 30 * 60 * 1000);
    const title = lang === "en" ? "Book your nail fill with Iva" : "Reserva tu relleno con Iva";
    const desc =
      lang === "en"
        ? "Time to refresh your set. Message Iva on Instagram: https://ig.me/m/iva_nailart_nyc"
        : "Es momento de renovar tus uñas. Escríbele a Iva por Instagram: https://ig.me/m/iva_nailart_nyc";
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//IVA Nail Art NY//Reminder//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@iva-nail-art`,
      `DTSTAMP:${icsDate(new Date())}`,
      `DTSTART:${icsDate(start)}`,
      `DTEND:${icsDate(end)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${desc}`,
      "URL:https://ig.me/m/iva_nailart_nyc",
      "BEGIN:VALARM",
      "TRIGGER:PT0M",
      "ACTION:DISPLAY",
      `DESCRIPTION:${title}`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "iva-nail-fill-reminder.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    track("fill_reminder_download");
  };
  return (
    <button type="button" onClick={onClick} className={`inline-flex items-center gap-2 text-lg text-[#E8C9A8] underline-offset-4 hover:underline ${className}`}>
      <CalendarPlus className="h-4 w-4" aria-hidden />
      {label}
    </button>
  );
}
