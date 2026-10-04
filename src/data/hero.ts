import type { HeroSlide } from "@/types/catalog";

export const heroSlides: HeroSlide[] = [
  {
    id: "new-collection",
    image: "/images/hero-1.jpg",
    imageAlt: "Model in a sand coat and matching column dress",
    label: "SM Atelier",
    title: "New Collection",
    subtitle: "Contemporary silhouettes. Made to be noticed.",
    href: "/shop",
    cta: "Shop Now",
  },
  {
    id: "daywear",
    image: "/images/hero-2.jpg",
    imageAlt: "Model in an ivory backless dress on a quiet street",
    label: "Daywear",
    title: "Ease, Tailored",
    subtitle: "Soft structure for days that ask for presence.",
    href: "/new-arrivals",
    cta: "Shop Now",
  },
  {
    id: "occasion",
    image: "/images/hero-3.jpg",
    imageAlt: "Model in a beaded champagne column gown",
    label: "Evening",
    title: "The Occasion Edit",
    subtitle: "Elevated looks for life's special moments.",
    href: "/shop/occasion",
    cta: "Explore Now",
  },
];
