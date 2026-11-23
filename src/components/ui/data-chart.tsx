"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Text,
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
import type { TextProps } from "recharts";

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

type TickProps = TextProps & {
  payload?: { value: string };
  visibleTicksCount?: number;
};

/**
 * A bar chart labels every bar: a label wraps to its bar's share of the axis
 * instead of Recharts hiding it when it would touch its neighbour.
 */
function WrappedTick({
  payload,
  visibleTicksCount = 1,
  width = 0,
  x,
  y,
  textAnchor,
  fill,
}: TickProps) {
  return (
    <Text
      fill={fill}
      maxLines={4}
      // Recharts measures words to wrap them; this is the size ChartContainer
      // draws tick labels at (text-xs), not the page's 16px.
      style={{ fontSize: 12 }}
      textAnchor={textAnchor}
      verticalAnchor="start"
      width={Number(width) / visibleTicksCount - 4}
      x={x}
      y={y}
    >
      {payload?.value}
    </Text>
  );
}

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
        tickLine={false}
        tickMargin={8}
        {...(kind === "bar"
          ? { height: 60, interval: 0, tick: <WrappedTick /> }
          : { minTickGap: 24 })}
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
