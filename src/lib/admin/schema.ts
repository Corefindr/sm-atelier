import { z } from "zod";

import { SIZE_OPTIONS } from "@/lib/stock";

const colorSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, "Name each colour."),
  hex: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Choose a colour."),
});

const inventorySchema = z.object({
  size: z.string().min(1),
  colorId: z.string().min(1),
  quantity: z
    .number({ invalid_type_error: "Enter a stock number." })
    .int("Stock must be a whole number.")
    .min(0, "Stock can't be negative."),
});

export const productFormSchema = z
  .object({
    name: z.string().trim().min(2, "Add a product name."),
    shortDescription: z
      .string()
      .trim()
      .min(10, "Add a short description of at least a sentence."),
    description: z
      .string()
      .trim()
      .min(20, "Add a fuller description so a customer knows the piece."),
    category: z.string().trim().min(1, "Choose a category."),
    subcategory: z
      .string()
      .trim()
      .min(2, "Add a subcategory, such as Day Dresses."),
    price: z
      .number({ invalid_type_error: "Enter the regular price." })
      .positive("Enter a regular price above zero."),
    salePrice: z
      .number({ invalid_type_error: "Enter a sale price, or leave it blank." })
      .positive("Sale price should be above zero.")
      .nullable(),
    images: z
      .array(
        z.object({
          src: z.string().min(1),
          alt: z.string(),
        }),
      )
      .min(1, "Add at least one photo."),
    sizes: z.array(z.string()).min(1, "Choose at least one size."),
    colors: z.array(colorSchema).min(1, "Add at least one colour."),
    inventory: z.array(inventorySchema),
    newArrival: z.boolean(),
    featured: z.boolean(),
    bestseller: z.boolean(),
    published: z.boolean(),
  })
  .superRefine((value, context) => {
    if (value.salePrice != null && value.salePrice >= value.price) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["salePrice"],
        message: "Sale price should be lower than the regular price.",
      });
    }

    for (const size of value.sizes) {
      if (!SIZE_OPTIONS.includes(size as (typeof SIZE_OPTIONS)[number])) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["sizes"],
          message: "Choose sizes from the list.",
        });
      }
    }

    for (const size of value.sizes) {
      for (const color of value.colors) {
        const row = value.inventory.find(
          (item) => item.size === size && item.colorId === color.id,
        );

        if (!row) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["inventory"],
            message: `Add stock for ${size} in ${color.name}.`,
          });
        }
      }
    }

  });

export type ProductFormValues = z.infer<typeof productFormSchema>;

export type FieldErrors = Partial<Record<string, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const flattened = error.flatten().fieldErrors;
  const errors: FieldErrors = {};

  for (const [key, messages] of Object.entries(flattened)) {
    const message = messages?.[0];
    if (message) {
      errors[key] = message;
    }
  }

  if (!errors.salePrice) {
    const saleIssue = error.issues.find((issue) => issue.path[0] === "salePrice");
    if (saleIssue) {
      errors.salePrice = saleIssue.message;
    }
  }

  if (!errors.inventory) {
    const stockIssue = error.issues.find((issue) => issue.path[0] === "inventory");
    if (stockIssue) {
      errors.inventory = stockIssue.message;
    }
  }

  return errors;
}

export const categoryFormSchema = z.object({
  name: z.string().trim().min(2, "Add a category name."),
  subcategories: z
    .string()
    .trim()
    .min(2, "Add at least one subcategory, separated by commas."),
});

export const stockUpdateSchema = z.object({
  productId: z.string().min(1),
  size: z.string().min(1),
  colorId: z.string().min(1),
  quantity: z
    .number({ invalid_type_error: "Enter a stock number." })
    .int("Stock must be a whole number.")
    .min(0, "Stock can't be negative."),
});
