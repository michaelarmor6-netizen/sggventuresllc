import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ["@prisma/client", "prisma"],
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/.prisma/client/**",
      "./node_modules/@prisma/client/**",
    ],
  },
  // M&A advisory is not offered; its old pages go to the services overview.
  // The short-lived /services/automation and /support pages map to the
  // closest current service area.
  async redirects() {
    const to = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });
    return [
      to("/services/mergers-acquisitions", "/services"),
      to("/services/mergers-acquisitions/:path*", "/services"),
      to("/services/automation", "/services/ai-automation"),
      to("/services/support", "/services"),
      // Account recovery and verification are handled inside Clerk's sign-in flow.
      to("/forgot-password", "/login"),
      to("/reset-password", "/login"),
      to("/verify-email", "/login"),
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
