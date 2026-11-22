import sharp from "sharp";
import { describe, expect, it } from "vitest";

import { generateBlurDataURL } from "./blur-data-url";

describe("generateBlurDataURL", () => {
  it("turns an uploaded image into a tiny inline placeholder", async () => {
    const photo = await sharp({
      create: { width: 1200, height: 800, channels: 3, background: "#29cca4" },
    })
      .jpeg()
      .toBuffer();

    const placeholder = await generateBlurDataURL(photo);

    expect(placeholder).toMatch(/^data:image\/png;base64,/);
    // A few hundred bytes, small enough to inline in every page's HTML.
    expect(placeholder.length).toBeLessThan(2000);
  });
});
