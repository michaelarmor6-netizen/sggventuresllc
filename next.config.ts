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
  // Routes retired from the previous site. Each maps to the closest current page;
  // routes with no relevant replacement are left to return 404.
  async redirects() {
    const to = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    });
    return [
      // Old two-level service pages collapse into the four service pages.
      to("/services/software-development/:path*", "/services/business-applications"),
      to("/services/business-applications/:service", "/services/business-applications"),
      to("/services/ai-automation/:path*", "/services/automation"),
      to("/services/digital-transformation/:path*", "/services/automation"),
      // Advisory areas that are no longer offered go to the overview.
      to("/services/business-consulting/:path*", "/services"),
      to("/services/management-consulting/:path*", "/services"),
      to("/services/mergers-acquisitions/:path*", "/services"),
      to("/services/it-consulting/:path*", "/services"),
      // Company pages folded into About.
      to("/about/leadership", "/about"),
      to("/about/governance", "/about"),
      to("/company-profile", "/about"),
      // Audience pages are now one homepage section.
      to("/industries", "/#who-we-help"),
      to("/industries/:path*", "/#who-we-help"),
      // Process questions are answered on the services overview.
      to("/faq", "/services#how-we-work"),
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
