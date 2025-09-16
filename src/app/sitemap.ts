import { MetadataRoute } from "next";
import { getPayload } from "payload";

import config from "@payload-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

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
      url: "https://walterspieler.dev/99Stud",
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
  const blogPosts = await payload.find({
    collection: "blogPosts",
    limit: 1000,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  const blogPages = blogPosts.docs.map((post) => ({
    url: `https://walterspieler.dev/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic experience posts
  const experiencePosts = await payload.find({
    collection: "experiencePosts",
    limit: 1000,
    where: {
      _status: {
        equals: "published",
      },
    },
  });

  const experiencePages = experiencePosts.docs.map((post) => ({
    url: `https://walterspieler.dev/experiences/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...experiencePages];
}
