export type Category = {
  slug: string;
  name: string;
  href: string;
  image: string;
  imageAlt: string;
  subcategories: string[];
};

export type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  label: string;
  title: string;
  subtitle: string;
  href: string;
  cta: string;
};

export type NavLink = {
  label: string;
  href: string;
};
