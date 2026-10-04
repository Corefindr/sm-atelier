import { CtaLink } from "@/components/shared/cta-link";
import { Reveal } from "@/components/shared/reveal";

export function BrandStory() {
  return (
    <section aria-labelledby="brand-story" className="bg-sand/70 px-5 py-24 md:px-10 md:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
          The house
        </p>
        <h2
          id="brand-story"
          className="mt-4 font-serif text-4xl leading-tight font-medium text-balance text-ink md:text-6xl"
        >
          Thoughtfully Designed. Effortlessly You.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-taupe md:text-lg">
          At SM Atelier, we create contemporary women&apos;s wear that blends
          comfort, elegance and individuality. Each piece is designed to make
          you feel confident, wherever life takes you.
        </p>
        <div className="mt-10">
          <CtaLink href="/about" variant="outline" className="bg-transparent">
            Know More
          </CtaLink>
        </div>
      </Reveal>
    </section>
  );
}
