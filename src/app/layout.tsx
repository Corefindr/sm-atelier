import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";

import { WishlistProvider } from "@/components/wishlist/wishlist-provider";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SM Atelier | Contemporary Women's Fashion",
    template: "%s | SM Atelier",
  },
  description:
    "SM Atelier is a premium women's fashion boutique. Contemporary silhouettes in ivory, sand and quiet neutrals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <WishlistProvider>{children}</WishlistProvider>
      </body>
    </html>
  );
}
