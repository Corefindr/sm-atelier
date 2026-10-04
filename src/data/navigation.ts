import type { NavLink } from "@/types/catalog";

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const shopLinks: NavLink[] = [
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Dresses", href: "/shop/dresses" },
  { label: "Co-ord Sets", href: "/shop/co-ords" },
  { label: "Tops", href: "/shop/tops" },
  { label: "Bottoms", href: "/shop/bottoms" },
  { label: "Occasion Wear", href: "/shop/occasion" },
];

export const careLinks: NavLink[] = [
  { label: "Shipping", href: "/contact#shipping" },
  { label: "Exchanges", href: "/contact#exchanges" },
  { label: "WhatsApp Support", href: "/contact#whatsapp" },
  { label: "Contact", href: "/contact" },
];

export const aboutLinks: NavLink[] = [
  { label: "Our Story", href: "/about" },
  { label: "Contact the Studio", href: "/contact" },
];

export const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Pinterest", href: "https://www.pinterest.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];
