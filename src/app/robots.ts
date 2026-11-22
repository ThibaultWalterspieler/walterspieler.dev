import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: "*",
      disallow: ["/dist/"],
      allow: ["/"],
    },
  ],
});

export default robots;
