import Link from "next/link";

/** Minimal header/footer for standalone tools (try-on, Nail Match, gift card). */
export default function ToolShell({
  lang,
  path,
  extraQuery = "",
  children,
}: {
  lang: "en" | "es";
  path: string;
  extraQuery?: string;
  children: React.ReactNode;
}) {
  const other = lang === "en" ? "es" : "en";
  const q = (l: string) => {
    const params = new URLSearchParams(extraQuery);
    if (l === "es") params.set("lang", "es");
    else params.delete("lang");
    const s = params.toString();
    return s ? `${path}?${s}` : path;
  };
  return (
    <main lang={lang} className="min-h-screen bg-[#0E0706] text-[#F4EBE1]">
      <header className="border-b border-[#F4EBE1]/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 md:px-10">
          <Link href={lang === "es" ? "/?lang=es" : "/"} className="font-display inline-block py-3 text-sm tracking-[0.3em] text-[#F4EBE1] hover:text-[#E8C9A8]">
            IVA <span className="font-light">Nail Art</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={q(other)} hrefLang={other} className="rounded-full border border-[#F4EBE1]/30 px-3 py-1.5 text-xs font-medium hover:bg-[#F4EBE1] hover:text-[#0E0706]">
              {other.toUpperCase()}
            </Link>
            <a href="https://ig.me/m/iva_nailart_nyc" target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#E8C9A8] px-5 py-2 text-sm font-semibold text-[#0E0706] hover:bg-white">
              {lang === "en" ? "Book" : "Reservar"}
            </a>
          </div>
        </nav>
      </header>
      <div className="px-6 py-12 md:px-10 md:py-16">{children}</div>
      <footer className="px-6 pb-12 text-center md:px-10">
        <Link href={lang === "es" ? "/?lang=es" : "/"} className="inline-block py-2 text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
          {lang === "en" ? "← Back to the home page" : "← Volver al inicio"}
        </Link>
      </footer>
    </main>
  );
}
