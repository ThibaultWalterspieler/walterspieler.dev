import { Media } from "@payload-types";

export type PreparedMediaImage = {
  alt: string;
  src: string;
  width: number;
  height: number;
  unoptimized: boolean;
  placeholder: "blur" | "empty";
  blurDataURL: string | undefined;
};

export const prepareMediaImage = (media: Media): PreparedMediaImage | null => {
  if (!media.url) return null;

  return {
    alt: media.alt,
    src: media.url,
    width: media.width ?? 0,
    height: media.height ?? 0,
    // The optimizer cannot resize an animated GIF: every width would be the full file.
    unoptimized: media.mimeType === "image/gif",
    placeholder: media.blurDataUrl ? "blur" : "empty",
    blurDataURL: media.blurDataUrl ?? undefined,
  };
};
