import { withPayload } from "@payloadcms/next/withPayload";

import { MEDIA_WIDTHS } from "./src/lib/media-widths";
import { MEDIA_ORIGIN } from "./src/payload/media-storage";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    resolveAlias: {
      underscore: "lodash",
    },
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  images: {
    // The widths Media stores (docs/adr/0005), so every srcset entry of a Media
    // image from 640px up is a stored file. Next also lists `imageSizes` (384px
    // and under), which the loader answers with the 640px file.
    deviceSizes: [...MEDIA_WIDTHS],
    // One year: media files get a new name on every upload, so a URL's bytes never change.
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
      },
      {
        hostname: new URL(MEDIA_ORIGIN).hostname,
      },
      // Pages cached before the move to R2 still point at UploadThing.
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
        destination: "/99stud",
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
        destination: "/99stud",
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
