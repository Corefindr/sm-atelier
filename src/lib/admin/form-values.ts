import type { ProductFormValues } from "@/lib/admin/schema";
import type { Product } from "@/types/product";

export function emptyProductForm(category = ""): ProductFormValues {
  return {
    name: "",
    shortDescription: "",
    description: "",
    category,
    subcategory: "",
    price: 0,
    salePrice: null,
    images: [],
    sizes: [],
    colors: [],
    inventory: [],
    newArrival: false,
    featured: false,
    bestseller: false,
    published: false,
  };
}

export function productToForm(product: Product): ProductFormValues {
  return {
    name: product.name,
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    salePrice: product.salePrice,
    images: product.images.map((image) => ({ ...image })),
    sizes: [...product.sizes],
    colors: product.colors.map((color) => ({ ...color })),
    inventory: product.inventory.map((item) => ({ ...item })),
    newArrival: product.newArrival,
    featured: product.featured,
    bestseller: product.bestseller,
    published: product.published,
  };
}
