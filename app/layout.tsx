import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display-fallback",
  display: "swap",
  preload: true,
});

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

const plusJakartaSans = localFont({
  src: [
    {
      path: "../public/fonts/PlusJakartaSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body-fallback",
  display: "swap",
});

const dmMono = localFont({
  src: [
    {
      path: "../public/fonts/DMMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-mono-fallback",
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
      className={`${clashDisplay.variable} ${spaceGrotesk.variable} ${plusJakartaSans.variable} ${dmMono.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="preload"
          href="/textures/earth-dark.jpg"
          as="image"
          type="image/jpeg"
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-bg text-ivory font-body">
        <JsonLd data={getOrganizationJsonLd()} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
