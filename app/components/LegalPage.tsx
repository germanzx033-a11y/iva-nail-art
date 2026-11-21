"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface LegalSection {
  title: string;
  body: string[];
}

export interface LegalCopy {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

interface LegalPageProps {
  en: LegalCopy;
  es: LegalCopy;
}

export default function LegalPage({ en, es }: LegalPageProps) {
  const [lang, setLang] = useState<"en" | "es">("en");
  const copy = lang === "en" ? en : es;

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className="min-h-screen bg-[#0E0706] px-6 py-10 text-[#F4EBE1] md:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-14 flex items-center justify-between">
          <Link href="/" className="font-display text-xs tracking-[0.3em] text-[#F4EBE1] hover:text-[#E8C9A8]">
            IVA Nail Art
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "es" : "en")}
            className="rounded-full border border-[#F4EBE1]/30 px-4 py-1.5 text-xs font-medium hover:bg-[#F4EBE1] hover:text-[#0E0706]"
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
        </div>

        <h1 className="font-serif text-5xl leading-tight text-[#F4EBE1] md:text-6xl">{copy.title}</h1>
        <p className="mt-3 text-sm text-[#F4EBE1]/70">{copy.updated}</p>
        <p className="mt-8 text-base leading-relaxed text-[#F4EBE1]/85">{copy.intro}</p>

        <div className="mt-12 space-y-10">
          {copy.sections.map((section, i) => (
            <section key={section.title}>
              <h2 className="mb-3 font-serif text-2xl text-[#E8C9A8]">
                {i + 1}. {section.title}
              </h2>
              <div className="space-y-3 text-base leading-relaxed text-[#F4EBE1]/85">
                {section.body.map((p) => (
                  <p key={p} className="text-[#F4EBE1]/85">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-[#F4EBE1]/15 pt-8">
          <Link href="/" className="text-sm text-[#E8C9A8] underline underline-offset-4 hover:text-white">
            {lang === "en" ? "← Back to the site" : "← Volver al sitio"}
          </Link>
        </div>
      </div>
    </main>
  );
}
