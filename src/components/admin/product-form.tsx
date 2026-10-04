"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { AdminSection } from "@/components/admin/admin-section";
import { Field } from "@/components/admin/field";
import { ImagePicker } from "@/components/admin/image-picker";
import { VariantFields, syncInventory } from "@/components/admin/variant-fields";
import { Button } from "@/components/ui/button";
import { createProduct, updateProduct } from "@/lib/admin/actions";
import { emptyProductForm, productToForm } from "@/lib/admin/form-values";
import {
  productFormSchema,
  toFieldErrors,
  type FieldErrors,
  type ProductFormValues,
} from "@/lib/admin/schema";
import type { Product } from "@/types/product";

type CategoryOption = {
  slug: string;
  name: string;
  subcategories: string[];
};

const controlClass =
  "w-full border border-input bg-ivory px-3 text-sm text-ink outline-none focus-visible:border-ring";

export function ProductForm({
  mode,
  product,
  categories,
  notice,
}: {
  mode: "create" | "edit";
  product?: Product;
  categories: CategoryOption[];
  notice?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [values, setValues] = useState<ProductFormValues>(() =>
    product ? productToForm(product) : emptyProductForm(categories[0]?.slug ?? ""),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState(notice === "saved" ? "Saved." : "");

  const selectedCategory = categories.find((category) => category.slug === values.category);

  function patch(partial: Partial<ProductFormValues>) {
    setValues((current) => ({ ...current, ...partial }));
  }

  function submit() {
    const payload: ProductFormValues = {
      ...values,
      inventory: syncInventory(values.sizes, values.colors, values.inventory),
    };
    const parsed = productFormSchema.safeParse(payload);

    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setMessage("Please check the fields marked below.");
      return;
    }

    setErrors({});
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createProduct(parsed.data)
          : await updateProduct(product?.id ?? "", parsed.data);

      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setMessage(result.message ?? "The product could not be saved.");
        return;
      }

      if (mode === "create" && result.id) {
        router.push(`/admin/products/${result.id}/edit?notice=saved`);
        router.refresh();
        return;
      }

      setMessage(result.message ?? "Changes saved.");
      router.refresh();
    });
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            Object.keys(errors).length > 0
              ? "bg-destructive/10 text-destructive"
              : "bg-sand text-ink"
          }`}
          role="status"
        >
          {message}
        </p>
      ) : null}

      <AdminSection
        title="Basic information"
        description="This is what customers read on the product page."
      >
        <Field
          label="Product name"
          htmlFor="product-name"
          hint="Use the name you want on the shop, such as Sand Coat Dress."
          error={errors.name}
        >
          <input
            id="product-name"
            value={values.name}
            onChange={(event) => patch({ name: event.target.value })}
            className={`${controlClass} h-11`}
          />
        </Field>
        <Field
          label="Short description"
          htmlFor="short-description"
          hint="One or two sentences. This sits under the name."
          error={errors.shortDescription}
        >
          <textarea
            id="short-description"
            rows={3}
            value={values.shortDescription}
            onChange={(event) => patch({ shortDescription: event.target.value })}
            className={`${controlClass} py-3`}
          />
        </Field>
        <Field
          label="Full description"
          htmlFor="full-description"
          hint="Tell the customer how it looks, how it feels, and how to wear it."
          error={errors.description}
        >
          <textarea
            id="full-description"
            rows={6}
            value={values.description}
            onChange={(event) => patch({ description: event.target.value })}
            className={`${controlClass} py-3`}
          />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" htmlFor="category" error={errors.category}>
            <select
              id="category"
              value={values.category}
              onChange={(event) => patch({ category: event.target.value })}
              className={`${controlClass} h-11`}
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Subcategory"
            htmlFor="subcategory"
            hint="A smaller group inside the category, such as Day Dresses."
            error={errors.subcategory}
          >
            <input
              id="subcategory"
              list="subcategory-suggestions"
              value={values.subcategory}
              onChange={(event) => patch({ subcategory: event.target.value })}
              className={`${controlClass} h-11`}
            />
            <datalist id="subcategory-suggestions">
              {selectedCategory?.subcategories.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </Field>
        </div>
        {selectedCategory && selectedCategory.subcategories.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {selectedCategory.subcategories.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => patch({ subcategory: name })}
                className="border border-beige bg-ivory px-3 py-2 text-sm"
              >
                {name}
              </button>
            ))}
          </div>
        ) : null}
      </AdminSection>

      <AdminSection
        title="Pricing"
        description="Prices are in rupees. Leave the sale price empty if the piece is not on sale."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Regular price"
            htmlFor="price"
            hint="The usual price, without the rupee symbol."
            error={errors.price}
          >
            <input
              id="price"
              inputMode="decimal"
              value={values.price || ""}
              onChange={(event) => patch({ price: Number(event.target.value) })}
              className={`${controlClass} h-11`}
            />
          </Field>
          <Field
            label="Sale price"
            htmlFor="sale-price"
            hint="Optional. Customers see this instead of the regular price."
            error={errors.salePrice}
          >
            <input
              id="sale-price"
              inputMode="decimal"
              value={values.salePrice ?? ""}
              onChange={(event) => {
                const raw = event.target.value.trim();
                patch({ salePrice: raw === "" ? null : Number(raw) });
              }}
              className={`${controlClass} h-11`}
            />
          </Field>
        </div>
      </AdminSection>

      <AdminSection
        title="Images"
        description="Add the photos customers will swipe through."
      >
        <ImagePicker
          images={values.images}
          error={errors.images}
          onChange={(images) => patch({ images })}
        />
      </AdminSection>

      <AdminSection
        title="Variants"
        description="Choose the sizes and colours, then say how many you have of each."
      >
        <VariantFields
          sizes={values.sizes}
          colors={values.colors}
          inventory={values.inventory}
          errors={{
            sizes: errors.sizes,
            colors: errors.colors,
            inventory: errors.inventory,
          }}
          onSizes={(sizes) => patch({ sizes })}
          onColors={(colors) => patch({ colors })}
          onInventory={(inventory) => patch({ inventory })}
        />
      </AdminSection>

      <AdminSection
        title="Product flags"
        description="Optional labels. Leave them off if you are not sure."
      >
        <Flag
          label="New Arrival"
          hint="Shows this piece in New Arrivals."
          checked={values.newArrival}
          onChange={(newArrival) => patch({ newArrival })}
        />
        <Flag
          label="Featured"
          hint="Marks this piece to be highlighted."
          checked={values.featured}
          onChange={(featured) => patch({ featured })}
        />
        <Flag
          label="Bestseller"
          hint="Marks this piece as a bestseller."
          checked={values.bestseller}
          onChange={(bestseller) => patch({ bestseller })}
        />
      </AdminSection>

      <AdminSection
        title="Publishing"
        description="A draft stays off the shop until you publish it."
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <StatusChoice
            label="Draft"
            hint="Only visible here. Customers cannot buy it yet."
            selected={!values.published}
            onSelect={() => patch({ published: false })}
          />
          <StatusChoice
            label="Published"
            hint="Visible on the shop."
            selected={values.published}
            onSelect={() => patch({ published: true })}
          />
        </div>
      </AdminSection>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending} className="h-11 px-5">
          {pending ? "Saving…" : "Save product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 px-5"
          onClick={() => router.push("/admin/products")}
        >
          Back to products
        </Button>
      </div>
    </form>
  );
}

function Flag({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border border-beige bg-ivory px-4 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 size-4 accent-espresso"
      />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-1 block text-sm text-taupe">{hint}</span>
      </span>
    </label>
  );
}

function StatusChoice({
  label,
  hint,
  selected,
  onSelect,
}: {
  label: string;
  hint: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`px-4 py-4 text-left ${
        selected ? "bg-espresso text-ivory" : "border border-beige bg-ivory text-ink"
      }`}
    >
      <span className="block text-sm font-medium">{label}</span>
      <span className={`mt-1 block text-sm ${selected ? "text-ivory/80" : "text-taupe"}`}>
        {hint}
      </span>
    </button>
  );
}
