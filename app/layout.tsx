import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import {
  getOrganizationJsonLd,
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_TITLE,
} from "@/lib/seo";
import "./globals.css";

const spaceGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/SpaceGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SpaceGrotesk-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-heading-fallback",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  applicationName: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Agricultural commodity exports from South Sulawesi. Direct sourcing, export-grade quality.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "Agricultural commodity exports from South Sulawesi. Direct sourcing, export-grade quality.",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${outfit.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
        <link
          rel="preload"
          href="/images/hero.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-ivory font-body">
        <JsonLd data={getOrganizationJsonLd()} />
        <SiteProviders>{children}</SiteProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
