import { describe, expect, it } from "vitest";

import { prepareMediaImage } from "@/components/common/prepare-media-image";
import { Media } from "@payload-types";

const media = (overrides: Partial<Media>): Media => ({
  id: 1,
  alt: "A screenshot",
  url: "https://media.walterspieler.dev/abc123",
  mimeType: "image/webp",
  width: 1200,
  height: 630,
  createdAt: "2026-11-23T00:00:00.000Z",
  updatedAt: "2026-11-23T00:00:00.000Z",
  ...overrides,
});

const storedWidths = {
  w640: { url: "https://media.walterspieler.dev/w640" },
  w1080: { url: "https://media.walterspieler.dev/w1080" },
  w1600: { url: "https://media.walterspieler.dev/w1600" },
};

describe("prepareMediaImage", () => {
  it("serves an animated GIF straight from its file, skipping the optimizer", () => {
    const image = prepareMediaImage(
      media({ mimeType: "image/gif", sizes: storedWidths }),
    );

    expect(image?.unoptimized).toBe(true);
    expect(image?.loader).toBeUndefined();
  });

  it("serves a still image from its stored widths, skipping the optimizer", () => {
    const image = prepareMediaImage(media({ sizes: storedWidths }));

    expect(image?.unoptimized).toBe(false);
    expect(image?.loader?.({ src: image.src, width: 750 })).toBe(
      "https://media.walterspieler.dev/w1080",
    );
  });

  it("sends an image through the optimizer until every width is stored", () => {
    const partial = prepareMediaImage(
      media({ sizes: { w640: storedWidths.w640 } }),
    );
    const none = prepareMediaImage(media({}));

    expect(partial?.unoptimized).toBe(false);
    expect(partial?.loader).toBeUndefined();
    expect(none?.loader).toBeUndefined();
  });

  it("shows the stored blur placeholder while the image loads", () => {
    const image = prepareMediaImage(
      media({ blurDataUrl: "data:image/png;base64,iVBORw0KGgo=" }),
    );

    expect(image?.placeholder).toBe("blur");
    expect(image?.blurDataURL).toBe("data:image/png;base64,iVBORw0KGgo=");
  });

  it("shows no placeholder for an image uploaded without one", () => {
    const image = prepareMediaImage(media({ blurDataUrl: null }));

    expect(image?.placeholder).toBe("empty");
    expect(image?.blurDataURL).toBeUndefined();
  });

  it("shows nothing for a media document without a file", () => {
    expect(prepareMediaImage(media({ url: null }))).toBeNull();
  });
});
