import Link from "next/link";
import { MessageCircle, RefreshCw } from "lucide-react";

const DM_URL = "https://ig.me/m/iva_nailart_nyc";

export default function BookingCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0E0706] px-6 py-16 text-[#F4EBE1]">
      <div className="w-full max-w-lg text-center">
        <h1 className="font-serif text-4xl text-[#F4EBE1]">La reserva no se completó</h1>
        <p className="mt-2 text-lg text-[#F4EBE1]/75">Your booking was not completed.</p>
        <p className="mt-6 text-[#F4EBE1]/80">
          No se hizo ningún cobro y el horario quedó libre de nuevo.
        </p>
        <p className="text-[#F4EBE1]/60">No payment was taken and the time is available again.</p>

        <div className="mt-10 flex flex-col items-center gap-4">
          <Link href="/#book-online" className="glow-pill">
            <RefreshCw className="h-4 w-4" aria-hidden />
            Intentar de nuevo · Try again
          </Link>
          <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-2 text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            <MessageCircle className="h-4 w-4" aria-hidden />
            ¿Necesitas ayuda? Escríbele a Iva · Need help?
          </a>
        </div>
      </div>
    </main>
  );
}
