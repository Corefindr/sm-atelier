import "server-only";

import { catalogStore } from "@/lib/catalog-store";
import type { Category } from "@/types/catalog";
import type { Product } from "@/types/product";

/**
 * Storefront catalog reads.
 *
 * These functions are the only place pages ask for products and categories.
 * They return mock data today. Replace each body with a Supabase query later
 * and keep the signatures the same.
 */

function publishedProducts() {
  return catalogStore.listProducts().filter((product) => product.published);
}

function byNewest(items: Product[]) {
  return [...items].sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  );
}

export async function getProducts(): Promise<Product[]> {
  return byNewest(publishedProducts());
}

export async function getNewArrivals(): Promise<Product[]> {
  return byNewest(
    publishedProducts().filter((product) => product.newArrival),
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return byNewest(publishedProducts().filter((product) => product.featured));
}

export async function getBestSellers(): Promise<Product[]> {
  return byNewest(publishedProducts().filter((product) => product.bestseller));
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const published = publishedProducts();

  if (!category || category === "all") {
    return byNewest(published);
  }

  return byNewest(
    published.filter((product) => product.category === category),
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = publishedProducts().find((item) => item.slug === slug);
  return product ?? null;
}

export async function getRelatedProducts(
  slug: string,
  limit = 4,
): Promise<Product[]> {
  const current = await getProductBySlug(slug);

  if (!current) {
    return [];
  }

  const sameCategory = publishedProducts().filter(
    (product) =>
      product.id !== current.id && product.category === current.category,
  );
  const sameSubcategory = sameCategory.filter(
    (product) => product.subcategory === current.subcategory,
  );
  const related = [
    ...sameSubcategory,
    ...sameCategory.filter(
      (product) => product.subcategory !== current.subcategory,
    ),
  ];

  return byNewest(related).slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const term = query.trim().toLowerCase();

  if (!term) {
    return [];
  }

  return byNewest(
    publishedProducts().filter((product) => {
      const haystack = [
        product.name,
        product.shortDescription,
        product.description,
        product.subcategory,
        product.category,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    }),
  );
}

export async function getCategories(): Promise<Category[]> {
  return catalogStore
    .listCategories()
    .filter((category) => category.slug !== "all");
}

export async function getCategory(slug: string): Promise<Category | null> {
  const category = catalogStore
    .listCategories()
    .find((item) => item.slug === slug && item.slug !== "all");

  return category ?? null;
}
