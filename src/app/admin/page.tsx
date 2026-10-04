import Link from "next/link";

import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { catalogStore } from "@/lib/catalog-store";
import { isLowStock } from "@/lib/stock";

export default function AdminHomePage() {
  const products = catalogStore.listProducts();
  const published = products.filter((product) => product.published).length;
  const drafts = products.length - published;
  const low = products.filter((product) => isLowStock(product)).length;
  const recent = [...products]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Overview"
        description="A quiet view of the collection. Add a piece, publish it, or check what is running low."
        action={{ href: "/admin/products/new", label: "Add a product" }}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total products"
          value={products.length}
          hint="Everything on the desk"
          href="/admin/products"
        />
        <StatCard
          label="Published"
          value={published}
          hint="Visible on the shop"
          href="/admin/products?status=published"
        />
        <StatCard
          label="Drafts"
          value={drafts}
          hint="Hidden from customers"
          href="/admin/products?status=draft"
        />
        <StatCard
          label="Low stock"
          value={low}
          hint="5 or fewer left in total"
          href="/admin/inventory?filter=low"
        />
      </div>
      <section className="rounded-2xl border border-beige bg-cream px-5 py-6">
        <h2 className="font-serif text-3xl font-medium text-ink">Recent pieces</h2>
        <ul className="mt-4 divide-y divide-beige">
          {recent.map((product) => (
            <li key={product.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{product.name}</p>
                <p className="mt-1 text-sm text-taupe">
                  {product.published ? "Published" : "Draft"}
                </p>
              </div>
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="text-sm underline-offset-2 hover:underline"
              >
                Edit
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
