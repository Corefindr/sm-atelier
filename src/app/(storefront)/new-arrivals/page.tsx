import type { Metadata } from "next";

import { ProductGrid } from "@/components/product/product-grid";
import { PageIntro } from "@/components/shared/page-intro";
import { getNewArrivals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest SM Atelier pieces, just added to the edit.",
};

export default async function NewArrivalsPage() {
  const products = await getNewArrivals();

  return (
    <>
      <PageIntro
        eyebrow="Just in"
        title="New Arrivals"
        description="The newest silhouettes from the studio, ready for the season ahead."
      />
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
