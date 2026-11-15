import Image from "next/image";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";

interface HeroEditorialProps {
  lang: "en" | "es";
  bookUrl: string;
  text: {
    tagline: string;
    cta: string;
    location: string;
    hours: string;
    appointment: string;
  };
}

const TECHNIQUES = ["Gel-X", "Chrome", "Cat Eye", "French", "3D Art", "Aura", "Hand-painted", "Charms"];

export default function HeroEditorial({ lang, bookUrl, text }: HeroEditorialProps) {
  const isEn = lang === "en";

  return (
    <section className="relative isolate overflow-hidden bg-[#1C0A0A] text-[#FDF8F5]">
      {/* Soft light, no moving parts */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 30%, rgba(212,165,116,0.22) 0%, transparent 70%), radial-gradient(45% 40% at 10% 90%, rgba(139,46,47,0.45) 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 pt-32 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-40">
        {/* Copy */}
        <div className="hero-rise">
          <p className="mb-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A574]">
            <span className="h-px w-10 bg-[#D4A574]" />
            {isEn ? "Nail studio · Brooklyn, NY" : "Estudio de uñas · Brooklyn, NY"}
          </p>

          <h1 className="font-serif text-[clamp(3.25rem,10vw,7.5rem)] leading-[0.92] tracking-tight text-[#FDF8F5]">
            {isEn ? "Nails as" : "Uñas como"}
            <br />
            <span className="italic text-[#E8C9A8]">{isEn ? "wearable art" : "arte para llevar"}</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#FDF8F5]/75 md:text-lg">
            {text.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={bookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[#E8C9A8] py-2 pl-7 pr-2 text-sm font-semibold tracking-wide text-[#1C0A0A] transition-colors hover:bg-white"
            >
              {text.cta}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1C0A0A] text-[#E8C9A8] transition-transform group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </a>
            <a
              href="#gallery"
              className="rounded-full border border-[#FDF8F5]/30 px-7 py-4 text-sm font-medium tracking-wide text-[#FDF8F5] transition-colors hover:border-[#E8C9A8] hover:text-[#E8C9A8]"
            >
              {isEn ? "See the work" : "Ver los diseños"}
            </a>
          </div>

          <dl className="mt-14 grid max-w-lg grid-cols-1 gap-6 border-t border-[#FDF8F5]/15 pt-8 text-sm sm:grid-cols-3">
            <div>
              <dt className="mb-1 flex items-center gap-2 text-[#D4A574]">
                <MapPin className="h-4 w-4" />
                {isEn ? "Studio" : "Estudio"}
              </dt>
              <dd className="text-[#FDF8F5]/85">{text.location}</dd>
            </div>
            <div>
              <dt className="mb-1 flex items-center gap-2 text-[#D4A574]">
                <Clock className="h-4 w-4" />
                {isEn ? "Hours" : "Horario"}
              </dt>
              <dd className="text-[#FDF8F5]/85">{text.hours}</dd>
            </div>
            <div>
              <dt className="mb-1 text-[#D4A574]">{isEn ? "Booking" : "Reservas"}</dt>
              <dd className="text-[#FDF8F5]/85">{text.appointment}</dd>
            </div>
          </dl>
        </div>

        {/* Photo collage */}
        <div className="hero-rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "120ms" }}>
          <div className="relative ml-auto aspect-[3/4] w-[78%] overflow-hidden rounded-t-full rounded-b-[2rem] border border-[#D4A574]/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]">
            <Image
              src="/hero.jpg"
              alt={isEn ? "Hand-painted nail set by IVA Nail Art" : "Diseño de uñas pintado a mano por IVA Nail Art"}
              fill
              priority
              sizes="(max-width: 1024px) 70vw, 36vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-[6%] left-0 aspect-[4/5] w-[44%] -rotate-6 overflow-hidden rounded-3xl border-4 border-[#1C0A0A] shadow-2xl">
            <Image
              src="/gallery/lilac-3d-orchid.jpg"
              alt={isEn ? "Lilac nails with a 3D orchid" : "Uñas lila con orquídea 3D"}
              fill
              sizes="(max-width: 1024px) 40vw, 18vw"
              className="object-cover"
            />
          </div>

          <div className="absolute right-0 top-[4%] hidden aspect-square w-[30%] rotate-6 overflow-hidden rounded-3xl border-4 border-[#1C0A0A] shadow-2xl sm:block">
            <Image
              src="/gallery/chocolate-cat-eye.jpg"
              alt={isEn ? "Chocolate cat eye nails" : "Uñas cat eye chocolate"}
              fill
              sizes="(max-width: 1024px) 28vw, 12vw"
              className="object-cover"
            />
          </div>

          <div className="absolute -bottom-4 right-[4%] rounded-2xl bg-[#FDF8F5] px-5 py-4 text-[#1C0A0A] shadow-2xl">
            <p className="font-serif text-2xl leading-none">@iva_nailart_ny</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#8B2E2F]">
              {isEn ? "Book by Instagram DM" : "Reserva por mensaje directo"}
            </p>
          </div>
        </div>
      </div>

      {/* Technique ticker */}
      <div className="border-y border-[#FDF8F5]/15 py-5" aria-hidden>
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-serif text-2xl italic text-[#FDF8F5]/70 md:text-3xl">
          {[...TECHNIQUES, ...TECHNIQUES, ...TECHNIQUES].map((word, i) => (
            <span key={i} className="flex items-center gap-10">
              {word}
              <span className="text-base not-italic text-[#D4A574]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
