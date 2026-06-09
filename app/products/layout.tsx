import { FloatingWA } from "@/components/ui/FloatingWA";
import { Footer } from "@/components/ui/Footer";
import { NavBar } from "@/components/ui/NavBar";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:border focus:border-gold focus:bg-surface focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <NavBar />
      <main id="main-content" className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
