"use client";

import { useState } from "react";

import { Field } from "@/components/admin/field";
import { slugify } from "@/lib/slug";
import { SIZE_OPTIONS } from "@/lib/stock";
import type { InventoryItem, ProductColor } from "@/types/product";

const presetColors = [
  { name: "Ivory", hex: "#f3eee6" },
  { name: "Sand", hex: "#cbb59a" },
  { name: "Cream", hex: "#f7f1e8" },
  { name: "Champagne", hex: "#e6d3b3" },
  { name: "Ink", hex: "#2a2420" },
  { name: "Crimson", hex: "#8d2f39" },
  { name: "Bordeaux", hex: "#6b2b3a" },
];

function nextColorId(name: string, colors: ProductColor[]) {
  const base = slugify(name) === "piece" ? "colour" : slugify(name);
  let id = base;
  let count = 2;

  while (colors.some((color) => color.id === id)) {
    id = `${base}-${count}`;
    count += 1;
  }

  return id;
}

export function syncInventory(
  sizes: string[],
  colors: ProductColor[],
  current: InventoryItem[],
): InventoryItem[] {
  return sizes.flatMap((size) =>
    colors.map((color) => {
      const existing = current.find(
        (item) => item.size === size && item.colorId === color.id,
      );

      return existing ?? { size, colorId: color.id, quantity: 0 };
    }),
  );
}

export function VariantFields({
  sizes,
  colors,
  inventory,
  errors,
  onSizes,
  onColors,
  onInventory,
}: {
  sizes: string[];
  colors: ProductColor[];
  inventory: InventoryItem[];
  errors: { sizes?: string; colors?: string; inventory?: string };
  onSizes: (sizes: string[]) => void;
  onColors: (colors: ProductColor[]) => void;
  onInventory: (inventory: InventoryItem[]) => void;
}) {
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#cbb59a");

  function addColor(name: string, hex: string) {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    if (colors.some((color) => color.name.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }

    const next = [...colors, { id: nextColorId(trimmed, colors), name: trimmed, hex }];
    onColors(next);
    onInventory(syncInventory(sizes, next, inventory));
    setColorName("");
  }

  function removeColor(id: string) {
    const next = colors.filter((color) => color.id !== id);
    onColors(next);
    onInventory(syncInventory(sizes, next, inventory));
  }

  function toggleSize(size: string) {
    const next = sizes.includes(size)
      ? sizes.filter((item) => item !== size)
      : SIZE_OPTIONS.filter((option) => option === size || sizes.includes(option));
    onSizes(next);
    onInventory(syncInventory(next, colors, inventory));
  }

  function setQuantity(size: string, colorId: string, quantity: number) {
    onInventory(
      inventory.map((item) =>
        item.size === size && item.colorId === colorId
          ? { ...item, quantity }
          : item,
      ),
    );
  }

  return (
    <div className="space-y-6">
      <Field
        label="Sizes"
        hint="Tick every size you will sell."
        error={errors.sizes}
      >
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => {
            const selected = sizes.includes(size);

            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleSize(size)}
                className={`h-11 min-w-14 border px-3 text-sm ${
                  selected
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-beige bg-ivory text-ink"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </Field>

      <Field
        label="Colours"
        hint="Pick a studio colour, or add your own."
        error={errors.colors}
      >
        <div className="flex flex-wrap gap-2">
          {presetColors.map((preset) => (
            <button
              key={preset.hex}
              type="button"
              onClick={() => addColor(preset.name, preset.hex)}
              className="inline-flex h-11 items-center gap-2 border border-beige bg-ivory px-3 text-sm"
            >
              <span
                className="size-4 border border-beige"
                style={{ backgroundColor: preset.hex }}
                aria-hidden
              />
              {preset.name}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={colorName}
            onChange={(event) => setColorName(event.target.value)}
            placeholder="Colour name"
            className="h-11 flex-1 border border-input bg-ivory px-3 text-sm outline-none focus-visible:border-ring"
          />
          <label className="inline-flex h-11 items-center gap-2 border border-beige bg-ivory px-3 text-sm">
            Shade
            <input
              type="color"
              value={colorHex}
              onChange={(event) => setColorHex(event.target.value)}
              aria-label="Shade"
              className="size-7 border-0 bg-transparent p-0"
            />
          </label>
          <button
            type="button"
            onClick={() => addColor(colorName, colorHex)}
            className="h-11 border border-espresso px-4 text-sm text-espresso"
          >
            Add colour
          </button>
        </div>
        {colors.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {colors.map((color) => (
              <li
                key={color.id}
                className="inline-flex items-center gap-2 border border-beige bg-ivory px-3 py-2 text-sm"
              >
                <span
                  className="size-4 border border-beige"
                  style={{ backgroundColor: color.hex }}
                  aria-hidden
                />
                {color.name}
                <button
                  type="button"
                  className="text-taupe hover:text-ink"
                  onClick={() => removeColor(color.id)}
                  aria-label={`Remove ${color.name}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </Field>

      <Field
        label="Stock for each size and colour"
        hint="Enter how many pieces you have of each combination. Use 0 if that combination is sold out."
        error={errors.inventory}
      >
        {sizes.length === 0 || colors.length === 0 ? (
          <p className="text-sm text-taupe">
            Choose sizes and colours first. The stock boxes will appear here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-beige text-left text-taupe">
                  <th className="py-2 pr-3 font-medium">Size</th>
                  {colors.map((color) => (
                    <th key={color.id} className="px-2 py-2 font-medium">
                      {color.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr key={size} className="border-b border-beige/80">
                    <th className="py-2 pr-3 text-left font-medium text-ink">{size}</th>
                    {colors.map((color) => {
                      const row = inventory.find(
                        (item) => item.size === size && item.colorId === color.id,
                      );

                      return (
                        <td key={color.id} className="px-2 py-2">
                          <input
                            type="number"
                            min={0}
                            inputMode="numeric"
                            aria-label={`${size} in ${color.name}`}
                            value={row?.quantity ?? 0}
                            onChange={(event) => {
                              const next = Number(event.target.value);
                              setQuantity(
                                size,
                                color.id,
                                Number.isFinite(next) ? Math.max(0, Math.trunc(next)) : 0,
                              );
                            }}
                            className="h-11 w-24 border border-input bg-ivory px-3 text-sm outline-none focus-visible:border-ring"
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Field>
    </div>
  );
}
