import type { Metadata } from "next";

import { WishlistView } from "@/components/wishlist/wishlist-view";
import { getProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Pieces saved from the SM Atelier edit.",
};

export default async function WishlistPage() {
  const products = await getProducts();

  return <WishlistView products={products} />;
}
