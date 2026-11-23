import { FC } from "react";

import ChartOnView from "@/components/ui/chart-on-view";
import { parseChartData } from "@/lib/chart-data";

import type { ChartKind } from "@/components/ui/data-chart";

type Props = {
  kind: ChartKind;
  title: string;
  data: string;
  source: string;
};

/**
 * The Chart block: a titled chart with its source line, like a newspaper
 * figure, and the same numbers as a table for screen readers and readers
 * without JavaScript.
 */
const ChartBlock: FC<Props> = ({ kind, title, data, source }) => {
  const parsed = parseChartData(data);
  // The admin refuses data that doesn't parse; this guards older or seeded rows.
  if (!parsed.ok) return null;
  const { series, rows } = parsed.data;

  return (
    <figure className="bg-surface border-border my-6 rounded-lg border p-4">
      <figcaption className="text-heading mb-4 text-sm font-semibold">
        {title}
      </figcaption>
      <ChartOnView data={parsed.data} kind={kind} />
      <p className="text-muted mt-3 text-xs">Source: {source}</p>
      <details className="text-muted mt-2 text-xs">
        <summary className="hover:text-heading cursor-pointer">
          Show the data
        </summary>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <td className="border-border border px-2 py-1" />
                {series.map((name, index) => (
                  <th
                    className="border-border text-heading border px-2 py-1 text-right"
                    key={index}
                    scope="col"
                  >
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <th
                    className="border-border border px-2 py-1 text-left font-normal"
                    scope="row"
                  >
                    {row.x}
                  </th>
                  {row.values.map((value, index) => (
                    <td
                      className="border-border border px-2 py-1 text-right tabular-nums"
                      key={index}
                    >
                      {value?.toLocaleString("en-GB") ?? "–"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
};

export default ChartBlock;
