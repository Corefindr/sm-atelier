import type { Product } from "@/types/product";

export const LOW_STOCK_AT = 5;

export const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function totalStock(product: Pick<Product, "inventory">) {
  return product.inventory.reduce((sum, item) => sum + item.quantity, 0);
}

export function isLowStock(product: Pick<Product, "inventory">) {
  return totalStock(product) <= LOW_STOCK_AT;
}
