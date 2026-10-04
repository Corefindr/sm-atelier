"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Field } from "@/components/admin/field";
import { Button } from "@/components/ui/button";
import { createCategory, deleteCategory } from "@/lib/admin/actions";
import { categoryFormSchema, toFieldErrors, type FieldErrors } from "@/lib/admin/schema";
import type { Category } from "@/types/catalog";

export function CategoryManager({
  categories,
  productCounts,
}: {
  categories: Category[];
  productCounts: Record<string, number>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState<"ok" | "error">("ok");

  function save(event: React.FormEvent) {
    event.preventDefault();
    const parsed = categoryFormSchema.safeParse({ name, subcategories });

    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setTone("error");
      setMessage("Please check the fields marked below.");
      return;
    }

    setErrors({});
    startTransition(async () => {
      const result = await createCategory(parsed.data);
      if (!result.ok) {
        setErrors(result.fieldErrors ?? {});
        setTone("error");
        setMessage(result.message ?? "The category could not be added.");
        return;
      }
      setName("");
      setSubcategories("");
      setTone("ok");
      setMessage(result.message ?? "Category added.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="rounded-2xl border border-beige bg-cream px-5 py-6 sm:px-7">
        <h2 className="font-serif text-3xl font-medium text-ink">Add a category</h2>
        <p className="mt-2 text-sm text-taupe">
          Categories group the shop. Subcategories are smaller groups inside one category.
        </p>
        {message ? (
          <p
            className={`mt-4 rounded-xl px-4 py-3 text-sm ${
              tone === "error" ? "bg-destructive/10 text-destructive" : "bg-sand text-ink"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}
        <div className="mt-6 space-y-5">
          <Field
            label="Category name"
            htmlFor="category-name"
            hint="For example, Knitwear."
            error={errors.name}
          >
            <input
              id="category-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-11 w-full border border-input bg-ivory px-3 text-sm outline-none focus-visible:border-ring"
            />
          </Field>
          <Field
            label="Subcategories"
            htmlFor="subcategories"
            hint="Separate them with commas. For example: Cardigans, Pullovers."
            error={errors.subcategories}
          >
            <input
              id="subcategories"
              value={subcategories}
              onChange={(event) => setSubcategories(event.target.value)}
              className="h-11 w-full border border-input bg-ivory px-3 text-sm outline-none focus-visible:border-ring"
            />
          </Field>
          <Button type="submit" disabled={pending} className="h-11 px-5">
            {pending ? "Saving…" : "Add category"}
          </Button>
        </div>
      </form>

      <ul className="divide-y divide-beige rounded-2xl border border-beige bg-cream">
        {categories.map((category) => {
          const count = productCounts[category.slug] ?? 0;
          const locked = category.slug === "all";

          return (
            <li key={category.slug} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-ink">{category.name}</p>
                <p className="mt-1 text-sm text-taupe">
                  {locked
                    ? "Used on the homepage. This one stays."
                    : count === 1
                      ? "1 product"
                      : `${count} products`}
                  {category.subcategories.length > 0
                    ? ` · ${category.subcategories.join(", ")}`
                    : ""}
                </p>
              </div>
              {locked ? null : (
                <button
                  type="button"
                  disabled={pending}
                  className="text-sm text-destructive underline-offset-2 hover:underline disabled:opacity-50"
                  onClick={() => {
                    startTransition(async () => {
                      const result = await deleteCategory(category.slug);
                      setTone(result.ok ? "ok" : "error");
                      setMessage(
                        result.ok
                          ? `${category.name} removed.`
                          : (result.message ?? "That category could not be removed."),
                      );
                      router.refresh();
                    });
                  }}
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
