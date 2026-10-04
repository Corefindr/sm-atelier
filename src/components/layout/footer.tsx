import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import {
  aboutLinks,
  careLinks,
  shopLinks,
  socialLinks,
} from "@/data/navigation";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h2 className="text-[11px] tracking-[0.22em] text-ivory uppercase">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-ivory/75 transition-colors hover:text-ivory"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-ivory">
      <div className="mx-auto grid gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="font-serif text-3xl tracking-[0.08em]">SM Atelier</p>
          <p className="mt-4 text-sm leading-6 text-ivory/75">
            Contemporary women&apos;s wear, designed in quiet tones and worn
            with ease.
          </p>
          <div className="mt-8">
            <h2 className="text-[11px] tracking-[0.22em] uppercase">
              Newsletter
            </h2>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Customer care" links={careLinks} />
        <div>
          <FooterColumn title="About" links={aboutLinks} />
          <h2 className="mt-8 text-[11px] tracking-[0.22em] uppercase">
            Social
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/15 px-5 py-5 text-center text-xs tracking-wide text-ivory/60 md:px-10">
        <p>© {year} SM Atelier. All rights reserved.</p>
      </div>
    </footer>
  );
}
