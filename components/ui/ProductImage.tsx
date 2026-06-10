import Image from "next/image";
import { PRODUCT_IMAGES, type ProductSlug } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  slug: ProductSlug;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function ProductImage({
  slug,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ProductImageProps) {
  const image = PRODUCT_IMAGES[slug];

  return (
    <div className={cn("relative overflow-hidden bg-surface", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        unoptimized
        className={cn(
          "h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105",
          imageClassName,
        )}
      />
    </div>
  );
}
