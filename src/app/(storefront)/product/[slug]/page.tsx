import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductGallery } from "@/components/product/product-gallery";
import { ProductGrid } from "@/components/product/product-grid";
import { ProductPurchase } from "@/components/product/product-purchase";
import { ProductWishlistButton } from "@/components/product/product-wishlist-button";
import {
  getCategory,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Piece" };
  }

  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [category, related] = await Promise.all([
    getCategory(product.category),
    getRelatedProducts(product.slug),
  ]);

  return (
    <article>
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 md:px-10 md:py-16 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} productName={product.name} />
        <div className="lg:py-4">
          <p className="text-[11px] tracking-[0.22em] text-taupe uppercase">
            {category ? (
              <Link href={`/shop/${category.slug}`} className="hover:text-ink">
                {category.name}
              </Link>
            ) : (
              product.category
            )}
            <span aria-hidden="true"> · </span>
            {product.subcategory}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium text-ink md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 max-w-md text-base leading-7 text-taupe">
            {product.shortDescription}
          </p>
          <ProductPurchase product={product} />
          <div className="mt-4">
            <ProductWishlistButton slug={product.slug} name={product.name} />
          </div>
          <p className="mt-8 max-w-md text-base leading-8 text-taupe">
            {product.description}
          </p>
          <section aria-labelledby="care-notes" className="mt-10 max-w-md border-t border-beige pt-6">
            <h2 id="care-notes" className="font-serif text-2xl text-ink">
              Shipping and exchanges
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-taupe">
              <li>Free shipping across India on orders above ₹2,499.</li>
              <li>
                Easy exchanges if the size is not quite right. The window is
                confirmed when checkout opens.
              </li>
              <li>
                Questions on fit can go to the studio from the{" "}
                <Link href="/contact" className="text-ink underline decoration-beige underline-offset-4">
                  contact page
                </Link>
                .
              </li>
            </ul>
          </section>
        </div>
      </div>
      {related.length > 0 ? (
        <section
          aria-labelledby="related-pieces"
          className="border-t border-beige px-5 py-16 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-[1440px]">
            <h2
              id="related-pieces"
              className="font-serif text-4xl font-medium text-ink"
            >
              Related pieces
            </h2>
            <div className="mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
