import Link from "next/link";

import { getCategories } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CategoryNavProps = {
  activeSlug?: string;
};

export async function CategoryNav({ activeSlug }: CategoryNavProps) {
  const categories = await getCategories();

  return (
    <nav aria-label="Shop categories" className="mt-8">
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-3">
        <li>
          <Link
            href="/shop"
            aria-current={activeSlug ? undefined : "page"}
            className={cn(
              "text-[11px] tracking-[0.18em] uppercase",
              activeSlug ? "text-taupe hover:text-ink" : "text-ink",
            )}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/shop/${category.slug}`}
              aria-current={activeSlug === category.slug ? "page" : undefined}
              className={cn(
                "text-[11px] tracking-[0.18em] uppercase",
                activeSlug === category.slug
                  ? "text-ink"
                  : "text-taupe hover:text-ink",
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
