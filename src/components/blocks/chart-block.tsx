import { FC } from "react";

import ChartOnView from "@/components/ui/chart-on-view";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseChartData } from "@/lib/chart-data";

import type { ChartKind } from "@/components/ui/data-chart";

type Props = {
  kind: ChartKind;
  title: string;
  data: string;
  source: string;
};

/**
 * The Chart block. The source line credits the numbers, as the press does;
 * the table carries them for screen readers and for readers without
 * JavaScript, who would otherwise see an empty box.
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
        <Table className="mt-2 text-xs">
          <TableHeader>
            <TableRow>
              <TableHead />
              {series.map((name, index) => (
                <TableHead className="text-right" key={index} scope="col">
                  {name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableHead className="text-foreground font-normal" scope="row">
                  {row.x}
                </TableHead>
                {row.values.map((value, index) => (
                  <TableCell
                    className="text-foreground text-right tabular-nums"
                    key={index}
                  >
                    {value?.toLocaleString("en-GB") ?? "–"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </details>
    </figure>
  );
};

export default ChartBlock;
