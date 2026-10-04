import Link from "next/link";

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[11px] tracking-[0.22em] text-taupe uppercase">
          Studio desk
        </p>
        <h1 className="mt-2 font-serif text-4xl font-medium text-ink sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-taupe">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex h-11 items-center justify-center bg-espresso px-5 text-sm text-ivory"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
