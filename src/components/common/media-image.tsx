import { FC } from "react";

import Image from "next/image";

import { Media } from "@payload-types";

type Props = {
  media: Media;
  className?: string;
  /** Only the page's Largest Contentful Paint image: one per page. */
  preload?: boolean;
};

const MediaImage: FC<Props> = ({ media, className, preload = false }) => {
  if (!media.url) return null;

  return (
    <Image
      alt={media.alt}
      blurDataURL={media.blurDataUrl ?? undefined}
      className={className}
      height={media.height ?? 0}
      placeholder={media.blurDataUrl ? "blur" : "empty"}
      preload={preload}
      // Width of the content column beside the menus; a Media image elsewhere needs its own.
      sizes="(min-width: 1280px) calc(100vw - 657px), (min-width: 1024px) calc(100vw - 609px), calc(100vw - 48px)"
      src={media.url}
      // The optimizer cannot resize an animated GIF: every width would be the full file.
      unoptimized={media.mimeType === "image/gif"}
      width={media.width ?? 0}
    />
  );
};

export default MediaImage;
