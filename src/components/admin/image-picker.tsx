"use client";

import { useState } from "react";

import { Thumb } from "@/components/admin/thumb";
import type { ProductImage } from "@/types/product";

const MAX_BYTES = 4 * 1024 * 1024;

function readImage(file: File): Promise<ProductImage> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const name = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      resolve({ src: String(reader.result), alt: name });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ImagePicker({
  images,
  onChange,
  error,
}: {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  error?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  async function addFiles(list: FileList | File[]) {
    const files = [...list].filter((file) => file.type.startsWith("image/"));

    if (files.length === 0) {
      setLocalError("Choose image files, such as JPG or PNG.");
      return;
    }

    const oversized = files.find((file) => file.size > MAX_BYTES);
    if (oversized) {
      setLocalError("Each photo needs to be under 4 MB.");
      return;
    }

    const next = await Promise.all(files.map(readImage));
    setLocalError(null);
    onChange([...images, ...next]);
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) {
      return;
    }

    const next = [...images];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    onChange(next);
  }

  const message = error ?? localError;
  const placeholders = Math.max(0, 3 - images.length);

  return (
    <div className="space-y-3">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          void addFiles(event.dataTransfer.files);
        }}
        className={`rounded-xl border border-dashed px-5 py-8 text-center ${
          dragging ? "border-espresso bg-sand" : "border-stone bg-ivory"
        }`}
      >
        <p className="text-sm text-ink">Drop photos here</p>
        <p className="mt-1 text-sm text-taupe">
          Or choose them from your computer. The first photo is the main one.
        </p>
        <label className="mt-4 inline-flex h-10 cursor-pointer items-center border border-espresso px-4 text-sm text-espresso">
          Choose photos
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(event) => {
              if (event.target.files) {
                void addFiles(event.target.files);
              }
              event.target.value = "";
            }}
          />
        </label>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((image, index) => (
          <li key={`${image.src.slice(0, 32)}-${index}`} className="bg-ivory p-2">
            <Thumb src={image.src} alt={image.alt || "Product photo"} className="aspect-[3/4] h-auto w-full" />
            <p className="mt-2 text-xs text-taupe">
              {index === 0 ? "Main photo" : `Photo ${index + 1}`}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {index > 0 ? (
                <button
                  type="button"
                  className="text-xs text-ink underline-offset-2 hover:underline"
                  onClick={() => move(index, -1)}
                >
                  Move earlier
                </button>
              ) : null}
              <button
                type="button"
                className="text-xs text-destructive underline-offset-2 hover:underline"
                onClick={() => onChange(images.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
        {Array.from({ length: placeholders }, (_, index) => (
          <li
            key={`placeholder-${index}`}
            className="flex aspect-[3/4] items-center justify-center border border-dashed border-beige text-sm text-taupe"
          >
            Photo {images.length + index + 1}
          </li>
        ))}
      </ul>

      {message ? (
        <p className="text-sm text-destructive" role="alert">
          {message}
        </p>
      ) : (
        <p className="text-sm text-taupe">
          Add at least one photo. You can add more than one.
        </p>
      )}
    </div>
  );
}
