import { Block } from "payload";

import { MAX_CHART_SERIES, parseChartData } from "@/lib/chart-data";

export const ChartBlock: Block = {
  slug: "Chart",
  fields: [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "line",
      options: [
        { label: "Line", value: "line" },
        { label: "Bar", value: "bar" },
      ],
    },
    { name: "title", type: "text", required: true, localized: true },
    {
      name: "data",
      type: "textarea",
      required: true,
      admin: {
        description: `Paste CSV or spreadsheet cells: a header row, then one row per x value. The first column is the x-axis; each other column is a numeric series (at most ${MAX_CHART_SERIES}). Leave a cell empty for a gap.`,
      },
      validate: (value: string | null | undefined) => {
        if (!value?.trim()) return "Paste the chart's data.";
        const parsed = parseChartData(value);
        return parsed.ok || parsed.error;
      },
    },
    {
      name: "source",
      type: "text",
      required: true,
      localized: true,
      admin: { description: 'Shown under the chart as "Source: …".' },
    },
  ],
};
