import "server-only";

import { categories as seedCategories } from "@/data/categories";
import { products as seedProducts } from "@/data/products";
import type { ProductFormValues } from "@/lib/admin/schema";
import { slugify } from "@/lib/slug";
import type { Category } from "@/types/catalog";
import type { Product } from "@/types/product";

type Memory = {
  products: Product[];
  categories: Category[];
};

const globalForCatalog = globalThis as typeof globalThis & {
  __smAtelierCatalog?: Memory;
};

function memory(): Memory {
  if (!globalForCatalog.__smAtelierCatalog) {
    globalForCatalog.__smAtelierCatalog = {
      products: structuredClone(seedProducts),
      categories: structuredClone(seedCategories),
    };
  }

  return globalForCatalog.__smAtelierCatalog;
}

function uniqueSlug(base: string, ignoreId?: string) {
  let slug = base || "piece";
  let count = 2;

  const taken = (value: string) =>
    memory().products.some(
      (product) => product.slug === value && product.id !== ignoreId,
    );

  while (taken(slug)) {
    slug = `${base}-${count}`;
    count += 1;
  }

  return slug;
}

function uniqueCategorySlug(base: string) {
  let slug = base || "category";
  let count = 2;

  const taken = (value: string) =>
    memory().categories.some((category) => category.slug === value);

  while (taken(slug)) {
    slug = `${base}-${count}`;
    count += 1;
  }

  return slug;
}

function fromForm(input: ProductFormValues, current?: Product): Product {
  return {
    id: current?.id ?? `prd_${crypto.randomUUID().slice(0, 8)}`,
    slug: current?.slug ?? uniqueSlug(slugify(input.name)),
    name: input.name,
    shortDescription: input.shortDescription,
    description: input.description,
    category: input.category,
    subcategory: input.subcategory,
    price: input.price,
    salePrice: input.salePrice,
    images: input.images.map((image) => ({
      src: image.src,
      alt: image.alt.trim() || input.name,
    })),
    sizes: input.sizes,
    colors: input.colors,
    inventory: input.inventory,
    featured: input.featured,
    newArrival: input.newArrival,
    bestseller: input.bestseller,
    published: input.published,
    createdAt: current?.createdAt ?? new Date().toISOString(),
  };
}

export const catalogStore = {
  listProducts(): Product[] {
    return structuredClone(memory().products);
  },

  listCategories(): Category[] {
    return structuredClone(memory().categories);
  },

  getProduct(id: string): Product | null {
    const product = memory().products.find((item) => item.id === id);
    return product ? structuredClone(product) : null;
  },

  createProduct(input: ProductFormValues): Product {
    const product = fromForm(input);
    memory().products.unshift(product);
    return structuredClone(product);
  },

  updateProduct(id: string, input: ProductFormValues): Product | null {
    const products = memory().products;
    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    const next = fromForm(input, products[index]);
    products[index] = next;
    return structuredClone(next);
  },

  duplicateProduct(id: string): Product | null {
    const current = memory().products.find((item) => item.id === id);

    if (!current) {
      return null;
    }

    const copy = structuredClone(current);
    const base = slugify(`${current.slug}-copy`);
    copy.id = `prd_${crypto.randomUUID().slice(0, 8)}`;
    copy.slug = uniqueSlug(base);
    copy.name = `${current.name} (Copy)`;
    copy.published = false;
    copy.createdAt = new Date().toISOString();
    memory().products.unshift(copy);
    return structuredClone(copy);
  },

  setPublished(id: string, published: boolean): Product | null {
    const product = memory().products.find((item) => item.id === id);

    if (!product) {
      return null;
    }

    product.published = published;
    return structuredClone(product);
  },

  deleteProduct(id: string): boolean {
    const products = memory().products;
    const index = products.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    products.splice(index, 1);
    return true;
  },

  createCategory(name: string, subcategories: string[]): Category | null {
    const slug = uniqueCategorySlug(slugify(name));
    const category: Category = {
      slug,
      name,
      href: `/shop/${slug}`,
      image: "/images/cat-all.jpg",
      imageAlt: name,
      subcategories,
    };
    memory().categories.push(category);
    return structuredClone(category);
  },

  deleteCategory(slug: string): { ok: true } | { ok: false; reason: string } {
    if (slug === "all") {
      return { ok: false, reason: "Shop All stays on the homepage." };
    }

    const inUse = memory().products.some((product) => product.category === slug);

    if (inUse) {
      return {
        ok: false,
        reason: "Move or delete the pieces in this category first.",
      };
    }

    const categories = memory().categories;
    const index = categories.findIndex((category) => category.slug === slug);

    if (index === -1) {
      return { ok: false, reason: "That category is already gone." };
    }

    categories.splice(index, 1);
    return { ok: true };
  },

  setStock(
    productId: string,
    size: string,
    colorId: string,
    quantity: number,
  ): boolean {
    const product = memory().products.find((item) => item.id === productId);
    const row = product?.inventory.find(
      (item) => item.size === size && item.colorId === colorId,
    );

    if (!row) {
      return false;
    }

    row.quantity = quantity;
    return true;
  },
};
