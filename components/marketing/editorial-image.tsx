import Image, { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

type EditorialImageProps = {
  src: StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function EditorialImage({ src, alt, className, imageClassName, priority = false }: EditorialImageProps) {
  return (
    <div className={cn("overflow-hidden bg-[#f0f0ef]", className)}>
      <Image
        src={src}
        alt={alt}
        sizes="(min-width: 1024px) 50vw, 100vw"
        preload={priority}
        loading="eager"
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </div>
  );
}
