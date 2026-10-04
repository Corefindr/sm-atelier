"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingBag, User } from "lucide-react";

import { SearchDialog } from "@/components/layout/search-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWishlist } from "@/components/wishlist/wishlist-provider";
import { mainNav } from "@/data/navigation";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { count } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-beige/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between gap-3 px-4 md:h-[4.5rem] md:px-8">
        <div className="flex min-w-0 items-center gap-1 lg:w-48">
          <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open menu"
                  className="rounded-none lg:hidden"
                />
              }
            >
              <Menu strokeWidth={1.5} />
            </DialogTrigger>
            <DialogContent className="top-0 left-0 h-dvh max-h-none w-[min(100%,22rem)] max-w-none translate-x-0 translate-y-0 rounded-none bg-cream p-8 sm:max-w-none">
              <DialogHeader>
                <DialogTitle className="font-serif text-3xl font-medium">
                  SM Atelier
                </DialogTitle>
                <DialogDescription>Browse the house.</DialogDescription>
              </DialogHeader>
              <nav aria-label="Mobile">
                <ul className="mt-6 space-y-1">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className={cn(
                          "block py-2 font-serif text-3xl text-ink",
                          isActive(pathname, item.href) && "text-taupe",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-10 flex flex-col gap-3 border-t border-beige pt-6 text-sm">
                <Link
                  href="/account"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-taupe"
                >
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-taupe"
                >
                  Wishlist{count > 0 ? ` (${count})` : ""}
                </Link>
              </div>
            </DialogContent>
          </Dialog>
          <Link
            href="/"
            className="truncate font-serif text-[1.65rem] leading-none tracking-[0.08em] text-ink"
          >
            SM Atelier
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "text-[11px] tracking-[0.18em] uppercase transition-colors hover:text-ink",
                    isActive(pathname, item.href) ? "text-ink" : "text-taupe",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end lg:w-48">
          <SearchDialog />
          <Button
            nativeButton={false}
            variant="ghost"
            size="icon"
            aria-label={
              count > 0 ? `Wishlist, ${count} saved` : "Wishlist"
            }
            render={<Link href="/wishlist" />}
            className="relative rounded-none"
          >
            <Heart strokeWidth={1.5} />
            {count > 0 ? (
              <span className="absolute top-1 right-1 flex size-4 items-center justify-center bg-espresso text-[9px] text-ivory">
                {count}
              </span>
            ) : null}
          </Button>
          <Button
            nativeButton={false}
            variant="ghost"
            size="icon"
            aria-label="Account"
            render={<Link href="/account" />}
            className="hidden rounded-none sm:inline-flex"
          >
            <User strokeWidth={1.5} />
          </Button>
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Bag"
                  className="rounded-none"
                />
              }
            >
              <ShoppingBag strokeWidth={1.5} />
            </DialogTrigger>
            <DialogContent className="bg-cream">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl font-medium">
                  Your bag
                </DialogTitle>
                <DialogDescription>
                  Your bag is empty. Pieces you choose will wait here.
                  Checkout opens when Razorpay is connected.
                </DialogDescription>
              </DialogHeader>
              <Button
                nativeButton={false}
                render={<Link href="/shop" />}
                className="h-11 rounded-none tracking-[0.18em] uppercase"
              >
                Continue browsing
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
