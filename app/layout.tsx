import type { Metadata } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/constants";
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

const siteTitle =
  "CV. Kaemba Buntusu Indonesia — Agricultural Commodity Exporter";
const siteDescription =
  "Premium agricultural commodity exports from South Sulawesi, Indonesia. Coconut, Copra, Cloves, Pepper. Fully licensed, export-grade, direct sourcing.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "indonesian commodity exporter",
    "copra exporter",
    "cloves exporter",
    "coconut exporter",
    "pepper exporter",
    "makassar export",
    "south sulawesi agriculture",
  ],
  openGraph: {
    title: "CV. Kaemba Buntusu Indonesia",
    description:
      "Agricultural commodity exports from South Sulawesi. Direct sourcing, export-grade quality.",
    url: SITE_URL,
    siteName: "CV. Kaemba Buntusu Indonesia",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CV. Kaemba Buntusu Indonesia",
    description:
      "Agricultural commodity exports from South Sulawesi. Direct sourcing, export-grade quality.",
    images: ["/og-image.jpg"],
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
      <body className="flex min-h-dvh flex-col bg-bg text-ivory font-body">
        {children}
      </body>
    </html>
  );
}
