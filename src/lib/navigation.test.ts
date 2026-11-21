import { describe, expect, it } from "vitest";

import { isMenuPathActive } from "@/lib/navigation";

describe("isMenuPathActive", () => {
  it("marks the home link active on the home page only", () => {
    expect(isMenuPathActive("/", "/")).toBe(true);
    expect(isMenuPathActive("/blog", "/")).toBe(false);
  });

  it("keeps a section link active on the posts inside it", () => {
    expect(isMenuPathActive("/blog", "/blog")).toBe(true);
    expect(isMenuPathActive("/blog/my-first-post", "/blog")).toBe(true);
  });

  it("ignores a trailing slash", () => {
    expect(isMenuPathActive("/experiences/", "/experiences")).toBe(true);
  });

  it("does not mark another section active", () => {
    expect(isMenuPathActive("/experiences/freelance", "/blog")).toBe(false);
  });

  it("does not mark a section active from a page whose name only starts the same", () => {
    expect(isMenuPathActive("/blogroll", "/blog")).toBe(false);
  });

  it("never marks an external link active", () => {
    expect(isMenuPathActive("/blog", "/blog", { external: true })).toBe(false);
  });
});
