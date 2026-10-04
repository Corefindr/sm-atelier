type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: PageIntroProps) {
  return (
    <header className="border-b border-beige px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-none font-medium text-balance text-ink md:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-taupe">
          {description}
        </p>
        {children}
      </div>
    </header>
  );
}
