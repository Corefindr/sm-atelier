import Link from "next/link";

import { InventoryEditor } from "@/components/admin/inventory-editor";
import { PageHeader } from "@/components/admin/page-header";
import { catalogStore } from "@/lib/catalog-store";
import { isLowStock } from "@/lib/stock";

export const metadata = { title: "Inventory" };

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const lowOnly = filter === "low";
  const products = catalogStore
    .listProducts()
    .filter((product) => (lowOnly ? isLowStock(product) : true))
    .sort((left, right) => left.name.localeCompare(right.name));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Update how many pieces you have of each size and colour."
      />
      <div className="flex gap-2">
        <Link
          href="/admin/inventory"
          aria-current={lowOnly ? undefined : "page"}
          className={`rounded-full px-4 py-2 text-sm ${
            lowOnly ? "bg-cream text-ink" : "bg-espresso text-ivory"
          }`}
        >
          All stock
        </Link>
        <Link
          href="/admin/inventory?filter=low"
          aria-current={lowOnly ? "page" : undefined}
          className={`rounded-full px-4 py-2 text-sm ${
            lowOnly ? "bg-espresso text-ivory" : "bg-cream text-ink"
          }`}
        >
          Low stock
        </Link>
      </div>
      <InventoryEditor products={products} lowOnly={lowOnly} />
    </div>
  );
}
