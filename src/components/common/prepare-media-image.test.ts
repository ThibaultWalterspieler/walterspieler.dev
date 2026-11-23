import { describe, expect, it } from "vitest";

import { prepareMediaImage } from "@/components/common/prepare-media-image";
import { Media } from "@payload-types";

const media = (overrides: Partial<Media>): Media => ({
  id: 1,
  alt: "A screenshot",
  url: "https://utfs.io/f/abc123",
  mimeType: "image/webp",
  width: 1200,
  height: 630,
  createdAt: "2026-11-23T00:00:00.000Z",
  updatedAt: "2026-11-23T00:00:00.000Z",
  ...overrides,
});

describe("prepareMediaImage", () => {
  it("serves an animated GIF straight from its file, skipping the optimizer", () => {
    const image = prepareMediaImage(media({ mimeType: "image/gif" }));

    expect(image?.unoptimized).toBe(true);
  });

  it("sends still images through the optimizer", () => {
    const image = prepareMediaImage(media({ mimeType: "image/webp" }));

    expect(image?.unoptimized).toBe(false);
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
