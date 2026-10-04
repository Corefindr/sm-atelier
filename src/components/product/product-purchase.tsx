"use client";

import { useState } from "react";

import { ProductPrice } from "@/components/product/product-price";
import { SizeGuide } from "@/components/product/size-guide";
import { Button } from "@/components/ui/button";
import { getAvailableSizes, getInventoryQuantity } from "@/lib/inventory";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductPurchaseProps = {
  product: Product;
};

export function ProductPurchase({ product }: ProductPurchaseProps) {
  const initialColor = product.colors[0]?.id ?? "";
  const initialSizes = getAvailableSizes(product, initialColor);
  const [colorId, setColorId] = useState(initialColor);
  const [size, setSize] = useState(initialSizes[0] ?? "");
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState<string | null>(null);

  const selectedColor = product.colors.find((color) => color.id === colorId);
  const stock = getInventoryQuantity(product, size, colorId);
  const availableSizes = getAvailableSizes(product, colorId);

  function chooseColor(nextColorId: string) {
    const nextSizes = getAvailableSizes(product, nextColorId);
    setColorId(nextColorId);
    setQuantity(1);
    setNotice(null);
    if (!nextSizes.includes(size)) {
      setSize(nextSizes[0] ?? "");
    }
  }

  function requireSelection() {
    if (!size || !colorId) {
      setNotice("Choose a size and a colour.");
      return false;
    }

    if (stock < 1) {
      setNotice("That size is sold out in this colour.");
      return false;
    }

    if (quantity > stock) {
      setNotice(`Only ${stock} available in this size and colour.`);
      return false;
    }

    return true;
  }

  return (
    <div className="mt-8 space-y-6">
      <ProductPrice
        price={product.price}
        salePrice={product.salePrice}
        className="text-lg text-taupe"
        currentClassName="text-ink"
      />

      <fieldset>
        <legend className="text-[11px] tracking-[0.18em] text-taupe uppercase">
          Colour{selectedColor ? ` · ${selectedColor.name}` : ""}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Colour">
          {product.colors.map((color) => {
            const selected = color.id === colorId;

            return (
              <button
                key={color.id}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={color.name}
                onClick={() => chooseColor(color.id)}
                className={cn(
                  "size-8 rounded-full border border-black/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
                  selected && "ring-1 ring-ink ring-offset-2",
                )}
                style={{ backgroundColor: color.hex }}
              />
            );
          })}
        </div>
      </fieldset>

      <div>
        <div className="flex items-center gap-4">
          <p id="size-label" className="text-[11px] tracking-[0.18em] text-taupe uppercase">
            Size
          </p>
          <SizeGuide />
        </div>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-labelledby="size-label">
          {product.sizes.map((option) => {
            const available = availableSizes.includes(option);
            const selected = option === size;

            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={!available}
                onClick={() => {
                  setSize(option);
                  setQuantity(1);
                  setNotice(null);
                }}
                className={cn(
                  "min-w-12 border px-3 py-2 text-sm transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  selected
                    ? "border-ink bg-ink text-ivory"
                    : "border-beige bg-ivory text-ink hover:border-ink",
                  !available && "cursor-not-allowed text-stone line-through opacity-60",
                )}
              >
                {option}
                <span className="sr-only">{available ? "" : ", sold out"}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.18em] text-taupe uppercase">Quantity</p>
        <div className="mt-3 inline-flex items-center border border-beige bg-ivory">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            className="size-11 text-lg disabled:opacity-40"
          >
            −
          </button>
          <span className="min-w-8 text-center text-sm" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={stock < 1 || quantity >= stock}
            onClick={() => setQuantity((current) => Math.min(stock, current + 1))}
            className="size-11 text-lg disabled:opacity-40"
          >
            +
          </button>
        </div>
        <p className="mt-2 text-sm text-taupe">
          {stock > 0 ? `${stock} in this size and colour` : "Sold out in this size and colour"}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          disabled={stock < 1}
          onClick={() => {
            if (!requireSelection()) {
              return;
            }
            setNotice(
              "Your bag will open once checkout is connected. This piece has not been saved.",
            );
          }}
          className="h-12 flex-1 rounded-none tracking-[0.18em] uppercase"
        >
          Add to Bag
        </Button>
        <Button
          type="button"
          variant="outline"
          disabled={stock < 1}
          onClick={() => {
            if (!requireSelection()) {
              return;
            }
            setNotice(
              "Buy Now will continue to payment when Razorpay is connected.",
            );
          }}
          className="h-12 flex-1 rounded-none bg-transparent tracking-[0.18em] uppercase"
        >
          Buy Now
        </Button>
      </div>
      {notice ? (
        <p role="status" className="text-sm leading-6 text-taupe">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
