import { notFound } from "next/navigation";

import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { catalogStore } from "@/lib/catalog-store";

export const metadata = { title: "Edit product" };

export default async function EditProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ notice?: string }>;
}) {
  const { id } = await params;
  const { notice } = await searchParams;
  const product = catalogStore.getProduct(id);

  if (!product) {
    notFound();
  }

  const categories = catalogStore
    .listCategories()
    .filter((category) => category.slug !== "all")
    .map((category) => ({
      slug: category.slug,
      name: category.name,
      subcategories: category.subcategories,
    }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Edit product"
        description={product.name}
      />
      <ProductForm
        mode="edit"
        product={product}
        categories={categories}
        notice={notice}
      />
    </div>
  );
}
