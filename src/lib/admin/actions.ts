"use server";

import { revalidatePath } from "next/cache";

import {
  categoryFormSchema,
  productFormSchema,
  stockUpdateSchema,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/admin/schema";
import { searchProducts } from "@/lib/catalog";
import { catalogStore } from "@/lib/catalog-store";

export type ActionResult = {
  ok: boolean;
  message?: string;
  id?: string;
  fieldErrors?: FieldErrors;
};

function refreshShop() {
  revalidatePath("/", "layout");
  revalidatePath("/admin", "layout");
}

export async function searchCatalog(query: string) {
  return searchProducts(query);
}

export async function createProduct(input: unknown): Promise<ActionResult> {
  const parsed = productFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const product = catalogStore.createProduct(parsed.data);
  refreshShop();
  return { ok: true, id: product.id, message: "Product saved." };
}

export async function updateProduct(
  id: string,
  input: unknown,
): Promise<ActionResult> {
  const parsed = productFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const product = catalogStore.updateProduct(id, parsed.data);

  if (!product) {
    return { ok: false, message: "That product is no longer in the desk." };
  }

  refreshShop();
  return { ok: true, id: product.id, message: "Changes saved." };
}

export async function duplicateProduct(id: string): Promise<ActionResult> {
  const product = catalogStore.duplicateProduct(id);

  if (!product) {
    return { ok: false, message: "That product is no longer in the desk." };
  }

  refreshShop();
  return { ok: true, id: product.id };
}

export async function setProductPublished(
  id: string,
  published: boolean,
): Promise<ActionResult> {
  const product = catalogStore.setPublished(id, published);

  if (!product) {
    return { ok: false, message: "That product is no longer in the desk." };
  }

  refreshShop();
  return { ok: true, id: product.id };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  const removed = catalogStore.deleteProduct(id);

  if (!removed) {
    return { ok: false, message: "That product is already gone." };
  }

  refreshShop();
  return { ok: true };
}

export async function createCategory(input: unknown): Promise<ActionResult> {
  const parsed = categoryFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const subcategories = parsed.data.subcategories
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (subcategories.length === 0) {
    return {
      ok: false,
      fieldErrors: {
        subcategories: "Add at least one subcategory, separated by commas.",
      },
    };
  }

  catalogStore.createCategory(parsed.data.name, subcategories);
  refreshShop();
  return { ok: true, message: "Category added." };
}

export async function deleteCategory(slug: string): Promise<ActionResult> {
  const result = catalogStore.deleteCategory(slug);

  if (!result.ok) {
    return { ok: false, message: result.reason };
  }

  refreshShop();
  return { ok: true };
}

export async function updateStock(input: unknown): Promise<ActionResult> {
  const parsed = stockUpdateSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, fieldErrors: toFieldErrors(parsed.error) };
  }

  const saved = catalogStore.setStock(
    parsed.data.productId,
    parsed.data.size,
    parsed.data.colorId,
    parsed.data.quantity,
  );

  if (!saved) {
    return { ok: false, message: "That size and colour could not be updated." };
  }

  refreshShop();
  return { ok: true, message: "Stock updated." };
}
