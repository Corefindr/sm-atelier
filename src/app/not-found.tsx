import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-28 text-center">
      <p className="text-[11px] tracking-[0.28em] text-taupe uppercase">
        404
      </p>
      <h1 className="mt-4 font-serif text-5xl font-medium text-ink">
        This page has left the edit.
      </h1>
      <p className="mt-4 text-taupe">
        The link may be old, or the piece may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center bg-espresso px-8 text-[11px] tracking-[0.22em] text-ivory uppercase"
      >
        Back home
      </Link>
    </div>
  );
}
