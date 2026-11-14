import Image from "next/image";
import { cn } from "@/lib/classnames";
import { PHOTO_NOTE, type Photo } from "@/lib/photos";

/**
 * Photograph resting on the page — the only element in the system that
 * carries a shadow. Always captioned as illustrative.
 */
export function PhotoFigure({
  photo,
  className,
  aspect = "aspect-[16/9]",
  sizes = "(min-width: 1024px) 60rem, 100vw",
  priority = false,
  captionTone = "light",
}: {
  photo: Photo;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  captionTone?: "light" | "dark";
}) {
  return (
    <figure className={className}>
      <div className={cn("relative overflow-hidden rounded-2xl bg-coolgray shadow-photo", aspect)}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
      <figcaption
        className={cn(
          "mt-3 text-[13px] leading-snug",
          captionTone === "dark" ? "text-white/70" : "text-muted",
        )}
      >
        {PHOTO_NOTE}
      </figcaption>
    </figure>
  );
}
