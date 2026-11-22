import { afterEach, describe, expect, it, vi } from "vitest";

import { highlightCommands } from "./highlight-commands";

describe("highlightCommands", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("highlights every package manager's command", async () => {
    const highlighted = await highlightCommands(
      { npm: "npm i shiki", pnpm: "pnpm add shiki" },
      "shell",
      "one-dark-pro",
    );

    expect(Object.keys(highlighted)).toEqual(["npm", "pnpm"]);
    expect(highlighted.npm).toMatchObject({ command: "npm i shiki" });
    expect(highlighted.npm.html).toContain('class="shiki');
    expect(highlighted.pnpm.html).toContain("pnpm");
  });

  it("escapes the command text it highlights", async () => {
    const highlighted = await highlightCommands(
      { npm: "echo '<script>alert(1)</script>'" },
      "shell",
      "one-dark-pro",
    );

    expect(highlighted.npm.html).not.toContain("<script>");
    expect(highlighted.npm.html).toContain("&#x3C;script>");
  });

  it("leaves a command as plain text when its language is unknown", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    const highlighted = await highlightCommands(
      { npm: "npm i shiki" },
      "not-a-language",
      "one-dark-pro",
    );

    expect(highlighted).toEqual({
      npm: { command: "npm i shiki", html: null },
    });
  });
});
