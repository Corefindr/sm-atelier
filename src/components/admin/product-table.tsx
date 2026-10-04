"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Thumb } from "@/components/admin/thumb";
import { deleteProduct, duplicateProduct, setProductPublished } from "@/lib/admin/actions";
import { formatPrice } from "@/lib/format";
import { isLowStock, totalStock } from "@/lib/stock";
import type { Category } from "@/types/catalog";
import type { Product } from "@/types/product";

export function ProductTable({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const names = new Map(categories.map((category) => [category.slug, category.name]));

  function run(action: () => Promise<{ ok: boolean; message?: string; id?: string }>, next?: (id?: string) => void) {
    startTransition(async () => {
      const result = await action();
      if (!result.ok) {
        setMessage(result.message ?? "That change could not be saved.");
        return;
      }
      setMessage("");
      setConfirmId(null);
      if (next) {
        next(result.id);
        return;
      }
      router.refresh();
    });
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-beige bg-cream px-6 py-12 text-center">
        <p className="font-serif text-3xl text-ink">No pieces here yet</p>
        <p className="mt-2 text-sm text-taupe">
          Add a product, or choose another filter.
        </p>
        <Link
          href="/admin/products/new"
          className="mt-6 inline-flex h-11 items-center bg-espresso px-5 text-sm text-ivory"
        >
          Add a product
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {message ? (
        <p className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-2xl border border-beige bg-cream">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-beige text-taupe">
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stock = totalStock(product);
              const low = isLowStock(product);
              const image = product.images[0];

              return (
                <tr key={product.id} className="border-b border-beige/80 align-middle last:border-b-0">
                  <td className="px-4 py-3">
                    {image ? (
                      <Thumb src={image.src} alt={image.alt || product.name} />
                    ) : (
                      <span className="inline-flex h-16 w-12 items-center justify-center bg-sand text-[10px] text-taupe">
                        None
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{product.name}</p>
                    <p className="mt-1 text-taupe">{product.subcategory}</p>
                  </td>
                  <td className="px-4 py-3">{names.get(product.category) ?? product.category}</td>
                  <td className="px-4 py-3">
                    {product.salePrice != null ? (
                      <span>
                        {formatPrice(product.salePrice)}
                        <span className="ml-2 text-taupe line-through">
                          {formatPrice(product.price)}
                        </span>
                      </span>
                    ) : (
                      formatPrice(product.price)
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {stock}
                    {low ? <span className="ml-2 text-destructive">Low</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex border border-beige px-2 py-1 text-xs tracking-wide uppercase">
                      {product.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-x-3 gap-y-1">
                      <Link href={`/admin/products/${product.id}/edit`} className="underline-offset-2 hover:underline">
                        Edit
                      </Link>
                      <button
                        type="button"
                        disabled={pending}
                        className="underline-offset-2 hover:underline disabled:opacity-50"
                        onClick={() =>
                          run(
                            () => duplicateProduct(product.id),
                            (id) => {
                              if (id) {
                                router.push(`/admin/products/${id}/edit?notice=saved`);
                              }
                            },
                          )
                        }
                      >
                        Duplicate
                      </button>
                      <button
                        type="button"
                        disabled={pending}
                        className="underline-offset-2 hover:underline disabled:opacity-50"
                        onClick={() =>
                          run(() => setProductPublished(product.id, !product.published))
                        }
                      >
                        {product.published ? "Unpublish" : "Publish"}
                      </button>
                      {confirmId === product.id ? (
                        <>
                          <button
                            type="button"
                            disabled={pending}
                            className="text-destructive underline-offset-2 hover:underline"
                            onClick={() => run(() => deleteProduct(product.id))}
                          >
                            Yes, delete
                          </button>
                          <button type="button" onClick={() => setConfirmId(null)}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          className="text-destructive underline-offset-2 hover:underline"
                          onClick={() => setConfirmId(product.id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
