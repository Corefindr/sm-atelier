import type { Product } from "@/types/product";

export function getInventoryQuantity(
  product: Product,
  size: string,
  colorId: string,
) {
  const row = product.inventory.find(
    (item) => item.size === size && item.colorId === colorId,
  );

  return row?.quantity ?? 0;
}

export function getAvailableSizes(product: Product, colorId: string) {
  return product.sizes.filter(
    (size) => getInventoryQuantity(product, size, colorId) > 0,
  );
}
