export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductColor = {
  id: string;
  name: string;
  hex: string;
};

export type InventoryItem = {
  size: string;
  colorId: string;
  quantity: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  salePrice: number | null;
  images: ProductImage[];
  sizes: string[];
  colors: ProductColor[];
  inventory: InventoryItem[];
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  published: boolean;
  createdAt: string;
};
