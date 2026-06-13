import { cn } from "@/lib/utils";

type PageHeaderProps = {
  label?: string;
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({
  label,
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "home-tone-gold border-b border-border bg-surface/40 px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-16",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">
        {label ? (
          <p
            data-reveal
            className="text-label text-gold"
          >
            {label}
          </p>
        ) : null}
        <h1
          data-reveal
          className={cn(
            "font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-ivory",
            label && "mt-4",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            data-reveal
            className="mt-6 max-w-3xl text-body leading-relaxed text-sage"
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
