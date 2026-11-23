import { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";

import { CMS_CACHE_TAG } from "@/lib/payload/cms-cache-tag";
import { getPublishedPosts } from "@/lib/payload/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Cached with the pages: `new Date()` is the time of the last Revalidation.
  "use cache";
  cacheLife("max");
  cacheTag(CMS_CACHE_TAG);

  // Static pages
  const staticPages = [
    {
      url: "https://walterspieler.dev",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: "https://walterspieler.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: "https://walterspieler.dev/experiences",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: "https://walterspieler.dev/99stud",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://walterspieler.dev/open-source",
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: "https://walterspieler.dev/legal/notice",
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic blog posts
  const blogPosts = await getPublishedPosts("blogPosts");

  const blogPages = blogPosts.map((post) => ({
    url: `https://walterspieler.dev/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic experience posts
  const experiencePosts = await getPublishedPosts("experiencePosts");

  const experiencePages = experiencePosts.map((post) => ({
    url: `https://walterspieler.dev/experiences/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...experiencePages];
}
