import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export function EditorialImage({ src, alt, className, imageClassName, priority = false, sizes = "(min-width: 1024px) 50vw, 100vw" }: EditorialImageProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        sizes={sizes}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
