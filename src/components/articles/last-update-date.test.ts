import { describe, expect, it } from "vitest";

import { getLastUpdateDate } from "@/components/articles/last-update-date";

const body = { root: { type: "root", children: [] } } as never;

const note = (kind: "update" | "correction", date: string) => ({
  blockType: "EditorNote" as const,
  kind,
  date,
  body,
});

const paragraph = { blockType: "Paragraph" as const, paragraph: body };

describe("getLastUpdateDate", () => {
  it("has no updated date when the article carries no editor's note", () => {
    expect(getLastUpdateDate([paragraph])).toBeUndefined();
    expect(getLastUpdateDate(null)).toBeUndefined();
  });

  it("takes the date of the most recent update, wherever it sits in the article", () => {
    expect(
      getLastUpdateDate([
        note("update", "2025-06-20T12:00:00.000Z"),
        paragraph,
        note("update", "2026-11-23T12:00:00.000Z"),
        note("update", "2026-01-05T12:00:00.000Z"),
      ]),
    ).toBe("2026-11-23T12:00:00.000Z");
  });

  it("ignores corrections: fixing a mistake does not make the article updated", () => {
    expect(
      getLastUpdateDate([
        note("update", "2026-11-23T12:00:00.000Z"),
        note("correction", "2026-12-01T12:00:00.000Z"),
      ]),
    ).toBe("2026-11-23T12:00:00.000Z");
    expect(
      getLastUpdateDate([note("correction", "2026-12-01T12:00:00.000Z")]),
    ).toBeUndefined();
  });
});
