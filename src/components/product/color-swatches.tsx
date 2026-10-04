"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types/product";

type ColorSwatchesProps = {
  colors: ProductColor[];
  productName: string;
};

export function ColorSwatches({ colors, productName }: ColorSwatchesProps) {
  const [selected, setSelected] = useState(colors[0]?.name ?? "");

  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2" role="group" aria-label={`${productName} colours`}>
      {colors.map((color) => {
        const isSelected = selected === color.name;

        return (
          <button
            key={color.id}
            type="button"
            aria-label={color.name}
            aria-pressed={isSelected}
            onClick={() => setSelected(color.name)}
            className={cn(
              "size-3.5 rounded-full border border-black/10 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none",
              isSelected && "ring-1 ring-ink ring-offset-2",
            )}
            style={{ backgroundColor: color.hex }}
          />
        );
      })}
    </div>
  );
}
