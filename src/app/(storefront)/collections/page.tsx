import type { Metadata } from "next";

import { CategoryGrid } from "@/components/home/category-grid";

export const metadata: Metadata = {
  title: "Collections",
  description: "Shop SM Atelier by category, from day dresses to occasion wear.",
};

export default function CollectionsPage() {
  return <CategoryGrid />;
}
