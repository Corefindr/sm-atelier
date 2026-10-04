import { PageHeader } from "@/components/admin/page-header";
import { CategoryManager } from "@/components/admin/category-manager";
import { catalogStore } from "@/lib/catalog-store";

export const metadata = { title: "Categories" };

export default function CategoriesPage() {
  const categories = catalogStore.listCategories();
  const productCounts = catalogStore.listProducts().reduce<Record<string, number>>(
    (counts, product) => {
      counts[product.category] = (counts[product.category] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="These are the groups customers browse, such as Dresses or Tops."
      />
      <CategoryManager categories={categories} productCounts={productCounts} />
    </div>
  );
}
