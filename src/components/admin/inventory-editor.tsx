"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { updateStock } from "@/lib/admin/actions";
import { isLowStock, totalStock } from "@/lib/stock";
import type { Product } from "@/types/product";

export function InventoryEditor({
  products,
  lowOnly = false,
}: {
  products: Product[];
  lowOnly?: boolean;
}) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-beige bg-cream px-6 py-12 text-center">
        <p className="font-serif text-3xl text-ink">
          {lowOnly ? "Nothing is running low" : "No products yet"}
        </p>
        <p className="mt-2 text-sm text-taupe">
          {lowOnly
            ? "A piece shows here when 5 or fewer are left across every size and colour."
            : "Add a product first, then set how many you have."}
        </p>
        {lowOnly ? (
          <Link href="/admin/inventory" className="mt-6 inline-flex text-sm underline-offset-2 hover:underline">
            Show all stock
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {products.map((product) => (
        <section key={product.id} className="rounded-2xl border border-beige bg-cream px-5 py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-serif text-2xl text-ink">{product.name}</h2>
            <p className="text-sm text-taupe">
              {totalStock(product)} in total
              {isLowStock(product) ? " · Low" : ""}
            </p>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] text-left text-sm">
              <thead>
                <tr className="border-b border-beige text-taupe">
                  <th className="py-2 pr-3 font-medium">Size</th>
                  <th className="px-3 py-2 font-medium">Colour</th>
                  <th className="px-3 py-2 font-medium">In stock</th>
                  <th className="py-2 font-medium"> </th>
                </tr>
              </thead>
              <tbody>
                {product.inventory.map((item) => {
                  const color = product.colors.find((entry) => entry.id === item.colorId);

                  return (
                    <StockRow
                      key={`${product.id}-${item.size}-${item.colorId}`}
                      productId={product.id}
                      size={item.size}
                      colorId={item.colorId}
                      colorName={color?.name ?? item.colorId}
                      quantity={item.quantity}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

function StockRow({
  productId,
  size,
  colorId,
  colorName,
  quantity,
}: {
  productId: string;
  size: string;
  colorId: string;
  colorName: string;
  quantity: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [value, setValue] = useState(String(quantity));
  const [message, setMessage] = useState("");

  return (
    <tr className="border-b border-beige/70 last:border-b-0">
      <td className="py-2 pr-3">{size}</td>
      <td className="px-3 py-2">{colorName}</td>
      <td className="px-3 py-2">
        <input
          type="number"
          min={0}
          inputMode="numeric"
          aria-label={`${size} ${colorName} stock`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="h-10 w-24 border border-input bg-ivory px-3 text-sm outline-none focus-visible:border-ring"
        />
      </td>
      <td className="py-2">
        <button
          type="button"
          disabled={pending}
          className="text-sm underline-offset-2 hover:underline disabled:opacity-50"
          onClick={() => {
            const next = Number(value);
            startTransition(async () => {
              const result = await updateStock({
                productId,
                size,
                colorId,
                quantity: next,
              });
              setMessage(result.ok ? "Saved" : (result.message ?? "Check the number"));
              if (result.ok) {
                router.refresh();
              }
            });
          }}
        >
          {pending ? "Saving…" : "Save"}
        </button>
        {message ? <span className="ml-3 text-xs text-taupe">{message}</span> : null}
      </td>
    </tr>
  );
}
