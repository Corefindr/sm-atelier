import { CategoryGrid } from "@/components/home/category-grid";
import { Editorial } from "@/components/home/editorial";
import { Hero } from "@/components/home/hero";
import { BrandStory } from "@/components/home/brand-story";
import { Benefits } from "@/components/home/benefits";
import { NewArrivals } from "@/components/home/new-arrivals";

export function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <NewArrivals />
      <Editorial />
      <BrandStory />
      <Benefits />
    </>
  );
}
