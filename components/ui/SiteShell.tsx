import { FloatingWA } from "@/components/ui/FloatingWA";
import { Footer } from "@/components/ui/Footer";
import { NavBar } from "@/components/ui/NavBar";

type SiteShellProps = {
  children: React.ReactNode;
  mainId?: string;
};

export function SiteShell({ children, mainId = "main-content" }: SiteShellProps) {
  return (
    <>
      <NavBar />
      <main id={mainId} className="flex flex-1 flex-col">
        {children}
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
