"use client";

import { useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";

import { usePathname } from "@/lib/i18n";

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      return;
    }

    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }

      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}
