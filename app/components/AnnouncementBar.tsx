"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  AnnouncementBarConfig,
  DEFAULT_ANNOUNCEMENT_BAR,
  getSavedSiteContent,
} from "@/lib/contentStore";

interface AnnouncementBarProps {
  lang?: "en" | "es";
}

/**
 * Validates and safely checks a link URL. Rejects dangerous protocols like javascript:
 */
function isValidLinkUrl(url?: string): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.toLowerCase().startsWith("javascript:")) return false;
  return trimmed.startsWith("/") || trimmed.startsWith("https://") || trimmed.startsWith("http://");
}

export default function AnnouncementBar({ lang = "es" }: AnnouncementBarProps) {
  const [config, setConfig] = useState<AnnouncementBarConfig>(() => {
    if (typeof window !== "undefined") {
      try {
        const site = getSavedSiteContent();
        if (site?.announcementBar) return site.announcementBar;
      } catch (err) {
        console.warn("Could not load initial announcement bar config:", err);
      }
    }
    return DEFAULT_ANNOUNCEMENT_BAR;
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const site = getSavedSiteContent();
        if (site?.announcementBar) {
          setConfig(site.announcementBar);
        }
      } catch (err) {
        console.warn("Could not reload announcement bar config:", err);
      }
    };
    window.addEventListener("iva-content-updated", handleUpdate);
    return () => window.removeEventListener("iva-content-updated", handleUpdate);
  }, []);

  // If disabled, return null (does not render ghost element)
  if (!config || !config.enabled) {
    return null;
  }

  const isEn = lang === "en";
  const rawText = isEn
    ? (config.textEn && config.textEn.trim() ? config.textEn : config.textEs)
    : (config.textEs && config.textEs.trim() ? config.textEs : config.textEn);

  const text = rawText ? rawText.trim() : "";

  // If text is empty, do not render ghost element
  if (!text) {
    return null;
  }

  const badge = isEn
    ? (config.badgeEn && config.badgeEn.trim() ? config.badgeEn : config.badgeEs)
    : (config.badgeEs && config.badgeEs.trim() ? config.badgeEs : config.badgeEn);

  const hasLink = isValidLinkUrl(config.linkUrl);
  const linkHref = hasLink ? config.linkUrl?.trim() : undefined;
  const isExternal = linkHref?.startsWith("http");

  const ContentWrapper = hasLink ? "a" : "div";
  const linkProps = hasLink
    ? {
        href: linkHref,
        ...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {}),
      }
    : {};

  return (
    <aside
      role="banner"
      aria-label={isEn ? "Studio Announcement" : "Aviso del Atelier"}
      className="relative z-50 w-full bg-[#722F37] text-[#E8C9A8] border-b border-[#E8C9A8]/25 shadow-md transition-all select-none"
    >
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 flex items-center justify-center text-center text-xs sm:text-[13px] font-serif tracking-wide leading-tight">
        <ContentWrapper
          {...linkProps}
          className={`inline-flex flex-wrap items-center justify-center gap-2 group transition-colors ${
            hasLink ? "hover:text-[#F4EBE1] cursor-pointer" : ""
          }`}
        >
          {/* Optional Badge */}
          {badge && badge.trim() && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-sans font-bold tracking-widest uppercase bg-[#E8C9A8] text-[#722F37] shadow-xs shrink-0">
              {badge.trim()}
            </span>
          )}

          {/* Announcement Copy */}
          <span className="font-normal font-serif text-[#F4EBE1] group-hover:text-white transition-colors">
            {text}
          </span>

          {/* Optional Link Indicator */}
          {hasLink && (
            <span className="inline-flex items-center gap-1 text-[11px] font-sans tracking-wider uppercase text-[#E8C9A8] underline underline-offset-2 ml-1 group-hover:text-white shrink-0">
              <span>{isEn ? "Learn More" : "Ver Más"}</span>
              {isExternal ? (
                <ExternalLink className="w-3 h-3 text-[#E8C9A8] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              ) : (
                <ArrowRight className="w-3 h-3 text-[#E8C9A8] group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
              )}
            </span>
          )}
        </ContentWrapper>
      </div>
    </aside>
  );
}
