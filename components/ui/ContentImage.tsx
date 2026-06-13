import Image from "next/image";
import type { PageImage } from "@/lib/pageImages";
import { cn } from "@/lib/utils";

type ContentImageProps = {
  image: PageImage;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ContentImage({
  image,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ContentImageProps) {
  return (
    <div className={cn("editorial-photo relative overflow-hidden bg-surface", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "eager"}
        unoptimized
        className={cn("h-full w-full object-cover object-center", imageClassName)}
      />
    </div>
  );
}
