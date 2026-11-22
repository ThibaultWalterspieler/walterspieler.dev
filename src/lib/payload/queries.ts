import { cacheLife, cacheTag } from "next/cache";
import { getPayload } from "payload";

import { CMS_CACHE_TAG } from "@/lib/payload/cms-cache-tag";
import config from "@payload-config";

type PostCollection = "blogPosts" | "experiencePosts";

// Public pages change only through Revalidation (docs/adr/0001), so every
// read is kept until a CMS save expires CMS_CACHE_TAG.
const cacheUntilRevalidation = () => {
  cacheLife("max");
  cacheTag(CMS_CACHE_TAG);
};

const published = { _status: { equals: "published" } } as const;

export const getMe = async () => {
  "use cache";
  cacheUntilRevalidation();

  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "me" });
};

export const getMainMenu = async () => {
  "use cache";
  cacheUntilRevalidation();

  const payload = await getPayload({ config });
  return payload.findGlobal({ slug: "mainMenu" });
};

export const getPage = async (slug: string) => {
  "use cache";
  cacheUntilRevalidation();

  const payload = await getPayload({ config });
  const pages = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  return pages.docs[0] ?? null;
};

export const getPublishedPosts = async <T extends PostCollection>(
  collection: T,
) => {
  "use cache";
  cacheUntilRevalidation();

  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection,
    where: published,
    limit: 1000,
  });

  return posts.docs;
};

export const getPublishedPost = async <T extends PostCollection>(
  collection: T,
  slug: string,
) => {
  "use cache";
  cacheUntilRevalidation();

  const payload = await getPayload({ config });
  const posts = await payload.find({
    collection,
    where: { and: [published, { slug: { equals: slug } }] },
    limit: 1,
  });

  return posts.docs[0] ?? null;
};
