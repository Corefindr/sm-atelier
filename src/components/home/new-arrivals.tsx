import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { Reveal } from "@/components/shared/reveal";
import { getNewArrivals } from "@/lib/catalog";

export async function NewArrivals() {
  const products = await getNewArrivals();

  return (
    <section
      aria-labelledby="new-arrivals"
      className="bg-ivory px-5 py-20 md:px-10 md:py-28"
    >
      <Reveal className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
              Just in
            </p>
            <h2
              id="new-arrivals"
              className="mt-3 font-serif text-4xl font-medium text-ink md:text-5xl"
            >
              New Arrivals
            </h2>
          </div>
          <Link
            href="/new-arrivals"
            className="shrink-0 text-[11px] tracking-[0.2em] text-ink uppercase underline decoration-beige underline-offset-4 transition-colors hover:text-taupe"
          >
            View all
          </Link>
        </div>
        <ProductGrid products={products} />
      </Reveal>
    </section>
  );
}
