"use client";

import { TRUST_BADGES } from "../constants/luxury";

interface TrustBadgesProps {
  lang: "en" | "es";
}

export default function TrustBadges({ lang }: TrustBadgesProps) {
  return (
    <section className="py-12 px-4 sm:px-6 bg-white border-y border-[#4A0404]/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.id}
              className="text-center p-4 rounded-xl hover:bg-[#4A0404]/[0.02] transition-colors"
            >
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h3 className="font-medium text-[#4A0404] text-sm mb-1">
                {lang === "en" ? badge.title : badge.titleEs}
              </h3>
              <p className="text-xs text-[#4A0404]/50">
                {lang === "en" ? badge.description : badge.descriptionEs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
