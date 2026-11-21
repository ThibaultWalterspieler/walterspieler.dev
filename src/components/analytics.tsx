"use client";

import { useEffect } from "react";

// What a visitor does that counts as engaging. `scroll` is captured on
// window because the page scrolls inside an element and the event doesn't bubble.
const ENGAGEMENT_EVENTS = ["pointerdown", "keydown", "scroll"] as const;
const LISTENER_OPTIONS = { capture: true, passive: true } as const;

const loadPostHog = async () => {
  const { default: posthog } = await import("posthog-js");

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // Captures the current page on init, then every client-side navigation.
    capture_pageview: "history_change",
    persistence: "localStorage",
  });
};

/**
 * Loads PostHog once the browser is idle or the visitor engages, whichever
 * comes first. posthog-js is the heaviest script on the site; loading it
 * during page load slowed LCP and INP on every route.
 */
const Analytics = () => {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== "production" ||
      !process.env.NEXT_PUBLIC_POSTHOG_KEY
    ) {
      return;
    }

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const stopWaiting = () => {
      if (idleId !== undefined) cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      ENGAGEMENT_EVENTS.forEach((event) =>
        window.removeEventListener(event, start, LISTENER_OPTIONS),
      );
    };

    function start() {
      stopWaiting();
      void loadPostHog();
    }

    // Safari has no requestIdleCallback.
    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(start, { timeout: 4000 });
    } else {
      timeoutId = setTimeout(start, 2000);
    }
    ENGAGEMENT_EVENTS.forEach((event) =>
      window.addEventListener(event, start, LISTENER_OPTIONS),
    );

    return stopWaiting;
  }, []);

  return null;
};

export default Analytics;
