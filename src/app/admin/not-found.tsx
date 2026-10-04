import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="max-w-lg py-16">
      <h1 className="font-serif text-4xl text-ink">That piece is not on the desk</h1>
      <p className="mt-3 text-sm text-taupe">
        It may have been deleted. You can go back to the product list.
      </p>
      <Link
        href="/admin/products"
        className="mt-6 inline-flex h-11 items-center bg-espresso px-5 text-sm text-ivory"
      >
        Back to products
      </Link>
    </div>
  );
}
