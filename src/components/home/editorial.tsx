import Image from "next/image";

import { CtaLink } from "@/components/shared/cta-link";
import { Reveal } from "@/components/shared/reveal";

export function Editorial() {
  return (
    <section aria-labelledby="occasion-edit" className="px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src="/images/editorial.jpg"
            alt="Model in a black coat walking through a grand hall"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="max-w-md lg:py-8">
          <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
            Evening
          </p>
          <h2
            id="occasion-edit"
            className="mt-4 font-serif text-4xl leading-none font-medium tracking-[0.04em] text-ink uppercase md:text-6xl"
          >
            The Occasion Edit
          </h2>
          <p className="mt-6 text-base leading-7 text-taupe md:text-lg">
            Elevated looks for life&apos;s special moments.
          </p>
          <div className="mt-8">
            <CtaLink href="/shop/occasion">Explore Now</CtaLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
