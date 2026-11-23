import { describe, expect, it } from "vitest";

import {
  getStoredWidths,
  isServedAtStoredWidths,
  pickStoredWidth,
} from "@/lib/media-widths";
import { Media } from "@payload-types";

const media = (overrides: Partial<Media>): Media => ({
  id: 1,
  alt: "A screenshot",
  url: "https://utfs.io/f/original",
  mimeType: "image/png",
  width: 1920,
  height: 1080,
  createdAt: "2026-11-23T00:00:00.000Z",
  updatedAt: "2026-11-23T00:00:00.000Z",
  ...overrides,
});

const sizes = {
  w640: { url: "https://utfs.io/f/w640" },
  w1080: { url: "https://utfs.io/f/w1080" },
  w1600: { url: "https://utfs.io/f/w1600" },
};

describe("isServedAtStoredWidths", () => {
  it("serves still images at their stored widths", () => {
    expect(isServedAtStoredWidths("image/png")).toBe(true);
    expect(isServedAtStoredWidths("image/webp")).toBe(true);
  });

  it("serves GIFs, SVGs and non-images as uploaded", () => {
    expect(isServedAtStoredWidths("image/gif")).toBe(false);
    expect(isServedAtStoredWidths("image/svg+xml")).toBe(false);
    expect(isServedAtStoredWidths("application/pdf")).toBe(false);
    expect(isServedAtStoredWidths(null)).toBe(false);
  });
});

describe("getStoredWidths", () => {
  it("lists an image's stored widths, narrowest first", () => {
    expect(getStoredWidths(media({ sizes }))).toEqual([
      { width: 640, url: "https://utfs.io/f/w640" },
      { width: 1080, url: "https://utfs.io/f/w1080" },
      { width: 1600, url: "https://utfs.io/f/w1600" },
    ]);
  });

  it("has none for an image missing any width, until the backfill", () => {
    expect(getStoredWidths(media({ sizes: { w640: sizes.w640 } }))).toBe(
      null,
    );
    expect(getStoredWidths(media({}))).toBe(null);
  });

  it("has none for a GIF, even one Payload made widths for", () => {
    expect(getStoredWidths(media({ mimeType: "image/gif", sizes }))).toBe(
      null,
    );
  });
});

describe("pickStoredWidth", () => {
  const stored = getStoredWidths(media({ sizes }))!;

  it("gives the narrowest stored width that covers the request", () => {
    expect(pickStoredWidth(stored, 640).width).toBe(640);
    expect(pickStoredWidth(stored, 641).width).toBe(1080);
    expect(pickStoredWidth(stored, 1600).width).toBe(1600);
  });

  it("gives the widest stored width for anything wider", () => {
    expect(pickStoredWidth(stored, 3840).width).toBe(1600);
  });
});
