export interface ChartData {
  /** Series names, from the header row after the first column. */
  series: string[];
  rows: { x: string; values: (number | null)[] }[];
}

export type ParsedChartData =
  { ok: true; data: ChartData } | { ok: false; error: string };

/** The chart palette has five validated colours (`--color-chart-1` to 5). */
export const MAX_CHART_SERIES = 5;

/**
 * Reads a Chart block's data: a header row, then one row per x value. The
 * first column is the x-axis; every other column is a numeric series, where an
 * empty cell is a gap. Errors are worded for the editor who pasted the data.
 */
export function parseChartData(text: string): ParsedChartData {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  if (!header || lines.length === 0) {
    return fail("Add a header row and at least one row of values.");
  }

  // A spreadsheet copies its cells separated by tabs; typed data uses commas.
  const separator = header.includes("\t") ? "\t" : ",";
  const split = (line: string) =>
    line.split(separator).map((cell) => cell.trim());

  const columns = split(header);
  const series = columns.slice(1);
  if (series.length === 0) {
    return fail("Add at least one series column after the x-axis column.");
  }
  if (series.length > MAX_CHART_SERIES) {
    return fail(
      `A chart shows at most ${MAX_CHART_SERIES} series; this data has ${series.length}.`,
    );
  }

  const rows: ChartData["rows"] = [];
  for (const [index, line] of lines.entries()) {
    const rowNumber = index + 2;
    const [x, ...cells] = split(line);
    if (cells.length !== series.length) {
      return fail(
        `Row ${rowNumber} has ${cells.length + 1} cells; the header has ${columns.length}.`,
      );
    }

    const values: (number | null)[] = [];
    for (const [column, cell] of cells.entries()) {
      const value = cell === "" ? null : Number(cell);
      if (Number.isNaN(value)) {
        return fail(
          `Row ${rowNumber}, column "${series[column]}": "${cell}" is not a number.`,
        );
      }
      values.push(value);
    }
    rows.push({ x, values });
  }

  return { ok: true, data: { series, rows } };
}

function fail(error: string): ParsedChartData {
  return { ok: false, error };
}
