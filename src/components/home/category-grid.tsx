import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section aria-labelledby="shop-by-category" className="px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
              The edit
            </p>
            <h2
              id="shop-by-category"
              className="mt-3 font-serif text-4xl font-medium text-ink md:text-5xl"
            >
              Shop by Category
            </h2>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link href={category.href} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                  <Image
                    src={category.image}
                    alt={category.imageAlt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent" />
                  <h3 className="absolute right-4 bottom-4 left-4 font-serif text-2xl text-ivory md:text-3xl">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
