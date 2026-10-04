import type { InventoryItem, Product, ProductColor } from "@/types/product";

const apparelSizes = ["XS", "S", "M", "L", "XL"];

function inventoryFor(
  sizes: string[],
  colors: ProductColor[],
  soldOut: string[] = [],
): InventoryItem[] {
  return sizes.flatMap((size) =>
    colors.map((color) => ({
      size,
      colorId: color.id,
      quantity: soldOut.includes(`${size}:${color.id}`) ? 0 : size === "M" ? 8 : 4,
    })),
  );
}

export const products: Product[] = [
  {
    id: "prd_sand_coat_dress",
    slug: "sand-coat-dress",
    name: "Sand Coat Dress",
    shortDescription: "A column dress with a matching sand coat, cut to move.",
    description:
      "The Sand Coat Dress pairs a clean column with a soft coat in the same warm tone. Wear the dress alone, or keep the coat over the shoulders from afternoon into evening. The line is long, the fabric is fluid, and the colour sits close to ivory.",
    category: "dresses",
    subcategory: "Column Dresses",
    price: 7890,
    salePrice: null,
    images: [
      {
        src: "/images/product-sand-coat.jpg",
        alt: "Model in a sand coat over a matching column dress, holding a small bag",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "sand", name: "Sand", hex: "#cbb59a" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "sand", name: "Sand", hex: "#cbb59a" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ], ["XL:ivory"]),
    featured: true,
    newArrival: true,
    bestseller: false,
    published: true,
    createdAt: "2026-09-28T10:00:00.000Z",
  },
  {
    id: "prd_ivory_backless_dress",
    slug: "ivory-backless-dress",
    name: "Ivory Backless Dress",
    shortDescription: "An open-back ivory dress with a quiet street polish.",
    description:
      "The Ivory Backless Dress is cut close through the body and left open at the back. It is a day dress that still feels considered after dark. The ivory ground works with sand, ink, and bare skin.",
    category: "dresses",
    subcategory: "Day Dresses",
    price: 5490,
    salePrice: null,
    images: [
      {
        src: "/images/product-ivory-dress.jpg",
        alt: "Model looking back in an ivory backless dress on a city street",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "ivory", name: "Ivory", hex: "#f4f1ec" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "ivory", name: "Ivory", hex: "#f4f1ec" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ], ["XS:ink"]),
    featured: true,
    newArrival: true,
    bestseller: false,
    published: true,
    createdAt: "2026-09-26T10:00:00.000Z",
  },
  {
    id: "prd_lace_column_dress",
    slug: "lace-column-dress",
    name: "Lace Column Dress",
    shortDescription: "An ivory lace column with an easy, full hem.",
    description:
      "The Lace Column Dress is light without being fragile. Ivory lace falls in a long line, with enough ease to walk. It is the piece we reach for when the day asks for something softer than tailoring.",
    category: "dresses",
    subcategory: "Column Dresses",
    price: 6290,
    salePrice: 5490,
    images: [
      {
        src: "/images/product-lace-dress.jpg",
        alt: "Model walking a runway in an ivory lace column dress",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
      { id: "champagne", name: "Champagne", hex: "#e6d3b3" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
      { id: "champagne", name: "Champagne", hex: "#e6d3b3" },
    ]),
    featured: true,
    newArrival: true,
    bestseller: true,
    published: true,
    createdAt: "2026-09-24T10:00:00.000Z",
  },
  {
    id: "prd_crimson_coord",
    slug: "crimson-coord",
    name: "Crimson Co-ord",
    shortDescription: "A matched top and wide trouser in a deep crimson.",
    description:
      "The Crimson Co-ord is a two-piece with the ease of one. The top sits clean at the shoulder and the trouser is wide through the leg. Wear it together, or let the trouser stand in with an ivory knit.",
    category: "co-ords",
    subcategory: "Tailored Sets",
    price: 6490,
    salePrice: null,
    images: [
      {
        src: "/images/product-crimson-coord.jpg",
        alt: "Model seated in a crimson top and wide-leg trouser set",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "crimson", name: "Crimson", hex: "#8d2f39" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "crimson", name: "Crimson", hex: "#8d2f39" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ], ["XL:crimson"]),
    featured: true,
    newArrival: true,
    bestseller: true,
    published: true,
    createdAt: "2026-09-22T10:00:00.000Z",
  },
  {
    id: "prd_sheer_silk_top",
    slug: "sheer-silk-top",
    name: "Sheer Silk Top",
    shortDescription: "A sheer silk layer in ink, meant to be seen.",
    description:
      "The Sheer Silk Top is a fine layer over skin or a slip. Ink is the deepest colour in the edit. It catches light at the shoulder and stays quiet everywhere else.",
    category: "tops",
    subcategory: "Blouses",
    price: 3290,
    salePrice: null,
    images: [
      {
        src: "/images/product-sheer-top.jpg",
        alt: "Portrait of a model wearing a sheer black silk top",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "ink", name: "Ink", hex: "#2a2420" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "ink", name: "Ink", hex: "#2a2420" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ], ["XS:ivory", "XL:ivory"]),
    featured: false,
    newArrival: true,
    bestseller: false,
    published: true,
    createdAt: "2026-09-20T10:00:00.000Z",
  },
  {
    id: "prd_cream_knit_poncho",
    slug: "cream-knit-poncho",
    name: "Cream Knit Poncho",
    shortDescription: "An open cream knit for cooler evenings.",
    description:
      "The Cream Knit Poncho is an easy layer with an open stitch and a soft fringe. It sits over a slip dress or a co-ord when the air changes. One size, with room to drape.",
    category: "tops",
    subcategory: "Knits",
    price: 2890,
    salePrice: 2490,
    images: [
      {
        src: "/images/product-knit-poncho.jpg",
        alt: "A cream open-knit poncho hanging against a pale wall",
      },
    ],
    sizes: ["One Size"],
    colors: [
      { id: "cream", name: "Cream", hex: "#f7f1e8" },
      { id: "sand", name: "Sand", hex: "#cbb59a" },
    ],
    inventory: inventoryFor(["One Size"], [
      { id: "cream", name: "Cream", hex: "#f7f1e8" },
      { id: "sand", name: "Sand", hex: "#cbb59a" },
    ]),
    featured: false,
    newArrival: false,
    bestseller: false,
    published: true,
    createdAt: "2026-08-12T10:00:00.000Z",
  },
  {
    id: "prd_sand_pleat_skirt",
    slug: "sand-pleat-skirt",
    name: "Sand Pleat Skirt",
    shortDescription: "A sand midi with a fine, even pleat.",
    description:
      "The Sand Pleat Skirt falls to the mid-calf in a warm neutral. The pleat keeps its shape when you sit and opens when you walk. It pairs with the ivory tops in this edit.",
    category: "bottoms",
    subcategory: "Skirts",
    price: 3690,
    salePrice: null,
    images: [
      {
        src: "/images/product-sand-skirt.jpg",
        alt: "Model seated in a sand pleated skirt and white shirt",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "sand", name: "Sand", hex: "#cbb59a" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "sand", name: "Sand", hex: "#cbb59a" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ], ["XS:sand"]),
    featured: false,
    newArrival: true,
    bestseller: false,
    published: true,
    createdAt: "2026-09-18T10:00:00.000Z",
  },
  {
    id: "prd_ink_pleat_skirt",
    slug: "ink-pleat-skirt",
    name: "Ink Pleat Skirt",
    shortDescription: "A black pleated skirt with a sharp, full shape.",
    description:
      "The Ink Pleat Skirt is the darker counterpart to the sand midi. It holds a clean line at the waist and opens below the hip. A house favourite for evenings that stay simple.",
    category: "bottoms",
    subcategory: "Skirts",
    price: 3490,
    salePrice: null,
    images: [
      {
        src: "/images/product-ink-skirt.jpg",
        alt: "Model wearing a black pleated skirt with a striped shirt",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "ink", name: "Ink", hex: "#2a2420" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "ink", name: "Ink", hex: "#2a2420" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ]),
    featured: false,
    newArrival: false,
    bestseller: true,
    published: true,
    createdAt: "2026-07-30T10:00:00.000Z",
  },
  {
    id: "prd_champagne_column_gown",
    slug: "champagne-column-gown",
    name: "Champagne Column Gown",
    shortDescription: "A beaded column for the evening, in champagne.",
    description:
      "The Champagne Column Gown is covered in a fine bead that reads as light rather than shine. The neckline is high, the skirt is narrow, and the colour stays inside the house palette. Made for dinners, weddings, and the long way home.",
    category: "occasion",
    subcategory: "Gowns",
    price: 12990,
    salePrice: null,
    images: [
      {
        src: "/images/product-champagne.jpg",
        alt: "Model in a beaded champagne column gown outside a boutique",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "champagne", name: "Champagne", hex: "#e6d3b3" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "champagne", name: "Champagne", hex: "#e6d3b3" },
      { id: "ivory", name: "Ivory", hex: "#f3eee6" },
    ], ["XS:ivory", "XL:champagne"]),
    featured: true,
    newArrival: true,
    bestseller: true,
    published: true,
    createdAt: "2026-09-16T10:00:00.000Z",
  },
  {
    id: "prd_bordeaux_off_shoulder",
    slug: "bordeaux-off-shoulder",
    name: "Bordeaux Off-Shoulder",
    shortDescription: "An off-shoulder column in deep bordeaux.",
    description:
      "The Bordeaux Off-Shoulder dress sits just below the shoulder and follows the body to the hem. The colour is richer than the day edit, still quiet in a room. It is cocktail dressing without extra ornament.",
    category: "occasion",
    subcategory: "Cocktail",
    price: 8990,
    salePrice: null,
    images: [
      {
        src: "/images/product-bordeaux.jpg",
        alt: "Model in a bordeaux off-shoulder evening dress",
      },
    ],
    sizes: apparelSizes,
    colors: [
      { id: "bordeaux", name: "Bordeaux", hex: "#6e2742" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ],
    inventory: inventoryFor(apparelSizes, [
      { id: "bordeaux", name: "Bordeaux", hex: "#6e2742" },
      { id: "ink", name: "Ink", hex: "#2a2420" },
    ], ["XL:ink"]),
    featured: false,
    newArrival: true,
    bestseller: false,
    published: true,
    createdAt: "2026-09-14T10:00:00.000Z",
  },
  {
    id: "prd_studio_sample_slip",
    slug: "studio-sample-slip",
    name: "Studio Sample Slip",
    shortDescription: "An unpublished sample kept in the studio edit.",
    description:
      "This slip is recorded in the catalog and held back from the shop. It exists so an admin panel can later publish a piece without changing the storefront queries.",
    category: "dresses",
    subcategory: "Day Dresses",
    price: 4190,
    salePrice: null,
    images: [
      {
        src: "/images/product-ivory-dress.jpg",
        alt: "Studio sample of an ivory slip dress",
      },
    ],
    sizes: apparelSizes,
    colors: [{ id: "ivory", name: "Ivory", hex: "#f4f1ec" }],
    inventory: inventoryFor(apparelSizes, [
      { id: "ivory", name: "Ivory", hex: "#f4f1ec" },
    ]),
    featured: false,
    newArrival: true,
    bestseller: false,
    published: false,
    createdAt: "2026-09-30T10:00:00.000Z",
  },
];
