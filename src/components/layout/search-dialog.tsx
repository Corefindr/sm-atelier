"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchCatalog } from "@/lib/admin/actions";
import { formatPrice } from "@/lib/format";
import { getCurrentPrice } from "@/lib/pricing";
import type { Product } from "@/types/product";

export function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    let ignore = false;

    searchCatalog(query).then((items) => {
      if (!ignore) {
        setResults(items.slice(0, 6));
      }
    });

    return () => {
      ignore = true;
    };
  }, [query]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    if (!term) {
      return;
    }
    setOpen(false);
    router.push(`/shop?q=${encodeURIComponent(term)}`);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setQuery("");
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search the collection"
            className="rounded-none"
          />
        }
      >
        <Search strokeWidth={1.5} />
      </DialogTrigger>
      <DialogContent className="bg-cream sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl font-medium">
            Search
          </DialogTitle>
          <DialogDescription>
            Find a piece by name. This looks through the current edit.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex gap-2">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <Input
            id="site-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Dresses, co-ords, linen..."
            className="h-11 rounded-none bg-ivory"
            autoFocus
          />
          <Button type="submit" className="h-11 rounded-none px-4">
            Search
          </Button>
        </form>
        {query.trim() ? (
          results.length > 0 ? (
            <ul className="divide-y divide-beige">
              {results.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-3 text-sm hover:text-taupe"
                  >
                    <span className="font-serif text-lg">{product.name}</span>
                    <span>{formatPrice(getCurrentPrice(product))}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-taupe">
              No pieces match that search. Try a fabric or silhouette.
            </p>
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
