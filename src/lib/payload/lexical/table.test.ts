import { describe, expect, it } from "vitest";

import { splitTableHead } from "@/lib/payload/lexical/table";

const cell = (headerState: number) => ({
  type: "tablecell",
  version: 1,
  headerState,
});
const row = (...headerStates: number[]) => ({
  type: "tablerow",
  version: 1,
  children: headerStates.map(cell),
});

describe("splitTableHead", () => {
  it("makes a first row of header cells the table head", () => {
    const rows = [row(3, 1, 1), row(2, 0, 0), row(2, 0, 0)];

    expect(splitTableHead(rows)).toEqual({
      head: [rows[0]],
      body: [rows[1], rows[2]],
    });
  });

  it("keeps every row in the body when the first row isn't all headers", () => {
    const rows = [row(1, 0), row(0, 0)];

    expect(splitTableHead(rows)).toEqual({ head: [], body: rows });
  });

  it("keeps a lone header row in the body, so the table never renders empty", () => {
    const rows = [row(1, 1)];

    expect(splitTableHead(rows)).toEqual({ head: [], body: rows });
  });
});
