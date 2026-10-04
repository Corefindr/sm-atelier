import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { catalogStore } from "@/lib/catalog-store";

export const metadata = { title: "Add a product" };

export default function NewProductPage() {
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
        title="Add a product"
        description="Fill in what you know. You can save it as a draft and come back later."
      />
      <ProductForm mode="create" categories={categories} />
    </div>
  );
}
