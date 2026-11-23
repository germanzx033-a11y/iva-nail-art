"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";

interface HeroScrollProps {
  lang: "en" | "es";
  bookUrl: string;
  cta: string;
  secondaryCtaUrl?: string;
  secondaryCtaText?: string;
  onBookClick?: () => void;
}

const SCENES = [
  {
    src: "/hero.jpg",
    en: ["Custom nail art", "in Bay Ridge, Brooklyn"],
    es: ["Nail art a medida", "en Bay Ridge, Brooklyn"],
    noteEn: "Builder gel, acrylics and hand-painted designs in a private studio, with time that is only yours.",
    noteEs: "Builder gel, acrílico y diseños pintados a mano en un estudio privado, con un tiempo solo para ti.",
  },
  {
    src: "/gallery/lilac-3d-orchid.jpg",
    en: ["Painted", "by hand"],
    es: ["Pintadas", "a mano"],
    noteEn: "Every set is drawn for you — no two are the same.",
    noteEs: "Cada diseño se dibuja para ti: no hay dos iguales.",
  },
  {
    src: "/gallery/chocolate-cat-eye.jpg",
    en: ["Booked in", "one message"],
    es: ["Tu cita,", "en un solo mensaje"],
    noteEn: "Send a photo, get your quote, pick your time. Iva replies within 1–2 hours.",
    noteEs: "Envía una foto, recibe tu cotización y elige tu horario. Iva responde en 1 a 2 horas.",
  },
];

/**
 * Scroll-driven hero: the stage stays pinned while the page scrolls through
 * three scenes. Each photo is shown whole inside its frame; a blurred copy
 * fills the screen behind it so nothing is cropped away.
 */
export default function HeroScroll({
  lang,
  bookUrl,
  cta,
  secondaryCtaUrl,
  secondaryCtaText,
  onBookClick,
}: HeroScrollProps) {
  const trackRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const isEn = lang === "en";

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const scrollable = el.offsetHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(Math.max(-el.getBoundingClientRect().top / scrollable, 0), 1) : 0;
      setProgress(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const active = Math.min(SCENES.length - 1, Math.floor(progress * SCENES.length));
  // 0 → 1 inside the current scene, used for the slow push-in on the photo
  const local = Math.min(progress * SCENES.length - active, 1);

  return (
    <section ref={trackRef} className="relative bg-[#0E0706]" style={{ height: `${SCENES.length * 100}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-[#F4EBE1]">
        {/* Blurred full-bleed backdrops */}
        {SCENES.map((scene, i) => (
          <div
            key={scene.src}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-1000 ease-out"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image src={scene.src} alt="" fill sizes="64px" quality={30} className="scale-110 object-cover" loading={i === 0 ? "eager" : "lazy"} />
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 bg-[#0E0706]/70" />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, #0E0706 2%, transparent 45%), linear-gradient(to bottom, rgba(14,7,6,0.75) 0%, transparent 22%)" }}
        />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end gap-6 px-6 pb-10 pt-24 md:px-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-16">
          {/* Framed photo — always shown whole */}
          <div className="relative order-1 mx-auto min-h-0 w-full max-w-[min(72vw,22rem)] flex-1 lg:order-2 lg:mx-0 lg:h-[76svh] lg:max-w-none lg:flex-none lg:basis-[42%]">
            {SCENES.map((scene, i) => (
              <div
                key={scene.src}
                className="absolute inset-0 transition-opacity duration-1000 ease-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                <div
                  className="relative h-full w-full will-change-transform"
                  style={{ transform: `scale(${i === active ? 0.94 + local * 0.06 : 0.94})` }}
                >
                  <Image
                    src={scene.src}
                    alt={`${isEn ? scene.en.join(" ") : scene.es.join(" ")} — IVA Nail Art`}
                    fill
                    preload={i === 0}
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 1024px) 72vw, 40vw"
                    className="rounded-[1.5rem] object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Statement copy */}
          <div className="order-2 lg:order-1 lg:basis-[58%] lg:pb-4">
            <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">
              IVA Nail Art · Brooklyn NY
            </p>

            <div className="relative h-[8.5rem] sm:h-[11rem] lg:h-[15rem]">
              {SCENES.map((scene, i) => {
                const [top, bottom] = isEn ? scene.en : scene.es;
                // One real <h1> for search engines; the other scenes are decorative headings
                const Heading = i === 0 ? "h1" : "p";
                return (
                  <Heading
                    key={scene.src}
                    aria-hidden={i === 0 ? false : i !== active}
                    className="absolute inset-x-0 bottom-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: `translateY(${i === active ? 0 : i < active ? -24 : 24}px)`,
                    }}
                  >
                    <span className="font-display block text-[clamp(1.9rem,6.2vw,3rem)] lg:text-[clamp(2rem,2.7vw,2.9rem)] font-bold leading-[1.05] text-[#F4EBE1]">
                      {top}
                    </span>
                    <span className="mt-1 block font-serif text-[clamp(2.1rem,6.6vw,3.4rem)] lg:text-[clamp(2.6rem,4.2vw,4.2rem)] font-normal italic leading-[1.05] text-[#E8C9A8]">
                      {bottom}
                    </span>
                  </Heading>
                );
              })}
            </div>

            <p className="mt-5 min-h-[3rem] max-w-md text-sm leading-relaxed text-[#F4EBE1]/75 md:text-base">
              {isEn ? SCENES[active].noteEn : SCENES[active].noteEs}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              {onBookClick ? (
                <button
                  type="button"
                  onClick={onBookClick}
                  className="glow-pill group cursor-pointer"
                >
                  {cta}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0706]/25 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              ) : (
                <a href={bookUrl} target="_blank" rel="noopener noreferrer" className="glow-pill group">
                  {cta}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0706]/25 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              )}

              {secondaryCtaUrl && (
                <a
                  href={secondaryCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#E8C9A8]/50 px-5 py-3 text-xs md:text-sm font-semibold text-[#E8C9A8] hover:bg-[#E8C9A8]/10 transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  <span>{secondaryCtaText || (isEn ? "Instagram DM" : "Mensaje DM")}</span>
                </a>
              )}

              <div className="font-display flex items-center gap-3 text-[0.65rem] tracking-[0.3em] text-[#F4EBE1]/60" aria-hidden>
                <span className="text-[#E8C9A8]">0{active + 1}</span>
                <span className="relative h-px w-16 bg-[#F4EBE1]/25">
                  <span className="absolute inset-y-0 left-0 bg-[#E8C9A8]" style={{ width: `${progress * 100}%` }} />
                </span>
                <span>0{SCENES.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
