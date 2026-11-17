"use client";

import { useEffect } from "react";

// Public project key (safe to ship in the browser; it can only send events).
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "phc_qeCs6HjV9MCdRv3rMqWomoebLmbWrjaXTGzhYFqPPL84";
const POSTHOG_HOST = "https://us.i.posthog.com";

/**
 * Anonymous, cookieless visit statistics. Loads after the page is idle so it
 * never slows the first paint, keeps nothing on the visitor's device, and
 * records a `booking_click` event whenever someone taps a booking link.
 */
export default function Analytics() {
  useEffect(() => {
    if (window.location.hostname === "localhost" || navigator.doNotTrack === "1") return;

    let cancelled = false;
    let onClick: ((e: MouseEvent) => void) | undefined;

    const start = () => {
      import("posthog-js").then(({ default: posthog }) => {
        if (cancelled) return;
        posthog.init(POSTHOG_KEY, {
          api_host: POSTHOG_HOST,
          persistence: "memory", // no cookies, no localStorage
          person_profiles: "never",
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          disable_session_recording: true,
          disable_surveys: true,
        });
        onClick = (e) => {
          const link = (e.target as HTMLElement | null)?.closest?.("a");
          if (!link) return;
          const href = link.getAttribute("href") ?? "";
          if (href.includes("ig.me/")) {
            posthog.capture("booking_click", { label: link.textContent?.trim().slice(0, 60) });
          }
        };
        document.addEventListener("click", onClick, { capture: true });
      });
    };

    const timer = window.setTimeout(start, 2500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (onClick) document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
