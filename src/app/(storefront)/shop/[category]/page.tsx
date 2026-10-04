import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductGrid } from "@/components/product/product-grid";
import { CategoryNav } from "@/components/shop/category-nav";
import { PageIntro } from "@/components/shared/page-intro";
import { getCategory, getProductsByCategory } from "@/lib/catalog";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Shop" };
  }

  return {
    title: category.name,
    description: `Shop ${category.name} from SM Atelier.`,
  };
}

export default async function ShopCategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.slug);

  return (
    <>
      <PageIntro
        eyebrow="Shop"
        title={category.name}
        description={
          category.subcategories.length > 0
            ? category.subcategories.join(" · ")
            : "Pieces from this part of the edit."
        }
      >
        <CategoryNav activeSlug={category.slug} />
      </PageIntro>
      <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-20">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
