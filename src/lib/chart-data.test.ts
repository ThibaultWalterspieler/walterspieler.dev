import { describe, expect, it } from "vitest";

import { parseChartData } from "@/lib/chart-data";

describe("parseChartData", () => {
  it("reads the first column as the x-axis and each other column as a series", () => {
    expect(
      parseChartData("week,eslint,biome\n2024-11,40.1,1.2\n2026-11,216,30"),
    ).toEqual({
      ok: true,
      data: {
        series: ["eslint", "biome"],
        rows: [
          { x: "2024-11", values: [40.1, 1.2] },
          { x: "2026-11", values: [216, 30] },
        ],
      },
    });
  });

  it("accepts rows pasted from a spreadsheet, which separates cells with tabs", () => {
    const parsed = parseChartData("week\toxlint\n2025-06\t2.5\n");

    expect(parsed).toEqual({
      ok: true,
      data: { series: ["oxlint"], rows: [{ x: "2025-06", values: [2.5] }] },
    });
  });

  it("leaves a gap where a cell is empty: the tool didn't exist yet", () => {
    const parsed = parseChartData(
      "week,eslint,oxfmt\n2024-11,40,\n2026-11,216,33",
    );

    expect(parsed.ok && parsed.data.rows[0].values).toEqual([40, null]);
  });

  it.each([
    ["", "Add a header row and at least one row of values."],
    ["week,eslint", "Add a header row and at least one row of values."],
    [
      "week\n2024-11",
      "Add at least one series column after the x-axis column.",
    ],
    [
      "week,eslint\n2024-11,40M",
      'Row 2, column "eslint": "40M" is not a number.',
    ],
    [
      "week,eslint\n2024-11,Infinity",
      'Row 2, column "eslint": "Infinity" is not a number.',
    ],
    ["week,eslint,biome\n2024-11,40", "Row 2 has 2 cells; the header has 3."],
    [
      "x,a,b,c,d,e,f\n1,1,1,1,1,1,1",
      "A chart shows at most 5 series; this data has 6.",
    ],
  ])("rejects %j with an error the editor can act on", (text, error) => {
    expect(parseChartData(text)).toEqual({ ok: false, error });
  });
});
