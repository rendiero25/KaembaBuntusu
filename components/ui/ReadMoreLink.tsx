import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ReadMoreLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function ReadMoreLink({ href, children, className }: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-label text-gold transition-colors hover:text-ivory",
        className,
      )}
    >
      {children}
      <ArrowRight
        className="size-3.5 transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.5}
        aria-hidden
      />
    </Link>
  );
}
