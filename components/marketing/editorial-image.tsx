import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: StaticImageData | string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialImage({ src, alt, className, imageClassName, priority = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: EditorialImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={typeof src === "string"}
        unoptimized={typeof src === "string" && src.startsWith("/api/media/")}
        sizes={sizes}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
