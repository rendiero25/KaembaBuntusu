import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const clashDisplay = localFont({
  src: [
    {
      path: "../public/fonts/SpaceGrotesk-SemiBold.woff2",
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

export const metadata: Metadata = {
  title: "CV. Kaemba Buntusu Indonesia — Agricultural Commodity Exporter",
  description:
    "Premium agricultural commodity exports from South Sulawesi, Indonesia. Coconut, Copra, Cloves, Pepper.",
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
      <body className="min-h-full flex flex-col bg-bg text-ivory font-body">
        {children}
      </body>
    </html>
  );
}
