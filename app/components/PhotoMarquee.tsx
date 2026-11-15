import Image from "next/image";
import { GALLERY_IMAGES } from "@/app/data/galleryData";

interface PhotoMarqueeProps {
  lang: "en" | "es";
}

/** Two rows of recent sets drifting in opposite directions. Pauses on hover; static with reduced motion. */
export default function PhotoMarquee({ lang }: PhotoMarqueeProps) {
  const isEn = lang === "en";
  const recent = GALLERY_IMAGES.slice(0, 14);
  const rows = [recent.slice(0, 7), recent.slice(7, 14)];

  return (
    <section className="overflow-hidden bg-[#0E0706] py-20 md:py-28">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A574]">
            {isEn ? "Fresh from the studio" : "Recién salidos del estudio"}
          </p>
          <h2 className="text-[#F4EBE1]">
            <span className="font-display block text-2xl font-bold md:text-4xl">{isEn ? "The latest" : "Los últimos"}</span>
            <span className="font-serif text-4xl font-normal italic text-[#E8C9A8] md:text-6xl">{isEn ? "sets from the studio" : "diseños del estudio"}</span>
          </h2>
        </div>
        <a
          href="#gallery"
          className="self-start rounded-full border border-[#F4EBE1]/30 px-6 py-3 text-sm font-medium text-[#F4EBE1] transition-colors hover:bg-[#F4EBE1] hover:text-[#0E0706] md:self-auto"
        >
          {isEn ? "Open full gallery" : "Abrir galería completa"}
        </a>
      </div>

      <div className="marquee-group flex flex-col gap-5">
        {rows.map((row, r) => (
          <div
            key={r}
            className={`flex w-max gap-5 ${r === 0 ? "marquee-track" : "marquee-track-reverse"}`}
          >
            {[...row, ...row].map((img, i) => (
              <figure
                key={`${img.id}-${i}`}
                aria-hidden={i >= row.length}
                className="relative aspect-[3/4] w-56 shrink-0 overflow-hidden rounded-[1.75rem] md:w-72"
              >
                <Image
                  src={img.src}
                  alt={i >= row.length ? "" : isEn ? img.alt : img.altEs ?? img.alt}
                  fill
                  sizes="(max-width: 768px) 224px, 288px"
                  className="object-cover"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 font-serif text-lg text-white">
                  {isEn ? img.alt : img.altEs ?? img.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
