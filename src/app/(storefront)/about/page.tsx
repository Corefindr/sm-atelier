import type { Metadata } from "next";

import { CtaLink } from "@/components/shared/cta-link";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = {
  title: "About",
  description:
    "SM Atelier designs contemporary women's wear that blends comfort, elegance and individuality.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title="Thoughtfully Designed. Effortlessly You."
        description="A boutique house for women who dress with intention."
      />
      <article className="mx-auto max-w-2xl px-5 py-16 md:py-24">
        <div className="space-y-6 text-base leading-8 text-taupe">
          <p>
            At SM Atelier, we create contemporary women&apos;s wear that blends
            comfort, elegance and individuality. Each piece is designed to make
            you feel confident, wherever life takes you.
          </p>
          <p>
            The palette stays close to ivory, sand and cream. The cuts are
            clean, with enough ease to move through a day and enough line to
            feel considered after dark.
          </p>
          <p>
            This is the beginning of the house online. The collection you see
            is a studio edit, ready for the full shop experience to follow.
          </p>
        </div>
        <div className="mt-10">
          <CtaLink href="/shop">Shop the edit</CtaLink>
        </div>
      </article>
    </>
  );
}
