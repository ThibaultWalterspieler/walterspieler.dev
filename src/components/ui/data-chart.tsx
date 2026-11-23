"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import type { ChartData } from "@/lib/chart-data";

export type ChartKind = "line" | "bar";

const compact = new Intl.NumberFormat("en-GB", { notation: "compact" });

/*
  Recharts draws its marks in on mount (lines left to right, bars up from the
  axis); ChartOnView mounts this component when the chart scrolls into view.
  `isAnimationActive` keeps Recharts' default, "auto", which skips the
  animation when the reader asks for reduced motion (docs/adr/0003).
*/
const animation = {
  animationDuration: 800,
  animationEasing: "ease-out",
} as const;

export default function DataChart({
  kind,
  data,
}: {
  kind: ChartKind;
  data: ChartData;
}) {
  // Series keys are generated, never CMS text: ChartStyle writes them into CSS.
  const keys = data.series.map((_, index) => `s${index}`);
  const config: ChartConfig = Object.fromEntries(
    data.series.map((name, index) => [
      keys[index],
      { label: name, color: `var(--color-chart-${index + 1})` },
    ]),
  );
  const rows = data.rows.map((row) => ({
    x: row.x,
    ...Object.fromEntries(
      row.values.map((value, index) => [keys[index], value]),
    ),
  }));

  const axes = (
    <>
      <CartesianGrid vertical={false} />
      <XAxis
        axisLine={false}
        dataKey="x"
        minTickGap={24}
        tickLine={false}
        tickMargin={8}
      />
      <YAxis
        axisLine={false}
        tickFormatter={(value: number) => compact.format(value)}
        tickLine={false}
        tickMargin={8}
        width={40}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      {keys.length > 1 && <ChartLegend content={<ChartLegendContent />} />}
    </>
  );

  return (
    <ChartContainer className="aspect-video w-full" config={config}>
      {kind === "bar" ? (
        <BarChart accessibilityLayer data={rows}>
          {axes}
          {keys.map((key) => (
            <Bar
              dataKey={key}
              fill={`var(--color-${key})`}
              key={key}
              maxBarSize={48}
              radius={[4, 4, 0, 0]}
              {...animation}
            />
          ))}
        </BarChart>
      ) : (
        <LineChart accessibilityLayer data={rows}>
          {axes}
          {keys.map((key) => (
            <Line
              activeDot={{ r: 4 }}
              dataKey={key}
              dot={false}
              key={key}
              stroke={`var(--color-${key})`}
              strokeWidth={2}
              type="monotone"
              {...animation}
            />
          ))}
        </LineChart>
      )}
    </ChartContainer>
  );
}
