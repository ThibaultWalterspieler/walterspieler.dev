import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { describe, expect, it } from "vitest";

import { Media } from "@payload-types";

import MediaImage from "./media-image";

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

const render = (props: Parameters<typeof MediaImage>[0]) =>
  renderToStaticMarkup(createElement(MediaImage, props));

describe("MediaImage", () => {
  it("serves an animated GIF straight from its URL, skipping the optimizer", () => {
    const html = render({
      media: media({ mimeType: "image/gif", url: "https://utfs.io/f/gif1" }),
    });

    expect(html).toContain('src="https://utfs.io/f/gif1"');
    expect(html).not.toContain("/_next/image");
    // Still images keep going through the optimizer.
    expect(render({ media: media({}) })).toContain("/_next/image");
  });

  it("shows the stored blur placeholder while the image loads", () => {
    const html = render({
      media: media({ blurDataUrl: "data:image/png;base64,iVBORw0KGgo=" }),
    });

    expect(html).toContain("iVBORw0KGgo=");
  });

  it("loads lazily unless it is the page's preloaded image", () => {
    expect(render({ media: media({}) })).toContain('loading="lazy"');
    expect(render({ media: media({}), preload: true })).not.toContain(
      'loading="lazy"',
    );
  });
});
