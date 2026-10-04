import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    slug: "dresses",
    name: "Dresses",
    href: "/shop/dresses",
    image: "/images/cat-dresses.jpg",
    imageAlt: "Model in an ivory lace dress on a runway",
    subcategories: ["Day Dresses", "Column Dresses"],
  },
  {
    slug: "co-ords",
    name: "Co-ord Sets",
    href: "/shop/co-ords",
    image: "/images/cat-coords.jpg",
    imageAlt: "Model in a crimson co-ord against a clear sky",
    subcategories: ["Tailored Sets"],
  },
  {
    slug: "tops",
    name: "Tops",
    href: "/shop/tops",
    image: "/images/cat-tops.jpg",
    imageAlt: "A cream open-knit poncho hanging on a wooden hanger",
    subcategories: ["Blouses", "Knits"],
  },
  {
    slug: "bottoms",
    name: "Bottoms",
    href: "/shop/bottoms",
    image: "/images/cat-bottoms.jpg",
    imageAlt: "Close view of tailored trousers with a hand in the pocket",
    subcategories: ["Skirts"],
  },
  {
    slug: "occasion",
    name: "Occasion Wear",
    href: "/shop/occasion",
    image: "/images/cat-occasion.jpg",
    imageAlt: "Model in a bordeaux off-shoulder evening dress",
    subcategories: ["Gowns", "Cocktail"],
  },
  {
    slug: "all",
    name: "Shop All",
    href: "/shop",
    image: "/images/cat-all.jpg",
    imageAlt: "Model in a black coat holding a white shoulder bag",
    subcategories: [],
  },
];
