import Link from "next/link";

export function StatCard({
  label,
  value,
  hint,
  href,
}: {
  label: string;
  value: number;
  hint: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-beige bg-cream px-5 py-5 transition-colors hover:border-stone"
    >
      <p className="text-sm text-taupe">{label}</p>
      <p className="mt-3 font-sans text-5xl font-medium tracking-tight text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-3 text-sm text-taupe">{hint}</p>
    </Link>
  );
}
