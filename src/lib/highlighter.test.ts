import { describe, expect, it } from "vitest";

import { highlightCode } from "@/lib/highlighter";

const text = (lines: { content: string }[][]) =>
  lines.map((line) => line.map((token) => token.content).join(""));

describe("highlightCode", () => {
  it("splits the code into lines of coloured tokens", async () => {
    const lines = await highlightCode(
      'const tool = "biome";\nexport default tool;\n',
      "typescript",
    );

    expect(text(lines!)).toEqual([
      'const tool = "biome";',
      "export default tool;",
    ]);
    expect(lines![0][0]).toMatchObject({
      content: "const",
      color: expect.stringMatching(/^#/),
    });
  });

  it("keeps blank lines, so a copied snippet keeps its spacing", async () => {
    const lines = await highlightCode("a\n\nb", "bash");

    expect(text(lines!)).toEqual(["a", "", "b"]);
  });

  it("highlights the JSON with comments of a biome.jsonc", async () => {
    const lines = await highlightCode('// root\n{ "root": true }', "jsonc");

    expect(text(lines!)).toEqual(["// root", '{ "root": true }']);
  });

  it("returns nothing for a language it doesn't offer, so the block shows plain text", async () => {
    expect(await highlightCode("x", "cobol")).toBeNull();
  });
});
