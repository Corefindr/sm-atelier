export function AdminSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-beige bg-cream px-5 py-6 sm:px-7 sm:py-7">
      <h2 className="font-serif text-3xl font-medium text-ink">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-taupe">
          {description}
        </p>
      ) : null}
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
