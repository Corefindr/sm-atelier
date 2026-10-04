import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { ProductGrid } from "@/components/product/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { PageIntro } from "@/components/shared/page-intro";
import { getProducts, searchProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop contemporary dresses, co-ords, tops, bottoms and occasion wear from SM Atelier.",
};

type ShopPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    q?: string | string[];
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const category =
    typeof params.category === "string" ? params.category : undefined;
  const query = typeof params.q === "string" ? params.q : undefined;

  if (category && !query) {
    redirect(`/shop/${category}`);
  }

  const products = query ? await searchProducts(query) : await getProducts();
  const title = query ? "Search" : "The Collection";
  const description = query
    ? `Results for “${query}”.`
    : "Pieces chosen for ease, line and the way they feel when you move.";

  return (
    <>
      <PageIntro eyebrow="Shop" title={title} description={description}>
        <CategoryNav />
      </PageIntro>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
