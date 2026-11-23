"use client";

import { FC } from "react";

import Image from "next/image";

import { prepareMediaImage } from "@/components/common/prepare-media-image";
import { Media } from "@payload-types";

type Props = {
  media: Media;
  className?: string;
  /** Only the page's Largest Contentful Paint image: one per page. */
  preload?: boolean;
};

// A client component: `<Image>` takes a `loader` function only from one, and
// the loader serves the stored widths (docs/adr/0005). `getImageProps` would
// take it on the server, but nothing would then clear the blur placeholder.
const MediaImage: FC<Props> = ({ media, className, preload = false }) => {
  const image = prepareMediaImage(media);

  if (!image) return null;

  const { alt, ...imageProps } = image;

  return (
    <Image
      {...imageProps}
      alt={alt}
      className={className}
      preload={preload}
      // Width of the content column beside the menus, which `.content` caps at
      // 768px; a Media image elsewhere needs its own.
      sizes="(min-width: 1280px) min(768px, calc(100vw - 657px)), (min-width: 1024px) calc(100vw - 609px), calc(100vw - 48px)"
    />
  );
};

export default MediaImage;
