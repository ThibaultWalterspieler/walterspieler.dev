import { describe, expect, it } from "vitest";

import { mediaFileUrl } from "@/payload/media-storage";

describe("mediaFileUrl", () => {
  it("serves a file from the media domain under its filename", () => {
    expect(mediaFileUrl("walterspieler_1234-w1080.webp")).toBe(
      "https://media.walterspieler.dev/walterspieler_1234-w1080.webp",
    );
  });

  it("keeps an older filename with spaces in one srcset entry", () => {
    expect(mediaFileUrl("CleanShot at16 (1)-w640.webp")).toBe(
      "https://media.walterspieler.dev/CleanShot%20at16%20(1)-w640.webp",
    );
  });
});
