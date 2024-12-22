import { paraglide } from "@inlang/paraglide-next/plugin";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default withPayload(
  paraglide({
    paraglide: {
      project: "./project.inlang",
      outdir: "./src/paraglide",
    },
    ...nextConfig,
  }),
);
