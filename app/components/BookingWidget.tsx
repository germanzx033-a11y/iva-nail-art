"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Loader2, Lock } from "lucide-react";
import { SERVICES } from "@/app/constants/data";

/** Online booking is switched on only when Stripe and KV are configured. */
export const BOOKING_ENABLED = process.env.NEXT_PUBLIC_BOOKING_ENABLED === "true";

const BOOKABLE_SERVICE_IDS = [
  "builder-overlay",
  "builder-color",
  "builder-french",
  "gel-mani",
  "acrylic-basic",
  "acrylic-fill",
  "art-premium",
  "gel-pedi",
  "spa-pedi",
];

interface Day {
  date: string;
  slots: { id: string; label: string; available: boolean }[];
}

const COPY = {
  en: {
    eyebrow: "Book online",
    titleTop: "Pick your day",
    titleBottom: "and hold it with a deposit",
    intro: "Choose a service, date and time. A $35 deposit holds your appointment and is applied to your service.",
    service: "Service",
    date: "Date",
    time: "Time",
    noDates: "No online openings right now. Message Iva on Instagram and she will find you a time.",
    loadError: "Online booking is not available right now. Message Iva on Instagram to book.",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    terms: "I agree to the",
    termsLink: "booking terms",
    termsTail: "($35 deposit, 15-minute grace period, cancel at least 24 hours ahead).",
    submit: "Continue to deposit ($35)",
    secure: "Secure payment with Stripe. Iva confirms your design by message after booking.",
    taken: "That time was just taken. Please pick another one.",
    generic: "Something went wrong. Please try again or message Iva on Instagram.",
    pickTime: "Pick a time to continue.",
    instagram: "Message Iva on Instagram",
  },
  es: {
    eyebrow: "Reserva online",
    titleTop: "Elige tu día",
    titleBottom: "y apártalo con un depósito",
    intro: "Elige el servicio, la fecha y la hora. Un depósito de $35 aparta tu cita y se descuenta de tu servicio.",
    service: "Servicio",
    date: "Fecha",
    time: "Hora",
    noDates: "Ahora mismo no hay horarios online. Escríbele a Iva por Instagram y te busca un espacio.",
    loadError: "La reserva online no está disponible en este momento. Escríbele a Iva por Instagram para reservar.",
    name: "Nombre completo",
    email: "Correo electrónico",
    phone: "Teléfono",
    terms: "Acepto los",
    termsLink: "términos de reserva",
    termsTail: "(depósito de $35, 15 minutos de tolerancia, cancelar con al menos 24 horas).",
    submit: "Continuar al depósito ($35)",
    secure: "Pago seguro con Stripe. Iva confirma tu diseño por mensaje después de reservar.",
    taken: "Ese horario se acaba de ocupar. Por favor elige otro.",
    generic: "Algo salió mal. Inténtalo de nuevo o escríbele a Iva por Instagram.",
    pickTime: "Elige una hora para continuar.",
    instagram: "Escríbele a Iva por Instagram",
  },
};

function dayLabel(date: string, lang: "en" | "es") {
  const d = new Date(`${date}T12:00:00Z`);
  const locale = lang === "en" ? "en-US" : "es-US";
  return {
    weekday: d.toLocaleDateString(locale, { weekday: "short", timeZone: "UTC" }),
    day: d.toLocaleDateString(locale, { day: "numeric", timeZone: "UTC" }),
    month: d.toLocaleDateString(locale, { month: "short", timeZone: "UTC" }),
  };
}

const inputClass =
  "w-full rounded-xl border border-[#F4EBE1]/20 bg-[#0E0706] px-4 py-3 text-[#F4EBE1] placeholder:text-[#F4EBE1]/40 focus:border-[#E8C9A8] focus:outline-none";

