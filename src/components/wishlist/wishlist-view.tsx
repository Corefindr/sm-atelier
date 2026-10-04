"use client";

import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import type { Product } from "@/types/product";

type WishlistViewProps = {
  products: Product[];
};

export function WishlistView({ products }: WishlistViewProps) {
  const { ids } = useWishlist();
  const saved = products.filter((product) => ids.includes(product.slug));

  if (saved.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <h1 className="font-serif text-5xl font-medium text-ink">Wishlist</h1>
        <p className="mt-4 text-base leading-7 text-taupe">
          Pieces you save will gather here. The list stays on this device for
          now.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex h-12 items-center bg-espresso px-8 text-[11px] tracking-[0.22em] text-ivory uppercase"
        >
          Shop the edit
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10">
      <h1 className="font-serif text-5xl font-medium text-ink">Wishlist</h1>
      <p className="mt-3 text-taupe">{saved.length} saved</p>
      <div className="mt-10">
        <ProductGrid products={saved} />
      </div>
    </div>
  );
}
