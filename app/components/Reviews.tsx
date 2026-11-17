import { Star } from "lucide-react";
import { REVIEWS, GOOGLE_REVIEW_URL } from "@/app/data/reviews";

/** Renders only real reviews. With no reviews and no Google link it renders nothing. */
export default function Reviews({ lang }: { lang: "en" | "es" }) {
  const isEn = lang === "en";
  if (REVIEWS.length === 0 && !GOOGLE_REVIEW_URL) return null;

  return (
    <section id="reviews" className="bg-[#0E0706] px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-7xl">
        <p className="font-display mb-5 text-[0.65rem] tracking-[0.35em] text-[#D4A574] md:text-xs">
          {isEn ? "Client reviews" : "Reseñas de clientas"}
        </p>
        {REVIEWS.length > 0 && (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <li key={`${r.author}-${r.date}`} className="rounded-[1.75rem] border border-[#F4EBE1]/12 bg-[#1A0F0D] p-7">
                <blockquote className="font-serif text-xl italic leading-relaxed text-[#F4EBE1]">
                  “{isEn ? r.text : r.textEs ?? r.text}”
                </blockquote>
                <p className="mt-5 text-sm text-[#F4EBE1]/70">
                  {r.author} · {r.source}
                </p>
              </li>
            ))}
          </ul>
        )}
        {GOOGLE_REVIEW_URL && (
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#E8C9A8]/60 px-6 py-3 text-sm font-semibold text-[#E8C9A8] hover:bg-[#E8C9A8] hover:text-[#0E0706]"
          >
            <Star className="h-4 w-4" aria-hidden />
            {isEn ? "Leave a review on Google" : "Deja tu reseña en Google"}
          </a>
        )}
      </div>
    </section>
  );
}
