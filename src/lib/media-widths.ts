import type { Media } from "@payload-types";

/**
 * The widths every uploaded image is also stored at, and so the widths a page
 * offers the browser (docs/adr/0005). Each one is a file on UploadThing from
 * the moment the image is saved: no visitor ever waits on a resize.
 */
export const MEDIA_WIDTHS = [640, 1080, 1600] as const;

type MediaWidth = (typeof MEDIA_WIDTHS)[number];

/** The name of a width's image size in the Media collection. */
export const mediaSizeName = (width: MediaWidth) => `w${width}` as const;

/** One stored width of an image, and the URL of its file. */
export type StoredWidth = { width: MediaWidth; url: string };

/**
 * Whether pages serve a file at its stored widths. GIFs are served as
 * uploaded: resizing would freeze the animation or barely shrink the file.
 * SVGs scale by themselves.
 */
export const isServedAtStoredWidths = (mimeType: string | null | undefined) =>
  Boolean(
    mimeType?.startsWith("image/") &&
    mimeType !== "image/gif" &&
    mimeType !== "image/svg+xml",
  );

/**
 * An image's stored widths, narrowest first, or null when pages don't serve
 * them: a GIF or SVG, or an image missing any width (uploaded before the
 * widths existed, until the backfill).
 */
export const getStoredWidths = (media: Media): StoredWidth[] | null => {
  if (!isServedAtStoredWidths(media.mimeType)) return null;

  const widths = MEDIA_WIDTHS.map((width) => ({
    width,
    url: media.sizes?.[mediaSizeName(width)]?.url,
  }));

  return widths.every((stored): stored is StoredWidth => Boolean(stored.url))
    ? widths
    : null;
};

/**
 * The stored width a browser asking for `width` pixels gets: the narrowest
 * that covers it, or the widest when none does.
 */
export const pickStoredWidth = (
  widths: StoredWidth[],
  width: number,
): StoredWidth =>
  widths.find((stored) => stored.width >= width) ?? widths[widths.length - 1];
