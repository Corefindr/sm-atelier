# SM Atelier

Premium women's fashion boutique website for SM Atelier. This version is the project foundation and homepage: an editorial storefront with local mock products. Supabase, Razorpay and checkout are not included yet.

## Run locally

```bash
npm install
npm run dev
```

The dev server starts at [http://127.0.0.1:43123](http://127.0.0.1:43123).

## Scripts

- `npm run dev` — development server
- `npm run lint` — ESLint
- `npm run build` — production build

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- shadcn/ui for buttons, inputs and dialogs
- Lucide React
- Framer Motion

## Notes

- Product records start in `src/data/products.ts`. The in-memory desk in `src/lib/catalog-store.ts` is what the shop and the admin both read. Storefront pages go through `src/lib/catalog.ts`, which is the place to swap in Supabase later. Admin writes go through `src/lib/admin/actions.ts`.
- Shop routes are `/shop`, `/shop/[category]`, and `/product/[slug]`.
- The studio desk is at `/admin` (products, categories, and inventory). It uses the same mock catalog. There is no sign-in yet.
- Photography in `public/images` is temporary stock from Unsplash, used until the brand supplies its own images.
- Wishlist state is kept in memory for the current visit.
- Social links in the footer point at the platform homepages until official profiles are ready.
