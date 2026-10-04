"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

import { ColorSwatches } from "@/components/product/color-swatches";
import { ProductPrice } from "@/components/product/product-price";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { has, toggle } = useWishlist();
  const saved = has(product.slug);
  const image = product.images[0];

  return (
    <article className="group">
      <div className="relative aspect-[3/4] overflow-hidden bg-sand">
        <Link href={`/product/${product.slug}`} className="absolute inset-0">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
          <span className="sr-only">{product.name}</span>
        </Link>
        {product.newArrival ? (
          <span className="pointer-events-none absolute top-3 left-3 bg-ivory/95 px-2.5 py-1 text-[10px] tracking-[0.18em] text-ink uppercase">
            New
          </span>
        ) : null}
        <button
          type="button"
          aria-pressed={saved}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          onClick={() => toggle(product.slug)}
          className="absolute top-3 right-3 flex size-9 items-center justify-center bg-ivory/90 text-ink transition-colors hover:bg-ivory focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Heart
            strokeWidth={1.5}
            className={cn("size-4", saved && "fill-ink")}
          />
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="font-serif text-xl leading-tight font-medium text-ink">
          <Link
            href={`/product/${product.slug}`}
            className="transition-colors hover:text-taupe"
          >
            {product.name}
          </Link>
        </h3>
        <ProductPrice
          price={product.price}
          salePrice={product.salePrice}
          className="text-sm tracking-wide text-taupe"
        />
        <ColorSwatches colors={product.colors} productName={product.name} />
      </div>
    </article>
  );
}
