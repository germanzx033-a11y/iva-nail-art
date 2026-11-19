import Link from "next/link";
import { CheckCircle, CalendarDays, MessageCircle } from "lucide-react";
import { getCheckoutSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const DM_URL = "https://ig.me/m/iva_nailart_nyc";

function formatDay(date: string, locale: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const session =
    typeof session_id === "string" && session_id.startsWith("cs_") && process.env.STRIPE_SECRET_KEY
      ? await getCheckoutSession(session_id)
      : null;
  const paid = session?.payment_status === "paid";
  const m = session?.metadata ?? {};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0E0706] px-6 py-16 text-[#F4EBE1]">
      <div className="w-full max-w-lg text-center">
        <CheckCircle className="mx-auto mb-6 h-14 w-14 text-[#E8C9A8]" aria-hidden />
        <h1 className="font-serif text-4xl text-[#F4EBE1]">¡Tu cita está apartada!</h1>
        <p className="mt-2 text-lg text-[#F4EBE1]/75">Your appointment is booked.</p>

        {paid && m.date ? (
          <div className="mt-8 rounded-[1.5rem] border border-[#D4A574]/30 bg-[#1A0F0D] p-6 text-left">
            <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">
              <CalendarDays className="h-4 w-4" aria-hidden />
              {m.serviceName}
            </p>
            <p className="text-lg text-[#F4EBE1]">
              {formatDay(m.date, "es-US")} · {m.slotLabel}
            </p>
            <p className="text-[#F4EBE1]/70">
              {formatDay(m.date, "en-US")} · {m.slotLabel}
            </p>
            <p className="mt-4 text-sm text-[#F4EBE1]/70">
              Depósito de $35 recibido · $35 deposit received
            </p>
          </div>
        ) : (
          <p className="mt-8 text-[#F4EBE1]/75">
            Recibirás la confirmación de Stripe por correo. · You will receive Stripe&apos;s receipt by email.
          </p>
        )}

        <div className="mt-8 space-y-2 text-[#F4EBE1]/80">
          <p>Iva te escribirá para confirmar el diseño y enviarte la dirección del estudio.</p>
          <p className="text-[#F4EBE1]/60">Iva will message you to confirm your design and share the studio address.</p>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="glow-pill">
            <MessageCircle className="h-5 w-5" aria-hidden />
            Enviar mi diseño a Iva · Send my design
          </a>
          <Link href="/" className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            Volver al inicio · Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
