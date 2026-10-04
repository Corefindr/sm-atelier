import { MessageCircle, RefreshCw, ShieldCheck, Truck } from "lucide-react";

import { benefits } from "@/data/benefits";

const icons = {
  shipping: Truck,
  exchanges: RefreshCw,
  payments: ShieldCheck,
  whatsapp: MessageCircle,
} as const;

export function Benefits() {
  return (
    <section aria-label="Service benefits" className="border-y border-beige">
      <ul className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
        {benefits.map((benefit) => {
          const Icon = icons[benefit.id];

          return (
            <li
              key={benefit.id}
              className="border-beige px-5 py-8 max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b md:px-8 md:py-10 lg:border-r lg:last:border-r-0"
            >
              <Icon strokeWidth={1.25} className="size-5 text-taupe" aria-hidden />
              <h2 className="mt-4 font-serif text-xl font-medium text-ink">
                {benefit.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-taupe">
                {benefit.description}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
