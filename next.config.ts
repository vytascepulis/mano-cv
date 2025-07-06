import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = withSentryConfig(
  {
    reactStrictMode: false,
    devIndicators: false,
  },
  { reactComponentAnnotation: { enabled: true } },
);

export default nextConfig;
