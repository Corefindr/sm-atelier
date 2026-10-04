"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inventory", label: "Inventory" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === "/admin";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-ivory text-ink lg:grid lg:grid-cols-[232px_minmax(0,1fr)]">
      <aside className="border-b border-beige bg-cream lg:min-h-full lg:border-r lg:border-b-0">
        <div className="flex items-center justify-between gap-4 px-5 py-5 lg:block lg:px-6 lg:py-8">
          <Link href="/admin" className="block">
            <span className="font-serif text-2xl tracking-[0.14em] text-ink">
              SM ATELIER
            </span>
            <span className="mt-1 block text-xs tracking-[0.16em] text-taupe uppercase">
              Studio desk
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-taupe underline-offset-4 hover:text-ink hover:underline lg:mt-6 lg:inline-block"
          >
            View the shop
          </Link>
        </div>
        <nav aria-label="Studio desk" className="flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:px-3 lg:pb-8">
          {links.map((link) => {
            const current = isCurrent(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`block shrink-0 rounded-full px-4 py-2 text-sm lg:rounded-lg lg:px-3 lg:py-2.5 ${
                  current ? "bg-espresso text-ivory" : "text-ink hover:bg-sand"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="min-w-0">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          {children}
          <p className="mt-12 max-w-xl text-sm leading-relaxed text-taupe">
            Changes stay on this computer for now. Sign-in and the live
            database are not connected yet.
          </p>
        </div>
      </div>
    </div>
  );
}
