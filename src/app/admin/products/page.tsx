import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { ProductTable } from "@/components/admin/product-table";
import { catalogStore } from "@/lib/catalog-store";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const categories = catalogStore.listCategories();
  const products = catalogStore
    .listProducts()
    .filter((product) => {
      if (status === "published") {
        return product.published;
      }
      if (status === "draft") {
        return !product.published;
      }
      return true;
    })
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

  const filters = [
    { href: "/admin/products", label: "All", active: status !== "published" && status !== "draft" },
    { href: "/admin/products?status=published", label: "Published", active: status === "published" },
    { href: "/admin/products?status=draft", label: "Drafts", active: status === "draft" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Edit a piece, copy it, or decide when customers can see it."
        action={{ href: "/admin/products/new", label: "Add a product" }}
      />
      <div className="flex gap-2">
        {filters.map((filter) => (
          <Link
            key={filter.href}
            href={filter.href}
            aria-current={filter.active ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm ${
              filter.active ? "bg-espresso text-ivory" : "bg-cream text-ink"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>
      <ProductTable products={products} categories={categories} />
    </div>
  );
}
