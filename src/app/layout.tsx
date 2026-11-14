import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SiteFrame } from "@/components/layout/site-frame";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { clerkEnabled } from "@/lib/clerk-config";
import { SITE_URL, COMPANY } from "@/lib/site";
import { OrganizationJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: COMPANY.legalName,
    template: `%s | ${COMPANY.legalName}`,
  },
  description: COMPANY.positioningStatement,
  applicationName: COMPANY.legalName,
  authors: [{ name: COMPANY.legalName }],
  creator: COMPANY.legalName,
  publisher: COMPANY.legalName,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    siteName: COMPANY.legalName,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-royal focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <OrganizationJsonLd />
        {clerkEnabled ? (
          <ClerkProvider
            appearance={clerkAppearance}
            signInUrl="/login"
            signUpUrl="/signup"
            signInFallbackRedirectUrl="/portal"
            signUpFallbackRedirectUrl="/portal"
            afterSignOutUrl="/"
          >
        <SiteFrame>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </SiteFrame>
          </ClerkProvider>
        ) : (
        <SiteFrame>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </SiteFrame>
        )}
      </body>
    </html>
  );
}
