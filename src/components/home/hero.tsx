"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { CtaLink } from "@/components/shared/cta-link";
import { heroSlides } from "@/data/hero";

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const slide = heroSlides[index];
  const animate = motionEnabled && !reduce;

  useEffect(() => {
    if (reduce || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      setMotionEnabled(true);
      setIndex((current) => (current + 1) % heroSlides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [paused, reduce]);

  function goTo(next: number) {
    const total = heroSlides.length;
    setMotionEnabled(true);
    setIndex((next + total) % total);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative min-h-[88vh] overflow-hidden bg-sand text-ivory"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={animate ? { opacity: 0 } : undefined}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            preload={slide.id === heroSlides[0].id}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-ink/20 to-ink/10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex min-h-[88vh] items-end px-5 pt-24 pb-20 md:px-12 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${slide.id}-copy`}
            initial={animate ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            exit={animate ? { opacity: 0 } : undefined}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-[11px] tracking-[0.32em] uppercase">
              {slide.label}
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[0.95] font-medium tracking-[0.04em] text-balance uppercase md:text-7xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-ivory/90 md:text-lg">
              {slide.subtitle}
            </p>
            <div className="mt-8">
              <CtaLink
                href={slide.href}
                className="bg-ivory text-ink hover:bg-ivory/90"
              >
                {slide.cta}
              </CtaLink>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-x-3 top-5 z-10 flex items-center justify-between md:inset-x-6 md:top-8">
        <button
          type="button"
          aria-label="Previous collection"
          onClick={() => goTo(index - 1)}
          className="flex size-10 items-center justify-center border border-ivory/40 bg-ink/20 text-ivory backdrop-blur-sm transition-colors hover:bg-ink/40 focus-visible:ring-2 focus-visible:ring-ivory focus-visible:outline-none"
        >
          <ChevronLeft strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next collection"
          onClick={() => goTo(index + 1)}
          className="flex size-10 items-center justify-center border border-ivory/40 bg-ink/20 text-ivory backdrop-blur-sm transition-colors hover:bg-ink/40 focus-visible:ring-2 focus-visible:ring-ivory focus-visible:outline-none"
        >
          <ChevronRight strokeWidth={1.5} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {heroSlides.map((item, itemIndex) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.title}`}
            aria-current={itemIndex === index}
            onClick={() => goTo(itemIndex)}
            className={`h-1.5 transition-all focus-visible:ring-2 focus-visible:ring-ivory focus-visible:outline-none ${
              itemIndex === index ? "w-8 bg-ivory" : "w-4 bg-ivory/45"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
