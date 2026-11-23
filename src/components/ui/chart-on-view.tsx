"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

import type { ChartKind } from "@/components/ui/data-chart";
import type { ChartData } from "@/lib/chart-data";

const loadDataChart = () => import("@/components/ui/data-chart");
const DataChart = lazy(loadDataChart);

/** Holds the chart's space until it shows, so the page doesn't jump. */
const placeholder = <div className="aspect-video w-full" />;

/**
 * Mounts the chart the first time a third of it is on screen, so Recharts'
 * draw-in animation plays where the reader sees it, once. Recharts' code
 * starts loading a screen earlier, so the chart doesn't wait on it.
 */
export default function ChartOnView({
  kind,
  data,
}: {
  kind: ChartKind;
  data: ChartData;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const preload = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        void loadDataChart();
        preload.disconnect();
      },
      { rootMargin: "100% 0px" },
    );
    const reveal = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        reveal.disconnect();
      },
      { threshold: 0.33 },
    );
    preload.observe(element);
    reveal.observe(element);

    return () => {
      preload.disconnect();
      reveal.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      {visible ? (
        <Suspense fallback={placeholder}>
          <DataChart data={data} kind={kind} />
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}
