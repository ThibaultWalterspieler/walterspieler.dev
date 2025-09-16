import { Metadata } from "next";
import { getPayload } from "payload";

import config from "@payload-config";
import { BlogPost, ExperiencePost, Page } from "@payload-types";

import { BASE_URL } from "../../../next.constants.mjs";

const getMe = async () => {
  const payload = await getPayload({
    config,
  });
  return payload.findGlobal({ slug: "me" });
};

const getMetadata = async (
  pageMeta: Page["meta"] | ExperiencePost["meta"] | BlogPost["meta"],
): Promise<Metadata> => {
  const me = await getMe();

  let image;

  if (typeof pageMeta?.image !== "number" && pageMeta && pageMeta?.image) {
    image = pageMeta.image;
  }

  return {
    title: pageMeta?.title || me?.fullName || "Thibault Walterspieler",
    description: pageMeta?.description || "Portfolio of Thibault Walterspieler",
    metadataBase: new URL(BASE_URL),
    creator: me?.fullName || "Thibault Walterspieler",
    publisher: me?.fullName || "Thibault Walterspieler",
    icons: [
      {
        rel: "icon",
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    twitter: {
      card: "summary_large_image",
      title: pageMeta?.title || "",
      description: pageMeta?.description || "",
      images: {
        url: image?.url || `/images/og/main_en-gb.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
    openGraph: {
      type: "website",
      title: pageMeta?.title || "",
      siteName: "Portfolio of Thibault Walterspieler",
      description: pageMeta?.description || "",
      locale: "en",
      url: "/",
      images: {
        url: image?.url || `/images/og/main_en-gb.png`,
        alt: image?.alt || "",
        type: image?.mimeType || "image/png",
      },
    },
  };
};

export default getMetadata;
