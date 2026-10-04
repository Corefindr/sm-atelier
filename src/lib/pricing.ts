import type { Product } from "@/types/product";

export function isOnSale(product: Pick<Product, "price" | "salePrice">) {
  return product.salePrice != null && product.salePrice < product.price;
}

export function getCurrentPrice(product: Pick<Product, "price" | "salePrice">) {
  if (isOnSale(product) && product.salePrice != null) {
    return product.salePrice;
  }

  return product.price;
}
