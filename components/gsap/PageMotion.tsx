"use client";

import { useScrollReveal } from "@/components/gsap/useScrollReveal";
import { cn } from "@/lib/utils";

type PageMotionProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
};

export function PageMotion({
  children,
  className,
  as: Tag = "article",
}: PageMotionProps) {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  );
}
