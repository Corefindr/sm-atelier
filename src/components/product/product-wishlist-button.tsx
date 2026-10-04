"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { cn } from "@/lib/utils";

type ProductWishlistButtonProps = {
  slug: string;
  name: string;
};

export function ProductWishlistButton({
  slug,
  name,
}: ProductWishlistButtonProps) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);

  return (
    <Button
      type="button"
      variant={saved ? "secondary" : "default"}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
      onClick={() => toggle(slug)}
      className="h-12 rounded-none px-6 tracking-[0.16em] uppercase"
    >
      <Heart
        strokeWidth={1.5}
        className={cn("size-4", saved && "fill-current")}
      />
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
