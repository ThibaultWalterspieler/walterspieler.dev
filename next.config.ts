import { withPayload } from "@payloadcms/next/withPayload";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        source: "/fr-fr/:path*",
        destination: "/fr/:path*",
        permanent: true,
      },
      {
        source: "/fr-fr",
        destination: "/fr",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
