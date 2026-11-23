import { getStoredWidths, pickStoredWidth } from "@/lib/media-widths";
import { Media } from "@payload-types";

import type { ImageLoader } from "next/image";

export type PreparedMediaImage = {
  alt: string;
  src: string;
  width: number;
  height: number;
  unoptimized: boolean;
  /** Picks a stored width (docs/adr/0005); without one, the optimizer resizes. */
  loader: ImageLoader | undefined;
  placeholder: "blur" | "empty";
  blurDataURL: string | undefined;
};

export const prepareMediaImage = (media: Media): PreparedMediaImage | null => {
  if (!media.url) return null;

  const storedWidths = getStoredWidths(media);

  return {
    alt: media.alt,
    src: media.url,
    width: media.width ?? 0,
    height: media.height ?? 0,
    // The optimizer cannot resize an animated GIF: every width would be the full file.
    unoptimized: media.mimeType === "image/gif",
    loader: storedWidths
      ? ({ width }) => pickStoredWidth(storedWidths, width).url
      : undefined,
    placeholder: media.blurDataUrl ? "blur" : "empty",
    blurDataURL: media.blurDataUrl ?? undefined,
  };
};
