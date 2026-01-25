import { env } from "@/env";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  transpilePackages: ["@t3-oss/env-nextjs", "@t3-oss/env-core"],
  images: {
    remotePatterns: [
      new URL(`https://wsrv.nl/**`),
      new URL(`${env.NEXT_PUBLIC_BASE_URL}/**`),
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
    loader: 'custom',
  },
};

export default nextConfig;
