"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          preload={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 ? (
        <ul className="grid grid-cols-4 gap-3" aria-label={`${productName} images`}>
          {images.map((image, index) => (
            <li key={`${image.src}-${index}`}>
              <button
                type="button"
                aria-label={`Show image ${index + 1} of ${productName}`}
                aria-current={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative aspect-[3/4] w-full overflow-hidden bg-sand focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  index === activeIndex ? "ring-1 ring-ink" : "opacity-80 hover:opacity-100",
                )}
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
