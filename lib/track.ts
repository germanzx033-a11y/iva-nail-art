/** Fire-and-forget product analytics; no-op when PostHog is not loaded (no key, DNT, blocked). */
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  import("posthog-js")
    .then(({ default: posthog }) => {
      if ((posthog as unknown as { __loaded?: boolean }).__loaded) posthog.capture(event, props);
    })
    .catch(() => undefined);
}
