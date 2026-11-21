import Image from "next/image";
import Link from "next/link";
import { Instagram, MessageCircle, Phone, Clock, Check } from "lucide-react";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { GALLERY_IMAGES } from "@/app/data/galleryData";
import { SERVICE_LANDINGS, SHARED, getLanding, landingPath, type Lang } from "@/app/data/serviceLandings";

const DM_URL = "https://ig.me/m/iva_nailart_nyc";

function jsonLd(slug: string, lang: Lang) {
  const landing = getLanding(slug);
  const c = landing.copy[lang];
  const s = SHARED[lang];
  const url = `${SITE_URL}${landingPath(slug, lang)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${c.h1Top} ${c.h1Bottom}`,
      serviceType: landing.serviceType,
      url,
      inLanguage: lang,
      provider: { "@id": `${SITE_URL}/#nailsalon` },
      areaServed: [
        { "@type": "Place", name: "Bay Ridge, Brooklyn, NY" },
        { "@type": "City", name: "Brooklyn" },
      ],
      description: c.intro,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: [...c.faq, { q: s.priceQ, a: s.priceA }, { q: s.whereQ, a: s.whereA }].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: s.home, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: `${c.h1Top} ${c.h1Bottom}`, item: url },
      ],
    },
  ];
}

/** Service landing page (server-rendered, one route per service and language). */
export default function ServiceLandingPage({ slug, lang }: { slug: string; lang: Lang }) {
  const landing = getLanding(slug);
  const c = { ...SHARED[lang], ...landing.copy[lang] };
  const faq = [...landing.copy[lang].faq, { q: SHARED[lang].priceQ, a: SHARED[lang].priceA }, { q: SHARED[lang].whereQ, a: SHARED[lang].whereA }];
  const other: Lang = lang === "en" ? "es" : "en";
  const photos = GALLERY_IMAGES.slice(landing.photoOffset, landing.photoOffset + 6);
  const others = SERVICE_LANDINGS.filter((l) => l.slug !== slug);
  const tel = `tel:${BUSINESS.phoneE164}`;
  const wa = `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(c.waText)}`;

  return (
    <main lang={lang} className="min-h-screen bg-[#0E0706] text-[#F4EBE1]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(slug, lang)).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-[#F4EBE1]/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 md:px-10">
          <Link href="/" className="font-display inline-block py-3 text-sm tracking-[0.3em] text-[#F4EBE1] hover:text-[#E8C9A8]">
            IVA <span className="font-light">Nail Art</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={landingPath(slug, other)}
              hrefLang={other}
              className="rounded-full border border-[#F4EBE1]/30 px-3 py-1.5 text-xs font-medium hover:bg-[#F4EBE1] hover:text-[#0E0706]"
            >
              {c.switchLabel}
            </Link>
            <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#E8C9A8] px-5 py-2 text-sm font-semibold text-[#0E0706] hover:bg-white">
              {c.book}
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-24">
        <div>
          <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">{c.eyebrow}</p>
          <h1>
            <span className="font-display block text-[clamp(1.8rem,5vw,3rem)] font-bold leading-[1.1] text-[#F4EBE1]">{c.h1Top}</span>
            <span className="mt-1 block font-serif text-[clamp(2rem,5.5vw,3.6rem)] italic leading-[1.1] text-[#E8C9A8]">{c.h1Bottom}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#F4EBE1]/80">{c.intro}</p>
          <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="glow-pill mt-8">
            <Instagram className="h-5 w-5" aria-hidden />
            {c.cta}
          </a>
          <p className="mt-4 text-sm text-[#F4EBE1]/70">{c.ctaNote}</p>
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[1.75rem] bg-[#140B0A]">
          <Image
            src={photos[0].src}
            alt={lang === "en" ? photos[0].alt : photos[0].altEs ?? photos[0].alt}
            fill
            priority
            sizes="(max-width: 768px) 90vw, 384px"
            className="object-cover"
          />
        </div>
      </section>

      {/* What + who */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.whatTitle}</h2>
            {c.whatBody.map((p) => (
              <p key={p} className="mb-4 text-lg leading-relaxed text-[#F4EBE1]/80">{p}</p>
            ))}
          </div>
          <div>
            <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.forTitle}</h2>
            <ul className="space-y-3">
              {c.forList.map((item) => (
                <li key={item} className="flex gap-3 text-lg text-[#F4EBE1]/85">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#D4A574]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-10 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.stepsTitle}</h2>
          <ol className="grid gap-5 md:grid-cols-4">
            {landing.copy[lang].steps.map((s, i) => (
              <li key={s.t} className="rounded-[1.5rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-6">
                <span className="font-display text-2xl text-[#E8C9A8]">0{i + 1}</span>
                <h3 className="mb-2 mt-3 font-serif text-xl text-[#F4EBE1]">{s.t}</h3>
                <p className="text-[#F4EBE1]/75">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Care */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-5 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.careTitle}</h2>
          {c.careBody.map((p) => (
            <p key={p} className="mb-4 text-lg leading-relaxed text-[#F4EBE1]/80">{p}</p>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.galleryTitle}</h2>
            <Link href="/#gallery" className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
              {c.galleryLink}
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {photos.map((img) => (
              <div key={img.id} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-[#140B0A]">
                <Image
                  src={img.src}
                  alt={lang === "en" ? img.alt : img.altEs ?? img.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + hours */}
      <section className="bg-[#140B0A] px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-6 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.faqTitle}</h2>
            <div className="divide-y divide-[#F4EBE1]/12 border-y border-[#F4EBE1]/12">
              {faq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-[#F4EBE1] marker:hidden">
                    <h3 className="font-sans text-lg font-normal text-[#F4EBE1]">{f.q}</h3>
                    <span aria-hidden className="text-2xl leading-none text-[#D4A574] transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[#F4EBE1]/75">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[1.75rem] border border-[#D4A574]/30 bg-[#0E0706] p-8">
            <p className="mb-3 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-[#D4A574]">
              <Clock className="h-4 w-4" aria-hidden />
              {c.hoursTitle}
            </p>
            <dl className="space-y-2">
              {c.hours.map((h) => (
                <div key={h.d} className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <dt className="text-[#F4EBE1]/70">{h.d}</dt>
                  <dd className="font-display text-lg text-[#F4EBE1]">{h.h}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm text-[#F4EBE1]/70">{c.hoursNote}</p>
            <a href={DM_URL} target="_blank" rel="noopener noreferrer" className="glow-pill mt-8 w-full justify-center">
              {c.cta}
            </a>
            <p className="mt-6 text-sm text-[#F4EBE1]/70">{c.other}</p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 py-1 text-lg text-[#E8C9A8] underline-offset-4 hover:underline">
                <MessageCircle className="h-4 w-4" aria-hidden />
                WhatsApp
              </a>
              <a href={tel} className="inline-flex items-center gap-2 py-1 text-lg text-[#E8C9A8] underline-offset-4 hover:underline">
                <Phone className="h-4 w-4" aria-hidden />
                {BUSINESS.phone}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <nav aria-label={c.more} className="px-6 pt-16 md:px-10">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 font-serif text-3xl text-[#E8C9A8] md:text-4xl">{c.more}</h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {others.map((l) => (
              <li key={l.slug}>
                <Link
                  href={landingPath(l.slug, lang)}
                  className="block rounded-[1.25rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-5 text-[#F4EBE1] transition-colors hover:border-[#E8C9A8]"
                >
                  <span className="font-serif text-xl">{l.copy[lang].h1Top}</span>
                  <span className="mt-1 block text-sm text-[#F4EBE1]/65">{l.copy[lang].h1Bottom}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <footer className="px-6 py-10 text-center md:px-10">
        <Link href="/" className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
          {c.back}
        </Link>
        <p className="mt-4 text-sm text-[#F4EBE1]/60">© {new Date().getFullYear()} {BUSINESS.name} · Bay Ridge, Brooklyn</p>
      </footer>
    </main>
  );
}
