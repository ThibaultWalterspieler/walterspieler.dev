import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  images: {
    // 1 day in seconds
    minimumCacheTTL: 60 * 60 * 24,
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
      },
      {
        hostname: "utfs.io",
      },
      {
        hostname: "api.uploadthing.com",
      },
      {
        hostname: "walterspieler.dev",
      },
    ],
  },
  redirects: async () => {
    return [
      // Old works routes to experiences
      {
        source: "/works/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/works",
        destination: "/experiences",
        permanent: true,
      },
      // French locale redirects
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/fr/blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/fr/experiences/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/fr/experiences",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/fr/works/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/fr/works",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/fr/99Stud",
        destination: "/99Stud",
        permanent: true,
      },
      {
        source: "/fr/open-source",
        destination: "/open-source",
        permanent: true,
      },
      {
        source: "/fr/legal/notice",
        destination: "/legal/notice",
        permanent: true,
      },
      // English locale redirects (clean up old en/ URLs)
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/blog/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/en/blog",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/en/experiences/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/en/experiences",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/en/works/:slug",
        destination: "/experiences/:slug",
        permanent: true,
      },
      {
        source: "/en/works",
        destination: "/experiences",
        permanent: true,
      },
      {
        source: "/en/99Stud",
        destination: "/99Stud",
        permanent: true,
      },
      {
        source: "/en/open-source",
        destination: "/open-source",
        permanent: true,
      },
      {
        source: "/en/legal/notice",
        destination: "/legal/notice",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