export default function BookingWidget({ lang, instagramUrl }: { lang: "en" | "es"; instagramUrl: string }) {
  const c = COPY[lang];
  const services = useMemo(
    () => BOOKABLE_SERVICE_IDS.map((id) => SERVICES.find((s) => s.id === id)).filter((s) => s !== undefined),
    []
  );

  const [days, setDays] = useState<Day[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () =>
    fetch("/api/availability", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { open: boolean; days: Day[] }) => {
        const open = (data.days ?? []).filter((d) => d.slots.some((s) => s.available));
        setDays(data.open ? open : []);
        setLoadFailed(false);
      })
      .catch(() => setLoadFailed(true));

  useEffect(() => {
    load();
  }, []);

  const selectedDay = days?.find((d) => d.date === date) ?? null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!date || !slot) {
      setError(c.pickTime);
      return;
    }
    setSubmitting(true);
    try {
      const lockRes = await fetch("/api/prelock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, slot }),
      });
      const lock = await lockRes.json();
      if (!lockRes.ok || !lock.success) {
        if (lock.errorCode === "SLOT_ALREADY_LOCKED" || lock.errorCode === "CAPACITY_EXCEEDED") {
          setError(c.taken);
          setSlot(null);
          load();
        } else {
          setError(c.generic);
        }
        return;
      }

      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lockToken: lock.lockToken,
          date,
          slot,
          serviceName: serviceId,
          customerName: form.name.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim(),
        }),
      });
      const checkout = await checkoutRes.json();
      if (!checkoutRes.ok || !checkout.checkoutUrl) {
        setError(checkout.errorCode === "CAPACITY_EXCEEDED" ? c.taken : c.generic);
        return;
      }
      window.location.href = checkout.checkoutUrl;
    } catch {
      setError(c.generic);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="book-online" className="bg-[#0E0706] px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
        <h2 className="text-[#F4EBE1]">
          <span className="font-display block text-2xl font-bold md:text-4xl">{c.titleTop}</span>
          <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{c.titleBottom}</span>
        </h2>
        <p className="mt-6 max-w-2xl text-lg text-[#F4EBE1]/75">{c.intro}</p>

        <div className="mt-10 rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-6 md:p-10">
          {loadFailed || (days && days.length === 0) ? (
            <div className="text-center">
              <p className="text-[#F4EBE1]/80">{loadFailed ? c.loadError : c.noDates}</p>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="glow-pill mt-6">
                {c.instagram}
              </a>
            </div>
          ) : !days ? (
            <div className="flex justify-center py-10" role="status" aria-label="Loading">
              <Loader2 className="h-6 w-6 animate-spin text-[#E8C9A8]" aria-hidden />
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-8">
              <div>
                <label htmlFor="bw-service" className="mb-2 block text-sm uppercase tracking-[0.2em] text-[#D4A574]">
                  {c.service}
                </label>
                <select id="bw-service" value={serviceId} onChange={(e) => setServiceId(e.target.value)} className={inputClass}>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {lang === "en" ? s.name : s.nameEs}
                    </option>
                  ))}
                </select>
              </div>

              <fieldset className="min-w-0">
                <legend className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">
                  <CalendarDays className="h-4 w-4" aria-hidden />
                  {c.date}
                </legend>
                <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
                  {days.map((d) => {
                    const l = dayLabel(d.date, lang);
                    const active = d.date === date;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setDate(d.date);
                          setSlot(null);
                        }}
                        className={`flex min-w-[4.5rem] shrink-0 flex-col items-center rounded-2xl border px-3 py-3 transition-colors ${
                          active
                            ? "border-[#E8C9A8] bg-[#E8C9A8] text-[#0E0706]"
                            : "border-[#F4EBE1]/20 text-[#F4EBE1] hover:border-[#E8C9A8]"
                        }`}
                      >
                        <span className="text-xs uppercase">{l.weekday}</span>
                        <span className="font-display text-xl">{l.day}</span>
                        <span className="text-xs">{l.month}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {selectedDay && (
                <fieldset className="min-w-0">
                  <legend className="mb-3 text-sm uppercase tracking-[0.2em] text-[#D4A574]">{c.time}</legend>
                  <div className="flex flex-wrap gap-3">
                    {selectedDay.slots.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        disabled={!s.available}
                        aria-pressed={slot === s.id}
                        onClick={() => setSlot(s.id)}
                        className={`rounded-full border px-6 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                          slot === s.id
                            ? "border-[#E8C9A8] bg-[#E8C9A8] text-[#0E0706]"
                            : "border-[#F4EBE1]/25 text-[#F4EBE1] hover:border-[#E8C9A8]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label htmlFor="bw-name" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.name}</label>
                  <input id="bw-name" required maxLength={100} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="bw-email" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.email}</label>
                  <input id="bw-email" required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="bw-phone" className="mb-2 block text-sm text-[#F4EBE1]/80">{c.phone}</label>
                  <input id="bw-phone" required type="tel" autoComplete="tel" pattern="[0-9+()\-\s]{10,20}" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                </div>
              </div>

              <label className="flex items-start gap-3 text-sm text-[#F4EBE1]/80">
                <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#E8C9A8]" />
                <span>
                  {c.terms}{" "}
                  <Link href="/terms" className="text-[#E8C9A8] underline underline-offset-4">{c.termsLink}</Link>{" "}
                  {c.termsTail}
                </span>
              </label>

              {error && (
                <p role="alert" className="rounded-xl border border-[#E8C9A8]/40 bg-[#5C1A1B]/40 px-4 py-3 text-sm text-[#F4EBE1]">
                  {error}
                </p>
              )}

              <div>
                <button type="submit" disabled={submitting} className="glow-pill w-full justify-center disabled:opacity-60 md:w-auto">
                  {submitting ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Lock className="h-4 w-4" aria-hidden />}
                  {c.submit}
                </button>
                <p className="mt-3 text-sm text-[#F4EBE1]/65">{c.secure}</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
